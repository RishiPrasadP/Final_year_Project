from fastapi import HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.core.security import TokenType, create_token, hash_password, verify_password
from app.models.user import UserRole
from app.schemas.auth import (
    AuthResponse,
    AuthUser,
    ClientRegisterRequest,
    JudgeRegisterRequest,
    LawyerRegisterRequest,
    LoginRequest,
    TokenPair,
)
from app.services.otp_service import OTPService
from app.utils.objectid import serialize_doc


class AuthService:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db
        self.otp_service = OTPService(db)

    async def _create_user(self, payload: dict) -> dict:
        existing = await self.db['users'].find_one({'$or': [{'email': payload['email']}, {'mobile': payload['mobile']}]})
        if existing:
            raise HTTPException(status_code=409, detail='User already exists')
        result = await self.db['users'].insert_one(payload)
        created = await self.db['users'].find_one({'_id': result.inserted_id})
        return serialize_doc(created)

    async def register_client(self, req: ClientRegisterRequest) -> dict:
        masked = f'XXXX-XXXX-{req.aadhaar_identifier[-4:]}'
        return await self._create_user(
            {
                'name': req.name,
                'email': req.email,
                'mobile': req.mobile,
                'role': UserRole.CLIENT.value,
                'address': req.address,
                'aadhaar_masked': masked,
                'password_hash': hash_password(req.password),
            }
        )

    async def register_lawyer(self, req: LawyerRegisterRequest) -> dict:
        user = await self._create_user(
            {
                'name': req.name,
                'email': req.email,
                'mobile': req.mobile,
                'role': UserRole.LAWYER.value,
                'practice_area': req.practice_area,
                'experience_years': req.experience_years,
                'court': req.court,
                'password_hash': hash_password(req.password),
            }
        )
        await self.db['lawyers'].update_one(
            {'user_id': user['id']},
            {
                '$set': {
                    'user_id': user['id'],
                    'bar_council_id': req.bar_council_id,
                    'specialization': [req.practice_area],
                    'experience_years': req.experience_years,
                    'court': req.court,
                    'verified': False,
                    'rating': 0,
                    'consultation_fee': 0,
                }
            },
            upsert=True,
        )
        return user

    async def register_judge(self, req: JudgeRegisterRequest) -> dict:
        return await self._create_user(
            {
                'name': req.name,
                'email': req.email,
                'mobile': req.mobile,
                'role': UserRole.JUDGE.value,
                'official_id': req.official_id,
                'court': req.court,
                'password_hash': hash_password(req.password),
            }
        )

    def _to_auth_response(self, user: dict) -> AuthResponse:
        auth_user = AuthUser(
            id=user['id'],
            name=user['name'],
            email=user['email'],
            mobile=user['mobile'],
            role=UserRole(user['role']),
        )
        tokens = TokenPair(
            access_token=create_token(user['id'], user['role'], TokenType.ACCESS),
            refresh_token=create_token(user['id'], user['role'], TokenType.REFRESH),
        )
        return AuthResponse(user=auth_user, tokens=tokens)

    async def login(self, req: LoginRequest) -> AuthResponse:
        user_doc = await self.db['users'].find_one({'$or': [{'email': req.identifier}, {'mobile': req.identifier}]})
        if not user_doc:
            raise HTTPException(status_code=401, detail='Invalid credentials')
        user = serialize_doc(user_doc)
        if not verify_password(req.password, user_doc['password_hash']):
            raise HTTPException(status_code=401, detail='Invalid credentials')
        return self._to_auth_response(user)

    async def verify_otp_login(self, identifier: str) -> AuthResponse:
        user_doc = await self.db['users'].find_one({'$or': [{'email': identifier}, {'mobile': identifier}]})
        if not user_doc:
            raise HTTPException(status_code=404, detail='User not found')
        user = serialize_doc(user_doc)
        return self._to_auth_response(user)
