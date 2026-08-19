from pydantic import BaseModel


class LegalArticleResponse(BaseModel):
    id: str
    code: str
    section_number: str
    title: str
    summary: str
    full_text: str
    category: str
