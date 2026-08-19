from bson import ObjectId
from fastapi import HTTPException


def to_object_id(value: str) -> ObjectId:
    if not ObjectId.is_valid(value):
        raise HTTPException(status_code=400, detail='Invalid id format')
    return ObjectId(value)


def serialize_doc(doc: dict) -> dict:
    serialized = dict(doc)
    if '_id' in serialized:
        serialized['id'] = str(serialized.pop('_id'))
    return serialized
