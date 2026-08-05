import React from 'react';
import type { CaseStatus } from '../../types';
import { useTranslation } from 'react-i18next';
import { Clock, AlertCircle, Scale, ShieldCheck, FileCheck } from 'lucide-react';

interface StatusBadgeProps {
  status: CaseStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const { t } = useTranslation();

  const statusConfig: Record<CaseStatus, { labelKey: string; color: string; icon: React.ReactNode }> = {
    complaint_filed: {
      labelKey: 'cases.complaintFiled',
      color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
      icon: <FileCheck className="w-3.5 h-3.5 mr-1" />
    },
    under_verification: {
      labelKey: 'cases.underVerification',
      color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
      icon: <Clock className="w-3.5 h-3.5 mr-1 animate-spin" />
    },
    investigation: {
      labelKey: 'cases.investigation',
      color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
      icon: <AlertCircle className="w-3.5 h-3.5 mr-1" />
    },
    court_assigned: {
      labelKey: 'cases.courtAssigned',
      color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
      icon: <Scale className="w-3.5 h-3.5 mr-1" />
    },
    hearing_scheduled: {
      labelKey: 'cases.hearingScheduled',
      color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      icon: <Clock className="w-3.5 h-3.5 mr-1" />
    },
    judgement_pending: {
      labelKey: 'cases.judgementPending',
      color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
      icon: <Scale className="w-3.5 h-3.5 mr-1" />
    },
    disposed: {
      labelKey: 'cases.disposed',
      color: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20',
      icon: <ShieldCheck className="w-3.5 h-3.5 mr-1" />
    }
  };

  const config = statusConfig[status] || statusConfig.complaint_filed;

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${config.color}`}>
      {config.icon}
      {t(config.labelKey)}
    </span>
  );
};
