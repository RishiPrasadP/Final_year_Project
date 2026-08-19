import pytest

from app.schemas.ai import AIChatRequest
from app.schemas.lawyer import ConsultationRequestCreate
from app.services.ai_service import AIService
from app.services.document_service import DocumentService
from app.services.lawyer_service import LawyerService
from tests.fakes import FakeDB, FakeGridFSBucket


@pytest.mark.asyncio
async def test_lawyer_consultation_flow():
    db = FakeDB()
    service = LawyerService(db)

    await db['lawyers'].insert_one(
        {
            'user_id': 'lawyer-user-1',
            'specialization': ['Cyber'],
            'experience_years': 10,
            'court': 'High Court',
            'rating': 4.8,
            'consultation_fee': 3000,
            'verified': True,
        }
    )
    lawyers = await service.search_lawyers('Cyber', None, None, None, None, None)
    assert len(lawyers) == 1

    req = await service.create_consultation_request(
        'client-1',
        ConsultationRequestCreate(lawyer_id='lawyer-user-1', case_id=None, requested_slot='Tomorrow 10 AM', message='Need help'),
    )
    assert req['status'] == 'PENDING'


@pytest.mark.asyncio
async def test_document_upload_list_delete():
    db = FakeDB()
    gridfs = FakeGridFSBucket()
    service = DocumentService(db, gridfs)

    class FakeUpload:
        filename = 'evidence.pdf'
        content_type = 'application/pdf'

        async def read(self):
            return b'pdf-content'

    created = await service.upload('client-1', FakeUpload())
    assert created['title'] == 'evidence.pdf'

    listed = await service.list_documents('client-1')
    assert len(listed) == 1

    meta = await service.get_download_meta('client-1', created['id'])
    assert meta['checksum']

    await service.delete_document('client-1', created['id'])
    listed_after = await service.list_documents('client-1')
    assert len(listed_after) == 0


@pytest.mark.asyncio
async def test_ai_chat_response():
    service = AIService()
    text, citations = await service.chat(AIChatRequest(message='How to file complaint?').message)
    assert 'legal information' in text.lower()
    assert citations
