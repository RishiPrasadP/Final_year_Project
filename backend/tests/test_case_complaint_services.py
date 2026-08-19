import pytest

from app.schemas.case import CaseCreateRequest, CaseUpdateRequest
from app.schemas.complaint import ComplaintCreateRequest, ComplaintUpdateRequest
from app.services.case_service import CaseService
from app.services.complaint_service import ComplaintService
from tests.fakes import FakeDB


@pytest.mark.asyncio
async def test_case_service_create_list_update():
    db = FakeDB()
    service = CaseService(db)

    created = await service.create_case(
        CaseCreateRequest(
            title='Land Dispute',
            category='Civil',
            description='Test case',
            client_id='client-1',
            court='District Court',
            state='TN',
            district='Chennai',
            lawyer_id=None,
        )
    )
    assert created['title'] == 'Land Dispute'

    listed = await service.list_cases(search='land', category=None, status=None)
    assert len(listed) == 1

    updated = await service.update_case(created['id'], CaseUpdateRequest(title='Updated Land Dispute'))
    assert updated['title'] == 'Updated Land Dispute'


@pytest.mark.asyncio
async def test_complaint_service_draft_submit_flow():
    db = FakeDB()
    service = ComplaintService(db)

    created = await service.create_complaint(
        'client-1',
        ComplaintCreateRequest(title='Cyber fraud', category='Cyber', description='Details'),
    )
    assert created['status'] == 'DRAFT'

    updated = await service.update_complaint(
        created['id'],
        'client-1',
        ComplaintUpdateRequest(description='Updated details'),
    )
    assert updated['description'] == 'Updated details'

    submitted = await service.submit_complaint(created['id'], 'client-1')
    assert submitted['status'] == 'SUBMITTED'

    mine = await service.list_my_complaints('client-1')
    assert len(mine) == 1
