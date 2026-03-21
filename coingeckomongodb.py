# -*- coding: utf-8 -*-
"""
Legacy Colab export — do not use. Credentials must never be committed.

Daily sync: GitHub Actions workflow `.github/workflows/coingecko-mongodb-sync.yml`

Run locally:

  pip install -r scripts/requirements-coingecko-sync.txt
  set MONGODB_URI=your_connection_string
  python scripts/sync_coingecko_assets.py

Configure `MONGODB_URI` (and optional `COINGECKO_API_KEY`) via GitHub repository secrets for CI.
"""

raise SystemExit(
    "Use scripts/sync_coingecko_assets.py instead (see coingeckomongodb.py docstring)."
)
