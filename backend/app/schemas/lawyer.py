from pydantic import BaseModel


class LawyerProfileResponse(BaseModel):
    id: str
    user_id: str
    name: str
    specialization: list[str]
    experience_years: int
    court: str
    location: str | None = None
    rating: float = 0
    consultation_fee: float = 0
    verified: bool = False


class ConsultationRequestCreate(BaseModel):
    lawyer_id: str
    case_id: str | None = None
    requested_slot: str
    message: str | None = None


class ConsultationRequestUpdate(BaseModel):
    status: str
