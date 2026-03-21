#!/usr/bin/env python3
"""
Fetch CoinGecko /coins/markets (paginated) and upsert into MongoDB `assets` by `coingecko_id`.

Environment:
  MONGODB_URI       — required, MongoDB connection string (include db name or set MONGODB_DB_NAME)
  MONGODB_DB_NAME   — optional, default Crypto_Watch
  MONGODB_COLLECTION — optional, default assets
  MAX_PAGES         — optional, max API pages (250 coins/page), default 20
  PAGE_SLEEP_SEC    — optional, delay between pages, default 1.2
  COINGECKO_API_KEY — optional, Pro API key (uses pro-api.coingecko.com)

Does not overwrite: favorite_count, description, tags, linkUrl, title, category, size.

Legacy rows without `coingecko_id` are untouched until you backfill or remove them.
If you already have duplicate documents for the same coin after syncing, run
`scripts/dedupe_assets_coingecko_id.py` (dry-run first).
"""

from __future__ import annotations

import os
import sys
import time
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional

import requests
from pymongo import MongoClient, UpdateOne
from pymongo.collection import Collection

PER_PAGE = 250
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
    # Drop keys where value is None so we do not null out sparse fields unnecessarily
    return {k: v for k, v in doc.items() if v is not None and v != ""}


def fetch_markets_page(
    session: requests.Session,
    base_url: str,
    page: int,
    headers: Optional[Dict[str, str]],
) -> List[Dict[str, Any]]:
    params = {
        "vs_currency": "usd",
        "order": "market_cap_desc",
        "per_page": PER_PAGE,
        "page": page,
        "sparkline": "false",
    }
    url = f"{base_url}/coins/markets"
    last_exc: Optional[BaseException] = None
    for attempt in range(5):
        try:
            resp = session.get(url, params=params, headers=headers or {}, timeout=60)
        except requests.RequestException as exc:
            last_exc = exc
            time.sleep(min(30, 2 ** attempt))
            continue
        if resp.status_code == 429:
            time.sleep(min(60, 2 ** attempt + 1))
            continue
        if resp.status_code >= 500:
            time.sleep(min(30, 2 ** attempt))
            continue
        resp.raise_for_status()
        data = resp.json()
        return data if isinstance(data, list) else []
    if last_exc:
        raise last_exc
    raise RuntimeError("Failed to fetch markets after retries")


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


def main() -> int:
    uri = os.environ.get("MONGODB_URI", "").strip()
    if not uri:
        print("MONGODB_URI is required", file=sys.stderr)
        return 1

    db_name = os.environ.get("MONGODB_DB_NAME", "Crypto_Watch").strip()
    coll_name = os.environ.get("MONGODB_COLLECTION", "assets").strip()
    max_pages = int((os.environ.get("MAX_PAGES") or "20").strip() or "20")
    page_sleep = float(os.environ.get("PAGE_SLEEP_SEC", "1.2"))
    api_key = os.environ.get("COINGECKO_API_KEY", "").strip()

    if api_key:
        base_url = PRO_BASE
        cg_headers = {"x-cg-pro-api-key": api_key}
    else:
        base_url = FREE_BASE
        cg_headers = None

    session = requests.Session()
    all_coins: List[Dict[str, Any]] = []

    for page in range(1, max_pages + 1):
        batch = fetch_markets_page(session, base_url, page, cg_headers)
        if not batch:
            break
        all_coins.extend(batch)
        if len(batch) < PER_PAGE:
            break
        time.sleep(page_sleep)

    if not all_coins:
        print("No coins returned from CoinGecko", file=sys.stderr)
        return 1

    ops = build_bulk_ops(all_coins)
    if not ops:
        print("No valid upsert operations built", file=sys.stderr)
        return 1

    client = MongoClient(uri)
    try:
        db = client[db_name]
        coll: Collection = db[coll_name]
        total_modified = 0
        total_upserted = 0
        total_matched = 0
        for chunk in chunked(ops, 500):
            result = coll.bulk_write(chunk, ordered=False)
            total_matched += result.matched_count
            total_modified += result.modified_count
            total_upserted += result.upserted_count
            print(
                f"batch: matched={result.matched_count} "
                f"modified={result.modified_count} upserted={result.upserted_count}"
            )
    finally:
        client.close()

    print(
        f"Done: fetched {len(all_coins)} market rows, {len(ops)} upserts "
        f"(matched={total_matched}, modified={total_modified}, upserted={total_upserted})"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
