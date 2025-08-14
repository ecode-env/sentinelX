from flask import Blueprint, request, jsonify
from .services import run_scan

scanner_bp = Blueprint("scanner", __name__)

@scanner_bp.post("/run")
def run_route():
    payload = request.get_json(silent=True) or {}
    target = payload.get("target")
    tool = payload.get("tool", "dummy")
    if not target:
        return jsonify({"error": "target is required"}), 400
    result = run_scan(target, tool)
    return jsonify(result), 200
