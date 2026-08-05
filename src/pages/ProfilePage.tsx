import React from 'react';
import { User, ShieldCheck, Globe } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useThemeStore } from '../store/useThemeStore';
import { LanguageSwitcher } from '../components/common/LanguageSwitcher';
import { ThemeToggle } from '../components/common/ThemeToggle';

export const ProfilePage: React.FC = () => {
  const { user, currentRole } = useAuthStore();
  const { isDarkMode } = useThemeStore();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header Profile Card */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <img
          src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
          alt="User Avatar"
          className="w-24 h-24 rounded-3xl object-cover ring-4 ring-emerald-500/30"
        />
        <div className="text-center sm:text-left space-y-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">{user?.name}</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 capitalize">
              {currentRole} Account
            </span>
          </div>
          <p className="text-xs text-slate-500">{user?.email}</p>
          <div className="pt-2 flex items-center justify-center sm:justify-start space-x-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Aadhaar e-KYC & Digital Signature Authenticated</span>
          </div>
        </div>
      </div>

      {/* Account Settings & Preferences */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Profile Info */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center space-x-2">
            <User className="w-4 h-4 text-emerald-500" />
            <span>Personal & Security Information</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-slate-400 block">Phone Number</span>
              <span className="font-bold text-slate-900 dark:text-white">{user?.phone || '+91 98765 43210'}</span>
            </div>
            {user?.aadhaarNumber && (
              <div>
                <span className="text-slate-400 block">Aadhaar Number</span>
                <span className="font-bold text-slate-900 dark:text-white">{user.aadhaarNumber}</span>
              </div>
            )}
            {user?.barCouncilNo && (
              <div>
                <span className="text-slate-400 block">Bar Council License</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{user.barCouncilNo}</span>
              </div>
            )}
            <div>
              <span className="text-slate-400 block">Security Encryption</span>
              <span className="font-mono text-slate-700 dark:text-slate-300">256-bit SHA Certificate Active</span>
            </div>
          </div>
        </div>

        {/* System Preferences */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center space-x-2">
            <Globe className="w-4 h-4 text-blue-500" />
            <span>Interface Preferences</span>
          </h3>

          <div className="space-y-4 text-xs">
            <div className="flex justify-between items-center p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80">
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">Active Theme Mode</span>
                <span className="text-slate-400">{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
              </div>
              <ThemeToggle />
            </div>

            <div className="flex justify-between items-center p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80">
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">Portal Language</span>
                <span className="text-slate-400">English, Tamil, Hindi</span>
              </div>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
