import React from 'react';
import { 
  SlidersHorizontal, 
  Users, 
  UserCheck, 
  ShieldAlert, 
  Activity, 
  CheckCircle, 
  XCircle 
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { StatCard } from '../../components/common/StatCard';

export const AdminDashboard: React.FC = () => {
  const telemetryData = [
    { time: '08:00', requests: 1200, latency: 42 },
    { time: '10:00', requests: 4800, latency: 48 },
    { time: '12:00', requests: 7900, latency: 55 },
    { time: '14:00', requests: 9400, latency: 51 },
    { time: '16:00', requests: 6200, latency: 44 },
  ];

  return (
    <div className="space-y-8">
      
      {/* Admin Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-purple-950 via-navy-950 to-navy-900 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              System Administrator • Portal Telemetry
            </span>
            <h1 className="text-2xl font-extrabold mt-1">
              LIL National Legal Infrastructure Admin
            </h1>
            <p className="text-xs text-slate-300">
              Multi-Region High Court Cloud Cluster & Bar Verification Gate
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <SlidersHorizontal className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Registered Citizens"
          value="124,890"
          change="+1,240 Today"
          subtitle="e-KYC Verified"
          icon={<Users className="w-5 h-5 text-emerald-500" />}
        />
        <StatCard
          title="Verified Advocates"
          value="18,420"
          change="14 Pending"
          subtitle="Bar Council"
          icon={<UserCheck className="w-5 h-5 text-blue-500" />}
        />
        <StatCard
          title="System API Throughput"
          value="9.4k req/m"
          change="99.99% Up"
          subtitle="Latency 48ms"
          icon={<Activity className="w-5 h-5 text-purple-500" />}
        />
        <StatCard
          title="Security Audits"
          value="Compliant"
          change="DPDP 2023"
          subtitle="SHA-256 Vault"
          icon={<ShieldAlert className="w-5 h-5 text-amber-500" />}
        />
      </div>

      {/* Telemetry Chart */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Real-Time Platform API Traffic Telemetry
            </h3>
            <p className="text-xs text-slate-500">Live requests/min across High Court clusters</p>
          </div>
          <span className="text-xs font-bold text-emerald-500">● 100% Operational</span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={telemetryData}>
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip />
              <Area type="monotone" dataKey="requests" stroke="#a855f7" fill="#a855f7" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pending Advocate Verification Pipeline */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white">
          Advocate Bar Council Verification Pipeline
        </h3>

        <div className="space-y-3">
          {[
            { name: 'Adv. Ramesh Chandran', barNo: 'TN/2021/4491', court: 'Madras High Court' },
            { name: 'Adv. Kavita Deshmukh', barNo: 'MAH/2019/8812', court: 'Bombay High Court' },
          ].map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/80 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">{item.name}</p>
                <p className="text-slate-500">Bar ID: {item.barNo} • {item.court}</p>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-500 transition-colors flex items-center space-x-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Approve</span>
                </button>
                <button className="px-3 py-1 rounded-lg bg-rose-500/10 text-rose-600 font-bold hover:bg-rose-500/20 transition-colors flex items-center space-x-1">
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Reject</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
