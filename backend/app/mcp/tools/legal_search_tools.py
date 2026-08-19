from app.mcp.registry import registry


async def search_laws(payload: dict) -> dict:
    return await registry.execute('search_laws', payload)
