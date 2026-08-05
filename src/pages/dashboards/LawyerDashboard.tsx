import React from 'react';
import { 
  Briefcase, 
  Users, 
  Calendar, 
  TrendingUp, 
  Scale, 
  Clock 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { StatCard } from '../../components/common/StatCard';
import { Link } from 'react-router-dom';

export const LawyerDashboard: React.FC = () => {
  const caseCategoryData = [
    { name: 'Constitutional', count: 12, color: '#10b981' },
    { name: 'Criminal (BNS)', count: 18, color: '#3b82f6' },
    { name: 'Cyber Crime', count: 8, color: '#8b5cf6' },
    { name: 'Civil & Property', count: 6, color: '#f59e0b' },
  ];

  const monthlyCaseData = [
    { month: 'Mar', cases: 14 },
    { month: 'Apr', cases: 19 },
    { month: 'May', cases: 22 },
    { month: 'Jun', cases: 28 },
    { month: 'Jul', cases: 31 },
    { month: 'Aug', cases: 35 },
  ];

  return (
    <div className="space-y-8">
      
      {/* Advocate Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
              Bar Council Verified • MAH/2014/8912
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            Adv. Ananya Sharma's Chamber Docket
          </h1>
          <p className="text-xs text-slate-500">
            Madras High Court & Supreme Court Authorized Practitioner
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            to="/cases"
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center space-x-1"
          >
            <Briefcase className="w-4 h-4" />
            <span>Manage All 44 Cases</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Cases Handled"
          value="142"
          change="+12"
          subtitle="this quarter"
          icon={<Scale className="w-5 h-5" />}
        />
        <StatCard
          title="Pending Dockets"
          value="44"
          change="8 Urgent"
          isPositive={false}
          subtitle="BNS 103 / BNSS"
          icon={<Clock className="w-5 h-5" />}
        />
        <StatCard
          title="Active Clients"
          value="38"
          change="+4 New"
          subtitle="Consultations"
          icon={<Users className="w-5 h-5" />}
        />
        <StatCard
          title="Hearings This Week"
          value="9"
          change="3 Today"
          subtitle="High Court"
          icon={<Calendar className="w-5 h-5" />}
        />
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Monthly Case Growth Chart */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Monthly Case Inflow & Disposals
              </h3>
              <p className="text-xs text-slate-500">Growth rate of dockets over 6 months</p>
            </div>
            <span className="text-xs font-bold text-emerald-500 flex items-center">
              <TrendingUp className="w-3.5 h-3.5 mr-1" /> +24% YoY
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyCaseData}>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="cases" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Practice Area Distribution */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Case Categories Breakdown
            </h3>
            <p className="text-xs text-slate-500">Distribution across law specializations</p>
          </div>

          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={caseCategoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {caseCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 text-xs">
            {caseCategoryData.map((c, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{c.name}</span>
                </div>
                <span className="font-bold text-slate-900 dark:text-white">{c.count} cases</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Consultation Requests & Next Hearings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Consultation Requests */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between">
            <span>Pending Consultation Requests</span>
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-bold">
              3 New
            </span>
          </h3>

          <div className="space-y-3">
            {[
              { name: 'Karthik Subramanian', matter: 'BNS 318 Financial Fraud', fee: '₹3,500', time: 'Today 4:00 PM' },
              { name: 'Priya Narayanan', matter: 'Property Partition Suit', fee: '₹4,000', time: 'Tomorrow 11:30 AM' },
              { name: 'CyberShield Logistics', matter: 'Data Breach Notice under BSA', fee: '₹7,500', time: '08 Aug 2:00 PM' },
            ].map((req, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs"
              >
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{req.name}</p>
                  <p className="text-slate-500">{req.matter} • {req.time}</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 block">{req.fee}</span>
                  <button className="text-[11px] font-semibold text-blue-500 hover:underline">Accept & Slot</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cause List Schedule */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between">
            <span>Today's Court Cause List</span>
            <span className="text-xs text-slate-400 font-normal">Bench 4 & 7</span>
          </h3>

          <div className="space-y-3 text-xs">
            {[
              { caseNo: 'WP(C)/2026/9012', court: 'Madras High Court - Bench 4', item: 'Item #14' },
              { caseNo: 'CC/2026/4102', court: 'Sessions Court Div 2', item: 'Item #28' },
            ].map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                <div className="flex justify-between font-bold text-slate-900 dark:text-white">
                  <span>{item.caseNo}</span>
                  <span className="text-amber-500 font-mono">{item.item}</span>
                </div>
                <p className="text-slate-500 mt-1">{item.court}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
