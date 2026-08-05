import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Scale, 
  ShieldCheck, 
  Bot, 
  FileText, 
  UserCheck, 
  Gavel, 
  ArrowRight, 
  Sparkles,
  Lock
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import type { UserRole } from '../types';

export const LandingPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setRole } = useAuthStore();

  const handleRoleSelect = (role: UserRole) => {
    setRole(role);
    navigate(`/dashboard/${role}`);
  };

  return (
    <div className="space-y-24 pb-12 overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 lg:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Glow background effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center max-w-3xl mx-auto space-y-6 relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold"
          >
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span>{t('hero.badge')}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight"
          >
            Empowering Justice through{' '}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-navy-900 dark:from-emerald-400 dark:to-cyan-300 bg-clip-text text-transparent">
              Artificial Intelligence
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal"
          >
            {t('hero.subtitle')} Fully compliant with Bharatiya Nyaya Sanhita (BNS 2023), BNSS, and Bharatiya Sakshya Adhiniyam (BSA).
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link
              to="/complaint/new"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl shadow-emerald-600/25 flex items-center justify-center space-x-2 transition-all hover:scale-105"
            >
              <span>{t('hero.getStarted')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/ai-assistant"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl glass-panel hover:bg-slate-200/50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold text-sm border border-slate-200 dark:border-slate-800 flex items-center justify-center space-x-2 transition-all"
            >
              <Bot className="w-4 h-4 text-emerald-500" />
              <span>{t('hero.tryAI')}</span>
            </Link>
          </motion.div>
        </div>

        {/* Interactive Role Quick Selector */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { role: 'client' as UserRole, title: 'Citizen & Client', desc: 'File e-complaints, track case timelines, consult top advocates.', icon: <UserCheck className="w-6 h-6 text-emerald-500" /> },
            { role: 'lawyer' as UserRole, title: 'Advocate Portal', desc: 'Manage client dockets, e-filing, precedent research.', icon: <Scale className="w-6 h-6 text-blue-500" /> },
            { role: 'judge' as UserRole, title: 'Judicial Officer', desc: 'Manage cause lists, review evidence under BSA Sec 63.', icon: <Gavel className="w-6 h-6 text-amber-500" /> },
            { role: 'admin' as UserRole, title: 'Court Registrar', desc: 'System governance, lawyer verification, portal telemetry.', icon: <Lock className="w-6 h-6 text-purple-500" /> },
          ].map((item) => (
            <div
              key={item.role}
              onClick={() => handleRoleSelect(item.role)}
              className="glass-panel p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/50 cursor-pointer transition-all hover:-translate-y-1 shadow-sm group"
            >
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 w-fit mb-4 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                {item.desc}
              </p>
              <div className="mt-4 flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <span>Enter Portal</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* LIVE STATS COUNTER BAR */}
      <section className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white py-12 border-y border-emerald-500/20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-emerald-400">124,500+</p>
            <p className="text-xs text-slate-300 mt-1 uppercase font-semibold tracking-wider">E-Complaints Processed</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-amber-400">18,200+</p>
            <p className="text-xs text-slate-300 mt-1 uppercase font-semibold tracking-wider">Verified Advocates</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-cyan-400">99.4%</p>
            <p className="text-xs text-slate-300 mt-1 uppercase font-semibold tracking-wider">BNS Citation Accuracy</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-purple-400">24/7</p>
            <p className="text-xs text-slate-300 mt-1 uppercase font-semibold tracking-wider">Automated Cause List</p>
          </div>
        </div>
      </section>

      {/* CORE FEATURES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Built for Modern Indian Legal Ecosystem
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Seamlessly integrating new criminal laws BNS 2023, BNSS 2023, and BSA 2023 with AI automation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 w-fit">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">AI Legal Precedent Assistant</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Instant statutory lookup for BNS Sections, Supreme Court constitutional bench rulings, and automated drafting assistance for legal notices.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500 w-fit">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Visual Case Timeline Tracking</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Track your case stage in real-time from FIR/Complaint registration, verification, police report submission, to final judgement pronunciation.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500 w-fit">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">BSA 63 Certified Evidence Vault</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Upload digital evidence, affidavits, and documents encrypted with SHA-256 integrity checks compliant with Bharatiya Sakshya Adhiniyam.
            </p>
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {[
            { q: 'Is LIL updated with the new BNS, BNSS, and BSA laws of 2023?', a: 'Yes. LIL is natively configured with the complete text and citation mapping of Bharatiya Nyaya Sanhita (BNS), BNSS, and Bharatiya Sakshya Adhiniyam.' },
            { q: 'Can citizens file complaints directly without visiting court first?', a: 'Yes! Citizens can complete our 5-step E-Filing wizard to submit preliminary complaints and receive instant docket tracking numbers.' },
            { q: 'How does LIL support multi-language translation?', a: 'LIL supports English, Tamil (தமிழ்), and Hindi (हिन्दी) out of the box with instant runtime translation switching.' }
          ].map((faq, i) => (
            <div key={i} className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-2">{faq.q}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
