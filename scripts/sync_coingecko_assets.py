#!/usr/bin/env python3
"""
Fetch CoinGecko /coins/markets in small pages, upsert each page into MongoDB before the next API call.

Environment:
  MONGODB_URI       — required, MongoDB connection string (include db name or set MONGODB_DB_NAME)
  MONGODB_DB_NAME   — optional, default Crypto_Watch
  MONGODB_COLLECTION — optional, default assets
  MAX_PAGES         — optional, max API pages, default 20
  COINGECKO_PER_PAGE — optional, rows per request (max 250), default 100
  PAGE_SLEEP_SEC    — optional, delay after a successful write before next API call, default 1.2
  COINGECKO_API_KEY — optional, Pro API key (uses pro-api.coingecko.com)
  COINGECKO_MAX_RETRIES — optional, max attempts per page (429/5xx/network each consume one), default 3
  COINGECKO_429_SLEEP_SEC — optional, wait after HTTP 429 before retrying, default 300 (5 min)
  COINGECKO_INITIAL_DELAY_SEC — optional, sleep before first request, default 0
  COINGECKO_FREE_CI_MAX_PAGES — optional, when GITHUB_ACTIONS + no API key: cap MAX_PAGES (default 5)
  COINGECKO_FREE_CI_MIN_PAGE_SLEEP — optional, when GITHUB_ACTIONS + no API key: min PAGE_SLEEP_SEC (default 45)
  COINGECKO_ALLOW_UNSAFE_FREE_CI — set to "1" to skip the GitHub/free-tier caps

Does not overwrite: favorite_count, description, tags, linkUrl, title, category, size.
"""

from __future__ import annotations

import os
import sys
import time
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional, Tuple

import requests
from requests import Response
from pymongo import MongoClient, UpdateOne
from pymongo.collection import Collection

DEFAULT_UA = (
    "HodlWatch-CoinGeckoSync/1.0 (+https://github.com; automated daily asset metadata sync)"
)

DEFAULT_PER_PAGE = 100
FREE_BASE = "https://api.coingecko.com/api/v3"
PRO_BASE = "https://pro-api.coingecko.com/api/v3"


def parse_iso_dt(value: Optional[str]) -> Optional[datetime]:
    if not value or not isinstance(value, str):
        return None
    try:
        if value.endswith("Z"):
            value = value[:-1] + "+00:00"
        return datetime.fromisoformat(value.replace("Z", "+00:00"))
    except (ValueError, TypeError):
        return None


def coin_to_update_doc(coin: Dict[str, Any]) -> Dict[str, Any]:
    """Fields aligned with Mongoose Asset schema (market + identity only)."""
    gecko_id = coin.get("id")
    if not gecko_id:
        return {}

    doc: Dict[str, Any] = {
        "coingecko_id": gecko_id,
        "symbol": coin.get("symbol") or "",
        "name": coin.get("name") or "",
        "image": coin.get("image") or "",
        "current_price": coin.get("current_price"),
        "market_cap": coin.get("market_cap"),
        "market_cap_rank": coin.get("market_cap_rank"),
        "price_change_percentage_24h": coin.get("price_change_percentage_24h"),
        "fully_diluted_valuation": coin.get("fully_diluted_valuation"),
        "circulating_supply": coin.get("circulating_supply"),
        "total_supply": coin.get("total_supply"),
        "ath": coin.get("ath"),
        "ath_change_percentage": coin.get("ath_change_percentage"),
        "ath_date": parse_iso_dt(coin.get("ath_date")),
        "atl": coin.get("atl"),
        "atl_change_percentage": coin.get("atl_change_percentage"),
        "atl_date": parse_iso_dt(coin.get("atl_date")),
    }
    return {k: v for k, v in doc.items() if v is not None and v != ""}


def _response_snippet(resp: Response, limit: int = 400) -> str:
    try:
        text = resp.text or ""
    except Exception:
        return "(no body)"
    text = text.strip().replace("\n", " ")
    if len(text) > limit:
        return text[:limit] + "…"
    return text or "(empty)"


