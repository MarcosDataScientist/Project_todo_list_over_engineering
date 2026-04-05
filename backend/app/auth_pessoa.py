"""Sessão autenticada + cliente Supabase + id da pessoa vinculada ao Auth."""

from flask import jsonify

from .auth_context import auth_user_or_error
from .integrations.supabase_client import get_supabase
from .services.pessoa import get_or_create_pessoa_id


def supabase_pessoa_or_error():
    user, err = auth_user_or_error()
    if err:
        return None, None, err
    sb = get_supabase()
    if sb is None:
        return None, None, (jsonify({"error": "supabase não configurado no servidor"}), 503)
    try:
        pid = get_or_create_pessoa_id(sb, user)
    except Exception as exc:
        return None, None, (jsonify({"error": str(exc)}), 500)
    return sb, pid, None
