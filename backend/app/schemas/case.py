from datetime import datetime
from enum import StrEnum

from pydantic import BaseModel


class CaseStatus(StrEnum):
    FILED = 'FILED'
    UNDER_REVIEW = 'UNDER_REVIEW'
    INVESTIGATION = 'INVESTIGATION'
    COURT_ASSIGNED = 'COURT_ASSIGNED'
    HEARING_SCHEDULED = 'HEARING_SCHEDULED'
    JUDGMENT_PENDING = 'JUDGMENT_PENDING'
    CLOSED = 'CLOSED'


class TimelineItem(BaseModel):
    title: str
    date: datetime | None = None
    description: str
    completed: bool = False


class CaseCreateRequest(BaseModel):
    title: str
    category: str
    description: str
    client_id: str
    court: str
    state: str
    district: str
    lawyer_id: str | None = None


class CaseUpdateRequest(BaseModel):
    title: str | None = None
    description: str | None = None
    lawyer_id: str | None = None
    status: CaseStatus | None = None
    next_hearing: datetime | None = None


class CaseResponse(BaseModel):
    id: str
    case_number: str
    title: str
    category: str
    description: str
    client_id: str
    lawyer_id: str | None = None
    judge_id: str | None = None
    court: str
    state: str
    district: str
    status: CaseStatus
    filing_date: datetime
    next_hearing: datetime | None = None
    timeline: list[TimelineItem]
