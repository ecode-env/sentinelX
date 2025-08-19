from . import games_bp
from flask import jsonify

@games_bp.route('/', methods=['GET'])
def list_games():
    return jsonify({'games': []})  # Placeholder