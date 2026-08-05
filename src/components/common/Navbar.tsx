import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Scale, 
  Search, 
  Bell, 
  User, 
  Menu, 
  X, 
  Briefcase, 
  Gavel, 
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useNotificationStore } from '../../store/useNotificationStore';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';
import type { UserRole } from '../../types';

interface NavbarProps {
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, currentRole, setRole } = useAuthStore();
  const { unreadCount } = useNotificationStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const roleLabels: Record<UserRole, { label: string; icon: React.ReactNode; badgeColor: string }> = {
    client: { label: t('roles.client'), icon: <User className="w-3.5 h-3.5" />, badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
    lawyer: { label: t('roles.lawyer'), icon: <Briefcase className="w-3.5 h-3.5" />, badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
    judge: { label: t('roles.judge'), icon: <Gavel className="w-3.5 h-3.5" />, badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
    admin: { label: t('roles.admin'), icon: <SlidersHorizontal className="w-3.5 h-3.5" />, badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400' },
  };

  const handleRoleChange = (role: UserRole) => {
    setRole(role);
    setRoleDropdownOpen(false);
    navigate(`/dashboard/${role}`);
  };

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: `/dashboard/${currentRole}`, label: t('nav.dashboard') },
    { path: '/cases', label: t('nav.cases') },
    { path: '/lawyers', label: t('nav.lawyers') },
    { path: '/knowledge', label: t('nav.knowledge') },
    { path: '/ai-assistant', label: t('nav.aiAssistant') },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-navy-900 to-emerald-700 text-white shadow-md shadow-emerald-900/20 group-hover:scale-105 transition-transform">
            <Scale className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-navy-900 via-navy-700 to-emerald-700 dark:from-white dark:via-slate-200 dark:to-emerald-400 bg-clip-text text-transparent">
                LIL
              </span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-widest border border-emerald-500/20">
                Gov AI
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 tracking-wider uppercase hidden sm:block font-medium">
              Legal Intelligence Layer
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Controls & Role Switcher */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Global Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center space-x-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800/60 border border-slate-200 dark:border-slate-800 transition-colors"
            title="Global Search"
          >
            <Search className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="hidden md:inline">{t('common.search')}</span>
            <kbd className="hidden md:inline px-1 py-0.5 text-[10px] rounded bg-slate-200 dark:bg-slate-800">⌘K</kbd>
          </button>

          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notifications Trigger */}
          <Link
            to="/notifications"
            className="relative p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800/60 transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </Link>

          {/* Role Switcher Menu */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 transition-all ${roleLabels[currentRole].badgeColor}`}
            >
              {roleLabels[currentRole].icon}
              <span className="text-xs font-bold hidden sm:inline">{roleLabels[currentRole].label}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 glass-panel rounded-2xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 border border-slate-200 dark:border-slate-800">
                <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-200/50 dark:border-slate-800">
                  Switch User Portal Role
                </div>
                {(['client', 'lawyer', 'judge', 'admin'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => handleRoleChange(r)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors ${
                      currentRole === r ? 'text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/20' : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      {roleLabels[r].icon}
                      <span>{roleLabels[r].label}</span>
                    </div>
                    {currentRole === r && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Profile Avatar Link */}
          <Link
            to="/profile"
            className="flex items-center space-x-2 p-1 rounded-full border border-slate-200 dark:border-slate-800 hover:ring-2 hover:ring-emerald-500 transition-all"
            title="User Profile"
          >
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'}
              alt="Avatar"
              className="w-7 h-7 rounded-full object-cover"
            />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-slate-50/95 dark:bg-slate-950/95 px-4 pt-2 pb-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};
