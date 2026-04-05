from flask import Flask, jsonify, request

from .auth_context import auth_user_or_error
from .integrations.supabase_client import get_supabase


def register_auth(app: Flask) -> None:
    @app.post("/api/v1/auth/login")
    def auth_login():
        """Login com e-mail e senha (Supabase Auth)
        ---
        tags:
          - Autenticação
        summary: Autenticar usuário
        consumes:
          - application/json
        parameters:
          - in: body
            name: body
            required: true
            schema:
              type: object
              required:
                - email
                - password
              properties:
                email:
                  type: string
                  format: email
                password:
                  type: string
        responses:
          200:
            description: Sessão criada
            schema:
              type: object
              properties:
                access_token:
                  type: string
                refresh_token:
                  type: string
                user:
                  type: object
          400:
            description: Corpo inválido
          401:
            description: Credenciais inválidas
          503:
            description: Supabase não configurado
        """
        body = request.get_json(silent=True) or {}
        email = (body.get("email") or "").strip()
        password = body.get("password") or ""
        if not email or not password:
            return jsonify({"error": "email e password são obrigatórios"}), 400

        sb = get_supabase()
        if sb is None:
            return jsonify({"error": "supabase não configurado no servidor"}), 503

        try:
            res = sb.auth.sign_in_with_password(
                {"email": email, "password": password}
            )
        except Exception:
            return jsonify({"error": "credenciais inválidas ou falha na autenticação"}), 401

        if res.session is None:
            return jsonify({"error": "não foi possível criar sessão"}), 401

        user = res.user
        return (
            jsonify(
                {
                    "access_token": res.session.access_token,
                    "refresh_token": res.session.refresh_token,
                    "user": {
                        "id": str(user.id) if user else None,
                        "email": user.email if user else None,
                    },
                }
            ),
            200,
        )

    @app.get("/api/v1/auth/me")
    def auth_me():
        """Dados do usuário a partir do JWT
        ---
        tags:
          - Autenticação
        summary: Usuário atual
        parameters:
          - in: header
            name: Authorization
            type: string
            required: true
            description: Bearer access_token
        responses:
          200:
            description: Usuário autenticado
          401:
            description: Token ausente ou inválido
          503:
            description: Supabase não configurado
        """
        user, err = auth_user_or_error()
        if err:
            return err
        return jsonify({"user": {"id": str(user.id), "email": user.email}}), 200
