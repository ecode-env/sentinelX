# Import submodules to register tools
from .network import nmap, security_headers
from .url import heuristic_url
from .malware import clamav_wrapper
from .dummy import dummy_scanner