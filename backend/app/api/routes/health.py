from fastapi import APIRouter

router = APIRouter(tags=['health'])


@router.get('/health')
async def health_check():
    return {'success': True, 'message': 'Service healthy', 'data': {'status': 'ok'}}
