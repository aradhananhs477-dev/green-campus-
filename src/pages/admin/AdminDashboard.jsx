import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useActivities } from '../../context/ActivityContext';
import { statsService } from '../../services/statsService';
import { StatCard } from '../../components/common/StatCard';
import { ActivityTrendsChart } from '../../components/charts/ActivityTrendsChart';
import { CategoryPieChart } from '../../components/charts/CategoryPieChart';
import { ActivityDetailModal } from '../../components/activities/ActivityDetailModal';
import { StatusBadge, CategoryBadge } from '../../components/common/Badge';
import {
  ShieldCheck,
  Users,
  ListTodo,
  Clock,
  CheckCircle2,
  Award,
  ArrowRight,
  Sparkles,
  BarChart3,
  Calendar,
  Eye,
  AlertCircle,
} from 'lucide-react';

export const AdminDashboard = () => {
  const { user } = useAuth();
  const { activities, approveActivity, rejectActivity } = useActivities();
  const [stats, setStats] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStats = async () => {
      const data = await statsService.getAdminStats();
      setStats(data);
      setLoading(false);
    };
    fetchAdminStats();
  }, [activities]);

  const pendingList = activities.filter((a) => a.status === 'Pending');
  const approvedList = activities.filter((a) => a.status === 'Approved');
  const totalPoints = approvedList.reduce((acc, a) => acc + (Number(a.points) || 0), 0) + 12450;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Admin Top Banner */}
      <div className="bg-gradient-to-br from-forest-900 via-forest-800 to-forest-950 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-soft-lg">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              Administrative Verification Desk
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome, {user?.name || 'Dr. Sunita Rao'}
            </h1>
            <p className="text-sm text-emerald-100/80 leading-relaxed">
              Monitor student sustainability submissions, review photo evidence, assign eco-points, and audit campus-wide environmental targets.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <Link
              to="/admin/activities"
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-bold text-sm shadow-md transition hover:scale-102"
            >
              <Clock className="w-4 h-4" />
              <span>Review {pendingList.length} Pending</span>
            </Link>
            <Link
              to="/admin/reports"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-md border border-white/20 transition"
            >
              <BarChart3 className="w-4 h-4 text-emerald-300" />
              Audit Reports
            </Link>
          </div>
        </div>
      </div>

      {/* 5 Admin Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Registered Students"
          value={stats?.totalStudents || 348}
          subtext="Active across departments"
          icon={Users}
          iconColor="text-indigo-600"
          iconBg="bg-indigo-50"
        />
        <StatCard
          title="Total Activities"
          value={(stats?.totalActivities || 420) + activities.length}
          subtext="All campus submissions"
          icon={ListTodo}
          iconColor="text-forest-800"
          iconBg="bg-forest-50"
        />
        <StatCard
          title="Pending Approvals"
          value={pendingList.length}
          subtext="Requires verification"
          icon={Clock}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
          trend={pendingList.length > 0 ? 'Action needed' : 'All clear'}
          trendType={pendingList.length > 0 ? 'negative' : 'positive'}
        />
        <StatCard
          title="Approved Activities"
          value={approvedList.length + 390}
          subtext="Verified & credited"
          icon={CheckCircle2}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
        />
        <StatCard
          title="Campus Points"
          value={totalPoints.toLocaleString()}
          subtext="Distributed sustainability credits"
          icon={Award}
          iconColor="text-teal-700"
          iconBg="bg-teal-50"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          <ActivityTrendsChart
            data={stats?.monthlyTrends || []}
            title="Monthly Campus Sustainability Velocity"
            subtext="Track activity volume and awarded points month-over-month"
          />
        </div>

        <div className="lg:col-span-5">
          <CategoryPieChart
            data={stats?.categoryStats || []}
            title="Category-Wise Action Breakdown"
            subtext="Distribution across campus environmental initiatives"
          />
        </div>
      </div>

      {/* Pending Approvals Review Queue */}
      <div className="bg-white rounded-3xl border border-emerald-950/5 shadow-soft p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-500" />
              Pending Verification Queue
            </h3>
            <p className="text-xs text-gray-500">Activities waiting for faculty approval and points assignment</p>
          </div>
          <Link
            to="/admin/activities"
            className="text-xs font-bold text-forest-800 hover:text-emerald-700 flex items-center gap-1"
          >
            <span>Manage All ({activities.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {pendingList.length === 0 ? (
          <div className="p-8 text-center bg-emerald-50/50 rounded-2xl border border-emerald-100 space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="text-sm font-bold text-gray-900">All submissions are verified!</h4>
            <p className="text-xs text-gray-500">
              There are no pending student actions awaiting review right now.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {pendingList.slice(0, 5).map((act) => (
              <div
                key={act.id}
                className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-gray-50/60 p-2 rounded-xl transition"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={act.proofImage}
                    alt={act.title}
                    className="w-12 h-12 rounded-xl object-cover ring-1 ring-gray-200 flex-shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <CategoryBadge category={act.category} />
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">
                        By <strong className="text-gray-800">{act.studentName}</strong>
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-gray-900 line-clamp-1">{act.title}</h4>
                    <span className="text-[11px] text-gray-400">
                      Location: {act.location} • Submitted: {new Date(act.submissionDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => setSelectedActivity(act)}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-forest-800 hover:bg-forest-900 text-white shadow-xs transition"
                  >
                    Review & Verify
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Review Modal */}
      <ActivityDetailModal
        activity={selectedActivity}
        isOpen={!!selectedActivity}
        onClose={() => setSelectedActivity(null)}
        onApprove={approveActivity}
        onReject={rejectActivity}
      />
    </div>
  );
};

