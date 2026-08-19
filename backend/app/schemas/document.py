from datetime import datetime

from pydantic import BaseModel


class DocumentResponse(BaseModel):
    id: str
    title: str
    owner_id: str
    case_id: str | None = None
    mime_type: str
    size_bytes: int
    version: int
    checksum: str
    created_at: datetime
