from config import Config
from modules.scanner.services import run_scan

def main():
    print("Worker starting; NMAP enabled:", Config.ENABLE_NMAP)
    target = input("Target to scan: ").strip()
    tool = input("Tool name (default: dummy): ").strip() or "dummy"
    print("Running:", tool, "on", target)
    res = run_scan(target, tool)
    print("Result:", res)

if __name__ == "__main__":
    main()
