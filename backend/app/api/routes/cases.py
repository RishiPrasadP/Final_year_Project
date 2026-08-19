from fastapi import APIRouter, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.api.deps import get_current_user, get_database, require_roles
from app.models.user import UserRole
from app.schemas.case import CaseCreateRequest, CaseUpdateRequest
from app.services.case_service import CaseService

router = APIRouter(prefix='/cases', tags=['cases'])


@router.post('')
async def create_case(
    payload: CaseCreateRequest,
    db: AsyncIOMotorDatabase = Depends(get_database),
    _: dict = Depends(require_roles(UserRole.LAWYER, UserRole.ADMIN)),
):
    service = CaseService(db)
    data = await service.create_case(payload)
    return {'success': True, 'message': 'Case created', 'data': data}


@router.get('')
async def list_cases(
    search: str | None = None,
    category: str | None = None,
    status: str | None = None,
    db: AsyncIOMotorDatabase = Depends(get_database),
    _: dict = Depends(get_current_user),
):
    service = CaseService(db)
    data = await service.list_cases(search, category, status)
    return {'success': True, 'message': 'Cases fetched', 'data': data}


@router.get('/{case_id}')
async def get_case(case_id: str, db: AsyncIOMotorDatabase = Depends(get_database), _: dict = Depends(get_current_user)):
    service = CaseService(db)
    data = await service.get_case(case_id)
    return {'success': True, 'message': 'Case fetched', 'data': data}


@router.patch('/{case_id}')
async def update_case(
    case_id: str,
    payload: CaseUpdateRequest,
    db: AsyncIOMotorDatabase = Depends(get_database),
    _: dict = Depends(require_roles(UserRole.LAWYER, UserRole.JUDGE, UserRole.ADMIN)),
):
    service = CaseService(db)
    data = await service.update_case(case_id, payload)
    return {'success': True, 'message': 'Case updated', 'data': data}


@router.get('/{case_id}/timeline')
async def case_timeline(case_id: str, db: AsyncIOMotorDatabase = Depends(get_database), _: dict = Depends(get_current_user)):
    service = CaseService(db)
    data = await service.get_case(case_id)
    return {'success': True, 'message': 'Case timeline fetched', 'data': data.get('timeline', [])}
