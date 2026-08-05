export type UserRole = 'client' | 'lawyer' | 'judge' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  aadhaarNumber?: string;
  barCouncilNo?: string;
  courtDesignation?: string;
  practiceArea?: string;
  experienceYears?: number;
  officialId?: string;
}

export type CaseStatus = 
  | 'complaint_filed'
  | 'under_verification'
  | 'investigation'
  | 'court_assigned'
  | 'hearing_scheduled'
  | 'judgement_pending'
  | 'disposed';

export interface TimelineStep {
  title: string;
  date: string;
  description: string;
  completed: boolean;
  active?: boolean;
}

export interface LegalCase {
  id: string;
  caseNumber: string;
  title: string;
  category: 'Criminal' | 'Civil' | 'Constitutional' | 'Cyber' | 'Property' | 'Consumer' | 'Family';
  status: CaseStatus;
  filedDate: string;
  nextHearingDate?: string;
  clientName: string;
  clientId: string;
  lawyerName?: string;
  lawyerId?: string;
  judgeName?: string;
  judgeId?: string;
  courtName: string;
  description: string;
  actsApplied: string[];
  timeline: TimelineStep[];
  priority: 'High' | 'Medium' | 'Low';
  documentsCount: number;
}

export interface LawyerProfile {
  id: string;
  name: string;
  avatar: string;
  specialization: string[];
  experienceYears: number;
  court: string;
  location: string;
  rating: number;
  reviewsCount: number;
  casesHandled: number;
  feePerConsultation: string;
  bio: string;
  availableSlots: string[];
  verifiedBarCouncil: boolean;
}

export interface LegalDocument {
  id: string;
  title: string;
  category: 'Evidence' | 'Petition' | 'Court Order' | 'Affidavit' | 'FIR' | 'Judgement';
  uploadedAt: string;
  fileSize: string;
  fileType: string;
  version: string;
  uploadedBy: string;
  caseId?: string;
  caseTitle?: string;
  isVerified: boolean;
}

export interface KnowledgeArticle {
  id: string;
  code: 'BNS' | 'BNSS' | 'BSA' | 'CONSTITUTION' | 'CONSUMER' | 'CYBER' | 'WOMEN_RIGHTS';
  title: string;
  sectionNumber: string;
  summary: string;
  fullText: string;
  keyChanges?: string;
  penalties?: string;
  category: string;
  isBookmarked?: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'hearing' | 'case_update' | 'document' | 'announcement' | 'message';
  read: boolean;
  link?: string;
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  legalCitations?: string[];
  suggestedActions?: string[];
}
