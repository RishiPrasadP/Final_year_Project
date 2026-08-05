import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Scale, 
  FileText, 
  FolderKanban, 
  BookOpen, 
  Bot, 
  Bell, 
  UserCheck, 
  FilePlus, 
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import type { UserRole } from '../../types';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

interface NavMenuItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggleCollapse }) => {
  const location = useLocation();
  const { currentRole } = useAuthStore();

  const roleMenus: Record<UserRole, NavMenuItem[]> = {
    client: [
      { path: '/dashboard/client', label: 'My Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
      { path: '/cases', label: 'My Active Cases', icon: <Scale className="w-5 h-5" /> },
      { path: '/complaint/new', label: 'File Complaint', icon: <FilePlus className="w-5 h-5 text-emerald-500" /> },
      { path: '/lawyers', label: 'Find Advocates', icon: <UserCheck className="w-5 h-5" /> },
      { path: '/documents', label: 'Document Vault', icon: <FileText className="w-5 h-5" /> },
      { path: '/ai-assistant', label: 'Ask AI Legal Bot', icon: <Bot className="w-5 h-5 text-blue-400" /> },
      { path: '/knowledge', label: 'Acts & Rights', icon: <BookOpen className="w-5 h-5" /> },
    ],
    lawyer: [
      { path: '/dashboard/lawyer', label: 'Advocate Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
      { path: '/cases', label: 'Client Case Portfolio', icon: <FolderKanban className="w-5 h-5" /> },
      { path: '/documents', label: 'E-Filing & Affidavits', icon: <FileText className="w-5 h-5" /> },
      { path: '/knowledge', label: 'BNS/BNSS/BSA Digest', icon: <BookOpen className="w-5 h-5" /> },
      { path: '/ai-assistant', label: 'AI Precedent Search', icon: <Bot className="w-5 h-5 text-blue-400" /> },
    ],
    judge: [
      { path: '/dashboard/judge', label: 'Bench Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
      { path: '/cases', label: 'Cause List & Docket', icon: <Scale className="w-5 h-5" /> },
      { path: '/documents', label: 'Submitted Evidence', icon: <FileText className="w-5 h-5" /> },
      { path: '/knowledge', label: 'Statutory Research', icon: <BookOpen className="w-5 h-5" /> },
      { path: '/ai-assistant', label: 'AI Judgement Assistant', icon: <Bot className="w-5 h-5 text-blue-400" /> },
    ],
    admin: [
      { path: '/dashboard/admin', label: 'System Overview', icon: <LayoutDashboard className="w-5 h-5" /> },
      { path: '/cases', label: 'Global Case Register', icon: <Scale className="w-5 h-5" /> },
      { path: '/lawyers', label: 'Bar Council Approvals', icon: <UserCheck className="w-5 h-5" /> },
      { path: '/documents', label: 'Audit & Repositories', icon: <FileText className="w-5 h-5" /> },
      { path: '/notifications', label: 'Alert Broadcasts', icon: <Bell className="w-5 h-5" /> },
    ],
  };

  const menuItems = roleMenus[currentRole] || roleMenus.client;

  return (
    <aside
      className={`hidden lg:flex flex-col h-[calc(100vh-4rem)] sticky top-16 transition-all duration-300 border-r border-slate-200/80 dark:border-slate-800/80 glass-panel z-30 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Collapse Toggle */}
      <div className="p-3 flex justify-end border-b border-slate-200/50 dark:border-slate-800/50">
        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Role Indicator Banner */}
      {!collapsed && (
        <div className="p-4 mx-3 my-2 rounded-xl bg-gradient-to-r from-navy-900 to-navy-800 text-white text-xs shadow-sm">
          <p className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">Current Role</p>
          <p className="font-bold text-sm capitalize">{currentRole} Portal</p>
        </div>
      )}

      {/* Menu Links */}
      <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-500/20 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
              } ${collapsed ? 'justify-center px-0' : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <div className={isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500'}>
                {item.icon}
              </div>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer Info inside Sidebar */}
      {!collapsed && (
        <div className="p-4 border-t border-slate-200/50 dark:border-slate-800/50 text-[11px] text-slate-400 text-center">
          <p className="font-semibold text-slate-600 dark:text-slate-300">Digital Courts India</p>
          <p>BNS 2023 Compliant</p>
        </div>
      )}
    </aside>
  );
};
