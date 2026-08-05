import React from 'react';
import { Gavel, Scale, CheckCircle2, AlertTriangle, Eye } from 'lucide-react';
import { StatCard } from '../../components/common/StatCard';
import { Link } from 'react-router-dom';

export const JudgeDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      
      {/* Judge Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-amber-950 via-navy-950 to-navy-900 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              High Court Judicial Bench 4 • ID: IND-HC-BENCH-04
            </span>
            <h1 className="text-2xl font-extrabold mt-1">
              Justice Hon. V. Subramanian
            </h1>
            <p className="text-xs text-slate-300">
              Presiding Officer • Constitutional & High-Priority Dockets
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Gavel className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Today's Cause List"
          value="18 Matters"
          change="6 Arguments"
          subtitle="Bench 4"
          icon={<Gavel className="w-5 h-5 text-amber-500" />}
        />
        <StatCard
          title="Pending Judgements"
          value="4 Orders"
          change="2 Reserved"
          isPositive={false}
          subtitle="Drafting"
          icon={<Scale className="w-5 h-5" />}
        />
        <StatCard
          title="Fast-Track Dockets"
          value="12"
          change="BNS 103"
          subtitle="Priority"
          icon={<AlertTriangle className="w-5 h-5" />}
        />
        <StatCard
          title="Disposed This Month"
          value="34 Cases"
          change="+18%"
          subtitle="Target Met"
          icon={<CheckCircle2 className="w-5 h-5" />}
        />
      </div>

      {/* Today's Cause List Docket Table */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Today's High Court Cause List (Bench 4)
            </h3>
            <p className="text-xs text-slate-500">Live docket schedule for 05 Aug 2026</p>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 font-bold border border-emerald-500/20">
              ● Court Session Active
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 dark:bg-slate-900 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-4 py-3">Item #</th>
                <th className="px-4 py-3">Case Docket</th>
                <th className="px-4 py-3">Petitioner vs Respondent</th>
                <th className="px-4 py-3">Advocates Present</th>
                <th className="px-4 py-3">Stage</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
              {[
                { item: 'Item 01', caseNo: 'WP(C)/2026/9012', parties: 'Rajesh Kumar vs State PWD', advocates: 'Adv. Ananya / Adv. General', stage: 'Final Arguments' },
                { item: 'Item 02', caseNo: 'BNSS/2026/0411', parties: 'State Cyber Cell vs Unknown', advocates: 'Public Prosecutor', stage: 'Bail Hearing' },
                { item: 'Item 03', caseNo: 'FAP/2025/1109', parties: 'Meena Sundaram vs Sundaram', advocates: 'Adv. Suresh Babu', stage: 'Pronouncement of Order' },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-100/50 dark:hover:bg-slate-800/50">
                  <td className="px-4 py-3 font-mono font-bold text-amber-500">{row.item}</td>
                  <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">{row.caseNo}</td>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{row.parties}</td>
                  <td className="px-4 py-3 text-slate-500">{row.advocates}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold">
                      {row.stage}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      to="/cases"
                      className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold flex items-center space-x-1 w-fit hover:bg-emerald-500/20"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Review</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
