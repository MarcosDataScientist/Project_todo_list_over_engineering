import os

from dotenv import load_dotenv
from flasgger import Swagger
from flask import Flask
from flask_cors import CORS

load_dotenv()


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY=os.environ.get("SECRET_KEY", "dev-change-me"),
    )
    if test_config:
        app.config.from_mapping(test_config)

    _configure_cors(app)
    _configure_swagger(app)

    from . import routes

    routes.register(app)

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
    CORS(app, resources={r"/api/*": {"origins": origins}}, supports_credentials=True)


def _configure_swagger(app: Flask) -> None:
    app.config["SWAGGER"] = {
        "title": "Todo List API",
        "version": "1.0.0",
        "description": "API REST do projeto (disciplina de Engenharia de Software). "
        "Documentação interativa via Swagger UI.",
        "termsOfService": "",
        "contact": {"name": "Equipe do projeto"},
    }
    Swagger(app)
