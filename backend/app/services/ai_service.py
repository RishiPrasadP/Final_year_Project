from app.core.config import get_settings


class AIProvider:
    async def chat(self, message: str) -> tuple[str, list[str]]:
        raise NotImplementedError


class MockAIProvider(AIProvider):
    async def chat(self, message: str) -> tuple[str, list[str]]:
        response = (
            'I can help with legal information, complaint drafting steps, and document guidance. '
            f'You asked: {message}'
        )
        citations = ['BNS 2023', 'BNSS 2023', 'BSA 2023']
        return response, citations


class AIService:
    def __init__(self):
        settings = get_settings()
        self.provider: AIProvider = MockAIProvider()
        if settings.ai_default_provider != 'mock':
            self.provider = MockAIProvider()

    async def chat(self, message: str) -> tuple[str, list[str]]:
        return await self.provider.chat(message)
