import React from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: React.ReactNode;
  subtitle?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  icon,
  subtitle
}) => {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="glass-panel p-5 rounded-2xl relative overflow-hidden transition-all shadow-sm border border-slate-200/80 dark:border-slate-800"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{title}</p>
          <h3 className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">{value}</h3>
          {change && (
            <div className="flex items-center mt-2 space-x-1.5 text-xs">
              <span
                className={`font-semibold px-1.5 py-0.5 rounded ${
                  isPositive
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                }`}
              >
                {change}
              </span>
              {subtitle && <span className="text-slate-500">{subtitle}</span>}
            </div>
          )}
        </div>
        <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-emerald-600 dark:text-emerald-400">
          {icon}
        </div>
      </div>
      <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />
    </motion.div>
  );
};
