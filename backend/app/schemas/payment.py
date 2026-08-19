from datetime import datetime
from enum import StrEnum

from pydantic import BaseModel, Field


class PaymentStatus(StrEnum):
    CREATED = 'CREATED'
    PENDING = 'PENDING'
    PAID = 'PAID'
    FAILED = 'FAILED'


class PaymentCreateRequest(BaseModel):
    amount: float = Field(gt=0)
    currency: str = 'INR'
    purpose: str


class PaymentResponse(BaseModel):
    id: str
    payment_id: str
    user_id: str
    amount: float
    currency: str
    purpose: str
    status: PaymentStatus
    created_at: datetime
