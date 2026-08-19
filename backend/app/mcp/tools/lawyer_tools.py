from app.mcp.registry import registry


async def search_lawyers(payload: dict) -> dict:
    return await registry.execute('search_lawyers', payload)
