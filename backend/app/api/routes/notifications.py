from fastapi import APIRouter, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.api.deps import get_current_user, get_database
from app.services.notification_service import NotificationService

router = APIRouter(prefix='/notifications', tags=['notifications'])


@router.get('')
async def list_notifications(db: AsyncIOMotorDatabase = Depends(get_database), user: dict = Depends(get_current_user)):
    service = NotificationService(db)
    data = await service.list_notifications(user['id'])
    return {'success': True, 'message': 'Notifications fetched', 'data': data}


@router.patch('/{notification_id}/read')
async def mark_notification_read(
    notification_id: str,
    db: AsyncIOMotorDatabase = Depends(get_database),
    user: dict = Depends(get_current_user),
):
    service = NotificationService(db)
    data = await service.mark_read(user['id'], notification_id)
    return {'success': True, 'message': 'Notification marked as read', 'data': data}


@router.patch('/read-all')
async def mark_all_read(db: AsyncIOMotorDatabase = Depends(get_database), user: dict = Depends(get_current_user)):
    service = NotificationService(db)
    data = await service.mark_all_read(user['id'])
    return {'success': True, 'message': 'All notifications marked as read', 'data': data}
