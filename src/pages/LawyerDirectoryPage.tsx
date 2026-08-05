import React, { useState } from 'react';
import { Search, Star, CheckCircle2, Calendar, X } from 'lucide-react';
import type { LawyerProfile } from '../types';

export const LawyerDirectoryPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedPractice, setSelectedPractice] = useState('All');
  const [selectedLawyer, setSelectedLawyer] = useState<LawyerProfile | null>(null);

  const mockLawyers: LawyerProfile[] = [
    {
      id: 'law_1',
      name: 'Adv. Ananya Sharma',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
      specialization: ['Constitutional Law', 'Criminal Defense (BNS)', 'Writ Petitions'],
      experienceYears: 12,
      court: 'Madras High Court & Supreme Court',
      location: 'Chennai / New Delhi',
      rating: 4.9,
      reviewsCount: 128,
      casesHandled: 142,
      feePerConsultation: '₹3,500',
      bio: 'Senior practitioner specializing in Constitutional Writs, Cyber Fraud Defense under BSA Sec 63, and High Court Criminal Revisions.',
      availableSlots: ['Today 4:00 PM', 'Tomorrow 11:00 AM', '08 Aug 2:30 PM'],
      verifiedBarCouncil: true
    },
    {
      id: 'law_2',
      name: 'Adv. Rajeshwar Rao',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=250',
      specialization: ['Corporate Law', 'Cyber Crime & DPDP', 'Arbitration'],
      experienceYears: 16,
      court: 'Bombay High Court & NCLT',
      location: 'Mumbai',
      rating: 4.8,
      reviewsCount: 94,
      casesHandled: 210,
      feePerConsultation: '₹5,000',
      bio: 'Expert in tech law compliance, financial crime litigation under BNS Section 318, and cross-border commercial arbitration.',
      availableSlots: ['Tomorrow 3:00 PM', '09 Aug 10:00 AM'],
      verifiedBarCouncil: true
    },
    {
      id: 'law_3',
      name: 'Adv. Meenakshi Sundaram',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250',
      specialization: ['Family Law', 'Property Partition', 'Consumer Protection'],
      experienceYears: 9,
      court: 'City Civil & Family Court',
      location: 'Bengaluru / Chennai',
      rating: 4.9,
      reviewsCount: 76,
      casesHandled: 89,
      feePerConsultation: '₹2,500',
      bio: 'Dedicated advocate for ancestral property disputes, consumer redressal petitions, and matrimonial mediation.',
      availableSlots: ['Today 6:00 PM', 'Tomorrow 4:30 PM'],
      verifiedBarCouncil: true
    }
  ];

  const practices = ['All', 'Constitutional Law', 'Criminal Defense (BNS)', 'Cyber Crime & DPDP', 'Family Law', 'Corporate Law'];

  const filteredLawyers = mockLawyers.filter((law) => {
    const matchesSearch = law.name.toLowerCase().includes(search.toLowerCase()) || law.court.toLowerCase().includes(search.toLowerCase());
    const matchesPractice = selectedPractice === 'All' || law.specialization.some(s => s.includes(selectedPractice));
    return matchesSearch && matchesPractice;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Verified Advocate Directory
        </h1>
        <p className="text-xs text-slate-500">
          Find and consult Bar Council verified legal practitioners across Supreme Court, High Courts & District Courts
        </p>
      </div>

      {/* Search Bar & Filters */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by advocate name, court, or city..."
            className="w-full pl-9 pr-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs outline-none text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700"
          />
        </div>

        <div className="flex items-center space-x-1 overflow-x-auto pb-1 sm:pb-0">
          {practices.map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPractice(p)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedPractice === p
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Advocate Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLawyers.map((lawyer) => (
          <div
            key={lawyer.id}
            className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 hover:border-emerald-500/50 transition-all shadow-sm group"
          >
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <img
                  src={lawyer.avatar}
                  alt={lawyer.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-500/30"
                />
                <div>
                  <div className="flex items-center space-x-1">
                    <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                      {lawyer.name}
                    </h3>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                  <p className="text-xs text-slate-500">{lawyer.court}</p>
                  
                  <div className="flex items-center space-x-2 mt-1.5 text-xs">
                    <span className="flex items-center font-bold text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-current mr-0.5" />
                      {lawyer.rating}
                    </span>
                    <span className="text-slate-400">({lawyer.reviewsCount} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Specialization Tags */}
              <div className="flex flex-wrap gap-1">
                {lawyer.specialization.map((spec, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-medium"
                  >
                    {spec}
                  </span>
                ))}
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                {lawyer.bio}
              </p>
            </div>

            {/* Bottom info & Consultation Booking */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Consultation Fee</span>
                <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">{lawyer.feePerConsultation}</span>
              </div>
              <button
                onClick={() => setSelectedLawyer(lawyer)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
              >
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {selectedLawyer && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">Schedule Consultation</h3>
                <p className="text-xs text-slate-500">with {selectedLawyer.name}</p>
              </div>
              <button onClick={() => setSelectedLawyer(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <p className="font-semibold text-slate-700 dark:text-slate-300">Select Available Slot:</p>
              <div className="space-y-1.5">
                {selectedLawyer.availableSlots.map((slot, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      alert(`Consultation booked with ${selectedLawyer.name} for ${slot}! Confirmation sent to mobile.`);
                      setSelectedLawyer(null);
                    }}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-left hover:border-emerald-500 font-medium transition-colors flex justify-between items-center"
                  >
                    <span>{slot}</span>
                    <Calendar className="w-4 h-4 text-emerald-500" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
