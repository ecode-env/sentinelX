import pytest
from sentinelx_backend.services.api import create_app

@pytest.fixture
def client():
    app = create_app()
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_get_tools(client):
    rv = client.get('/scanner/tools')
    assert rv.status_code == 200
    data = rv.get_json()
    assert len(data) >= 5  # At least the 5 tools

def test_run_heuristic_url(client):
    data = {'target': 'http://example.com/login', 'tool': 'heuristic_url', 'input_type': 'url', 'consent': True}
    rv = client.post('/scanner/run', json=data)
    assert rv.status_code == 200
    result = rv.get_json()
    assert result['tool'] == 'heuristic_url'
    assert len(result['findings']) > 0

def test_run_security_headers(client):
    data = {'target': 'https://example.com', 'tool': 'security_headers', 'input_type': 'url', 'consent': True}
    rv = client.post('/scanner/run', json=data)
    assert rv.status_code == 200
    result = rv.get_json()
    assert result['tool'] == 'security_headers'

def test_clamav_disabled(client):
    from io import BytesIO
    data = {'tool': 'clamav', 'input_type': 'file', 'consent': True}
    files = {'file': ('test.txt', BytesIO(b'hello'))}
    rv = client.post('/scanner/run', data=data, files=files, content_type='multipart/form-data')
    assert rv.status_code == 200
    result = rv.get_json()
    assert not result['ok']
    assert 'disabled' in result['error']