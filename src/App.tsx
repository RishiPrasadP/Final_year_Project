import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { DashboardLayout } from './layouts/DashboardLayout';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { ClientDashboard } from './pages/dashboards/ClientDashboard';
import { LawyerDashboard } from './pages/dashboards/LawyerDashboard';
import { JudgeDashboard } from './pages/dashboards/JudgeDashboard';
import { AdminDashboard } from './pages/dashboards/AdminDashboard';
import { CaseManagementPage } from './pages/CaseManagementPage';
import { ComplaintFilingPage } from './pages/ComplaintFilingPage';
import { LawyerDirectoryPage } from './pages/LawyerDirectoryPage';
import { DocumentManagementPage } from './pages/DocumentManagementPage';
import { KnowledgeCenterPage } from './pages/KnowledgeCenterPage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { ProfilePage } from './pages/ProfilePage';
import { useAuthStore } from './store/useAuthStore';

export const App: React.FC = () => {
  const { currentRole } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Main Layout Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/knowledge" element={<KnowledgeCenterPage />} />
          <Route path="/ai-assistant" element={<AIAssistantPage />} />
        </Route>

        {/* Dashboard Layout Protected Routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Navigate to={`/dashboard/${currentRole}`} replace />} />
          <Route path="/dashboard/client" element={<ClientDashboard />} />
          <Route path="/dashboard/lawyer" element={<LawyerDashboard />} />
          <Route path="/dashboard/judge" element={<JudgeDashboard />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/cases" element={<CaseManagementPage />} />
          <Route path="/complaint/new" element={<ComplaintFilingPage />} />
          <Route path="/lawyers" element={<LawyerDirectoryPage />} />
          <Route path="/documents" element={<DocumentManagementPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
