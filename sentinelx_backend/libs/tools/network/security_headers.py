import requests
from sentinelx_backend.libs.tools.registry import register

@register('security_headers', category='network', description='Check security headers', input_schema='url')
def run(target, args=[]):
    try:
        resp = requests.get(target)
        headers = dict(resp.headers)
        findings = []
        if 'Content-Security-Policy' not in headers:
            findings.append({
                'id': 'missing_csp',
                'title': 'Missing CSP',
                'severity': 'MEDIUM',
                'description': 'No Content-Security-Policy header',
                'evidence': {}
            })
        # Add more checks
        return {
            'tool': 'security_headers',
            'target': target,
            'ok': len(findings) == 0,
            'severity': 'LOW' if findings else 'INFO',
            'summary': 'Headers checked',
            'findings': findings,
            'raw': headers
        }
    except Exception as e:
        return {'ok': False, 'error': str(e)}