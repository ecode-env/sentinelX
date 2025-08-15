from flask import Blueprint, request, jsonify
from .services import run_scan

scanner_bp = Blueprint("scanner", __name__)

@scanner_bp.post("/run")
def run_route():
    # 1. Get JSON data from user
    payload = request.get_json(silent=True) or {}
    target = payload.get("target")
    tool = payload.get("tool", "dummy")

    # 2. Validate input
    if not target:
        return jsonify({"error": "target is required"}), 400

    # 3. Call your scan service
    # result = run_scan("scanme.nmap.org", "nmap")
    result = run_scan(target, tool)

    # 4. Return result as JSON
    return jsonify(result), 200
