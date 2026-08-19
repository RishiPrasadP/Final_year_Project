from functools import lru_cache
from typing import Literal

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file='.env', env_file_encoding='utf-8', extra='ignore')

    app_name: str = 'LIL Backend'
    environment: Literal['development', 'staging', 'production', 'test'] = 'development'
    debug: bool = True
    api_v1_prefix: str = '/api/v1'

    frontend_url: str = 'http://localhost:5173'

    mongodb_uri: str = 'mongodb://localhost:27017'
    mongodb_database: str = 'lil'

    redis_url: str | None = None

    jwt_secret_key: str = Field(default='change-this-secret-key', min_length=16)
    jwt_access_expire_minutes: int = 30
    jwt_refresh_expire_days: int = 7
    jwt_algorithm: str = 'HS256'

    otp_expire_minutes: int = 10
    otp_max_attempts: int = 5
    otp_request_cooldown_seconds: int = 30
    otp_mock_mode: bool = True

    max_upload_size_mb: int = 50
    allowed_upload_mime_types: list[str] = [
        'application/pdf',
        'image/jpeg',
        'image/png',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ]

    openai_api_key: str | None = None
    ai_default_provider: str = 'mock'

    storage_provider: Literal['gridfs', 's3'] = 'gridfs'


@lru_cache
def get_settings() -> Settings:
    return Settings()
