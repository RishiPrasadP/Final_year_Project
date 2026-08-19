from datetime import datetime, timezone

from fastapi import HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.schemas.case import CaseCreateRequest, CaseStatus, CaseUpdateRequest
from app.utils.objectid import serialize_doc, to_object_id


class CaseService:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db

    async def create_case(self, payload: CaseCreateRequest) -> dict:
        case_number = f'LIL/{datetime.now(timezone.utc).year}/{int(datetime.now(timezone.utc).timestamp())}'
        doc = {
            'case_number': case_number,
            'title': payload.title,
            'category': payload.category,
            'description': payload.description,
            'client_id': payload.client_id,
            'lawyer_id': payload.lawyer_id,
            'judge_id': None,
            'court': payload.court,
            'state': payload.state,
            'district': payload.district,
            'status': CaseStatus.FILED.value,
            'filing_date': datetime.now(timezone.utc),
            'next_hearing': None,
            'timeline': [
                {
                    'title': 'Complaint Filed',
                    'date': datetime.now(timezone.utc),
                    'description': 'Case filed through LIL portal',
                    'completed': True,
                }
            ],
            'created_at': datetime.now(timezone.utc),
            'updated_at': datetime.now(timezone.utc),
        }
        result = await self.db['cases'].insert_one(doc)
        created = await self.db['cases'].find_one({'_id': result.inserted_id})
        return serialize_doc(created)

    async def list_cases(self, search: str | None, category: str | None, status: str | None) -> list[dict]:
        query: dict = {}
        if search:
            query['$or'] = [
                {'case_number': {'$regex': search, '$options': 'i'}},
                {'title': {'$regex': search, '$options': 'i'}},
            ]
        if category:
            query['category'] = category
        if status:
            query['status'] = status
        cursor = self.db['cases'].find(query).sort('updated_at', -1)
        return [serialize_doc(doc) async for doc in cursor]

    async def get_case(self, case_id: str) -> dict:
        doc = await self.db['cases'].find_one({'_id': to_object_id(case_id)})
        if not doc:
            raise HTTPException(status_code=404, detail='Case not found')
        return serialize_doc(doc)

    async def update_case(self, case_id: str, payload: CaseUpdateRequest) -> dict:
        updates = {k: v for k, v in payload.model_dump(exclude_none=True).items()}
        if not updates:
            return await self.get_case(case_id)
        updates['updated_at'] = datetime.now(timezone.utc)
        await self.db['cases'].update_one({'_id': to_object_id(case_id)}, {'$set': updates})
        return await self.get_case(case_id)
