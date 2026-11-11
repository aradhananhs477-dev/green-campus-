import React, { useState, useEffect } from 'react';
import { userService } from '../../services/userService';
import {
  Users,
  Search,
  Award,
  CheckCircle2,
  Mail,
  Building2,
  GraduationCap,
  Sparkles,
} from 'lucide-react';

export const ManageStudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const data = await userService.getStudents();
        setStudents(data);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      (s.department && s.department.toLowerCase().includes(search.toLowerCase())) ||
      (s.studentId && s.studentId.toLowerCase().includes(search.toLowerCase())) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-forest-800 border border-emerald-100 text-xs font-bold mb-1">
            <Users className="w-3.5 h-3.5 text-emerald-600" />
            Student Cohort Registry
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Manage Registered Students
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            View student engagement, earned sustainability points, and department distribution.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by student, ID, or school..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-forest-800 bg-white"
          />
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-3xl border border-emerald-950/5 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-gray-50/80 border-b border-gray-100 text-gray-500 uppercase tracking-wider font-bold">
              <tr>
                <th scope="col" className="px-6 py-4">Student Profile</th>
                <th scope="col" className="px-6 py-4">Department & Year</th>
                <th scope="col" className="px-6 py-4">Student ID</th>
                <th scope="col" className="px-6 py-4 text-center">Approved Actions</th>
                <th scope="col" className="px-6 py-4">Earned Points</th>
                <th scope="col" className="px-6 py-4">Status & Badges</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50/60 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-10 h-10 rounded-xl object-cover ring-2 ring-emerald-500/20"
                      />
                      <div>
                        <p className="font-bold text-gray-900">{student.name}</p>
                        <p className="text-[11px] text-gray-400">{student.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-800">{student.department}</p>
                    <p className="text-[11px] text-gray-400">{student.year || 'Undergraduate'}</p>
                  </td>

                  <td className="px-6 py-4 font-mono text-gray-500">
                    {student.studentId || 'GC-2024'}
                  </td>

                  <td className="px-6 py-4 text-center font-bold text-gray-900">
                    <span className="inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      {student.approvedCount || 0}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-50 text-forest-800 border border-forest-100 font-extrabold text-xs">
                      <Award className="w-3.5 h-3.5 text-emerald-600" />
                      {student.points} pts
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {(student.badges || ['Eco Member']).map((b) => (
                        <span
                          key={b}
                          className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-semibold border border-emerald-100"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

