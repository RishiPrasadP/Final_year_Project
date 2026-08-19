from datetime import datetime
from enum import StrEnum

from pydantic import BaseModel


class ComplaintStatus(StrEnum):
    DRAFT = 'DRAFT'
    SUBMITTED = 'SUBMITTED'
    UNDER_REVIEW = 'UNDER_REVIEW'
    ACCEPTED = 'ACCEPTED'
    REJECTED = 'REJECTED'
    CASE_CREATED = 'CASE_CREATED'


class ComplaintCreateRequest(BaseModel):
    title: str
    category: str
    description: str
    incident_date: datetime | None = None
    incident_location: str | None = None
    witness_name: str | None = None
    witness_phone: str | None = None


class ComplaintUpdateRequest(BaseModel):
    title: str | None = None
    category: str | None = None
    description: str | None = None
    incident_date: datetime | None = None
    incident_location: str | None = None
    witness_name: str | None = None
    witness_phone: str | None = None


class ComplaintResponse(BaseModel):
    id: str
    title: str
    category: str
    description: str
    client_id: str
    status: ComplaintStatus
    created_at: datetime
    updated_at: datetime
    linked_case_id: str | None = None
