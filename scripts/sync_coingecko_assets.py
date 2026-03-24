#!/usr/bin/env python3
"""
Fetch CoinGecko /coins/markets in small pages, upsert each page into MongoDB before the next API call.

Environment:
  MONGODB_URI       — required, MongoDB connection string (include db name or set MONGODB_DB_NAME)
  MONGODB_DB_NAME   — optional, default Crypto_Watch
  MONGODB_COLLECTION — optional, default assets
  MAX_PAGES         — optional, max API pages, default 20
  COINGECKO_PER_PAGE — optional, rows per request (max 250); default 100 on GITHUB_ACTIONS without API key, else 250
  PAGE_SLEEP_SEC    — optional, delay after a successful write before next API call, default 1.2
  COINGECKO_API_KEY — optional, Pro API key (uses pro-api.coingecko.com)
  COINGECKO_MAX_RETRIES — optional, max attempts per page (429/5xx/network each consume one), default 3
  COINGECKO_429_SLEEP_SEC — optional, wait after HTTP 429 before retrying, default 300 (5 min)
  COINGECKO_INITIAL_DELAY_SEC — optional, sleep before first request, default 0
  COINGECKO_FREE_CI_MAX_PAGES — optional, when GITHUB_ACTIONS + no API key: cap MAX_PAGES (default 3)
  COINGECKO_FREE_CI_MIN_PAGE_SLEEP — optional, when GITHUB_ACTIONS + no API key: min PAGE_SLEEP_SEC (default 45)
  COINGECKO_ALLOW_UNSAFE_FREE_CI — set to "1" to skip the GitHub/free-tier caps

Does not overwrite: favorite_count, description, tags, linkUrl, title, category, size.

Tests: pip install -r scripts/requirements-coingecko-sync-dev.txt && npm run test:python
(or pytest tests/test_sync_coingecko_assets.py from the hodlwatch-updated directory).
"""

from __future__ import annotations

import os
import re
import sys
import time
from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional, Tuple

import requests
from requests import Response
from pymongo import MongoClient, UpdateOne
from pymongo.collection import Collection

DEFAULT_UA = (
    "HodlWatch-CoinGeckoSync/1.0 (+https://github.com; automated daily asset metadata sync)"
)

DEFAULT_PER_PAGE_FREE_CI = 100
DEFAULT_PER_PAGE_NORMAL = 250
FREE_BASE = "https://api.coingecko.com/api/v3"
PRO_BASE = "https://pro-api.coingecko.com/api/v3"

MONGO_KEY_REGEX = "$regex"
MONGO_KEY_OPTIONS = "$options"


def upsert_filter_for_coin(gecko_id: str, symbol: str, name: str) -> Dict[str, Any]:
    """
    Match canonical row by coingecko_id, or legacy rows without coingecko_id
    with same symbol (+ name when present) so we update instead of inserting duplicates.
    """
    sym = symbol.strip()
    sym_pat = f"^{re.escape(sym)}$"
    legacy_no_id: Dict[str, Any] = {
        "$or": [
            {"coingecko_id": {"$exists": False}},
            {"coingecko_id": ""},
            {"coingecko_id": None},
        ]
    }
    legacy_match: List[Dict[str, Any]] = [
        legacy_no_id,
        {"symbol": {MONGO_KEY_REGEX: sym_pat, MONGO_KEY_OPTIONS: "i"}},
    ]
    name_stripped = (name or "").strip()
    if name_stripped:
        name_pat = f"^{re.escape(name_stripped)}$"
        legacy_match.append(
            {"name": {MONGO_KEY_REGEX: name_pat, MONGO_KEY_OPTIONS: "i"}}
        )

    return {"$or": [{"coingecko_id": gecko_id}, {"$and": legacy_match}]}


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


