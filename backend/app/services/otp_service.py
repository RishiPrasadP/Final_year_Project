import hashlib
import random
from datetime import datetime, timedelta, timezone

from fastapi import HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.core.config import get_settings


class OTPService:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db
        self.settings = get_settings()

    def _hash_otp(self, otp: str) -> str:
        return hashlib.sha256(otp.encode()).hexdigest()

    def _generate_otp(self) -> str:
        return str(random.randint(100000, 999999))

    async def request_otp(self, identifier: str, purpose: str) -> dict:
        now = datetime.now(timezone.utc)
        recent = await self.db['otp_codes'].find_one({'identifier': identifier, 'purpose': purpose})
        if recent and recent.get('requested_at') and now - recent['requested_at'] < timedelta(seconds=self.settings.otp_request_cooldown_seconds):
            raise HTTPException(status_code=429, detail='OTP requested too frequently')

        otp = self._generate_otp()
        await self.db['otp_codes'].update_one(
            {'identifier': identifier, 'purpose': purpose},
            {
                '$set': {
                    'otp_hash': self._hash_otp(otp),
                    'expires_at': now + timedelta(minutes=self.settings.otp_expire_minutes),
                    'attempts': 0,
                    'requested_at': now,
                }
            },
            upsert=True,
        )

        response = {'success': True, 'message': 'OTP sent successfully'}
        if self.settings.otp_mock_mode:
            response['mock_otp'] = otp
        return response

    async def verify_otp(self, identifier: str, otp: str, purpose: str = 'login') -> bool:
        record = await self.db['otp_codes'].find_one({'identifier': identifier, 'purpose': purpose})
        if not record:
            raise HTTPException(status_code=404, detail='OTP not requested')

        now = datetime.now(timezone.utc)
        if record['expires_at'] < now:
            raise HTTPException(status_code=400, detail='OTP expired')

        if record['attempts'] >= self.settings.otp_max_attempts:
            raise HTTPException(status_code=429, detail='OTP max attempts exceeded')

        if self._hash_otp(otp) != record['otp_hash']:
            await self.db['otp_codes'].update_one({'_id': record['_id']}, {'$inc': {'attempts': 1}})
            raise HTTPException(status_code=400, detail='Invalid OTP')

        await self.db['otp_codes'].delete_one({'_id': record['_id']})
        return True
