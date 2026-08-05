import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FilePlus, 
  CheckCircle2, 
  UploadCloud, 
  ArrowRight, 
  ArrowLeft,
  ShieldCheck
} from 'lucide-react';
import { useCaseStore } from '../store/useCaseStore';

export const ComplaintFilingPage: React.FC = () => {
  const navigate = useNavigate();
  const { addComplaint } = useCaseStore();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Criminal' as any,
    incidentDate: '',
    incidentLocation: '',
    description: '',
    witnessName: '',
    witnessPhone: '',
    evidenceFileName: '',
    actsApplied: ['BNS Sec 318', 'BNSS Sec 173']
  });
  const [submitted, setSubmitted] = useState(false);

  const steps = [
    { number: 1, title: 'Basic Information' },
    { number: 2, title: 'Incident Details' },
    { number: 3, title: 'Evidence Upload' },
    { number: 4, title: 'Witness Details' },
    { number: 5, title: 'Review & Submit' }
  ];

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addComplaint({
      title: formData.title || 'Petitioner Complaint under BNSS 173',
      category: formData.category,
      status: 'complaint_filed',
      filedDate: new Date().toISOString().split('T')[0],
      clientName: 'Rajesh Kumar',
      clientId: 'usr_client_01',
      courtName: 'Jurisdictional District Magistrate Court',
      description: formData.description || 'General complaint filed via LIL portal.',
      actsApplied: formData.actsApplied,
      priority: 'High'
    });
    setSubmitted(true);
    setTimeout(() => {
      navigate('/cases');
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex p-3 rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 mb-2">
          <FilePlus className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          E-Filing Legal Complaint Wizard
        </h1>
        <p className="text-xs text-slate-500">
          Statutory e-filing compliant with BNSS Section 173 for preliminary investigation and court registration
        </p>
      </div>

      {/* Stepper Progress Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex justify-between items-center overflow-x-auto">
        {steps.map((s, idx) => (
          <div key={s.number} className="flex items-center space-x-2 min-w-fit px-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                currentStep === s.number
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-4 ring-emerald-500/20'
                  : currentStep > s.number
                  ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
              }`}
            >
              {currentStep > s.number ? <CheckCircle2 className="w-5 h-5" /> : s.number}
            </div>
            <span className={`text-xs font-semibold ${currentStep === s.number ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
              {s.title}
            </span>
            {idx < steps.length - 1 && <span className="w-8 h-0.5 bg-slate-200 dark:bg-slate-800 mx-2 hidden sm:block" />}
          </div>
        ))}
      </div>

      {/* Form Card */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6">
        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Complaint Submitted Successfully!</h3>
            <p className="text-xs text-slate-500">
              Docket Number generated under BNSS Section 173. Redirecting to your active cases...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Step 1 */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Step 1: Basic Information</h3>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Complaint Title / Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Unlawful Land Demolition Notice under Article 300A"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Legal Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:border-emerald-500"
                  >
                    <option value="Criminal">Criminal (BNS 2023)</option>
                    <option value="Civil">Civil / Property</option>
                    <option value="Constitutional">Constitutional / Writ</option>
                    <option value="Cyber">Cyber Crime & IT Fraud</option>
                    <option value="Consumer">Consumer Dispute</option>
                    <option value="Family">Family / Matrimonial</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Step 2: Incident Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Date of Occurrence
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.incidentDate}
                      onChange={(e) => setFormData({ ...formData, incidentDate: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Jurisdictional Location / Police Station
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.incidentLocation}
                      onChange={(e) => setFormData({ ...formData, incidentLocation: e.target.value })}
                      placeholder="e.g. Central Station Jurisdiction, Chennai"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Detailed Statement of Facts
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe sequence of events, parties involved, and statutory grievances..."
                    className="w-full p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none"
                  />
                </div>
              </div>
            )}

            {/* Step 3 */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Step 3: Digital Evidence Upload (BSA Sec 63)</h3>
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 p-8 rounded-2xl text-center space-y-3 bg-slate-50/50 dark:bg-slate-900/50">
                  <UploadCloud className="w-10 h-10 text-emerald-500 mx-auto" />
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    Drag and drop PDF, images, or audio logs
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Files will be auto-hashed with SHA-256 for BSA Section 63 compliance.
                  </p>
                  <input
                    type="file"
                    onChange={(e) => setFormData({ ...formData, evidenceFileName: e.target.files?.[0]?.name || '' })}
                    className="hidden"
                    id="evidence-file"
                  />
                  <label
                    htmlFor="evidence-file"
                    className="inline-block px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs cursor-pointer hover:bg-emerald-500"
                  >
                    Browse Files
                  </label>
                  {formData.evidenceFileName && (
                    <p className="text-xs font-semibold text-emerald-500 mt-2">
                      Selected: {formData.evidenceFileName}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Step 4 */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Step 4: Witness Information</h3>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Primary Witness Name
                  </label>
                  <input
                    type="text"
                    value={formData.witnessName}
                    onChange={(e) => setFormData({ ...formData, witnessName: e.target.value })}
                    placeholder="e.g. Suresh Ramachandran"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Witness Contact Number
                  </label>
                  <input
                    type="tel"
                    value={formData.witnessPhone}
                    onChange={(e) => setFormData({ ...formData, witnessPhone: e.target.value })}
                    placeholder="+91 94440 00000"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none"
                  />
                </div>
              </div>
            )}

            {/* Step 5 */}
            {currentStep === 5 && (
              <div className="space-y-4">
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Step 5: Verification & Final Submission</h3>
                <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900 space-y-2 text-xs">
                  <p><strong>Title:</strong> {formData.title || 'Untitled Complaint'}</p>
                  <p><strong>Category:</strong> {formData.category}</p>
                  <p><strong>Occurrence Date:</strong> {formData.incidentDate || 'Not specified'}</p>
                  <p><strong>Location:</strong> {formData.incidentLocation || 'Not specified'}</p>
                  <p><strong>Evidence File:</strong> {formData.evidenceFileName || 'None uploaded'}</p>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-600 dark:text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>I hereby declare that all statements made in this petition are true to the best of my knowledge under penalty of law.</span>
                </div>
              </div>
            )}

            {/* Control Buttons */}
            <div className="flex justify-between items-center pt-4 border-t border-slate-200 dark:border-slate-800">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold flex items-center space-x-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
              )}

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="ml-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md flex items-center space-x-1"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="ml-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xl shadow-emerald-600/30 flex items-center space-x-1"
                >
                  <span>Submit E-Complaint</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
