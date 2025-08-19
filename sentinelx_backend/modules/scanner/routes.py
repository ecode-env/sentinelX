from flask import request, jsonify
from datetime import datetime
from . import scanner_bp
from .services import run_tool, get_tools

@scanner_bp.route('/run', methods=['POST'])
def run_scan():
    if request.is_json:
        data = request.json
    else:
        data = request.form.to_dict()
        if 'file' in request.files:
            data['file_bytes'] = request.files['file'].read()

    if not data.get('consent', False):
        return jsonify({'error': 'Consent required'}), 400

    tool = data.get('tool')
    target = data.get('target')
    input_type = data.get('input_type')
    args = data.get('args', [])
    info = data.get('info', {})

    if 'file_bytes' in data:
        result = run_tool(tool, file_bytes=data['file_bytes'])
    elif input_type == 'file':
        result = run_tool(tool, file_bytes=None)  # Handle accordingly
    elif input_type == 'host' or input_type == 'url':
        result = run_tool(tool, target=target, args=args)
    else:
        result = run_tool(tool, info=info)

    # Log consent (placeholder: print for now)
    print(f"Consent logged: user=anon, timestamp={datetime.now()}, target={target}")

    return jsonify(result)

@scanner_bp.route('/tools', methods=['GET'])
def list_tools():
    return jsonify(get_tools())

# Placeholder for status/result (synchronous for Phase 1)
@scanner_bp.route('/status/<job_id>', methods=['GET'])
def get_status(job_id):
    return jsonify({'status': 'completed', 'note': 'Synchronous in Phase 1'})

@scanner_bp.route('/results/<job_id>', methods=['GET'])
def get_result(job_id):
    return jsonify({'result': 'Placeholder - implement in Phase 2'})