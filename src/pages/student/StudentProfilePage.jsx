import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useActivities } from '../../context/ActivityContext';
import {
  User,
  Mail,
  Building2,
  Calendar,
  Award,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Trophy,
} from 'lucide-react';

export const StudentProfilePage = () => {
  const { user } = useAuth();
  const { activities } = useActivities();

  const userActs = activities.filter((a) => a.studentId === user?.id);
  const approvedActs = userActs.filter((a) => a.status === 'Approved');
  const pendingActs = userActs.filter((a) => a.status === 'Pending');

  const earnedPoints = approvedActs.reduce((acc, a) => acc + (Number(a.points) || 0), 0);
  const totalPoints = Math.max(user?.points || 0, earnedPoints);

  const badges = [
    { title: 'Eco Pioneer', desc: 'Logged first 5 verified campus actions', icon: '🌱', unlocked: true },
    { title: 'Tree Master', desc: 'Planted 10+ trees on campus grounds', icon: '🌳', unlocked: true },
    { title: 'Zero Waste Hero', desc: 'Participated in campus recycling drives', icon: '♻️', unlocked: true },
    { title: 'Water Guardian', desc: 'Saved 500+ liters through audited conservation', icon: '💧', unlocked: true },
    { title: 'Clean Energy Scout', desc: 'Audited campus classroom lighting & solar arrays', icon: '⚡', unlocked: false },
    { title: 'Campus Sustainability Legend', desc: 'Reached 1,000+ points on GreenCampus', icon: '🏆', unlocked: false },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Profile Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-950/5 shadow-soft relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
            alt="Profile Avatar"
            className="w-24 h-24 sm:w-28 sm:resp-h-28 rounded-3xl object-cover ring-4 ring-forest-800/10 shadow-md"
          />

          <div className="space-y-2 flex-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 text-forest-800 border border-emerald-100 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Campus Green Ambassador</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              {user?.name || 'Aarav Sharma'}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pt-1">
              <span className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                {user?.department || 'Computer Science & Engineering'}
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-emerald-600" />
                {user?.email || 'student@greencampus.edu'}
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                ID: {user?.studentId || 'GC-2024-892'}
              </span>
            </div>
          </div>

          <div className="w-full sm:w-auto p-4 rounded-2xl bg-forest-900 text-white text-center sm:text-right shadow-md">
            <span className="text-[11px] font-semibold text-emerald-300 block uppercase tracking-wider">
              Earned Points
            </span>
            <span className="text-3xl font-black text-white">{totalPoints}</span>
            <span className="text-[10px] text-emerald-200/80 block mt-0.5">Top 3 Rank</span>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-emerald-950/5 shadow-soft flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Actions</p>
            <p className="text-2xl font-black text-gray-900 mt-1">{userActs.length}</p>
          </div>
          <div className="p-3 rounded-xl bg-forest-50 text-forest-800">
            <Award className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-emerald-950/5 shadow-soft flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Verified & Approved</p>
            <p className="text-2xl font-black text-emerald-600 mt-1">{approvedActs.length}</p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-emerald-950/5 shadow-soft flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Under Review</p>
            <p className="text-2xl font-black text-amber-600 mt-1">{pendingActs.length}</p>
          </div>
          <div className="p-3 rounded-xl bg-amber-50 text-amber-600">
            <Clock className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Badges and Accomplishments */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-950/5 shadow-soft space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              Sustainability Badges & Honors
            </h3>
            <p className="text-xs text-gray-500">Milestones unlocked by submitting verified actions</p>
          </div>
          <span className="text-xs font-bold text-forest-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            4 / 6 Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.map((b) => (
            <div
              key={b.title}
              className={`p-4 rounded-2xl border transition-all ${
                b.unlocked
                  ? 'bg-emerald-50/40 border-emerald-200 shadow-xs'
                  : 'bg-gray-50/50 border-gray-200 opacity-60'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl p-2 rounded-xl bg-white shadow-xs border border-gray-100">
                  {b.icon}
                </span>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                    {b.title}
                    {b.unlocked && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  </h4>
                  <p className="text-[11px] text-gray-500 leading-snug">{b.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

