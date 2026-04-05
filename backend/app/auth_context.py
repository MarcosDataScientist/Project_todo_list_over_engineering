"""Validação JWT (Supabase Auth) para rotas protegidas."""

from __future__ import annotations

from flask import jsonify, request

from .integrations.supabase_client import get_supabase


def bearer_token() -> str | None:
    auth_header = request.headers.get("Authorization", "")
    if not auth_header.startswith("Bearer "):
        return None
    token = auth_header.removeprefix("Bearer ").strip()
    return token or None


def auth_user_or_error():
    """Retorna (user, None) ou (None, (body, status_code))."""
    token = bearer_token()
    if not token:
        return None, (jsonify({"error": "token ausente"}), 401)

    sb = get_supabase()
    if sb is None:
        return None, (jsonify({"error": "supabase não configurado no servidor"}), 503)

    try:
        res = sb.auth.get_user(jwt=token)
    except Exception:
        return None, (jsonify({"error": "token inválido ou expirado"}), 401)

    if res is None or res.user is None:
        return None, (jsonify({"error": "token inválido"}), 401)

    return res.user, None
