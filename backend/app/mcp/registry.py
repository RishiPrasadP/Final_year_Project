from app.mcp.client import MCPClient


class MCPRegistry:
    def __init__(self):
        self.client = MCPClient()

    async def execute(self, tool_name: str, payload: dict):
        return await self.client.call_tool(tool_name, payload)


registry = MCPRegistry()
