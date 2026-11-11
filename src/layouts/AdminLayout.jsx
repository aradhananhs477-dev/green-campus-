import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Sidebar } from '../components/common/Sidebar';
import { QuickRoleBanner } from '../components/common/QuickRoleBanner';
import { useAuth } from '../context/AuthContext';
import { Menu, ShieldCheck, Bell, BarChart2 } from 'lucide-react';

export const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#F8FAF9] flex flex-col font-sans">
      <QuickRoleBanner />
      <div className="flex-1 flex">
        {/* Sidebar */}
        <Sidebar
          role="admin"
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
                <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Campus Administration Console
                </span>
                <h2 className="text-base font-bold text-gray-900 leading-none">
                  {user?.name || 'Dr. Sunita Rao'}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/admin/activities"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white text-xs font-semibold shadow-xs transition hover:scale-102"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Review Pending
              </Link>

              <Link
                to="/admin/reports"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-forest-800 text-xs font-semibold border border-emerald-100 transition"
              >
                <BarChart2 className="w-3.5 h-3.5 text-emerald-600" />
                Audit Reports
              </Link>

              <div className="relative">
                <button
                  type="button"
                  className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
                  title="System alerts"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white" />
                </button>
              </div>

              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'}
                alt="Admin Avatar"
                className="w-9 h-9 rounded-xl object-cover ring-2 ring-forest-700/30"
              />
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