def _markets_request_headers(extra: Optional[Dict[str, str]]) -> Dict[str, str]:
    req_headers: Dict[str, str] = {
        "User-Agent": DEFAULT_UA,
        "Accept": "application/json",
    }
    if extra:
        req_headers.update(extra)
    return req_headers


def _markets_query_params(page: int, per_page: int) -> Dict[str, Any]:
    return {
        "vs_currency": "usd",
        "order": "market_cap_desc",
        "per_page": per_page,
        "page": page,
        "sparkline": "false",
    }


def _retry_after_header_seconds(resp: Response) -> float:
    ra = resp.headers.get("Retry-After")
    try:
        return float(ra)
    except (TypeError, ValueError):
        return 0.0


def _handle_network_error_on_page(
    page: int, attempt: int, max_attempts: int, exc: BaseException
) -> bool:
    """Log and sleep; return True if another attempt should run."""
    print(
        f"CoinGecko network error page={page} attempt {attempt}/{max_attempts}: {exc!r}",
        file=sys.stderr,
    )
    if attempt >= max_attempts:
        return False
    time.sleep(min(30, 5 * attempt))
    return True


def _handle_429_on_page(
    page: int,
    attempt: int,
    max_attempts: int,
    resp: Response,
    sleep_429_sec: float,
) -> bool:
    """Log, sleep on rate limit; return True if caller should retry."""
    wait = max(sleep_429_sec, _retry_after_header_seconds(resp))
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
        return False
    time.sleep(wait)
    return True


def _handle_server_error_on_page(
    page: int, attempt: int, max_attempts: int, resp: Response
) -> bool:
    print(
        f"CoinGecko {resp.status_code} page={page} attempt {attempt}/{max_attempts} — "
        f"{_response_snippet(resp)}",
        file=sys.stderr,
    )
    if attempt >= max_attempts:
        return False
    time.sleep(min(60, 10 * attempt))
    return True


