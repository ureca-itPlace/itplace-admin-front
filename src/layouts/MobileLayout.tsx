// src/layouts/MobileLayout.tsx
import { useState } from 'react';
import MobileHeader from '../components/common/MobileHeader';
import ContentSection from '../features/adminPage/components/ContentSection';

const MobileLayout = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="max-md:block hidden bg-white min-h-screen">
      <MobileHeader onTabChange={setActiveTab} />
      <main className="px-5">
        <ContentSection activeTab={activeTab} />
      </main>
    </div>
  );
};

export default MobileLayout;
