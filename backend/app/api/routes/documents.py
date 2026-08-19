from fastapi import APIRouter, Depends, File, UploadFile
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.api.deps import get_current_user, get_database
from app.core.database import get_gridfs
from app.services.document_service import DocumentService

router = APIRouter(prefix='/documents', tags=['documents'])


@router.post('/upload')
async def upload_document(
    case_id: str | None = None,
    file: UploadFile = File(...),
    db: AsyncIOMotorDatabase = Depends(get_database),
    user: dict = Depends(get_current_user),
):
    service = DocumentService(db, get_gridfs())
    data = await service.upload(user['id'], file, case_id)
    return {'success': True, 'message': 'Document uploaded', 'data': data}


@router.get('')
async def list_documents(
    case_id: str | None = None,
    db: AsyncIOMotorDatabase = Depends(get_database),
    user: dict = Depends(get_current_user),
):
    service = DocumentService(db, get_gridfs())
    data = await service.list_documents(user['id'], case_id)
    return {'success': True, 'message': 'Documents fetched', 'data': data}


@router.get('/{document_id}/download')
async def download_document(
    document_id: str,
    db: AsyncIOMotorDatabase = Depends(get_database),
    user: dict = Depends(get_current_user),
):
    service = DocumentService(db, get_gridfs())
    data = await service.get_download_meta(user['id'], document_id)
    return {'success': True, 'message': 'Document metadata fetched', 'data': data}


@router.delete('/{document_id}')
async def delete_document(
    document_id: str,
    db: AsyncIOMotorDatabase = Depends(get_database),
    user: dict = Depends(get_current_user),
):
    service = DocumentService(db, get_gridfs())
    await service.delete_document(user['id'], document_id)
    return {'success': True, 'message': 'Document deleted', 'data': {'deleted': True}}
