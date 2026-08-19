import os

import pytest

os.environ.setdefault('ENVIRONMENT', 'test')
os.environ.setdefault('MONGODB_URI', 'mongodb://localhost:27017')
os.environ.setdefault('MONGODB_DATABASE', 'lil_test')

from app.main import app
from httpx import ASGITransport, AsyncClient


@pytest.fixture
async def client():
    async with AsyncClient(transport=ASGITransport(app=app, lifespan='off'), base_url='http://test') as ac:
        yield ac
