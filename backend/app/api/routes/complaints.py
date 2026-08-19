from fastapi import APIRouter, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.api.deps import get_current_user, get_database, require_roles
from app.models.user import UserRole
from app.schemas.complaint import ComplaintCreateRequest, ComplaintUpdateRequest
from app.services.complaint_service import ComplaintService

router = APIRouter(prefix='/complaints', tags=['complaints'])


@router.post('')
async def create_complaint(
    payload: ComplaintCreateRequest,
    db: AsyncIOMotorDatabase = Depends(get_database),
    user: dict = Depends(require_roles(UserRole.CLIENT)),
):
    service = ComplaintService(db)
    data = await service.create_complaint(user['id'], payload)
    return {'success': True, 'message': 'Complaint draft created', 'data': data}


@router.patch('/{complaint_id}')
async def update_complaint(
    complaint_id: str,
    payload: ComplaintUpdateRequest,
    db: AsyncIOMotorDatabase = Depends(get_database),
    user: dict = Depends(require_roles(UserRole.CLIENT)),
):
    service = ComplaintService(db)
    data = await service.update_complaint(complaint_id, user['id'], payload)
    return {'success': True, 'message': 'Complaint updated', 'data': data}


@router.post('/{complaint_id}/submit')
async def submit_complaint(
    complaint_id: str,
    db: AsyncIOMotorDatabase = Depends(get_database),
    user: dict = Depends(require_roles(UserRole.CLIENT)),
):
    service = ComplaintService(db)
    data = await service.submit_complaint(complaint_id, user['id'])
    return {'success': True, 'message': 'Complaint submitted', 'data': data}


@router.get('/my')
async def list_my_complaints(
    db: AsyncIOMotorDatabase = Depends(get_database),
    user: dict = Depends(get_current_user),
):
    service = ComplaintService(db)
    data = await service.list_my_complaints(user['id'])
    return {'success': True, 'message': 'Complaints fetched', 'data': data}


@router.get('/{complaint_id}')
async def get_complaint(
    complaint_id: str,
    db: AsyncIOMotorDatabase = Depends(get_database),
    user: dict = Depends(get_current_user),
):
    service = ComplaintService(db)
    data = await service.get_complaint(complaint_id, user['id'])
    return {'success': True, 'message': 'Complaint fetched', 'data': data}
