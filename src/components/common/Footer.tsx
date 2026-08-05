import React from 'react';
import { Scale, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="glass-panel border-t border-slate-200/80 dark:border-slate-800/80 mt-16 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1 */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-navy-900 text-emerald-400">
                <Scale className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
                LIL Legal Tech
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Legal Intelligence Layer (LIL) empowers citizens, advocates, judicial officers, and court registries with AI-driven case tracking, BNS/BNSS/BSA intelligence, and automated e-filing.
            </p>
            <div className="flex items-center space-x-3 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Government Security Compliant</span>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Quick Portals
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li><Link to="/cases" className="hover:text-emerald-500 transition-colors">Case Status Search</Link></li>
              <li><Link to="/complaint/new" className="hover:text-emerald-500 transition-colors">E-Filing Complaint Portal</Link></li>
              <li><Link to="/lawyers" className="hover:text-emerald-500 transition-colors">Advocate Directory</Link></li>
              <li><Link to="/knowledge" className="hover:text-emerald-500 transition-colors">BNS / BNSS / BSA Legal Digest</Link></li>
              <li><Link to="/ai-assistant" className="hover:text-emerald-500 transition-colors">AI Legal Chat Assistant</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Statutory Acts & Codes
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>Bharatiya Nyaya Sanhita (BNS, 2023)</li>
              <li>Bharatiya Nagarik Suraksha Sanhita (BNSS, 2023)</li>
              <li>Bharatiya Sakshya Adhiniyam (BSA, 2023)</li>
              <li>Constitution of India & Fundamental Rights</li>
              <li>Digital Personal Data Protection Act (DPDP)</li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Emergency & Helpdesk
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
              National Legal Services Authority (NALSA) Toll-Free: <strong>15100</strong>
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Cyber Crime Helpline: <strong>1930</strong>
            </p>
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-700 dark:text-emerald-400">
              ⚡ 24/7 AI-assisted preliminary legal query responder active.
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
          <p>© 2026 Legal Intelligence Layer (LIL). All rights reserved.</p>
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <span className="hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer">Security Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
