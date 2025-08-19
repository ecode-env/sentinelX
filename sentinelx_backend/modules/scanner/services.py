from sentinelx_backend.libs.tools.registry import get_registered_tools, resolve_tool
# from datetime import datetime

def run_tool(tool_name, target=None, args=[], file_bytes=None, info={}):
    tool = resolve_tool(tool_name)
    if not tool:
        return {'ok': False, 'error': 'Tool not found'}

    if callable(tool):
        if file_bytes is not None:
            return tool(file_bytes)
        elif target:
            return tool(target, args=args)
        else:
            return tool(info)
    else:  # Assume class
        instance = tool()
        if file_bytes is not None:
            return instance.run(file_bytes)
        elif target:
            return instance.run(target, args=args)
        else:
            return instance.run(info)

def get_tools():
    tools = get_registered_tools()
    return [{'name': name, 'category': meta.get('category', 'unknown'),
             'description': meta.get('description', ''),
             'input_schema': meta.get('input', 'unknown')} for name, meta in tools.items()]