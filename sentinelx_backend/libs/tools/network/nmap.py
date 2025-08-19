import subprocess
from sentinelx_backend.config import Config
from sentinelx_backend.libs.tools.network.help.nmap_parser import nmap_text_to_json_complete
from sentinelx_backend.libs.tools.registry import register

@register('nmap', category='network', description='Nmap vulnerability scanner', input_schema='host')
class NmapTool:
    def run(self, target, args=[]):
        if not Config.ENABLE_NMAP:
            return {'ok': False, 'error': 'NMAP disabled by config'}
        try:
            cmd = ['nmap'] + args + [target]
            result = subprocess.run(cmd, capture_output=True, timeout=300)
            return {
                'tool': 'nmap',
                'target': target,
                'ok': True,
                'severity': 'INFO',
                'summary': 'Scan completed',
                'findings': [],
                'raw': nmap_text_to_json_complete(result.stdout.decode())
            }
        except Exception as e:
            print(e)
            return {'ok': False, 'error': str(e)}