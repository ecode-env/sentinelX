from sentinelx_backend.libs.tools.vulnerability.parser import parse_nmap_output
from sentinelx_backend.libs.tools.vulnerability.registry import resolve
from sentinelx_backend.libs.tools.vulnerability import dummy_scanner

def run_scan(target: str, tool_name: str = "dummy") -> dict:
    try:
        tool = resolve(tool_name)
        # If the tool is a class, create an instance
        if isinstance(tool, type):
            tool = tool()

        # Run the tool
        if hasattr(tool, "run") and callable(getattr(tool, "run")):
            out = tool.run(target)
        elif callable(tool):
            out = tool(target)
        else:
            return {"ok": False, "error": f"Tool '{tool_name}' is not callable"}

        # Parse output for specific tools
        if tool_name.lower() == "nmap" and isinstance(out, dict) and "output" in out:
            return parse_nmap_output(out["target"], out["output"], tool_name)

        # Default return for other tools
        return {"ok": True, "tool": tool_name, "result": out}

    except KeyError:
        # Fallback if tool not registered
        return {"ok": True, "tool": "dummy_fallback", "result": dummy_scanner.scan(target)}

    except Exception as e:
        return {"ok": False, "error": str(e)}
