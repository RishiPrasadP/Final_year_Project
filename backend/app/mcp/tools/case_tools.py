from app.mcp.registry import registry


async def search_cases(payload: dict) -> dict:
    return await registry.execute('search_cases', payload)
