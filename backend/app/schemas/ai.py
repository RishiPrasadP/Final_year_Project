from pydantic import BaseModel


class AIChatRequest(BaseModel):
    message: str


class AIChatResponse(BaseModel):
    response: str
    citations: list[str] = []
    disclaimer: str = 'AI-generated information is for informational purposes and does not constitute legal advice.'
