from motor.motor_asyncio import AsyncIOMotorDatabase

from app.utils.objectid import serialize_doc, to_object_id


class LegalSearchService:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db

    async def list_articles(self, search: str | None, code: str | None, category: str | None) -> list[dict]:
        query: dict = {}
        if search:
            query['$or'] = [
                {'title': {'$regex': search, '$options': 'i'}},
                {'section_number': {'$regex': search, '$options': 'i'}},
                {'summary': {'$regex': search, '$options': 'i'}},
            ]
        if code:
            query['code'] = code
        if category:
            query['category'] = category
        cursor = self.db['legal_documents'].find(query).sort('title', 1)
        return [serialize_doc(doc) async for doc in cursor]

    async def get_article(self, article_id: str) -> dict:
        doc = await self.db['legal_documents'].find_one({'_id': to_object_id(article_id)})
        if not doc:
            raise ValueError('Article not found')
        return serialize_doc(doc)

    async def bookmark(self, user_id: str, article_id: str) -> dict:
        await self.db['users'].update_one({'_id': to_object_id(user_id)}, {'$addToSet': {'bookmarked_articles': article_id}})
        return {'bookmarked': True}
