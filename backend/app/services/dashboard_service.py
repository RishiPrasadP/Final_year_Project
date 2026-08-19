from motor.motor_asyncio import AsyncIOMotorDatabase


class DashboardService:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db

    async def client_dashboard(self, user_id: str) -> dict:
        active_cases = await self.db['cases'].count_documents({'client_id': user_id})
        unread_notifications = await self.db['notifications'].count_documents({'user_id': user_id, 'read': False})
        return {'active_cases': active_cases, 'unread_notifications': unread_notifications}

    async def lawyer_dashboard(self, user_id: str) -> dict:
        assigned_cases = await self.db['cases'].count_documents({'lawyer_id': user_id})
        pending_consultations = await self.db['appointments'].count_documents({'lawyer_id': user_id, 'status': 'PENDING'})
        return {'assigned_cases': assigned_cases, 'pending_consultations': pending_consultations}

    async def judge_dashboard(self, user_id: str) -> dict:
        assigned_cases = await self.db['cases'].count_documents({'judge_id': user_id})
        pending_judgments = await self.db['cases'].count_documents({'judge_id': user_id, 'status': 'JUDGMENT_PENDING'})
        return {'assigned_cases': assigned_cases, 'pending_judgments': pending_judgments}

    async def admin_dashboard(self) -> dict:
        total_users = await self.db['users'].count_documents({})
        total_cases = await self.db['cases'].count_documents({})
        pending_lawyer_verifications = await self.db['lawyers'].count_documents({'verified': False})
        return {
            'total_users': total_users,
            'total_cases': total_cases,
            'pending_lawyer_verifications': pending_lawyer_verifications,
        }