def _decode_markets_json_or_retry(
    resp: Response, page: int, attempt: int, max_attempts: int
) -> Tuple[Optional[List[Dict[str, Any]]], bool]:
    """
    Parse JSON list from response. On invalid JSON, optionally sleep and signal retry.
    Returns (result, should_continue_loop).
    """
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
        return None, True
    return (data if isinstance(data, list) else []), False


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
    params = _markets_query_params(page, per_page)
    url = f"{base_url}/coins/markets"
    req_headers = _markets_request_headers(headers)

    last_exc: Optional[BaseException] = None
    last_resp: Optional[Response] = None

    for attempt in range(1, max_attempts + 1):
        try:
            resp = session.get(url, params=params, headers=req_headers, timeout=90)
        except requests.RequestException as exc:
            last_exc = exc
            if not _handle_network_error_on_page(page, attempt, max_attempts, exc):
                break
            continue

        last_resp = resp

        if resp.status_code == 429:
            if not _handle_429_on_page(
                page, attempt, max_attempts, resp, sleep_429_sec
            ):
                break
            continue

        if resp.status_code >= 500:
            if not _handle_server_error_on_page(page, attempt, max_attempts, resp):
                break
            continue

        if resp.status_code >= 400:
            raise RuntimeError(
                f"CoinGecko HTTP {resp.status_code} for page={page}: {_response_snippet(resp)}"
            )

        parsed, should_retry = _decode_markets_json_or_retry(
            resp, page, attempt, max_attempts
        )
        if should_retry:
            continue
        return parsed or []

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
        sym = (coin.get("symbol") or "").strip()
        if not gecko_id or not sym:
            continue
        set_doc = coin_to_update_doc(coin)
        if not set_doc:
            continue
        nm = (coin.get("name") or "").strip()
        flt = upsert_filter_for_coin(gecko_id, sym, nm)
        ops.append(
            UpdateOne(
                flt,
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


def prune_batch_duplicates(
    coll: Collection, coins: List[Dict[str, Any]]
) -> Tuple[int, int]:
    """
    After upserts: remove extra docs sharing the same coingecko_id, then legacy rows
    (no coingecko_id) matching the same symbol+name as this batch.
    Returns (deleted_same_coingecko_id, deleted_legacy_orphans).
    """
    dup_del = 0
    seen_gids: set[str] = set()

    for coin in coins:
        gid = coin.get("id")
        if not gid or gid in seen_gids:
            continue
        seen_gids.add(gid)
        docs = list(
            coll.find({"coingecko_id": gid}, {"_id": 1, "market_cap": 1}).sort(
                "market_cap", -1
            )
        )
        if len(docs) <= 1:
            continue
        keep_id = docs[0]["_id"]
        res = coll.delete_many({"coingecko_id": gid, "_id": {"$ne": keep_id}})
        dup_del += res.deleted_count

    leg_del = 0
    for coin in coins:
        sym = (coin.get("symbol") or "").strip()
        if not sym:
            continue
        sym_pat = f"^{re.escape(sym)}$"
        orphan_q: Dict[str, Any] = {
            "symbol": {MONGO_KEY_REGEX: sym_pat, MONGO_KEY_OPTIONS: "i"},
            "$or": [
                {"coingecko_id": {"$exists": False}},
                {"coingecko_id": ""},
                {"coingecko_id": None},
            ],
        }
        name = (coin.get("name") or "").strip()
        if name:
            name_pat = f"^{re.escape(name)}$"
            orphan_q["name"] = {MONGO_KEY_REGEX: name_pat, MONGO_KEY_OPTIONS: "i"}
        res = coll.delete_many(orphan_q)
        leg_del += res.deleted_count

    return dup_del, leg_del


def write_batch_to_mongo(
    coll: Collection, coins: List[Dict[str, Any]]
) -> Tuple[int, int, int, int, int, int]:
    """Returns (matched, modified, upserted, op_count, pruned_coingecko_dupes, pruned_legacy)."""
    ops = build_bulk_ops(coins)
    if not ops:
        return 0, 0, 0, 0, 0, 0
    matched = modified = upserted = 0
    for chunk in chunked(ops, 500):
        result = coll.bulk_write(chunk, ordered=False)
        matched += result.matched_count
        modified += result.modified_count
        upserted += result.upserted_count

    pr_dup, pr_leg = prune_batch_duplicates(coll, coins)
    if pr_dup or pr_leg:
        print(
            f"  pruned extra docs: coingecko_id_dupes={pr_dup} legacy_orphans={pr_leg}",
            file=sys.stderr,
        )

    return matched, modified, upserted, len(ops), pr_dup, pr_leg


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

    # ~300 top coins at 100/page (3 pages)
    cap = int((os.environ.get("COINGECKO_FREE_CI_MAX_PAGES") or "3").strip() or "3")
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


@dataclass
class SyncConfig:
    mongodb_uri: str
    db_name: str
    coll_name: str
    max_pages: int
    per_page: int
    page_sleep: float
    max_attempts: int
    sleep_429: float
    initial_delay: float
    base_url: str
    cg_headers: Optional[Dict[str, str]]


@dataclass
class SyncTotals:
    total_rows: int
    total_matched: int
    total_modified: int
    total_upserted: int
    total_ops: int
    total_pr_dup: int
    total_pr_leg: int


def read_sync_config_from_env() -> Optional[SyncConfig]:
    """Build config from environment. Returns None if MONGODB_URI is missing."""
    uri = os.environ.get("MONGODB_URI", "").strip()
    if not uri:
        return None

    db_name = os.environ.get("MONGODB_DB_NAME", "Crypto_Watch").strip()
    coll_name = os.environ.get("MONGODB_COLLECTION", "assets").strip()
    max_pages = int((os.environ.get("MAX_PAGES") or "20").strip() or "20")
    api_key = os.environ.get("COINGECKO_API_KEY", "").strip()
    on_github_free = (
        os.environ.get("GITHUB_ACTIONS", "").lower() == "true" and not api_key
    )
    default_per_page = (
        DEFAULT_PER_PAGE_FREE_CI if on_github_free else DEFAULT_PER_PAGE_NORMAL
    )
    per_page = int(
        (os.environ.get("COINGECKO_PER_PAGE") or str(default_per_page)).strip()
        or str(default_per_page)
    )
    per_page = max(1, min(per_page, 250))

    page_sleep = float(os.environ.get("PAGE_SLEEP_SEC", "1.2"))
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

    return SyncConfig(
        mongodb_uri=uri,
        db_name=db_name,
        coll_name=coll_name,
        max_pages=max_pages,
        per_page=per_page,
        page_sleep=page_sleep,
        max_attempts=max_attempts,
        sleep_429=sleep_429,
        initial_delay=initial_delay,
        base_url=base_url,
        cg_headers=cg_headers,
    )


def run_sync_pagination(
    coll: Collection,
    session: requests.Session,
    cfg: SyncConfig,
) -> Tuple[SyncTotals, Optional[int]]:
    """
    Fetch pages and write to Mongo. Returns (totals, early_exit_code).
    early_exit_code is 1 on fetch RuntimeError, else None.
    """
    totals = SyncTotals(0, 0, 0, 0, 0, 0, 0)

    for page in range(1, cfg.max_pages + 1):
        try:
            batch = fetch_markets_page(
                session,
                cfg.base_url,
                page,
                cfg.per_page,
                cfg.cg_headers,
                cfg.max_attempts,
                cfg.sleep_429,
            )
        except RuntimeError as exc:
            print(f"Aborting job: {exc}", file=sys.stderr)
            return totals, 1

        if not batch:
            print(f"Empty response page={page}; stopping pagination.", file=sys.stderr)
            break

        m, mod, up, n_ops, pr_d, pr_l = write_batch_to_mongo(coll, batch)
        totals.total_matched += m
        totals.total_modified += mod
        totals.total_upserted += up
        totals.total_ops += n_ops
        totals.total_pr_dup += pr_d
        totals.total_pr_leg += pr_l
        totals.total_rows += len(batch)

        print(
            f"page={page}: wrote {n_ops} upserts "
            f"(matched={m} modified={mod} upserted={up}) from {len(batch)} API rows"
            + (f"; pruned d={pr_d} leg={pr_l}" if (pr_d or pr_l) else "")
        )

        if len(batch) < cfg.per_page:
            break

        if page < cfg.max_pages and cfg.page_sleep > 0:
            time.sleep(cfg.page_sleep)

    return totals, None


def main() -> int:
    cfg = read_sync_config_from_env()
    if cfg is None:
        print("MONGODB_URI is required", file=sys.stderr)
        return 1

    session = requests.Session()

    if cfg.initial_delay > 0:
        print(
            f"Initial delay {cfg.initial_delay}s before CoinGecko requests…",
            file=sys.stderr,
        )
        time.sleep(cfg.initial_delay)

    client = MongoClient(cfg.mongodb_uri)
    try:
        coll: Collection = client[cfg.db_name][cfg.coll_name]
        totals, err = run_sync_pagination(coll, session, cfg)
        if err is not None:
            return err
    finally:
        client.close()

    if totals.total_rows == 0:
        print("No coins returned from CoinGecko", file=sys.stderr)
        return 1

    if totals.total_ops == 0:
        print("No valid upsert operations built", file=sys.stderr)
        return 1

    print(
        f"Done: {totals.total_rows} API rows across pages, {totals.total_ops} upserts "
        f"(matched={totals.total_matched}, modified={totals.total_modified}, upserted={totals.total_upserted})"
        + (
            f"; total pruned coingecko_dupes={totals.total_pr_dup} legacy_orphans={totals.total_pr_leg}"
            if (totals.total_pr_dup or totals.total_pr_leg)
            else ""
        )
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
