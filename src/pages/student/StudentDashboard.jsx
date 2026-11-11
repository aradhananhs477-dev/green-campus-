import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useActivities } from '../../context/ActivityContext';
import { statsService } from '../../services/statsService';
import { StatCard } from '../../components/common/StatCard';
import { ActivityTrendsChart } from '../../components/charts/ActivityTrendsChart';
import { ActivityDetailModal } from '../../components/activities/ActivityDetailModal';
import { StatusBadge, CategoryBadge } from '../../components/common/Badge';
import {
  Sparkles,
  CheckCircle2,
  Clock,
  Award,
  ListTodo,
  PlusCircle,
  Trophy,
  ArrowRight,
  Target,
  Calendar,
  MapPin,
  TrendingUp,
} from 'lucide-react';

export const StudentDashboard = () => {
  const { user } = useAuth();
  const { activities, approveActivity, rejectActivity } = useActivities();
  const [stats, setStats] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (user?.id) {
        const data = await statsService.getStudentStats(user.id);
        setStats(data);
      }
      setLoading(false);
    };
    fetchStats();
  }, [user, activities]);

  // Filter current user's activities
  const userActivities = activities.filter((a) => a.studentId === user?.id);
  const approvedList = userActivities.filter((a) => a.status === 'Approved');
  const pendingList = userActivities.filter((a) => a.status === 'Pending');

  const earnedPoints = approvedList.reduce((acc, a) => acc + (Number(a.points) || 0), 0);
  const effectivePoints = Math.max(user?.points || 0, earnedPoints);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome Hero Banner */}
      <div className="bg-gradient-to-br from-forest-900 via-forest-800 to-forest-950 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-soft-lg">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              Green Student Champion
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome Back, {user?.name || 'Aarav'}! 🌿
            </h1>
            <p className="text-sm text-emerald-100/80 leading-relaxed">
              You have contributed to campus zero-waste, tree plantations, and water preservation drives. Track your milestones and log your latest eco-action today.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <Link
              to="/student/submit"
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-bold text-sm shadow-md transition hover:scale-102"
            >
              <PlusCircle className="w-4 h-4" />
              Log New Action
            </Link>
            <Link
              to="/student/leaderboard"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-md border border-white/20 transition"
            >
              <Trophy className="w-4 h-4 text-yellow-300" />
              View Rank
            </Link>
          </div>
        </div>
      </div>

      {/* Four Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Submissions"
          value={userActivities.length}
          subtext="Actions logged this semester"
          icon={ListTodo}
          iconColor="text-forest-800"
          iconBg="bg-forest-50"
          trend="+2 this week"
          trendType="positive"
        />
        <StatCard
          title="Approved Activities"
          value={approvedList.length}
          subtext="Verified by faculty chairs"
          icon={CheckCircle2}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
          trend={`${Math.round((approvedList.length / (userActivities.length || 1)) * 100)}% approval rate`}
          trendType="positive"
        />
        <StatCard
          title="Pending Approvals"
          value={pendingList.length}
          subtext="Awaiting admin verification"
          icon={Clock}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
          trend={pendingList.length > 0 ? 'Under faculty review' : 'All up to date'}
          trendType="positive"
        />
        <StatCard
          title="Sustainability Points"
          value={effectivePoints}
          subtext="Earned for campus credits"
          icon={Award}
          iconColor="text-teal-700"
          iconBg="bg-teal-50"
          trend="Top 5% student rank"
          trendType="positive"
        />
      </div>

      {/* Charts & Goals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Weekly Activity Trends Chart */}
        <div className="lg:col-span-7">
          <ActivityTrendsChart
            data={stats?.weeklyActivity || []}
            title="Weekly Activity & Points Velocity"
            subtext="Your logged actions and points awarded over the last 7 days"
          />
        </div>

        {/* Campus Sustainability Goals Progress */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-emerald-950/5 shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <Target className="w-4 h-4 text-emerald-600" />
                  Campus Goal Milestones
                </h3>
                <p className="text-xs text-gray-500">How student efforts push university targets</p>
              </div>
              <span className="text-xs font-bold text-forest-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                Active 2026
              </span>
            </div>

            <div className="space-y-4">
              {(stats?.goals || []).map((goal) => {
                const percent = Math.min(100, Math.round((goal.current / goal.target) * 100));
                return (
                  <div key={goal.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-gray-800">{goal.title}</span>
                      <span className="text-gray-500 font-semibold">{percent}%</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-forest-800 h-full rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-gray-400">
                      <span>{goal.current.toLocaleString()} / {goal.target.toLocaleString()} {goal.unit}</span>
                      <span>Target: {goal.deadline}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs">
            <span className="text-gray-500">Want to help achieve goals faster?</span>
            <Link to="/student/submit" className="font-bold text-forest-800 hover:text-emerald-600 flex items-center gap-1">
              Submit action <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activities Section */}
      <div className="bg-white rounded-2xl p-6 border border-emerald-950/5 shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Recent Sustainability Actions</h3>
            <p className="text-xs text-gray-500">Your latest logged entries and verification statuses</p>
          </div>
          <Link
            to="/student/activities"
            className="inline-flex items-center gap-1 text-xs font-bold text-forest-800 hover:text-emerald-700 transition"
          >
            <span>View All ({userActivities.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {userActivities.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200 space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <PlusCircle className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-gray-900">No activities submitted yet</h4>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              Get started by planting a tree, segregating cafeteria waste, or tracking water savings.
            </p>
            <Link
              to="/student/submit"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-forest-800 text-white text-xs font-bold shadow-xs hover:bg-forest-900 transition"
            >
              Submit Your First Activity
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {userActivities.slice(0, 5).map((act) => (
              <div
                key={act.id}
                className="py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-gray-50/60 p-2 rounded-xl transition"
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
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(act.date).toLocaleDateString()}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-gray-900 line-clamp-1">{act.title}</h4>
                    <span className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-emerald-600" />
                      {act.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <StatusBadge status={act.status} />
                  {act.points > 0 && (
                    <span className="text-xs font-bold text-forest-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                      +{act.points} pts
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => setSelectedActivity(act)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Activity Details Modal */}
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

