from typing import Callable

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jwt import InvalidTokenError
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.core.database import get_db
from app.core.security import decode_token
from app.models.user import UserRole
from app.utils.objectid import serialize_doc, to_object_id


oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/api/v1/auth/login')


def get_database() -> AsyncIOMotorDatabase:
    return get_db()


async def get_current_user(
    db: AsyncIOMotorDatabase = Depends(get_database),
    token: str = Depends(oauth2_scheme),
) -> dict:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail='Could not validate credentials',
    )
    try:
        payload = decode_token(token)
        user_id = payload.get('sub')
        token_type = payload.get('type')
        if not user_id or token_type != 'access':
            raise credentials_exception
    except InvalidTokenError as exc:
        raise credentials_exception from exc

    revoked = await db['revoked_tokens'].find_one({'token': token})
    if revoked:
        raise credentials_exception

    user = await db['users'].find_one({'_id': to_object_id(user_id)})
    if not user:
        raise credentials_exception
    return serialize_doc(user)


def require_roles(*roles: UserRole | str) -> Callable:
    role_values = {r.value if isinstance(r, UserRole) else r for r in roles}

    async def checker(user: dict = Depends(get_current_user)) -> dict:
        if user['role'] not in role_values:
            raise HTTPException(status_code=403, detail='Insufficient permissions')
        return user

    return checker
