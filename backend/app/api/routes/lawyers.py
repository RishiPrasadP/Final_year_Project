from fastapi import APIRouter, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.api.deps import get_current_user, get_database, require_roles
from app.models.user import UserRole
from app.schemas.lawyer import ConsultationRequestCreate, ConsultationRequestUpdate
from app.services.lawyer_service import LawyerService

router = APIRouter(prefix='/lawyers', tags=['lawyers'])


@router.get('')
async def list_lawyers(
    specialization: str | None = None,
    location: str | None = None,
    court: str | None = None,
    experience: int | None = None,
    rating: float | None = None,
    fee: float | None = None,
    db: AsyncIOMotorDatabase = Depends(get_database),
    _: dict = Depends(get_current_user),
):
    service = LawyerService(db)
    data = await service.search_lawyers(specialization, location, court, experience, rating, fee)
    return {'success': True, 'message': 'Lawyers fetched', 'data': data}


@router.post('/consultations/requests')
async def create_consultation_request(
    payload: ConsultationRequestCreate,
    db: AsyncIOMotorDatabase = Depends(get_database),
    user: dict = Depends(require_roles(UserRole.CLIENT)),
):
    service = LawyerService(db)
    data = await service.create_consultation_request(user['id'], payload)
    return {'success': True, 'message': 'Consultation request created', 'data': data}


@router.patch('/consultations/requests/{request_id}')
async def update_consultation_request(
    request_id: str,
    payload: ConsultationRequestUpdate,
    db: AsyncIOMotorDatabase = Depends(get_database),
    user: dict = Depends(require_roles(UserRole.LAWYER)),
):
    service = LawyerService(db)
    data = await service.update_consultation_request(request_id, user['id'], payload.status)
    return {'success': True, 'message': 'Consultation request updated', 'data': data}


@router.get('/{lawyer_id}')
async def get_lawyer(lawyer_id: str, db: AsyncIOMotorDatabase = Depends(get_database), _: dict = Depends(get_current_user)):
    service = LawyerService(db)
    data = await service.get_lawyer(lawyer_id)
    return {'success': True, 'message': 'Lawyer profile fetched', 'data': data}
