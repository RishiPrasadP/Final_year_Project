import React, { useState } from 'react';
import { Search, Calendar, FilePlus } from 'lucide-react';
import { useCaseStore } from '../store/useCaseStore';
import { StatusBadge } from '../components/common/StatusBadge';
import { CaseTimeline } from '../components/cases/CaseTimeline';
import { Link } from 'react-router-dom';

export const CaseManagementPage: React.FC = () => {
  const { cases, searchQuery, setSearchQuery, categoryFilter, setCategoryFilter } = useCaseStore();
  const [selectedCaseId, setSelectedCaseId] = useState<string>(cases[0].id);

  const categories = ['All', 'Constitutional', 'Cyber', 'Family', 'Criminal', 'Civil', 'Property'];

  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.clientName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || c.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const activeCase = cases.find((c) => c.id === selectedCaseId) || cases[0];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Case Docket & Management Portal
          </h1>
          <p className="text-xs text-slate-500">
            Real-time statutory tracking compliant with BNSS Section 173 and E-Courts Services
          </p>
        </div>
        <Link
          to="/complaint/new"
          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center space-x-1.5 w-fit"
        >
          <FilePlus className="w-4 h-4" />
          <span>File New E-Complaint</span>
        </Link>
      </div>

      {/* Search & Filter Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Case Docket Number (e.g. WP(C)/2026/9012), party name, or act..."
            className="w-full pl-9 pr-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs outline-none text-slate-900 dark:text-white placeholder-slate-400 border border-slate-200 dark:border-slate-700"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-1 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                categoryFilter === cat
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Case List vs Detailed Timeline Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Case Cards List */}
        <div className="space-y-3">
          {filteredCases.map((item) => {
            const isSelected = item.id === selectedCaseId;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedCaseId(item.id)}
                className={`glass-panel p-4 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-500/5 shadow-md'
                    : 'border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {item.caseNumber}
                  </span>
                  <StatusBadge status={item.status} />
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1">{item.courtName}</p>

                <div className="mt-3 pt-3 border-t border-slate-200/50 dark:border-slate-800/50 flex justify-between items-center text-[11px] text-slate-400">
                  <span className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {item.nextHearingDate ? `Next: ${item.nextHearingDate}` : 'Filed Date'}
                  </span>
                  <span className="font-semibold text-slate-600 dark:text-slate-300">
                    {item.actsApplied[0]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right 2 Cols: Detailed Selected Case view */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {activeCase.caseNumber}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-bold uppercase">
                  {activeCase.category}
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                {activeCase.title}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">{activeCase.courtName}</p>
            </div>
            <StatusBadge status={activeCase.status} />
          </div>

          {/* Key metadata grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-100/60 dark:bg-slate-900/60 p-4 rounded-2xl text-xs">
            <div>
              <span className="text-slate-400 block font-medium">Petitioner/Client</span>
              <span className="font-bold text-slate-900 dark:text-white">{activeCase.clientName}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Assigned Advocate</span>
              <span className="font-bold text-slate-900 dark:text-white">{activeCase.lawyerName || 'Unassigned'}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Presiding Judge</span>
              <span className="font-bold text-slate-900 dark:text-white">{activeCase.judgeName || 'Bench Queue'}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Documents Vault</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{activeCase.documentsCount} Files</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Case Abstract</h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/40 p-3 rounded-xl border border-slate-200/50 dark:border-slate-800">
              {activeCase.description}
            </p>
          </div>

          {/* Applied Statutory Acts */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Applied Statutory Sections</h4>
            <div className="flex flex-wrap gap-1.5">
              {activeCase.actsApplied.map((act, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20"
                >
                  {act}
                </span>
              ))}
            </div>
          </div>

          {/* Timeline Component */}
          <CaseTimeline timeline={activeCase.timeline} caseNumber={activeCase.caseNumber} />
        </div>
      </div>
    </div>
  );
};
