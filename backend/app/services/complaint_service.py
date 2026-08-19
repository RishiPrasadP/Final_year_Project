from datetime import datetime, timezone

from fastapi import HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.schemas.complaint import ComplaintCreateRequest, ComplaintStatus, ComplaintUpdateRequest
from app.utils.objectid import serialize_doc, to_object_id


class ComplaintService:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db

    async def create_complaint(self, user_id: str, payload: ComplaintCreateRequest) -> dict:
        now = datetime.now(timezone.utc)
        doc = {
            **payload.model_dump(),
            'client_id': user_id,
            'status': ComplaintStatus.DRAFT.value,
            'created_at': now,
            'updated_at': now,
            'linked_case_id': None,
        }
        result = await self.db['complaints'].insert_one(doc)
        created = await self.db['complaints'].find_one({'_id': result.inserted_id})
        return serialize_doc(created)

    async def update_complaint(self, complaint_id: str, user_id: str, payload: ComplaintUpdateRequest) -> dict:
        complaint = await self.db['complaints'].find_one({'_id': to_object_id(complaint_id), 'client_id': user_id})
        if not complaint:
            raise HTTPException(status_code=404, detail='Complaint not found')
        if complaint['status'] != ComplaintStatus.DRAFT.value:
            raise HTTPException(status_code=400, detail='Only draft complaints can be updated')

        updates = {k: v for k, v in payload.model_dump(exclude_none=True).items()}
        updates['updated_at'] = datetime.now(timezone.utc)
        await self.db['complaints'].update_one({'_id': complaint['_id']}, {'$set': updates})
        updated = await self.db['complaints'].find_one({'_id': complaint['_id']})
        return serialize_doc(updated)

    async def submit_complaint(self, complaint_id: str, user_id: str) -> dict:
        complaint = await self.db['complaints'].find_one({'_id': to_object_id(complaint_id), 'client_id': user_id})
        if not complaint:
            raise HTTPException(status_code=404, detail='Complaint not found')
        await self.db['complaints'].update_one(
            {'_id': complaint['_id']},
            {'$set': {'status': ComplaintStatus.SUBMITTED.value, 'updated_at': datetime.now(timezone.utc)}},
        )
        submitted = await self.db['complaints'].find_one({'_id': complaint['_id']})
        return serialize_doc(submitted)

    async def get_complaint(self, complaint_id: str, user_id: str) -> dict:
        complaint = await self.db['complaints'].find_one({'_id': to_object_id(complaint_id), 'client_id': user_id})
        if not complaint:
            raise HTTPException(status_code=404, detail='Complaint not found')
        return serialize_doc(complaint)

    async def list_my_complaints(self, user_id: str) -> list[dict]:
        cursor = self.db['complaints'].find({'client_id': user_id}).sort('updated_at', -1)
        return [serialize_doc(doc) async for doc in cursor]
