import hashlib
import os
from datetime import datetime, timezone

from fastapi import HTTPException, UploadFile
from motor.motor_asyncio import AsyncIOMotorDatabase, AsyncIOMotorGridFSBucket

from app.core.config import get_settings
from app.utils.objectid import serialize_doc, to_object_id


class DocumentService:
    def __init__(self, db: AsyncIOMotorDatabase, gridfs: AsyncIOMotorGridFSBucket):
        self.db = db
        self.gridfs = gridfs
        self.settings = get_settings()

    def _validate_file(self, file: UploadFile) -> None:
        if file.content_type not in self.settings.allowed_upload_mime_types:
            raise HTTPException(status_code=400, detail='Unsupported file type')

        allowed_exts = {'.pdf', '.jpg', '.jpeg', '.png', '.docx'}
        ext = os.path.splitext(file.filename or '')[1].lower()
        if ext not in allowed_exts:
            raise HTTPException(status_code=400, detail='Unsupported file extension')

    async def upload(self, owner_id: str, file: UploadFile, case_id: str | None = None) -> dict:
        self._validate_file(file)

        data = await file.read()
        max_size = self.settings.max_upload_size_mb * 1024 * 1024
        if len(data) > max_size:
            raise HTTPException(status_code=400, detail='File too large')

        checksum = hashlib.sha256(data).hexdigest()
        filename = os.path.basename(file.filename or 'document')

        stream = self.gridfs.open_upload_stream(
            filename,
            metadata={'owner_id': owner_id, 'content_type': file.content_type},
        )
        await stream.write(data)
        await stream.close()

        now = datetime.now(timezone.utc)
        doc = {
            'title': filename,
            'owner_id': owner_id,
            'case_id': case_id,
            'mime_type': file.content_type,
            'size_bytes': len(data),
            'version': 1,
            'checksum': checksum,
            'gridfs_file_id': str(stream._id),
            'created_at': now,
            'updated_at': now,
        }

        result = await self.db['documents'].insert_one(doc)
        created = await self.db['documents'].find_one({'_id': result.inserted_id})
        return serialize_doc(created)

    async def list_documents(self, owner_id: str, case_id: str | None = None) -> list[dict]:
        query = {'owner_id': owner_id}
        if case_id:
            query['case_id'] = case_id
        cursor = self.db['documents'].find(query).sort('created_at', -1)
        return [serialize_doc(doc) async for doc in cursor]

    async def delete_document(self, owner_id: str, document_id: str) -> None:
        doc = await self.db['documents'].find_one({'_id': to_object_id(document_id), 'owner_id': owner_id})
        if not doc:
            raise HTTPException(status_code=404, detail='Document not found')
        await self.db['documents'].delete_one({'_id': doc['_id']})

    async def get_download_meta(self, owner_id: str, document_id: str) -> dict:
        doc = await self.db['documents'].find_one({'_id': to_object_id(document_id), 'owner_id': owner_id})
        if not doc:
            raise HTTPException(status_code=404, detail='Document not found')
        return serialize_doc(doc)
