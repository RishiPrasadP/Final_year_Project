from typing import Any


class MCPClient:
    async def call_tool(self, tool_name: str, payload: dict[str, Any]) -> dict[str, Any]:
        return {'tool': tool_name, 'payload': payload, 'status': 'mocked'}
