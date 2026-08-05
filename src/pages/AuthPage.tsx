import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scale, Phone, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import type { UserRole } from '../types';

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const { setRole } = useAuthStore();
  
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState<UserRole>('client');
  const [loginMethod, setLoginMethod] = useState<'password' | 'otp'>('otp');
  
  // Form states
  const [phone, setPhone] = useState('9876543210');
  const [otp, setOtp] = useState('123456');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('');
  const [extraId, setExtraId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRole(selectedRole);
    navigate(`/dashboard/${selectedRole}`);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl glass-panel p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-navy-900 text-emerald-400 shadow-lg mb-2">
            <Scale className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {isLogin ? 'Access LIL Portal' : 'Register New Legal Account'}
          </h2>
          <p className="text-xs text-slate-500">
            Secure Government & Judicial Officer Portal Authentication
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-4 gap-1 p-1 bg-slate-200/60 dark:bg-slate-800/60 rounded-2xl text-xs font-bold">
          {(['client', 'lawyer', 'judge', 'admin'] as UserRole[]).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setSelectedRole(r)}
              className={`py-2 rounded-xl transition-all capitalize ${
                selectedRole === r
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {!isLogin && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Adv. Rajesh Sharma"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:border-emerald-500"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Mobile Number
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Role specific register fields */}
          {!isLogin && selectedRole === 'lawyer' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Bar Council Registration Number
              </label>
              <input
                type="text"
                required
                value={extraId}
                onChange={(e) => setExtraId(e.target.value)}
                placeholder="e.g. MAH/2018/9812"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:border-emerald-500"
              />
            </div>
          )}

          {!isLogin && selectedRole === 'client' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Aadhaar Number (e-KYC Verification)
              </label>
              <input
                type="text"
                required
                placeholder="XXXX-XXXX-1234"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:border-emerald-500"
              />
            </div>
          )}

          {isLogin && (
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {loginMethod === 'otp' ? 'One Time Password (OTP)' : 'Account Password'}
                </label>
                <button
                  type="button"
                  onClick={() => setLoginMethod(loginMethod === 'otp' ? 'password' : 'otp')}
                  className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold"
                >
                  Use {loginMethod === 'otp' ? 'Password' : 'OTP'}
                </button>
              </div>
              <input
                type={loginMethod === 'otp' ? 'text' : 'password'}
                required
                value={loginMethod === 'otp' ? otp : password}
                onChange={(e) => loginMethod === 'otp' ? setOtp(e.target.value) : setPassword(e.target.value)}
                placeholder={loginMethod === 'otp' ? 'Enter 6-digit OTP' : '••••••••'}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:border-emerald-500"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/25 flex items-center justify-center space-x-2 transition-all mt-4"
          >
            <span>{isLogin ? `Sign In as ${selectedRole.toUpperCase()}` : 'Register & Verify'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer switcher */}
        <div className="text-center pt-2 border-t border-slate-200/60 dark:border-slate-800 text-xs text-slate-500">
          {isLogin ? "Don't have an account?" : 'Already registered?'}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-1 text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
          >
            {isLogin ? 'Create Account' : 'Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
};
