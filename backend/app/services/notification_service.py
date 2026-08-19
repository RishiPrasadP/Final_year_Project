from datetime import datetime, timezone

from motor.motor_asyncio import AsyncIOMotorDatabase

from app.utils.objectid import serialize_doc, to_object_id


class NotificationService:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db

    async def list_notifications(self, user_id: str) -> list[dict]:
        cursor = self.db['notifications'].find({'user_id': user_id}).sort('created_at', -1)
        return [serialize_doc(doc) async for doc in cursor]

    async def mark_read(self, user_id: str, notification_id: str) -> dict:
        await self.db['notifications'].update_one(
            {'_id': to_object_id(notification_id), 'user_id': user_id},
            {'$set': {'read': True, 'updated_at': datetime.now(timezone.utc)}},
        )
        doc = await self.db['notifications'].find_one({'_id': to_object_id(notification_id), 'user_id': user_id})
        return serialize_doc(doc) if doc else {}

    async def mark_all_read(self, user_id: str) -> dict:
        result = await self.db['notifications'].update_many(
            {'user_id': user_id, 'read': False},
            {'$set': {'read': True, 'updated_at': datetime.now(timezone.utc)}},
        )
        return {'updated_count': result.modified_count}
