#!/usr/bin/env python3
"""
One-time cleanup: multiple documents with the same `coingecko_id` (keeps one, deletes the rest).

Prefer the document with the highest `market_cap` (or most recent `createAt` as tie-break);
if those are missing, keeps the smallest `_id` (typically oldest insert).

  MONGODB_URI=... python scripts/dedupe_assets_coingecko_id.py --dry-run
  MONGODB_URI=... python scripts/dedupe_assets_coingecko_id.py --execute

Optional: MONGODB_DB_NAME (default Crypto_Watch), MONGODB_COLLECTION (default assets).
"""

from __future__ import annotations

import argparse
import os
import sys
from typing import Any, List

from pymongo import MongoClient
from pymongo.collection import Collection


def pick_keep_id(docs: List[dict]) -> Any:
    def sort_key(d: dict):
        mc = d.get("market_cap")
        mc_val = mc if isinstance(mc, (int, float)) else float("-inf")
        ca = d.get("createAt")
        ca_val = ca if ca is not None else None
        return (mc_val, ca_val, str(d["_id"]))

    return max(docs, key=sort_key)["_id"]


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--execute",
        action="store_true",
        help="Actually delete duplicates (default is dry-run)",
    )
    args = parser.parse_args()
    dry_run = not args.execute

    uri = os.environ.get("MONGODB_URI", "").strip()
    if not uri:
        print("MONGODB_URI is required", file=sys.stderr)
        return 1

    db_name = os.environ.get("MONGODB_DB_NAME", "Crypto_Watch").strip()
    coll_name = os.environ.get("MONGODB_COLLECTION", "assets").strip()

    client = MongoClient(uri)
    try:
        coll: Collection = client[db_name][coll_name]
        pipeline = [
            {
                "$match": {
                    "coingecko_id": {
                        "$exists": True,
                        "$type": "string",
                        "$ne": "",
                    }
                }
            },
            {
                "$group": {
                    "_id": "$coingecko_id",
                    "docs": {"$push": "$$ROOT"},
                    "count": {"$sum": 1},
                }
            },
            {"$match": {"count": {"$gt": 1}}},
        ]
        groups = list(coll.aggregate(pipeline))
        if not groups:
            print("No duplicate coingecko_id groups found.")
            return 0

        to_delete = []
        for g in groups:
            docs = g["docs"]
            keep_id = pick_keep_id(docs)
            for d in docs:
                if d["_id"] != keep_id:
                    to_delete.append(d["_id"])

        print(
            f"Found {len(groups)} duplicate coingecko_id groups; "
            f"{len(to_delete)} documents to remove."
        )
        if dry_run:
            for oid in to_delete[:50]:
                print(f"  dry-run would delete _id={oid}")
            if len(to_delete) > 50:
                print(f"  ... and {len(to_delete) - 50} more")
            print("Re-run with --execute to delete.")
            return 0

        res = coll.delete_many({"_id": {"$in": to_delete}})
        print(f"Deleted {res.deleted_count} documents.")
    finally:
        client.close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