def fetch_markets_page(
    session: requests.Session,
    base_url: str,
    page: int,
    per_page: int,
    headers: Optional[Dict[str, str]],
    max_attempts: int,
    sleep_429_sec: float,
) -> List[Dict[str, Any]]:
    """
    Up to `max_attempts` tries for this page. On 429, sleep `sleep_429_sec` (default 5 min) then retry.
    Raises RuntimeError if all attempts fail.
    """
    params = {
        "vs_currency": "usd",
        "order": "market_cap_desc",
        "per_page": per_page,
        "page": page,
        "sparkline": "false",
    }
    url = f"{base_url}/coins/markets"
    req_headers: Dict[str, str] = {"User-Agent": DEFAULT_UA, "Accept": "application/json"}
    if headers:
        req_headers.update(headers)

    last_exc: Optional[BaseException] = None
    last_resp: Optional[Response] = None

    for attempt in range(1, max_attempts + 1):
        try:
            resp = session.get(url, params=params, headers=req_headers, timeout=90)
        except requests.RequestException as exc:
            last_exc = exc
            print(
                f"CoinGecko network error page={page} attempt {attempt}/{max_attempts}: {exc!r}",
                file=sys.stderr,
            )
            if attempt >= max_attempts:
                break
            time.sleep(min(30, 5 * attempt))
            continue

        last_resp = resp

        if resp.status_code == 429:
            ra = resp.headers.get("Retry-After")
            try:
                ra_sec = float(ra)
            except (TypeError, ValueError):
                ra_sec = 0.0
            wait = max(sleep_429_sec, ra_sec)
            print(
                f"CoinGecko 429 rate limit page={page} attempt {attempt}/{max_attempts}"
                + (
                    f"; sleeping {wait:.0f}s before retry"
                    if attempt < max_attempts
                    else " (no retries left)"
                ),
                file=sys.stderr,
            )
            if attempt >= max_attempts:
                break
            time.sleep(wait)
            continue

        if resp.status_code >= 500:
            print(
                f"CoinGecko {resp.status_code} page={page} attempt {attempt}/{max_attempts} — "
                f"{_response_snippet(resp)}",
                file=sys.stderr,
            )
            if attempt >= max_attempts:
                break
            time.sleep(min(60, 10 * attempt))
            continue

        if resp.status_code >= 400:
            raise RuntimeError(
                f"CoinGecko HTTP {resp.status_code} for page={page}: {_response_snippet(resp)}"
            )

        try:
            data = resp.json()
        except ValueError as exc:
            print(
                f"CoinGecko invalid JSON page={page} attempt {attempt}/{max_attempts}: {exc}",
                file=sys.stderr,
            )
            if attempt >= max_attempts:
                raise RuntimeError(
                    f"Invalid JSON for page={page}: {_response_snippet(resp)}"
                ) from exc
            time.sleep(10)
            continue

        return data if isinstance(data, list) else []

    detail = ""
    if last_resp is not None:
        detail = f" last_http={last_resp.status_code} body={_response_snippet(last_resp)}"
    if last_exc is not None:
        detail += f" last_error={last_exc!r}"
    raise RuntimeError(
        f"CoinGecko /coins/markets failed after {max_attempts} attempts (page={page}).{detail}"
    )


def build_bulk_ops(coins: List[Dict[str, Any]]) -> List[UpdateOne]:
    now = datetime.now(timezone.utc)
    ops: List[UpdateOne] = []
    for coin in coins:
        gecko_id = coin.get("id")
        if not gecko_id or not (coin.get("symbol") or "").strip():
            continue
        set_doc = coin_to_update_doc(coin)
        if not set_doc:
            continue
        ops.append(
            UpdateOne(
                {"coingecko_id": gecko_id},
                {
                    "$set": set_doc,
                    "$setOnInsert": {"createAt": now, "favorite_count": 0},
                },
                upsert=True,
            )
        )
    return ops


def chunked(xs: List[UpdateOne], size: int):
    for i in range(0, len(xs), size):
        yield xs[i : i + size]


def write_batch_to_mongo(
    coll: Collection, coins: List[Dict[str, Any]]
) -> Tuple[int, int, int, int]:
    """Returns (matched, modified, upserted, op_count)."""
    ops = build_bulk_ops(coins)
    if not ops:
        return 0, 0, 0, 0
    matched = modified = upserted = 0
    for chunk in chunked(ops, 500):
        result = coll.bulk_write(chunk, ordered=False)
        matched += result.matched_count
        modified += result.modified_count
        upserted += result.upserted_count
    return matched, modified, upserted, len(ops)


