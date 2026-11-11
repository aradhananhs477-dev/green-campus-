import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  PlusCircle,
  ListTodo,
  Trophy,
  User,
  LogOut,
  ShieldCheck,
  Users,
  BarChart3,
  Leaf,
  X,
  ArrowRightLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export const Sidebar = ({ role = 'student', isOpen, onClose }) => {
  const { user, logout, quickSwitchRole } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const studentNavItems = [
    { name: 'Dashboard', path: '/student', icon: LayoutDashboard },
    { name: 'Submit Activity', path: '/student/submit', icon: PlusCircle },
    { name: 'My Activities', path: '/student/activities', icon: ListTodo },
    { name: 'Leaderboard', path: '/student/leaderboard', icon: Trophy },
    { name: 'Profile', path: '/student/profile', icon: User },
  ];

  const adminNavItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Manage Activities', path: '/admin/activities', icon: ShieldCheck },
    { name: 'Manage Students', path: '/admin/students', icon: Users },
    { name: 'Reports & Analytics', path: '/admin/reports', icon: BarChart3 },
  ];

  const navItems = role === 'admin' ? adminNavItems : studentNavItems;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-white border-r border-emerald-950/10 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Header & Logo */}
        <div>
          <div className="h-20 px-6 flex items-center justify-between border-b border-gray-100">
            <NavLink to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-forest-800 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-900/10 group-hover:scale-105 transition-transform">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-extrabold tracking-tight text-forest-900">
                  Green<span className="text-emerald-600">Campus</span>
                </span>
                <span className="block text-[10px] font-semibold text-emerald-700 tracking-wider uppercase">
                  {role === 'admin' ? 'Faculty Admin' : 'Student Portal'}
                </span>
              </div>
            </NavLink>

            {/* Mobile close button */}
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User mini badge */}
          <div className="p-4 mx-4 mt-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-center gap-3">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
              alt={user?.name || 'User'}
              className="w-11 h-11 rounded-xl object-cover ring-2 ring-emerald-500/30"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">{user?.name || 'Aarav Sharma'}</p>
              <p className="text-xs text-gray-500 truncate">{user?.department || (role === 'admin' ? 'Administrator' : 'Student')}</p>
              {role === 'student' && (
                <div className="flex items-center gap-1.5 mt-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-xs font-bold text-forest-800">{user?.points ?? 420} pts</span>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-4 py-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/student' || item.path === '/admin'}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-forest-800 text-white shadow-md shadow-forest-900/10'
                        : 'text-gray-600 hover:bg-emerald-50/60 hover:text-forest-900'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-300' : 'text-gray-400'}`} />
                        <span>{item.name}</span>
                      </div>
                      {isActive && <ChevronRight className="w-4 h-4 text-emerald-300" />}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Actions */}
        <div className="p-4 border-t border-gray-100 space-y-3">
          {/* Quick Role Switcher */}
          <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
              <span>Demo Persona</span>
              <ArrowRightLeft className="w-3.5 h-3.5 text-gray-400" />
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => {
                  quickSwitchRole('student');
                  navigate('/student');
                  onClose?.();
                }}
                className={`py-1.5 px-2 rounded-lg text-xs font-medium text-center transition ${
                  role === 'student'
                    ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => {
                  quickSwitchRole('admin');
                  navigate('/admin');
                  onClose?.();
                }}
                className={`py-1.5 px-2 rounded-lg text-xs font-medium text-center transition ${
                  role === 'admin'
                    ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Admin
              </button>
            </div>
          </div>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

