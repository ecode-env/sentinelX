from sentinelx_backend.libs.tools.registry import register

@register('dummy_scanner', category='dummy', description='Dummy scanner for testing', input_schema='any')
def run(target=None, args=[], file_bytes=None, info={}):
    return {
        'tool': 'dummy_scanner',
        'target': target or 'dummy',
        'ok': True,
        'severity': 'INFO',
        'summary': 'Dummy scan',
        'findings': []
    }