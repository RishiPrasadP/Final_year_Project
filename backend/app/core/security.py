from datetime import datetime, timedelta, timezone
from enum import StrEnum
from typing import Any

import jwt
from passlib.context import CryptContext

from app.core.config import get_settings


pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')


class TokenType(StrEnum):
    ACCESS = 'access'
    REFRESH = 'refresh'


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(password: str, hashed: str) -> bool:
    return pwd_context.verify(password, hashed)


def create_token(subject: str, role: str, token_type: TokenType) -> str:
    settings = get_settings()
    now = datetime.now(timezone.utc)
    expires_delta = (
        timedelta(minutes=settings.jwt_access_expire_minutes)
        if token_type == TokenType.ACCESS
        else timedelta(days=settings.jwt_refresh_expire_days)
    )
    payload: dict[str, Any] = {
        'sub': subject,
        'role': role,
        'type': token_type.value,
        'iat': int(now.timestamp()),
        'exp': int((now + expires_delta).timestamp()),
    }
    return jwt.encode(payload, settings.jwt_secret_key, algorithm=settings.jwt_algorithm)


def decode_token(token: str) -> dict[str, Any]:
    settings = get_settings()
    return jwt.decode(token, settings.jwt_secret_key, algorithms=[settings.jwt_algorithm])
