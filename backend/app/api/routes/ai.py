from fastapi import APIRouter, Depends

from app.api.deps import get_current_user
from app.schemas.ai import AIChatRequest, AIChatResponse
from app.services.ai_service import AIService

router = APIRouter(prefix='/ai', tags=['ai'])


@router.post('/chat')
async def chat(payload: AIChatRequest, _: dict = Depends(get_current_user)):
    service = AIService()
    response, citations = await service.chat(payload.message)
    data = AIChatResponse(response=response, citations=citations)
    return {'success': True, 'message': 'AI response generated', 'data': data.model_dump()}
