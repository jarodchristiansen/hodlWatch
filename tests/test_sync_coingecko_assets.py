"""Tests for scripts/sync_coingecko_assets.py (add scripts/ to PYTHONPATH or run from repo root with pytest config)."""

from __future__ import annotations

import sys
from pathlib import Path
from unittest import mock

import pytest

_SCRIPTS = Path(__file__).resolve().parents[1] / "scripts"
if str(_SCRIPTS) not in sys.path:
    sys.path.insert(0, str(_SCRIPTS))

import sync_coingecko_assets as sca


def test_read_sync_config_from_env_missing_uri(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.delenv("MONGODB_URI", raising=False)
    assert sca.read_sync_config_from_env() is None


def test_read_sync_config_from_env_minimal(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setenv("MONGODB_URI", "mongodb://localhost:27017/test")
    monkeypatch.delenv("COINGECKO_API_KEY", raising=False)
    monkeypatch.delenv("GITHUB_ACTIONS", raising=False)
    cfg = sca.read_sync_config_from_env()
    assert cfg is not None
    assert cfg.mongodb_uri == "mongodb://localhost:27017/test"
    assert cfg.base_url == sca.FREE_BASE
    assert cfg.cg_headers is None


def test_fetch_markets_page_success() -> None:
    session = mock.Mock()
    resp = mock.Mock()
    resp.status_code = 200
    resp.json.return_value = [{"id": "bitcoin", "symbol": "btc"}]
    session.get.return_value = resp

    out = sca.fetch_markets_page(
        session, sca.FREE_BASE, 1, 10, None, max_attempts=2, sleep_429_sec=0.01
    )
    assert out == [{"id": "bitcoin", "symbol": "btc"}]
    session.get.assert_called_once()


def test_fetch_markets_page_retries_then_succeeds() -> None:
    session = mock.Mock()
    bad = mock.Mock(status_code=500)
    bad.text = ""
    good = mock.Mock(status_code=200)
    good.json.return_value = [{"id": "eth"}]
    session.get.side_effect = [bad, good]

    with mock.patch.object(sca.time, "sleep"):
        out = sca.fetch_markets_page(
            session, sca.FREE_BASE, 1, 10, None, max_attempts=3, sleep_429_sec=0.01
        )
    assert out == [{"id": "eth"}]
    assert session.get.call_count == 2


def test_upsert_filter_uses_regex_constants() -> None:
    flt = sca.upsert_filter_for_coin("bitcoin", "btc", "Bitcoin")
    assert sca.MONGO_KEY_REGEX in str(flt)
    assert sca.MONGO_KEY_OPTIONS in str(flt)
