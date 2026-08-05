import { create } from 'zustand';
import type { LegalCase } from '../types';

interface CaseState {
  cases: LegalCase[];
  selectedCase: LegalCase | null;
  searchQuery: string;
  categoryFilter: string;
  statusFilter: string;
  setSearchQuery: (query: string) => void;
  setCategoryFilter: (category: string) => void;
  setStatusFilter: (status: string) => void;
  setSelectedCase: (legalCase: LegalCase | null) => void;
  addComplaint: (newCase: Omit<LegalCase, 'id' | 'caseNumber' | 'timeline' | 'documentsCount'>) => void;
}

const mockCases: LegalCase[] = [
  {
    id: 'case_001',
    caseNumber: 'WP(C)/2026/9012',
    title: 'Rajesh Kumar vs. State Public Works Department',
    category: 'Constitutional',
    status: 'hearing_scheduled',
    filedDate: '2026-01-15',
    nextHearingDate: '2026-08-12',
    clientName: 'Rajesh Kumar',
    clientId: 'usr_client_01',
    lawyerName: 'Adv. Ananya Sharma',
    lawyerId: 'usr_lawyer_01',
    judgeName: 'Justice Hon. V. Subramanian',
    judgeId: 'usr_judge_01',
    courtName: 'Madras High Court - Bench 4',
    description: 'Writ Petition regarding land acquisition compensation under Article 300A and Bharatiya Nagarik Suraksha Sanhita (BNSS).',
    actsApplied: ['Article 300A', 'BNSS Section 173', 'Land Acquisition Act Sec 24'],
    priority: 'High',
    documentsCount: 6,
    timeline: [
      { title: 'Complaint Filed & Registered', date: '15 Jan 2026', description: 'E-Filing submitted via LIL portal.', completed: true },
      { title: 'Scrutiny & Verification', date: '18 Jan 2026', description: 'Registry verified affidavit and Aadhaar e-KYC.', completed: true },
      { title: 'Police Investigation Report', date: '10 Feb 2026', description: 'Status report submitted under BNSS 173.', completed: true },
      { title: 'Court Assignment & Notice', date: '01 Mar 2026', description: 'Assigned to High Court Bench 4. Notice issued.', completed: true },
      { title: 'First Preliminary Hearing', date: '15 May 2026', description: 'Interim stay granted on demolition order.', completed: true },
      { title: 'Final Hearing Scheduled', date: '12 Aug 2026', description: 'Arguments scheduled for final order.', completed: false, active: true },
      { title: 'Judgement Reserved', date: 'Pending', description: 'Final written order awaiting execution.', completed: false },
    ]
  },
  {
    id: 'case_002',
    caseNumber: 'CC/2026/4102',
    title: 'TechCorp Pvt Ltd vs. Cyber Fraud Ring',
    category: 'Cyber',
    status: 'investigation',
    filedDate: '2026-03-02',
    nextHearingDate: '2026-08-25',
    clientName: 'Siddharth V.',
    clientId: 'usr_client_02',
    lawyerName: 'Adv. Ananya Sharma',
    lawyerId: 'usr_lawyer_01',
    judgeName: 'Justice K. R. Raman',
    courtName: 'City Civil & Sessions Court',
    description: 'Unauthorized data access and financial embezzlement under BNS Section 318 and IT Act Section 66D.',
    actsApplied: ['BNS Sec 318', 'IT Act Sec 66D', 'BSA Sec 63'],
    priority: 'High',
    documentsCount: 14,
    timeline: [
      { title: 'Complaint Filed', date: '02 Mar 2026', description: 'Cyber crime portal intake.', completed: true },
      { title: 'Digital Forensic Verification', date: '15 Mar 2026', description: 'IP logs and server dumps verified under BSA 63.', completed: true },
      { title: 'Cyber Cell Investigation', date: 'Ongoing', description: 'Subpoena issued to ISP and bank accounts.', completed: false, active: true },
      { title: 'Court Hearing', date: '25 Aug 2026', description: 'Summons issuance hearing.', completed: false },
    ]
  },
  {
    id: 'case_003',
    caseNumber: 'FAP/2025/1109',
    title: 'Meena Sundaram vs. Sundaram Pillai',
    category: 'Family',
    status: 'judgement_pending',
    filedDate: '2025-11-10',
    nextHearingDate: '2026-08-08',
    clientName: 'Meena Sundaram',
    clientId: 'usr_client_03',
    lawyerName: 'Adv. Suresh Babu',
    courtName: 'Family Court Division II',
    description: 'Ancestral property partition suit and maintenance allowance application.',
    actsApplied: ['Hindu Succession Act', 'BNSS Sec 144'],
    priority: 'Medium',
    documentsCount: 9,
    timeline: [
      { title: 'Suit Instituted', date: '10 Nov 2025', description: 'Plaint filed along with property schedules.', completed: true },
      { title: 'Mediation Session', date: '20 Dec 2025', description: 'Conciliation attempted by court mediator.', completed: true },
      { title: 'Evidence Recording', date: '14 Mar 2026', description: 'Cross-examination of primary witnesses.', completed: true },
      { title: 'Judgement Pending', date: '08 Aug 2026', description: 'Order reserved for pronunciation.', completed: false, active: true },
    ]
  }
];

export const useCaseStore = create<CaseState>((set) => ({
  cases: mockCases,
  selectedCase: mockCases[0],
  searchQuery: '',
  categoryFilter: 'All',
  statusFilter: 'All',
  setSearchQuery: (query) => set({ searchQuery: query }),
  setCategoryFilter: (category) => set({ categoryFilter: category }),
  setStatusFilter: (status) => set({ statusFilter: status }),
  setSelectedCase: (legalCase) => set({ selectedCase: legalCase }),
  addComplaint: (newCaseData) => set((state) => {
    const id = `case_${Date.now()}`;
    const caseNumber = `LIL/2026/${Math.floor(1000 + Math.random() * 9000)}`;
    const createdCase: LegalCase = {
      ...newCaseData,
      id,
      caseNumber,
      documentsCount: 1,
      timeline: [
        { title: 'Complaint Filed & Registered', date: new Date().toLocaleDateString('en-GB'), description: 'Successfully submitted via LIL portal.', completed: true, active: true },
        { title: 'Registry Verification', date: 'Pending', description: 'Assigned for initial scrutiny.', completed: false },
        { title: 'Court Assignment', date: 'Pending', description: 'Pending judicial officer allocation.', completed: false }
      ]
    };
    return {
      cases: [createdCase, ...state.cases],
      selectedCase: createdCase
    };
  })
}));
