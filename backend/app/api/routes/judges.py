from fastapi import APIRouter, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.api.deps import get_database, require_roles
from app.models.user import UserRole

router = APIRouter(prefix='/judges', tags=['judges'])


@router.get('/me/assigned-cases')
async def get_assigned_cases(
    db: AsyncIOMotorDatabase = Depends(get_database),
    user: dict = Depends(require_roles(UserRole.JUDGE)),
):
    cursor = db['cases'].find({'judge_id': user['id']}).sort('updated_at', -1)
    data = []
    async for doc in cursor:
        doc['id'] = str(doc.pop('_id'))
        data.append(doc)
    return {'success': True, 'message': 'Assigned cases fetched', 'data': data}
