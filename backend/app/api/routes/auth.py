from fastapi import APIRouter, Depends, HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.api.deps import get_current_user, get_database, oauth2_scheme
from app.core.security import TokenType, create_token, decode_token
from app.schemas.auth import (
    ClientRegisterRequest,
    JudgeRegisterRequest,
    LawyerRegisterRequest,
    LoginRequest,
    OTPRequest,
    OTPVerifyRequest,
    RefreshRequest,
    TokenPair,
)
from app.services.auth_service import AuthService
from app.services.otp_service import OTPService

router = APIRouter(prefix='/auth', tags=['auth'])


@router.post('/register/client')
async def register_client(payload: ClientRegisterRequest, db: AsyncIOMotorDatabase = Depends(get_database)):
    service = AuthService(db)
    user = await service.register_client(payload)
    return {'success': True, 'message': 'Client registered', 'data': user}


@router.post('/register/lawyer')
async def register_lawyer(payload: LawyerRegisterRequest, db: AsyncIOMotorDatabase = Depends(get_database)):
    service = AuthService(db)
    user = await service.register_lawyer(payload)
    return {'success': True, 'message': 'Lawyer registered', 'data': user}


@router.post('/register/judge')
async def register_judge(payload: JudgeRegisterRequest, db: AsyncIOMotorDatabase = Depends(get_database)):
    service = AuthService(db)
    user = await service.register_judge(payload)
    return {'success': True, 'message': 'Judge registered', 'data': user}


@router.post('/login')
async def login(payload: LoginRequest, db: AsyncIOMotorDatabase = Depends(get_database)):
    service = AuthService(db)
    auth = await service.login(payload)
    return {'success': True, 'message': 'Login successful', 'data': auth.model_dump()}


@router.post('/request-otp')
async def request_otp(payload: OTPRequest, db: AsyncIOMotorDatabase = Depends(get_database)):
    service = OTPService(db)
    res = await service.request_otp(payload.identifier, payload.purpose)
    return {'success': True, 'message': 'OTP requested', 'data': res}


@router.post('/verify-otp')
async def verify_otp(payload: OTPVerifyRequest, db: AsyncIOMotorDatabase = Depends(get_database)):
    otp_service = OTPService(db)
    await otp_service.verify_otp(payload.identifier, payload.otp)
    auth_service = AuthService(db)
    auth = await auth_service.verify_otp_login(payload.identifier)
    return {'success': True, 'message': 'OTP verified', 'data': auth.model_dump()}


@router.post('/refresh')
async def refresh(payload: RefreshRequest):
    decoded = decode_token(payload.refresh_token)
    if decoded.get('type') != 'refresh':
        raise HTTPException(status_code=400, detail='Invalid refresh token')
    access = create_token(decoded['sub'], decoded['role'], TokenType.ACCESS)
    refresh_token = create_token(decoded['sub'], decoded['role'], TokenType.REFRESH)
    tokens = TokenPair(access_token=access, refresh_token=refresh_token)
    return {'success': True, 'message': 'Token refreshed', 'data': tokens.model_dump()}


@router.post('/logout')
async def logout(
    db: AsyncIOMotorDatabase = Depends(get_database),
    user: dict = Depends(get_current_user),
    token: str = Depends(oauth2_scheme),
):
    await db['revoked_tokens'].insert_one({'token': token, 'user_id': user['id']})
    return {'success': True, 'message': 'Logged out', 'data': {'logged_out': True}}
