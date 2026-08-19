from datetime import datetime, timezone
from uuid import uuid4

from motor.motor_asyncio import AsyncIOMotorDatabase

from app.schemas.payment import PaymentCreateRequest, PaymentStatus
from app.utils.objectid import serialize_doc


class PaymentService:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db

    async def create_payment(self, user_id: str, payload: PaymentCreateRequest) -> dict:
        doc = {
            'payment_id': f'pay_{uuid4().hex[:18]}',
            'user_id': user_id,
            'amount': payload.amount,
            'currency': payload.currency,
            'purpose': payload.purpose,
            'status': PaymentStatus.CREATED.value,
            'created_at': datetime.now(timezone.utc),
        }
        result = await self.db['payments'].insert_one(doc)
        created = await self.db['payments'].find_one({'_id': result.inserted_id})
        return serialize_doc(created)