def apply_github_actions_free_tier_limits(
    max_pages: int, page_sleep: float, api_key: str
) -> tuple[int, float]:
    """Public CoinGecko + GitHub shared IPs: cap pages and space out calls."""
    if api_key:
        return max_pages, page_sleep
    if os.environ.get("GITHUB_ACTIONS", "").lower() != "true":
        return max_pages, page_sleep
    if os.environ.get("COINGECKO_ALLOW_UNSAFE_FREE_CI", "").strip() == "1":
        print(
            "COINGECKO_ALLOW_UNSAFE_FREE_CI=1: not applying free-CI page cap / min sleep",
            file=sys.stderr,
        )
        return max_pages, page_sleep

    # ~500 top coins at 100/page
    cap = int((os.environ.get("COINGECKO_FREE_CI_MAX_PAGES") or "5").strip() or "5")
    min_sleep = float(
        (os.environ.get("COINGECKO_FREE_CI_MIN_PAGE_SLEEP") or "45").strip() or "45"
    )

    new_pages = min(max_pages, cap)
    if new_pages < max_pages:
        print(
            f"GitHub Actions without COINGECKO_API_KEY: capping MAX_PAGES "
            f"{max_pages} -> {new_pages} (set COINGECKO_API_KEY for a higher cap).",
            file=sys.stderr,
        )

    new_sleep = max(page_sleep, min_sleep)
    if new_sleep > page_sleep:
        print(
            f"GitHub Actions without COINGECKO_API_KEY: raising PAGE_SLEEP_SEC "
            f"{page_sleep} -> {new_sleep}s between successful API batches.",
            file=sys.stderr,
        )

    return new_pages, new_sleep


def main() -> int:
    uri = os.environ.get("MONGODB_URI", "").strip()
    if not uri:
        print("MONGODB_URI is required", file=sys.stderr)
        return 1

    db_name = os.environ.get("MONGODB_DB_NAME", "Crypto_Watch").strip()
    coll_name = os.environ.get("MONGODB_COLLECTION", "assets").strip()
    max_pages = int((os.environ.get("MAX_PAGES") or "20").strip() or "20")
    per_page = int(
        (os.environ.get("COINGECKO_PER_PAGE") or str(DEFAULT_PER_PAGE)).strip()
        or str(DEFAULT_PER_PAGE)
    )
    per_page = max(1, min(per_page, 250))

    page_sleep = float(os.environ.get("PAGE_SLEEP_SEC", "1.2"))
    api_key = os.environ.get("COINGECKO_API_KEY", "").strip()
    max_attempts = int((os.environ.get("COINGECKO_MAX_RETRIES") or "3").strip() or "3")
    max_attempts = max(1, max_attempts)
    sleep_429 = float((os.environ.get("COINGECKO_429_SLEEP_SEC") or "300").strip() or "300")
    initial_delay = float(
        (os.environ.get("COINGECKO_INITIAL_DELAY_SEC") or "0").strip() or "0"
    )

    if api_key:
        base_url = PRO_BASE
        cg_headers = {"x-cg-pro-api-key": api_key}
    else:
        base_url = FREE_BASE
        cg_headers = None

    max_pages, page_sleep = apply_github_actions_free_tier_limits(
        max_pages, page_sleep, api_key
    )

    session = requests.Session()
    total_rows = 0
    total_matched = total_modified = total_upserted = total_ops = 0

    if initial_delay > 0:
        print(f"Initial delay {initial_delay}s before CoinGecko requests…", file=sys.stderr)
        time.sleep(initial_delay)

    client = MongoClient(uri)
    try:
        coll: Collection = client[db_name][coll_name]

        for page in range(1, max_pages + 1):
            try:
                batch = fetch_markets_page(
                    session,
                    base_url,
                    page,
                    per_page,
                    cg_headers,
                    max_attempts,
                    sleep_429,
                )
            except RuntimeError as exc:
                print(f"Aborting job: {exc}", file=sys.stderr)
                return 1

            if not batch:
                print(f"Empty response page={page}; stopping pagination.", file=sys.stderr)
                break

            m, mod, up, n_ops = write_batch_to_mongo(coll, batch)
            total_matched += m
            total_modified += mod
            total_upserted += up
            total_ops += n_ops
            total_rows += len(batch)

            print(
                f"page={page}: wrote {n_ops} upserts "
                f"(matched={m} modified={mod} upserted={up}) from {len(batch)} API rows"
            )

            if len(batch) < per_page:
                break

            if page < max_pages and page_sleep > 0:
                time.sleep(page_sleep)

    finally:
        client.close()

    if total_rows == 0:
        print("No coins returned from CoinGecko", file=sys.stderr)
        return 1

    if total_ops == 0:
        print("No valid upsert operations built", file=sys.stderr)
        return 1

    print(
        f"Done: {total_rows} API rows across pages, {total_ops} upserts "
        f"(matched={total_matched}, modified={total_modified}, upserted={total_upserted})"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
