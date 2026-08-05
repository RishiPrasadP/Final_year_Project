import React, { useState } from 'react';
import { Bot, X, Maximize2, Sparkles } from 'lucide-react';
import { AIChatInterface } from './AIChatInterface';
import { useNavigate } from 'react-router-dom';

export const FloatingAIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-[90vw] sm:w-[420px] h-[550px] animate-in slide-in-from-bottom-5 zoom-in-95">
          <div className="relative h-full">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 z-10 p-1.5 rounded-lg bg-slate-200/80 dark:bg-slate-800/80 text-slate-500 hover:text-slate-900 dark:hover:text-white"
              title="Close Floating Widget"
            >
              <X className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                navigate('/ai-assistant');
              }}
              className="absolute top-3 right-10 z-10 p-1.5 rounded-lg bg-slate-200/80 dark:bg-slate-800/80 text-slate-500 hover:text-slate-900 dark:hover:text-white"
              title="Open Full Page Chat"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <AIChatInterface />
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center space-x-2 px-4 py-3 rounded-full bg-gradient-to-r from-navy-900 via-navy-800 to-emerald-700 text-white shadow-2xl hover:scale-105 active:scale-95 transition-all border border-emerald-500/30 group"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-emerald-400 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
          </div>
          <span className="font-bold text-sm tracking-wide">Ask LIL AI</span>
          <Sparkles className="w-4 h-4 text-amber-400" />
        </button>
      )}
    </div>
  );
};
