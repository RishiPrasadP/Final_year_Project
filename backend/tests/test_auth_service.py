import pytest

from app.schemas.auth import ClientRegisterRequest, LoginRequest
from app.services.auth_service import AuthService
from tests.fakes import FakeDB


@pytest.mark.asyncio
async def test_auth_register_and_login_flow():
    db = FakeDB()
    service = AuthService(db)

    user = await service.register_client(
        ClientRegisterRequest(
            name='Client One',
            mobile='+919999999999',
            email='client@example.com',
            aadhaar_identifier='123456789012',
            address='Chennai',
            password='StrongPass123',
        )
    )
    assert user['role'] == 'client'
    assert user['aadhaar_masked'].endswith('9012')

    auth = await service.login(LoginRequest(identifier='client@example.com', password='StrongPass123'))
    assert auth.user.email == 'client@example.com'
    assert auth.tokens.access_token
