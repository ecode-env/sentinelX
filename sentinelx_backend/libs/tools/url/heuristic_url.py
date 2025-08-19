from sentinelx_backend.libs.tools.registry import register
import re

@register('heuristic_url', category='url', description='Heuristic URL check', input_schema='url')
def run(target, args=[]):
    findings = []
    if re.search(r'(login|password|bank)', target, re.I):
        findings.append({
            'id': 'suspicious_keywords',
            'title': 'Suspicious keywords',
            'severity': 'LOW',
            'description': 'URL contains sensitive words',
            'evidence': {'url': target}
        })
    return {
        'tool': 'heuristic_url',
        'target': target,
        'ok': len(findings) == 0,
        'severity': 'INFO' if not findings else 'LOW',
        'summary': 'Heuristic check done',
        'findings': findings
    }