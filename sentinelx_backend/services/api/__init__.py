from flask import Flask
from .extensions import db
from sentinelx_backend.config import Config
from sentinelx_backend.modules.scanner import scanner_bp

def create_app() -> Flask:
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)


    app.register_blueprint(scanner_bp, url_prefix="/scanner")

    @app.route("/health")
    def _health():
        return {"status": "ok"}, 200

    return app
