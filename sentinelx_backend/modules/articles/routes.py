from flask import jsonify
from . import articles_bp

@articles_bp.route("/", methods=["GET"])
def list_articles():
    return jsonify({'articles': []})  # Placeholder