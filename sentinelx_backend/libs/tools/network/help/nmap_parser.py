import re

def nmap_text_to_json_complete(nmap_output: str) -> dict:
    hosts = []

    # Split output by host
    host_blocks = re.split(r"Nmap scan report for ", nmap_output)[1:]

    for block in host_blocks:
        host_data = {}
        lines = block.splitlines()

        # --- Target and IP ---
        target_match = re.match(r"(\S+) \(([\d\.]+)\)", lines[0])
        if target_match:
            host_data['target'] = target_match.group(1)
            host_data['target_ip'] = target_match.group(2)
        else:
            host_data['target'] = lines[0].strip()
            host_data['target_ip'] = None

        # --- Host status ---
        host_status_match = re.search(r"Host is (\w+) \(([\d\.]+)s latency\)", block)
        host_data['host_status'] = host_status_match.group(1) if host_status_match else None
        host_data['latency'] = f"{host_status_match.group(2)}s" if host_status_match else None

        # --- Other addresses ---
        other_addr_match = re.search(r"Other addresses for \S+ \(not scanned\): (.+)", block)
        host_data['other_addresses'] = [addr.strip() for addr in other_addr_match.group(1).split()] if other_addr_match else []

        # --- Closed ports ---
        closed_ports_match = re.search(r"Not shown: (\d+) closed tcp ports", block)
        host_data['closed_ports_count'] = int(closed_ports_match.group(1)) if closed_ports_match else 0

        # --- Open ports (TCP & UDP) ---
        ports_section_match = re.search(r"PORT\s+STATE\s+SERVICE\s*(VERSION)?\n(.+?)(\n\n|$)", block, re.DOTALL)
        open_ports = []
        if ports_section_match:
            ports_lines = ports_section_match.group(2).splitlines()
            for line in ports_lines:
                parts = re.split(r'\s{2,}', line)
                if len(parts) >= 3:
                    port_proto = parts[0].split('/')
                    port = int(port_proto[0])
                    protocol = port_proto[1]
                    state = parts[1]
                    service = parts[2]
                    version = parts[3] if len(parts) > 3 else None
                    open_ports.append({
                        "port": port,
                        "protocol": protocol,
                        "state": state,
                        "service": service,
                        "version": version
                    })
        host_data['open_ports'] = open_ports

        # --- Service Info ---
        service_info_match = re.search(r"Service Info: (.+)", block)
        service_info = {}
        if service_info_match:
            for info in service_info_match.group(1).split(';'):
                key_val = info.strip().split(':', 1)
                if len(key_val) == 2:
                    service_info[key_val[0].strip().lower()] = key_val[1].strip()
        host_data['service_info'] = service_info

        # --- NSE scripts results ---
        nse_matches = re.findall(r"\|\s(.+?):\s(.+)", block)
        nse_results = {match[0].strip(): match[1].strip() for match in nse_matches}
        host_data['nse_scripts'] = nse_results if nse_results else {}

        # --- Traceroute info ---
        traceroute_match = re.search(r"TRACEROUTE \((.*?)\)(.+?)\n\n", block, re.DOTALL)
        traceroute = []
        if traceroute_match:
            tracer_lines = traceroute_match.group(2).splitlines()
            for line in tracer_lines:
                traceroute.append(line.strip())
        host_data['traceroute'] = traceroute

        # --- OS fingerprint ---
        os_match = re.search(r"OS details: (.+)", block)
        host_data['os_fingerprint'] = os_match.group(1).strip() if os_match else None

        # --- Notes ---
        notes = {}
        notes['service_detection'] = "performed" if "Service detection performed" in block else "not performed"
        report_url_match = re.search(r"https://nmap.org/submit/", block)
        if report_url_match:
            notes['report_incorrect_results_url'] = report_url_match.group(0)
        host_data['notes'] = notes

        hosts.append(host_data)

    # --- Scan-level info ---
    scan_info = {}
    version_match = re.search(r"Starting Nmap ([\d\.SVN]+)", nmap_output)
    scan_time_match = re.search(r"at ([\d\-\s:]+ EAT)", nmap_output)
    duration_match = re.search(r"scanned in ([\d\.]+) seconds", nmap_output)
    scan_info['nmap_version'] = version_match.group(1) if version_match else None
    scan_info['scan_time'] = scan_time_match.group(1) if scan_time_match else None
    scan_info['scan_duration_seconds'] = float(duration_match.group(1)) if duration_match else None

    return {
        "scan_info": scan_info,
        "hosts": hosts
    }