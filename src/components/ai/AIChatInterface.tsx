import React, { useState } from 'react';
import { Send, Bot, User, Sparkles, BookOpen, Mic, RefreshCw } from 'lucide-react';
import type { AIChatMessage } from '../../types';
import { useTranslation } from 'react-i18next';

export const AIChatInterface: React.FC = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: 'msg_1',
      sender: 'assistant',
      text: 'Namaste! I am your **LIL AI Legal Companion**. I can help you understand Indian Laws (BNS 2023, BNSS, BSA), legal procedures, document filing steps, or draft legal notices. How may I assist you today?',
      timestamp: 'Just now',
      suggestedActions: [
        'What are the penalties under BNS Section 103?',
        'How to file a cyber crime complaint in BNSS?',
        'Explain consumer rights for defective goods',
        'Draft a breach of contract legal notice outline'
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: AIChatMessage = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // Simulate AI legal intelligence response with realistic citations & BNS sections
    setTimeout(() => {
      let responseText = `Based on the Bharatiya Nagarik Suraksha Sanhita (BNSS, 2023) and Bharatiya Nyaya Sanhita (BNS, 2023):\n\n1. **Statutory Reference**: Section ${Math.floor(Math.random() * 200 + 1)} provides legal recourse and framework for this matter.\n2. **Procedural Steps**: You may file an e-complaint via the LIL Complaint Portal or approach the jurisdictional police station.\n3. **Evidence Requirement**: Preserve all digital logs, emails, and financial statements certified under Section 63 of Bharatiya Sakshya Adhiniyam (BSA).`;
      let citations = ['BNSS 2023 Sec 173', 'BNS 2023 Sec 318', 'BSA 2023 Sec 63'];

      if (text.toLowerCase().includes('bns section 103') || text.toLowerCase().includes('penalty')) {
        responseText = `**BNS Section 103 (Punishment for Murder)**:\n\n- Replaces the former IPC Section 302.\n- **Punishment**: Whoever commits murder shall be punished with death or imprisonment for life, and shall also be liable to fine.\n- **Mob Lynching Clause (Sec 103(2))**: Where a group of five or more persons acting in concert commits murder on grounds of race, caste, community, sex, or place of birth, each member shall be punished with death or life imprisonment.`;
        citations = ['Bharatiya Nyaya Sanhita 2023 Sec 103(1)', 'BNS 2023 Sec 103(2)'];
      }

      const aiMsg: AIChatMessage = {
        id: `msg_ai_${Date.now()}`,
        sender: 'assistant',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        legalCitations: citations,
        suggestedActions: [
          'Show relevant High Court precedent rulings',
          'Connect me with an advocate specializing in this area'
        ]
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-full glass-panel rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg">
      
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-900/50 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-md">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <span>LIL Legal AI Intelligence</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                BNS 2023 Active
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Trained on Indian Statutory Codes, Supreme Court & High Court Judgements
            </p>
          </div>
        </div>
        <button
          onClick={() => setMessages([messages[0]])}
          className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white text-xs flex items-center space-x-1"
          title="Reset Chat"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Clear</span>
        </button>
      </div>

      {/* Message List */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
          >
            <div
              className={`p-2 rounded-xl flex-shrink-0 ${
                msg.sender === 'user'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-200 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div className={`max-w-[85%] sm:max-w-[75%] space-y-2`}>
              <div
                className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-tr-none'
                    : 'bg-white dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700/80 rounded-tl-none shadow-sm'
                }`}
              >
                <div className="whitespace-pre-line font-normal">{msg.text}</div>

                {/* Citations Tag Pills */}
                {msg.legalCitations && (
                  <div className="mt-3 pt-3 border-t border-slate-200/50 dark:border-slate-700/50">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center">
                      <BookOpen className="w-3 h-3 mr-1" /> Legal Citations
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.legalCitations.map((cite, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold border border-emerald-500/20"
                        >
                          {cite}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Prompt Chips */}
              {msg.suggestedActions && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {msg.suggestedActions.map((action, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(action)}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 border border-slate-200 dark:border-slate-700 transition-colors flex items-center space-x-1"
                    >
                      <Sparkles className="w-3 h-3 text-emerald-500" />
                      <span>{action}</span>
                    </button>
                  ))}
                </div>
              )}

              <p className="text-[10px] text-slate-400 px-1">{msg.timestamp}</p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-emerald-500">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-500 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Analyzing statutes and generating citations...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Form */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your legal query (e.g. BNS 103 penalty, land dispute rights)..."
            className="flex-1 bg-slate-100 dark:bg-slate-800/80 px-4 py-2.5 rounded-xl text-sm outline-none border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:border-emerald-500"
          />
          <button
            type="button"
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-emerald-500 border border-slate-200 dark:border-slate-700"
            title="Voice Input (Ready)"
          >
            <Mic className="w-4 h-4" />
          </button>
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-50 transition-colors shadow-md shadow-emerald-600/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <p className="text-[10px] text-slate-400 mt-2 text-center">
          {t('ai.disclaimer')}
        </p>
      </div>
    </div>
  );
};
