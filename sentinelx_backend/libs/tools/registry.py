_registry = {}
_meta = {}

def register(name, category='unknown', description='', input_schema='unknown'):
    def decorator(obj):
        _registry[name] = obj
        _meta[name] = {
            'category': category,
            'description': description,
            'input': input_schema
        }
        return obj
    return decorator

def resolve_tool(name):
    return _registry.get(name)

def get_registered_tools():
    return _meta