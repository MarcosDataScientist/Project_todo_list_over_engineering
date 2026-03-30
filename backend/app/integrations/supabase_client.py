"""Cliente Supabase — use apenas no backend (nunca exponha a service role no front)."""

from __future__ import annotations

import os
from functools import lru_cache
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from supabase import Client


@lru_cache(maxsize=1)
def _build_client() -> "Client | None":
    url = os.environ.get("SUPABASE_URL", "").strip()
    key = (
        os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "").strip()
        or os.environ.get("SUPABASE_ANON_KEY", "").strip()
    )
    if not url or not key:
        return None
    from supabase import create_client

    return create_client(url, key)


def get_supabase() -> "Client | None":
    """Retorna o cliente Supabase ou None se variáveis não estiverem configuradas."""
    return _build_client()


def reset_supabase_cache() -> None:
    """Útil em testes para limpar o cache do cliente."""
    _build_client.cache_clear()
