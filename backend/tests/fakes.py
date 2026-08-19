from __future__ import annotations

import re
from dataclasses import dataclass
from typing import Any

from bson import ObjectId


@dataclass
class InsertOneResult:
    inserted_id: ObjectId


@dataclass
class UpdateResult:
    modified_count: int


class FakeCursor:
    def __init__(self, docs: list[dict[str, Any]]):
        self.docs = docs

    def sort(self, key: str, direction: int):
        reverse = direction == -1
        self.docs.sort(key=lambda x: x.get(key), reverse=reverse)
        return self

    def __aiter__(self):
        self._idx = 0
        return self

    async def __anext__(self):
        if self._idx >= len(self.docs):
            raise StopAsyncIteration
        value = self.docs[self._idx]
        self._idx += 1
        return value


def _match_condition(value: Any, condition: Any) -> bool:
    if isinstance(condition, dict):
        if '$regex' in condition:
            regex = re.compile(condition['$regex'], re.IGNORECASE if condition.get('$options') == 'i' else 0)
            return bool(regex.search(str(value or '')))
        if '$in' in condition:
            if isinstance(value, list):
                return any(v in value for v in condition['$in'])
            return value in condition['$in']
        if '$gte' in condition:
            return value >= condition['$gte']
        if '$lte' in condition:
            return value <= condition['$lte']
    return value == condition


def _matches(doc: dict[str, Any], query: dict[str, Any]) -> bool:
    for key, value in query.items():
        if key == '$or':
            if not any(_matches(doc, q) for q in value):
                return False
            continue
        if key not in doc:
            return False
        if not _match_condition(doc.get(key), value):
            return False
    return True


class FakeCollection:
    def __init__(self):
        self.docs: list[dict[str, Any]] = []

    async def find_one(self, query: dict[str, Any]):
        for doc in self.docs:
            if _matches(doc, query):
                return doc
        return None

    async def insert_one(self, payload: dict[str, Any]):
        doc = {**payload}
        doc.setdefault('_id', ObjectId())
        self.docs.append(doc)
        return InsertOneResult(inserted_id=doc['_id'])

    async def update_one(self, query: dict[str, Any], update: dict[str, Any], upsert: bool = False):
        doc = await self.find_one(query)
        if not doc:
            if not upsert:
                return UpdateResult(modified_count=0)
            doc = {'_id': ObjectId()}
            if '$set' in update:
                doc.update(update['$set'])
            self.docs.append(doc)
            return UpdateResult(modified_count=1)

        if '$set' in update:
            doc.update(update['$set'])
        if '$inc' in update:
            for k, v in update['$inc'].items():
                doc[k] = doc.get(k, 0) + v
        if '$addToSet' in update:
            for k, v in update['$addToSet'].items():
                doc.setdefault(k, [])
                if v not in doc[k]:
                    doc[k].append(v)
        return UpdateResult(modified_count=1)

    async def update_many(self, query: dict[str, Any], update: dict[str, Any]):
        modified = 0
        for doc in self.docs:
            if _matches(doc, query):
                if '$set' in update:
                    doc.update(update['$set'])
                modified += 1
        return UpdateResult(modified_count=modified)

    async def delete_one(self, query: dict[str, Any]):
        for i, doc in enumerate(self.docs):
            if _matches(doc, query):
                self.docs.pop(i)
                return

    def find(self, query: dict[str, Any]):
        return FakeCursor([doc for doc in self.docs if _matches(doc, query)])

    async def count_documents(self, query: dict[str, Any]):
        return len([doc for doc in self.docs if _matches(doc, query)])

    async def create_index(self, *args, **kwargs):
        return 'index'


class FakeDB:
    def __init__(self):
        self.collections: dict[str, FakeCollection] = {}

    def __getitem__(self, item: str) -> FakeCollection:
        if item not in self.collections:
            self.collections[item] = FakeCollection()
        return self.collections[item]


class FakeUploadStream:
    def __init__(self):
        self._id = ObjectId()
        self.buffer = b''

    async def write(self, data: bytes):
        self.buffer += data

    async def close(self):
        return None


class FakeGridFSBucket:
    def open_upload_stream(self, *_args, **_kwargs):
        return FakeUploadStream()
