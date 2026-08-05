import { create } from 'zustand';
import type { NotificationItem } from '../types';

interface NotificationState {
  notifications: NotificationItem[];
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  unreadCount: number;
}

const mockNotifications: NotificationItem[] = [
  {
    id: 'notif_1',
    title: 'Hearing Scheduled',
    message: 'Your case WP(C)/2026/9012 has a hearing scheduled on 12 Aug 2026 in High Court Bench 4.',
    timestamp: '10 mins ago',
    type: 'hearing',
    read: false,
    link: '/cases'
  },
  {
    id: 'notif_2',
    title: 'New Document Uploaded',
    message: 'Adv. Ananya Sharma uploaded "Counter Affidavit - Vol II.pdf" under Evidence.',
    timestamp: '2 hours ago',
    type: 'document',
    read: false,
    link: '/documents'
  },
  {
    id: 'notif_3',
    title: 'BNS 2023 Statutory Update',
    message: 'Ministry of Law & Justice released new compliance guidelines for BNSS e-summons.',
    timestamp: '1 day ago',
    type: 'announcement',
    read: true,
    link: '/knowledge'
  }
];

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: mockNotifications,
  unreadCount: mockNotifications.filter(n => !n.read).length,
  markAsRead: (id) => set((state) => {
    const updated = state.notifications.map(n => n.id === id ? { ...n, read: true } : n);
    return { notifications: updated, unreadCount: updated.filter(n => !n.read).length };
  }),
  markAllAsRead: () => set((state) => ({
    notifications: state.notifications.map(n => ({ ...n, read: true })),
    unreadCount: 0
  }))
}));
