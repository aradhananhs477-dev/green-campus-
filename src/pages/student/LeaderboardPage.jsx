import React, { useState, useEffect } from 'react';
import { userService } from '../../services/userService';
import { useAuth } from '../../context/AuthContext';
import {
  Trophy,
  Medal,
  Award,
  Search,
  Sparkles,
  TrendingUp,
  Flame,
  CheckCircle2,
  Crown,
} from 'lucide-react';

export const LeaderboardPage = () => {
  const { user } = useAuth();
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        const data = await userService.getLeaderboard();
        setStudents(data);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      (s.department && s.department.toLowerCase().includes(search.toLowerCase())) ||
      (s.studentId && s.studentId.toLowerCase().includes(search.toLowerCase()))
  );

  const topThree = students.slice(0, 3);
  const remaining = filteredStudents;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-forest-800 border border-emerald-200 text-xs font-bold">
          <Trophy className="w-3.5 h-3.5 text-yellow-600" />
          Campus Sustainability Champions
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Eco Leaderboard
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Recognizing the top students driving environmental sustainability across colleges.
        </p>
      </div>

      {/* Top 3 Podium Highlights */}
      {topThree.length >= 3 && !search && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 max-w-4xl mx-auto items-end">
          {/* Rank 2 - Silver */}
          <div className="order-2 md:order-1 bg-white rounded-3xl p-6 border border-slate-200 shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col items-center text-center relative pt-8">
            <div className="absolute -top-4 w-9 h-9 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center font-extrabold text-slate-700 shadow-sm text-sm">
              2
            </div>
            <img
              src={topThree[1].avatar}
              alt={topThree[1].name}
              className="w-20 h-20 rounded-2xl object-cover ring-4 ring-slate-100 mb-3 shadow-sm"
            />
            <h3 className="text-base font-bold text-gray-900">{topThree[1].name}</h3>
            <p className="text-xs text-gray-500">{topThree[1].department}</p>
            <div className="mt-4 px-4 py-1.5 rounded-full bg-slate-100 text-slate-800 font-extrabold text-sm flex items-center gap-1.5">
              <Award className="w-4 h-4 text-slate-600" />
              <span>{topThree[1].points} pts</span>
            </div>
            <p className="text-[11px] text-gray-400 mt-2">
              {topThree[1].approvedCount} approved actions
            </p>
          </div>

          {/* Rank 1 - Gold (Elevated) */}
          <div className="order-1 md:order-2 bg-gradient-to-b from-amber-50/70 via-white to-white rounded-3xl p-7 border-2 border-amber-300 shadow-soft-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center relative -translate-y-2 pt-9">
            <div className="absolute -top-5 w-11 h-11 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 border-2 border-white flex items-center justify-center text-forest-950 shadow-md">
              <Crown className="w-6 h-6 fill-current text-yellow-900" />
            </div>
            <img
              src={topThree[0].avatar}
              alt={topThree[0].name}
              className="w-24 h-24 rounded-2xl object-cover ring-4 ring-amber-300/40 mb-3 shadow-md"
            />
            <div className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 uppercase tracking-wider mb-1">
              <Flame className="w-3.5 h-3.5" /> Campus #1
            </div>
            <h3 className="text-lg font-extrabold text-gray-900">{topThree[0].name}</h3>
            <p className="text-xs text-gray-500">{topThree[0].department}</p>
            <div className="mt-4 px-5 py-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 text-forest-950 font-black text-base shadow-sm flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              <span>{topThree[0].points} pts</span>
            </div>
            <p className="text-xs text-amber-800 font-semibold mt-2">
              {topThree[0].approvedCount} approved actions
            </p>
          </div>

          {/* Rank 3 - Bronze */}
          <div className="order-3 bg-white rounded-3xl p-6 border border-amber-900/10 shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col items-center text-center relative pt-8">
            <div className="absolute -top-4 w-9 h-9 rounded-full bg-amber-700/20 border-2 border-white flex items-center justify-center font-extrabold text-amber-900 shadow-sm text-sm">
              3
            </div>
            <img
              src={topThree[2].avatar}
              alt={topThree[2].name}
              className="w-20 h-20 rounded-2xl object-cover ring-4 ring-amber-100 mb-3 shadow-sm"
            />
            <h3 className="text-base font-bold text-gray-900">{topThree[2].name}</h3>
            <p className="text-xs text-gray-500">{topThree[2].department}</p>
            <div className="mt-4 px-4 py-1.5 rounded-full bg-amber-100/60 text-amber-900 font-extrabold text-sm flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-700" />
              <span>{topThree[2].points} pts</span>
            </div>
            <p className="text-[11px] text-gray-400 mt-2">
              {topThree[2].approvedCount} approved actions
            </p>
          </div>
        </div>
      )}

      {/* Full Leaderboard Table Card */}
      <div className="bg-white rounded-3xl border border-emerald-950/5 shadow-soft p-6 space-y-6">
        {/* Search & Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-0.5 w-full sm:w-auto">
            <h3 className="text-lg font-bold text-gray-900">Rankings Directory</h3>
            <p className="text-xs text-gray-500">Live rankings updated upon activity approvals</p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by student or department..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-forest-800"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-gray-50/80 border-b border-gray-100 text-gray-500 uppercase tracking-wider font-bold">
              <tr>
                <th scope="col" className="px-6 py-4 w-16 text-center">Rank</th>
                <th scope="col" className="px-6 py-4">Student Name</th>
                <th scope="col" className="px-6 py-4">Department</th>
                <th scope="col" className="px-6 py-4 text-center">Approved Activities</th>
                <th scope="col" className="px-6 py-4 text-right">Total Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {remaining.map((student) => {
                const isCurrentUser = user?.id === student.id || student.email === user?.email;
                return (
                  <tr
                    key={student.id}
                    className={`transition ${
                      isCurrentUser
                        ? 'bg-emerald-50/80 font-semibold ring-1 ring-emerald-300'
                        : 'hover:bg-gray-50/60'
                    }`}
                  >
                    {/* Rank */}
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-black ${
                          student.rank === 1
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : student.rank === 2
                            ? 'bg-slate-200 text-slate-800'
                            : student.rank === 3
                            ? 'bg-amber-700/20 text-amber-900'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {student.rank}
                      </span>
                    </td>

                    {/* Student Info */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-10 h-10 rounded-xl object-cover ring-2 ring-emerald-500/20"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-900">{student.name}</span>
                            {isCurrentUser && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-forest-800 text-white">
                                You
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-gray-400">{student.studentId || 'GC-2024'}</span>
                        </div>
                      </div>
                    </td>

                    {/* Department */}
                    <td className="px-6 py-4 text-gray-600 font-medium">
                      {student.department}
                    </td>

                    {/* Approved count */}
                    <td className="px-6 py-4 text-center font-bold text-gray-800">
                      <span className="inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        {student.approvedCount || 0}
                      </span>
                    </td>

                    {/* Points */}
                    <td className="px-6 py-4 text-right">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-50 text-forest-800 border border-forest-100 font-extrabold text-sm">
                        <Award className="w-4 h-4 text-emerald-600" />
                        {student.points} pts
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

