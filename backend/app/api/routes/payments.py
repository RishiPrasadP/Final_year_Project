from fastapi import APIRouter, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.api.deps import get_current_user, get_database
from app.schemas.payment import PaymentCreateRequest
from app.services.payment_service import PaymentService

router = APIRouter(prefix='/payments', tags=['payments'])


@router.post('')
async def create_payment(
    payload: PaymentCreateRequest,
    db: AsyncIOMotorDatabase = Depends(get_database),
    user: dict = Depends(get_current_user),
):
    service = PaymentService(db)
    data = await service.create_payment(user['id'], payload)
    return {'success': True, 'message': 'Payment created', 'data': data}
