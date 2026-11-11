import React from 'react';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { QuickRoleBanner } from '../components/common/QuickRoleBanner';
import { LeaderboardPage } from './student/LeaderboardPage';

export const PublicLeaderboardPage = () => {
  return (
    <div className="min-h-screen bg-[#F8FAF9] flex flex-col font-sans">
      <QuickRoleBanner />
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <LeaderboardPage />
      </main>
      <Footer />
    </div>
  );
};

