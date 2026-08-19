from fastapi import APIRouter, Depends, HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.api.deps import get_current_user, get_database
from app.services.search_service import LegalSearchService

router = APIRouter(prefix='/legal', tags=['legal'])


@router.get('/articles')
async def list_articles(
    search: str | None = None,
    code: str | None = None,
    category: str | None = None,
    db: AsyncIOMotorDatabase = Depends(get_database),
    _: dict = Depends(get_current_user),
):
    service = LegalSearchService(db)
    data = await service.list_articles(search, code, category)
    return {'success': True, 'message': 'Legal articles fetched', 'data': data}


@router.get('/articles/{article_id}')
async def get_article(article_id: str, db: AsyncIOMotorDatabase = Depends(get_database), _: dict = Depends(get_current_user)):
    service = LegalSearchService(db)
    try:
        data = await service.get_article(article_id)
    except ValueError as exc:
        raise HTTPException(status_code=404, detail='Article not found') from exc
    return {'success': True, 'message': 'Legal article fetched', 'data': data}


@router.post('/bookmarks/{article_id}')
async def bookmark_article(
    article_id: str,
    db: AsyncIOMotorDatabase = Depends(get_database),
    user: dict = Depends(get_current_user),
):
    service = LegalSearchService(db)
    data = await service.bookmark(user['id'], article_id)
    return {'success': True, 'message': 'Article bookmarked', 'data': data}
