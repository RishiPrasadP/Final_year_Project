import React from 'react';
import { Bell, Check, Clock, FileText, Megaphone } from 'lucide-react';
import { useNotificationStore } from '../store/useNotificationStore';

export const NotificationsPage: React.FC = () => {
  const { notifications, markAsRead, markAllAsRead } = useNotificationStore();

  const getIcon = (type: string) => {
    switch (type) {
      case 'hearing': return <Clock className="w-5 h-5 text-amber-500" />;
      case 'document': return <FileText className="w-5 h-5 text-blue-500" />;
      case 'announcement': return <Megaphone className="w-5 h-5 text-purple-500" />;
      default: return <Bell className="w-5 h-5 text-emerald-500" />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            System Alerts & Case Notifications
          </h1>
          <p className="text-xs text-slate-500">Live docket updates and statutory announcements</p>
        </div>
        <button
          onClick={markAllAsRead}
          className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center space-x-1"
        >
          <Check className="w-3.5 h-3.5 text-emerald-500" />
          <span>Mark All Read</span>
        </button>
      </div>

      {/* Notifications List */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 divide-y divide-slate-200 dark:divide-slate-800">
        {notifications.map((n) => (
          <div
            key={n.id}
            onClick={() => markAsRead(n.id)}
            className={`py-4 flex items-start space-x-4 cursor-pointer transition-colors ${
              !n.read ? 'bg-emerald-500/5 -mx-6 px-6 rounded-xl' : ''
            }`}
          >
            <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 flex-shrink-0">
              {getIcon(n.type)}
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center space-x-2">
                  <span>{n.title}</span>
                  {!n.read && <span className="w-2 h-2 rounded-full bg-rose-500" />}
                </h4>
                <span className="text-[11px] text-slate-400">{n.timestamp}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {n.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
