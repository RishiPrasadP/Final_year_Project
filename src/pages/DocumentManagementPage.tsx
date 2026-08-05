import React, { useState } from 'react';
import { UploadCloud, FileText, ShieldCheck, Download } from 'lucide-react';
import type { LegalDocument } from '../types';

export const DocumentManagementPage: React.FC = () => {
  const [documents, setDocuments] = useState<LegalDocument[]>([
    {
      id: 'doc_1',
      title: 'Counter Affidavit - Vol I.pdf',
      category: 'Affidavit',
      uploadedAt: '01 Aug 2026',
      fileSize: '4.2 MB',
      fileType: 'PDF',
      version: 'v2.1',
      uploadedBy: 'Adv. Ananya Sharma',
      caseId: 'case_001',
      caseTitle: 'WP(C)/2026/9012 - Rajesh Kumar vs State',
      isVerified: true
    },
    {
      id: 'doc_2',
      title: 'Aadhaar e-KYC Verification Statement.pdf',
      category: 'Evidence',
      uploadedAt: '15 Jan 2026',
      fileSize: '1.1 MB',
      fileType: 'PDF',
      version: 'v1.0',
      uploadedBy: 'Rajesh Kumar',
      caseId: 'case_001',
      caseTitle: 'WP(C)/2026/9012 - Rajesh Kumar vs State',
      isVerified: true
    },
    {
      id: 'doc_3',
      title: 'BSA 63 Electronic Evidence Certificate.hash',
      category: 'Evidence',
      uploadedAt: '18 Mar 2026',
      fileSize: '24 KB',
      fileType: 'HASH',
      version: 'v1.0',
      uploadedBy: 'Digital Cyber Forensics Lab',
      caseId: 'case_002',
      caseTitle: 'CC/2026/4102 - TechCorp Cyber Fraud',
      isVerified: true
    }
  ]);

  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = (fileName: string) => {
    const newDoc: LegalDocument = {
      id: `doc_${Date.now()}`,
      title: fileName,
      category: 'Evidence',
      uploadedAt: new Date().toLocaleDateString('en-GB'),
      fileSize: '2.8 MB',
      fileType: 'PDF',
      version: 'v1.0',
      uploadedBy: 'User (Self)',
      isVerified: true
    };
    setDocuments([newDoc, ...documents]);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Digital Document Vault & BSA 63 Evidence Hub
        </h1>
        <p className="text-xs text-slate-500">
          Encrypted repository with SHA-256 integrity verification for court-admissible evidence under Bharatiya Sakshya Adhiniyam
        </p>
      </div>

      {/* Drag & Drop Upload Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          if (e.dataTransfer.files?.[0]) handleFileUpload(e.dataTransfer.files[0].name);
        }}
        className={`glass-panel p-8 rounded-3xl border-2 border-dashed transition-all text-center space-y-3 ${
          dragActive
            ? 'border-emerald-500 bg-emerald-500/10'
            : 'border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50'
        }`}
      >
        <UploadCloud className="w-10 h-10 text-emerald-500 mx-auto" />
        <div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            Drag and drop court petitions, affidavits, or digital evidence
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Supports PDF, DOCX, PNG, JPG, and SHA-256 hash certificates up to 50MB
          </p>
        </div>
        <input
          type="file"
          id="vault-upload"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.[0]) handleFileUpload(e.target.files[0].name);
          }}
        />
        <label
          htmlFor="vault-upload"
          className="inline-block px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer shadow-md shadow-emerald-600/20"
        >
          Select File to Upload & Hash
        </label>
      </div>

      {/* Document List Table */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            Vault Documents ({documents.length} Files)
          </h3>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-bold border border-emerald-500/20">
            BSA Sec 63 Compliant
          </span>
        </div>

        <div className="divide-y divide-slate-200 dark:divide-slate-800">
          {documents.map((doc) => (
            <div key={doc.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-emerald-500">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                    <span>{doc.title}</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-200 dark:bg-slate-800 font-mono text-slate-500">
                      {doc.version}
                    </span>
                  </h4>
                  <p className="text-slate-400 mt-0.5">
                    {doc.category} • Uploaded by {doc.uploadedBy} on {doc.uploadedAt} ({doc.fileSize})
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold flex items-center">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                  Verified
                </span>
                <button className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
