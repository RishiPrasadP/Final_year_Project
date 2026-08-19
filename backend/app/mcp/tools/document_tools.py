from app.mcp.registry import registry


async def search_documents(payload: dict) -> dict:
    return await registry.execute('search_documents', payload)
