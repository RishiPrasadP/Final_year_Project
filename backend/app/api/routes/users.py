from fastapi import APIRouter, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.api.deps import get_current_user, get_database
from app.schemas.user import UserProfileUpdate
from app.utils.objectid import serialize_doc, to_object_id

router = APIRouter(prefix='/users', tags=['users'])


@router.get('/me')
async def get_me(user: dict = Depends(get_current_user)):
    return {'success': True, 'message': 'User profile', 'data': user}


@router.patch('/me')
async def update_me(
    payload: UserProfileUpdate,
    db: AsyncIOMotorDatabase = Depends(get_database),
    user: dict = Depends(get_current_user),
):
    updates = {k: v for k, v in payload.model_dump(exclude_none=True).items()}
    if updates:
        await db['users'].update_one({'_id': to_object_id(user['id'])}, {'$set': updates})
    updated = await db['users'].find_one({'_id': to_object_id(user['id'])})
    return {'success': True, 'message': 'Profile updated', 'data': serialize_doc(updated)}
