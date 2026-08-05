import React, { useState } from 'react';
import { Search, Bookmark, ChevronRight } from 'lucide-react';
import type { KnowledgeArticle } from '../types';

export const KnowledgeCenterPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeCode, setActiveCode] = useState<string>('ALL');

  const mockArticles: KnowledgeArticle[] = [
    {
      id: 'kn_1',
      code: 'BNS',
      sectionNumber: 'Section 103',
      title: 'Punishment for Murder (Replaces IPC Section 302)',
      summary: 'Outlines statutory penalties for murder, including mandatory capital punishment or life imprisonment and fines, plus special provisions for mob lynching.',
      fullText: 'Whoever commits murder shall be punished with death or imprisonment for life, and shall also be liable to fine. Where a group of five or more persons acting in concert commits murder on grounds of race, caste or community, sex, place of birth, language, personal belief or any other similar ground, each member of such group shall be punished with death or with imprisonment for life.',
      keyChanges: 'Introduced explicit anti-mob lynching clause under Sec 103(2).',
      category: 'Criminal Law',
      isBookmarked: true
    },
    {
      id: 'kn_2',
      code: 'BNSS',
      sectionNumber: 'Section 173',
      title: 'Information in Cognizable Cases & Zero FIR (Replaces CrPC 154)',
      summary: 'Mandates registration of Zero FIR anywhere irrespective of jurisdiction, and enables e-complaints with digital signature authentication.',
      fullText: 'Every information relating to the commission of a cognizable offence, if given orally to an officer in charge of a police station, shall be reduced to writing by him or under his direction... Provided that information given by electronic communication may be taken on record.',
      keyChanges: 'Mandatory 3-day timeline for preliminary inquiry in minor offenses before FIR registration.',
      category: 'Criminal Procedure',
      isBookmarked: false
    },
    {
      id: 'kn_3',
      code: 'BSA',
      sectionNumber: 'Section 63',
      title: 'Admissibility of Electronic Records (Replaces Evidence Act 65B)',
      summary: 'Governs admissibility of electronic evidence, server logs, mobile recordings, and digital files accompanied by a hash certificate.',
      fullText: 'Any information contained in an electronic record which is printed on a paper, stored, recorded or copied in optical or magnetic media produced by a computer shall be deemed to be also a document...',
      keyChanges: 'Simplified electronic evidence certification requirement with standardized digital hash format.',
      category: 'Evidence Law',
      isBookmarked: true
    },
    {
      id: 'kn_4',
      code: 'CONSTITUTION',
      sectionNumber: 'Article 300A',
      title: 'Right to Property',
      summary: 'No person shall be deprived of his property save by authority of law.',
      fullText: 'No person shall be deprived of his property save by authority of law.',
      category: 'Constitutional Rights',
      isBookmarked: false
    }
  ];

  const codes = [
    { key: 'ALL', label: 'All Codes' },
    { key: 'BNS', label: 'BNS 2023' },
    { key: 'BNSS', label: 'BNSS 2023' },
    { key: 'BSA', label: 'BSA 2023' },
    { key: 'CONSTITUTION', label: 'Constitution' },
  ];

  const filteredArticles = mockArticles.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(search.toLowerCase()) ||
      art.sectionNumber.toLowerCase().includes(search.toLowerCase()) ||
      art.summary.toLowerCase().includes(search.toLowerCase());
    const matchesCode = activeCode === 'ALL' || art.code === activeCode;
    return matchesSearch && matchesCode;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Bharatiya Legal Knowledge & Digest Center
          </h1>
          <p className="text-xs text-slate-500">
            Comprehensive reference guide for Bharatiya Nyaya Sanhita (BNS), BNSS, BSA, and Constitutional Rights
          </p>
        </div>
      </div>

      {/* Search & Code Tabs */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by section number (e.g. BNS Section 103), keyword, or legal remedy..."
            className="w-full pl-9 pr-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs outline-none text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700"
          />
        </div>

        <div className="flex items-center space-x-1 overflow-x-auto pb-1 sm:pb-0">
          {codes.map((c) => (
            <button
              key={c.key}
              onClick={() => setActiveCode(c.key)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                activeCode === c.key
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredArticles.map((art) => (
          <div
            key={art.id}
            className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 flex flex-col justify-between hover:border-emerald-500/50 transition-all shadow-sm"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-extrabold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  {art.sectionNumber} ({art.code})
                </span>
                <button className="text-slate-400 hover:text-amber-500">
                  <Bookmark className={`w-4 h-4 ${art.isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
                </button>
              </div>

              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                {art.title}
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {art.summary}
              </p>

              {art.keyChanges && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 space-y-0.5">
                  <span className="font-bold block">✨ Key Statutory Change:</span>
                  <span className="text-[11px]">{art.keyChanges}</span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs">
              <span className="text-slate-400">{art.category}</span>
              <button
                onClick={() => alert(`Full Statutory Text:\n\n${art.fullText}`)}
                className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center"
              >
                <span>Read Statutory Text</span>
                <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
