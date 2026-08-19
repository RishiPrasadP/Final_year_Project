from pydantic import BaseModel, EmailStr

from app.models.user import UserRole


class UserProfile(BaseModel):
    id: str
    name: str
    email: EmailStr
    mobile: str
    role: UserRole
    address: str | None = None
    practice_area: str | None = None
    experience_years: int | None = None
    court: str | None = None
    bar_council_id: str | None = None
    official_id: str | None = None


class UserProfileUpdate(BaseModel):
    name: str | None = None
    mobile: str | None = None
    address: str | None = None
