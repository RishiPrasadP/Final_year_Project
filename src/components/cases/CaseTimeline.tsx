import React from 'react';
import type { TimelineStep } from '../../types';
import { CheckCircle, Circle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface CaseTimelineProps {
  timeline: TimelineStep[];
  caseNumber: string;
}

export const CaseTimeline: React.FC<CaseTimelineProps> = ({ timeline, caseNumber }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white">
            Visual Case Progress Tracker
          </h4>
          <p className="text-xs text-slate-500">Docket No: {caseNumber}</p>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
          Statutory Verification Active
        </span>
      </div>

      <div className="relative pl-6 space-y-8 before:absolute before:left-[15px] before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
        {timeline.map((step, idx) => {
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative flex items-start space-x-4 group"
            >
              {/* Node Icon */}
              <div
                className={`absolute -left-[30px] top-0.5 p-1 rounded-full border-2 transition-all ${
                  step.completed
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-500/30'
                    : step.active
                    ? 'bg-amber-500 border-amber-500 text-white animate-pulse'
                    : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-400'
                }`}
              >
                {step.completed ? (
                  <CheckCircle className="w-4 h-4" />
                ) : step.active ? (
                  <Clock className="w-4 h-4" />
                ) : (
                  <Circle className="w-4 h-4" />
                )}
              </div>

              {/* Card Details */}
              <div
                className={`flex-1 glass-panel p-4 rounded-xl border transition-all ${
                  step.active
                    ? 'border-amber-500/40 bg-amber-500/5 shadow-sm'
                    : 'border-slate-200/80 dark:border-slate-800'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <h5 className="font-bold text-sm text-slate-900 dark:text-white flex items-center space-x-2">
                    <span>{step.title}</span>
                    {step.active && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500 text-white font-semibold">
                        CURRENT STAGE
                      </span>
                    )}
                  </h5>
                  <span className="text-xs font-medium text-slate-400">{step.date}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
