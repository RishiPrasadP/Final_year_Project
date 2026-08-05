import React from 'react';
import { AIChatInterface } from '../components/ai/AIChatInterface';

export const AIAssistantPage: React.FC = () => {
  return (
    <div className="h-[calc(100vh-6rem)] max-w-5xl mx-auto py-2">
      <AIChatInterface />
    </div>
  );
};
