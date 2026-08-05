import { create } from 'zustand';
import type { User, UserRole } from '../types';

interface AuthState {
  user: User | null;
  currentRole: UserRole;
  isAuthenticated: boolean;
  setRole: (role: UserRole) => void;
  login: (user: User) => void;
  logout: () => void;
}

const mockUsers: Record<UserRole, User> = {
  client: {
    id: 'usr_client_01',
    name: 'Rajesh Kumar',
    email: 'rajesh.k@example.com',
    role: 'client',
    phone: '+91 98765 43210',
    aadhaarNumber: 'XXXX-XXXX-8921',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  },
  lawyer: {
    id: 'usr_lawyer_01',
    name: 'Adv. Ananya Sharma',
    email: 'ananya.legal@bar.in',
    role: 'lawyer',
    phone: '+91 98123 45678',
    barCouncilNo: 'MAH/2014/8912',
    practiceArea: 'Constitutional & Criminal Defense',
    experienceYears: 12,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
  },
  judge: {
    id: 'usr_judge_01',
    name: 'Justice Hon. V. Subramanian',
    email: 'v.subramanian@judiciary.gov.in',
    role: 'judge',
    phone: '+91 94440 11223',
    courtDesignation: 'High Court Judge (Bench 4)',
    officialId: 'IND-HC-BENCH-04',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
  },
  admin: {
    id: 'usr_admin_01',
    name: 'Admin Officer R. Srinivasan',
    email: 'admin.portal@lil.gov.in',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
  },
};

export const useAuthStore = create<AuthState>((set) => ({
  user: mockUsers.client,
  currentRole: 'client',
  isAuthenticated: true,
  setRole: (role) => set({ currentRole: role, user: mockUsers[role] }),
  login: (user) => set({ user, currentRole: user.role, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
