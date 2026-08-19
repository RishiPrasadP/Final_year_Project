from pydantic import BaseModel, EmailStr, Field

from app.models.user import UserRole


class ClientRegisterRequest(BaseModel):
    name: str
    mobile: str
    email: EmailStr
    aadhaar_identifier: str = Field(min_length=4, max_length=32)
    address: str
    password: str = Field(min_length=8)


class LawyerRegisterRequest(BaseModel):
    name: str
    bar_council_id: str
    practice_area: str
    experience_years: int = Field(ge=0)
    court: str
    mobile: str
    email: EmailStr
    password: str = Field(min_length=8)


class JudgeRegisterRequest(BaseModel):
    official_id: str
    court: str
    email: EmailStr
    mobile: str
    name: str
    password: str = Field(min_length=8)


class LoginRequest(BaseModel):
    identifier: str
    password: str


class OTPRequest(BaseModel):
    identifier: str
    purpose: str = 'login'


class OTPVerifyRequest(BaseModel):
    identifier: str
    otp: str
    role: UserRole | None = None


class RefreshRequest(BaseModel):
    refresh_token: str


class TokenPair(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = 'bearer'


class AuthUser(BaseModel):
    id: str
    name: str
    email: EmailStr
    mobile: str
    role: UserRole


class AuthResponse(BaseModel):
    user: AuthUser
    tokens: TokenPair
