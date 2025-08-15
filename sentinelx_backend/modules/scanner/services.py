from sentinelx_backend.libs.tools.vulnerability.registry import resolve
from sentinelx_backend.libs.tools.vulnerability import dummy_scanner

def run_scan(target: str, tool_name: str = "dummy") -> dict:
    try:
        tool = resolve(tool_name)
        # print(f"[DEBUG] Tool resolved: {tool}")

        # If the tool is a class, create an instance
        if isinstance(tool, type):
            tool = tool()

        if hasattr(tool, "run") and callable(getattr(tool, "run")):
            # print(f"[DEBUG] Using .run() method on {tool}")
            out = tool.run(target)
        elif callable(tool):
            # print(f"[DEBUG] Using tool as callable")
            out = tool(target)
        else:
            # print(f"[DEBUG] Tool is not callable")
            return {"ok": False, "error": f"Tool '{tool_name}' is not callable"}

        # print(f"[DEBUG] Scan output: {out}")
        return {"ok": True, "tool": tool_name, "result": out}

    except KeyError:
        # print(f"[DEBUG] KeyError: Using dummy fallback")
        return {"ok": True, "tool": "dummy_fallback", "result": dummy_scanner.scan(target)}

    except Exception as e:
        # print(f"[DEBUG] Exception: {e}")
        return {"ok": False, "error": str(e)}
