import React, { useState, useEffect } from 'react';
import { Search, X, Scale, FileText, UserCheck, BookOpen, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : null;
      }
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickLinks = [
    { title: 'WP(C)/2026/9012 - Rajesh Kumar vs State', category: 'Case', icon: <Scale className="w-4 h-4 text-emerald-500" />, path: '/cases' },
    { title: 'Adv. Ananya Sharma (Constitutional Law)', category: 'Advocate', icon: <UserCheck className="w-4 h-4 text-blue-500" />, path: '/lawyers' },
    { title: 'BNS Section 103 (Punishment for Murder)', category: 'Knowledge Base', icon: <BookOpen className="w-4 h-4 text-purple-500" />, path: '/knowledge' },
    { title: 'BNSS Section 173 (Information in Cognizable Cases)', category: 'Knowledge Base', icon: <BookOpen className="w-4 h-4 text-purple-500" />, path: '/knowledge' },
    { title: 'File New Complaint Form', category: 'Action', icon: <FileText className="w-4 h-4 text-amber-500" />, path: '/complaint/new' },
  ];

  const filteredLinks = query
    ? quickLinks.filter(l => l.title.toLowerCase().includes(query.toLowerCase()) || l.category.toLowerCase().includes(query.toLowerCase()))
    : quickLinks;

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4 animate-in fade-in">
      <div className="w-full max-w-2xl glass-panel rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
        <div className="flex items-center px-4 border-b border-slate-200 dark:border-slate-800 py-3">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, case number, section (BNS/BNSS), or advocate..."
            className="w-full bg-transparent text-slate-900 dark:text-white outline-none placeholder-slate-400 text-sm font-medium"
            autoFocus
          />
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto p-2">
          <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {query ? 'Search Results' : 'Suggested & Quick Navigation'}
          </div>
          {filteredLinks.length > 0 ? (
            filteredLinks.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(item.path)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors text-left group"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                      {item.title}
                    </p>
                    <span className="text-xs text-slate-400">{item.category}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </button>
            ))
          ) : (
            <div className="py-8 text-center text-slate-400 text-sm">
              No matching records found for "{query}".
            </div>
          )}
        </div>

        <div className="px-4 py-2 bg-slate-100/50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800 flex justify-between text-xs text-slate-400">
          <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800">ESC</kbd> to exit</span>
          <span>Legal Intelligence Layer (LIL) v2.4</span>
        </div>
      </div>
    </div>
  );
};
