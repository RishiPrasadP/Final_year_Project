from datetime import datetime, timezone

from fastapi import HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.schemas.lawyer import ConsultationRequestCreate
from app.utils.objectid import serialize_doc, to_object_id


class LawyerService:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db

    async def search_lawyers(
        self,
        specialization: str | None,
        location: str | None,
        court: str | None,
        experience: int | None,
        rating: float | None,
        fee: float | None,
    ) -> list[dict]:
        query: dict = {}
        if specialization:
            query['specialization'] = {'$in': [specialization]}
        if location:
            query['location'] = {'$regex': location, '$options': 'i'}
        if court:
            query['court'] = {'$regex': court, '$options': 'i'}
        if experience is not None:
            query['experience_years'] = {'$gte': experience}
        if rating is not None:
            query['rating'] = {'$gte': rating}
        if fee is not None:
            query['consultation_fee'] = {'$lte': fee}

        cursor = self.db['lawyers'].find(query)
        return [serialize_doc(doc) async for doc in cursor]

    async def get_lawyer(self, lawyer_id: str) -> dict:
        doc = await self.db['lawyers'].find_one({'_id': to_object_id(lawyer_id)})
        if not doc:
            raise HTTPException(status_code=404, detail='Lawyer not found')
        return serialize_doc(doc)

    async def create_consultation_request(self, client_id: str, payload: ConsultationRequestCreate) -> dict:
        now = datetime.now(timezone.utc)
        doc = {
            'client_id': client_id,
            'lawyer_id': payload.lawyer_id,
            'case_id': payload.case_id,
            'requested_slot': payload.requested_slot,
            'message': payload.message,
            'status': 'PENDING',
            'created_at': now,
            'updated_at': now,
        }
        result = await self.db['appointments'].insert_one(doc)
        created = await self.db['appointments'].find_one({'_id': result.inserted_id})
        return serialize_doc(created)

    async def update_consultation_request(self, request_id: str, lawyer_id: str, status: str) -> dict:
        req = await self.db['appointments'].find_one({'_id': to_object_id(request_id), 'lawyer_id': lawyer_id})
        if not req:
            raise HTTPException(status_code=404, detail='Consultation request not found')
        if status not in {'ACCEPTED', 'REJECTED'}:
            raise HTTPException(status_code=400, detail='Invalid status')
        await self.db['appointments'].update_one(
            {'_id': req['_id']},
            {'$set': {'status': status, 'updated_at': datetime.now(timezone.utc)}},
        )
        updated = await self.db['appointments'].find_one({'_id': req['_id']})
        return serialize_doc(updated)
