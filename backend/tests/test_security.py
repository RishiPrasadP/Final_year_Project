from app.core.security import TokenType, create_token, decode_token, hash_password, verify_password


def test_password_hashing_and_verify():
    pwd = 'StrongPassword123!'
    hashed = hash_password(pwd)
    assert verify_password(pwd, hashed)


def test_token_roundtrip():
    token = create_token('user-1', 'client', TokenType.ACCESS)
    payload = decode_token(token)
    assert payload['sub'] == 'user-1'
    assert payload['role'] == 'client'
    assert payload['type'] == 'access'
