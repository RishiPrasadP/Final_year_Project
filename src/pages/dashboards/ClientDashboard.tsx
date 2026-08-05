import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
  Scale, 
  Clock, 
  FilePlus, 
  Bot, 
  UserCheck, 
  FileText, 
  ChevronRight,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useCaseStore } from '../../store/useCaseStore';
import { StatCard } from '../../components/common/StatCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import { CaseTimeline } from '../../components/cases/CaseTimeline';

export const ClientDashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { cases } = useCaseStore();

  const activeCase = cases[0];

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-navy-950 via-navy-900 to-emerald-950 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verified Citizen Account • Aadhaar Authenticated</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t('dashboards.clientWelcome')} {user?.name || 'Citizen'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            You have <strong className="text-emerald-400">1 active case</strong> in Madras High Court and 1 upcoming hearing scheduled on <strong>12 Aug 2026</strong>.
          </p>

          <div className="pt-4 flex flex-wrap gap-3">
            <Link
              to="/complaint/new"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 flex items-center space-x-2 transition-all"
            >
              <FilePlus className="w-4 h-4" />
              <span>File New E-Complaint</span>
            </Link>
            <Link
              to="/ai-assistant"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 flex items-center space-x-2 transition-all"
            >
              <Bot className="w-4 h-4 text-emerald-400" />
              <span>Consult AI Assistant</span>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Cases"
          value="1"
          change="+0"
          subtitle="this month"
          icon={<Scale className="w-5 h-5" />}
        />
        <StatCard
          title="Next Hearing"
          value="12 Aug 2026"
          change="7 Days"
          isPositive={true}
          subtitle="Bench 4"
          icon={<Clock className="w-5 h-5" />}
        />
        <StatCard
          title="Assigned Advocate"
          value="Adv. Ananya"
          change="Verified"
          subtitle="Bar Council"
          icon={<UserCheck className="w-5 h-5" />}
        />
        <StatCard
          title="Vault Documents"
          value="6 Files"
          change="BSA 63"
          subtitle="Encrypted"
          icon={<FileText className="w-5 h-5" />}
        />
      </div>

      {/* Main Grid: Active Case Docket & Visual Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Selected Case Overview & Timeline */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {activeCase.caseNumber}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                  {activeCase.title}
                </h3>
                <p className="text-xs text-slate-500">{activeCase.courtName}</p>
              </div>
              <StatusBadge status={activeCase.status} />
            </div>

            {/* Case Details Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-slate-100/60 dark:bg-slate-900/60 p-4 rounded-xl">
              <div>
                <span className="text-slate-400 block font-medium">Category</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{activeCase.category}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Filed Date</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{activeCase.filedDate}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Presiding Judge</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{activeCase.judgeName}</span>
              </div>
            </div>

            {/* Timeline */}
            <CaseTimeline timeline={activeCase.timeline} caseNumber={activeCase.caseNumber} />
          </div>
        </div>

        {/* Right Col: Quick Actions & Notifications Widget */}
        <div className="space-y-6">
          
          {/* Quick Actions */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Quick Citizen Actions</h3>
            <div className="space-y-2">
              <Link
                to="/complaint/new"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                <div className="flex items-center space-x-2">
                  <FilePlus className="w-4 h-4 text-emerald-500" />
                  <span>File New E-Complaint Form</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                to="/lawyers"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                <div className="flex items-center space-x-2">
                  <UserCheck className="w-4 h-4 text-blue-500" />
                  <span>Search Verified Advocates</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                to="/documents"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-amber-500" />
                  <span>Upload Digital Evidence</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Legal Rights Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-tr from-emerald-950 to-navy-900 text-white border border-emerald-500/30 space-y-3">
            <h4 className="font-bold text-sm text-emerald-400 flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4" />
              <span>Free Legal Aid Helpline</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Under NALSA and BNSS guidelines, eligible citizens can request state-funded legal counsel. Call <strong>15100</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
