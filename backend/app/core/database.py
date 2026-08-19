from typing import Any

from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase, AsyncIOMotorGridFSBucket
from redis.asyncio import Redis

from app.core.config import get_settings


class Database:
    client: AsyncIOMotorClient | None = None
    db: AsyncIOMotorDatabase | None = None
    gridfs_bucket: AsyncIOMotorGridFSBucket | None = None
    redis: Redis | None = None


database = Database()


async def connect_to_mongo() -> None:
    settings = get_settings()
    database.client = AsyncIOMotorClient(settings.mongodb_uri)
    database.db = database.client[settings.mongodb_database]
    database.gridfs_bucket = AsyncIOMotorGridFSBucket(database.db)


async def close_mongo_connection() -> None:
    if database.client:
        database.client.close()


async def connect_to_redis() -> None:
    settings = get_settings()
    if settings.redis_url:
        database.redis = Redis.from_url(settings.redis_url, decode_responses=True)


async def close_redis_connection() -> None:
    if database.redis:
        await database.redis.close()


def get_db() -> AsyncIOMotorDatabase:
    if database.db is None:
        raise RuntimeError('Database not initialized')
    return database.db


def get_gridfs() -> AsyncIOMotorGridFSBucket:
    if database.gridfs_bucket is None:
        raise RuntimeError('GridFS not initialized')
    return database.gridfs_bucket


def get_redis() -> Redis | None:
    return database.redis


async def ensure_indexes() -> None:
    db = get_db()
    await db['users'].create_index('email', unique=True)
    await db['users'].create_index('mobile', unique=True)
    await db['users'].create_index('role')
    await db['lawyers'].create_index('bar_council_id', unique=True)
    await db['cases'].create_index('case_number', unique=True)
    await db['cases'].create_index('client_id')
    await db['cases'].create_index('lawyer_id')
    await db['cases'].create_index('status')
    await db['complaints'].create_index('client_id')
    await db['documents'].create_index('owner_id')
    await db['documents'].create_index('case_id')
    await db['notifications'].create_index('user_id')
    await db['payments'].create_index('user_id')
    await db['audit_logs'].create_index([('timestamp', -1)])
