from sentinelx_backend.libs.tools.vulnerability.registry import resolve
from sentinelx_backend.libs.tools.vulnerability import dummy_scanner

def run_scan(target: str, tool_name: str = "dummy") -> dict:
    try:
        tool = resolve(tool_name)
        if hasattr(tool, "run") and callable(getattr(tool, "run")):
            out = tool.run(target)
        elif callable(tool):
            out = tool(target)
        else:
            return {"ok": False, "error": f"Tool '{tool_name}' is not callable"}
        return {"ok": True, "tool": tool_name, "result": out}
    except KeyError:
        return {"ok": True, "tool": "dummy_fallback", "result": dummy_scanner.scan(target)}
    except Exception as e:
        return {"ok": False, "error": str(e)}
