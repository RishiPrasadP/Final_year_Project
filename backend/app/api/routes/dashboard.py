from fastapi import APIRouter, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.api.deps import get_current_user, get_database, require_roles
from app.models.user import UserRole
from app.services.dashboard_service import DashboardService

router = APIRouter(prefix='/dashboard', tags=['dashboard'])


@router.get('/client')
async def client_dashboard(
    db: AsyncIOMotorDatabase = Depends(get_database),
    user: dict = Depends(require_roles(UserRole.CLIENT)),
):
    service = DashboardService(db)
    data = await service.client_dashboard(user['id'])
    return {'success': True, 'message': 'Client dashboard data fetched', 'data': data}


@router.get('/lawyer')
async def lawyer_dashboard(
    db: AsyncIOMotorDatabase = Depends(get_database),
    user: dict = Depends(require_roles(UserRole.LAWYER)),
):
    service = DashboardService(db)
    data = await service.lawyer_dashboard(user['id'])
    return {'success': True, 'message': 'Lawyer dashboard data fetched', 'data': data}


@router.get('/judge')
async def judge_dashboard(
    db: AsyncIOMotorDatabase = Depends(get_database),
    user: dict = Depends(require_roles(UserRole.JUDGE)),
):
    service = DashboardService(db)
    data = await service.judge_dashboard(user['id'])
    return {'success': True, 'message': 'Judge dashboard data fetched', 'data': data}


@router.get('/admin')
async def admin_dashboard(
    db: AsyncIOMotorDatabase = Depends(get_database),
    _: dict = Depends(require_roles(UserRole.ADMIN)),
):
    service = DashboardService(db)
    data = await service.admin_dashboard()
    return {'success': True, 'message': 'Admin dashboard data fetched', 'data': data}
