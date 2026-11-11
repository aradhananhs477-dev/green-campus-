import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Shield, GraduationCap, ArrowRightLeft } from 'lucide-react';

export const QuickRoleBanner = () => {
  const { user, isAdmin, isStudent, quickSwitchRole } = useAuth();

  return (
    <div className="bg-gradient-to-r from-forest-900 via-forest-800 to-forest-950 text-white text-xs px-4 py-2 flex flex-wrap items-center justify-between gap-2 border-b border-forest-700/50 shadow-inner">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          Demo Mode Active
        </span>
        <span className="text-gray-300">
          Currently logged in as{' '}
          <strong className="text-white font-medium">{user?.name || 'Guest'}</strong>{' '}
          ({user?.role ? user.role.toUpperCase() : 'STUDENT'})
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-gray-300 hidden sm:inline">Switch Demo Role:</span>
        <div className="inline-flex rounded-lg bg-black/30 p-0.5 border border-white/10">
          <button
            type="button"
            onClick={() => quickSwitchRole('student')}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition ${
              isStudent
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            Student View
          </button>
          <button
            type="button"
            onClick={() => quickSwitchRole('admin')}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition ${
              isAdmin
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            Admin View
          </button>
        </div>
      </div>
    </div>
  );
};

