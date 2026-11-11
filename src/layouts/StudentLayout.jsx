import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Sidebar } from '../components/common/Sidebar';
import { QuickRoleBanner } from '../components/common/QuickRoleBanner';
import { useAuth } from '../context/AuthContext';
import { Menu, PlusCircle, Trophy, Bell } from 'lucide-react';

export const StudentLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#F8FAF9] flex flex-col font-sans">
      <QuickRoleBanner />
      <div className="flex-1 flex">
        {/* Sidebar */}
        <Sidebar
          role="student"
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar */}
          <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-emerald-950/5 h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                  Student Action Hub
                </span>
                <h2 className="text-base font-bold text-gray-900 leading-none">
                  Hello, {user?.name?.split(' ')[0] || 'Aarav'} 👋
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/student/submit"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white text-xs font-semibold shadow-xs transition hover:scale-102"
              >
                <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
                Submit Activity
              </Link>

              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-100 text-xs font-bold text-forest-800">
                <Trophy className="w-4 h-4 text-emerald-600" />
                <span>{user?.points ?? 420} Points</span>
              </div>

              <div className="relative">
                <button
                  type="button"
                  className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
                </button>
              </div>

              <Link to="/student/profile">
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                  alt="Avatar"
                  className="w-9 h-9 rounded-xl object-cover ring-2 ring-emerald-500/30 hover:ring-emerald-500 transition"
                />
              </Link>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

