import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Check, ChevronDown } from 'lucide-react';

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  ];

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem('lil_lang', code);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors hover:bg-slate-200/50 dark:hover:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
        aria-label="Select Language"
      >
        <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        <span>{currentLang.native}</span>
        <ChevronDown className="w-3.5 h-3.5 opacity-60" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 glass-panel rounded-xl shadow-xl py-1 z-50 animate-in fade-in zoom-in-95">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className="w-full flex items-center justify-between px-3 py-2 text-sm text-left hover:bg-emerald-50 dark:hover:bg-slate-800/80 transition-colors text-slate-800 dark:text-slate-200"
            >
              <div>
                <span className="font-semibold block">{lang.native}</span>
                <span className="text-xs text-slate-500">{lang.label}</span>
              </div>
              {i18n.language === lang.code && (
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
