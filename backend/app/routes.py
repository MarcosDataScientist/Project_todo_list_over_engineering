from flask import Flask, render_template


def register(app: Flask) -> None:
    @app.route("/")
    def index():
        return render_template("index.html")

    @app.route("/health")
    def health():
        """Verificação de saúde do serviço
        ---
        tags:
          - Sistema
        summary: Health check
        description: Indica se a API está respondendo.
        responses:
          200:
            description: Serviço disponível
            schema:
              type: object
              properties:
                status:
                  type: string
                  example: ok
        """
        return {"status": "ok"}, 200

    @app.route("/api/v1/status")
    def api_status():
        """Status da API e integrações
        ---
        tags:
          - Sistema
        summary: Status da API
        responses:
          200:
            description: Informações de status
            schema:
              type: object
              properties:
                api:
                  type: string
                supabase_configured:
                  type: boolean
        """
        from .integrations.supabase_client import get_supabase

        sb = get_supabase()
        return {
            "api": "ok",
            "supabase_configured": sb is not None,
        }, 200

    from .routes_auth import register_auth
    from .routes_pessoa import register_pessoa
    from .routes_tarefas import register_tarefas

    register_auth(app)
    register_pessoa(app)
    register_tarefas(app)
