import os
from pathlib import Path

from dotenv import load_dotenv
from flasgger import Swagger
from flask import Flask
from flask_cors import CORS

_backend_root = Path(__file__).resolve().parent.parent
load_dotenv(_backend_root / ".env")


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY=os.environ.get("SECRET_KEY", "dev-change-me"),
    )
    if test_config:
        app.config.from_mapping(test_config)

    _configure_cors(app)

    from . import routes

    routes.register(app)
    _configure_swagger(app)

    return app


def _configure_cors(app: Flask) -> None:
    origins = [
        o.strip()
        for o in os.environ.get(
            "CORS_ORIGINS",
            "http://127.0.0.1:5173,http://localhost:5173",
        ).split(",")
        if o.strip()
    ]
    CORS(
        app,
        resources={
            r"/api/*": {"origins": origins},
            r"/apispec.json": {"origins": origins},
        },
        supports_credentials=True,
    )


def _configure_swagger(app: Flask) -> None:
    if os.environ.get("SKIP_SWAGGER") == "1":
        return

    if "flasgger" in app.extensions or "flasgger" in app.blueprints:
        return

    app.config["SWAGGER"] = {
        "title": "Todo List API",
        "version": "1.0.0",
        "description": "API REST do projeto (disciplina de Engenharia de Software). "
        "Documentação interativa via Swagger UI.",
        "termsOfService": "",
        "contact": {"name": "Equipe do projeto"},
        "specs": [
            {
                "endpoint": "apispec",
                "route": "/apispec.json",
                "rule_filter": lambda rule: True,  # all in
                "model_filter": lambda tag: True,  # all in
            }
        ],
        "static_url_path": "/flasgger_static",
        "swagger_ui": True,
        "specs_route": "/apidocs/",
    }
    Swagger(app)
