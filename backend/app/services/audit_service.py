from datetime import datetime, timezone

from motor.motor_asyncio import AsyncIOMotorDatabase


class AuditService:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db

    async def log(self, user_id: str | None, action: str, resource: str, result: str, ip: str | None = None) -> None:
        await self.db['audit_logs'].insert_one(
            {
                'user_id': user_id,
                'action': action,
                'resource': resource,
                'result': result,
                'ip': ip,
                'timestamp': datetime.now(timezone.utc),
            }
        )
