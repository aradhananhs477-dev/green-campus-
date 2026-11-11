import React, { useState, useMemo } from 'react';
import { useActivities } from '../../context/ActivityContext';
import { ActivityCard } from '../../components/activities/ActivityCard';
import { ActivityFilters } from '../../components/activities/ActivityFilters';
import { ActivityDetailModal } from '../../components/activities/ActivityDetailModal';
import { StatusBadge, CategoryBadge } from '../../components/common/Badge';
import {
  ShieldCheck,
  CheckCircle,
  XCircle,
  Eye,
  Calendar,
  MapPin,
  Award,
  Clock,
  LayoutGrid,
  Table as TableIcon,
  RotateCcw,
} from 'lucide-react';

export const ManageActivitiesPage = () => {
  const { activities, approveActivity, rejectActivity, resetData } = useActivities();

  const [viewMode, setViewMode] = useState('table'); // default table for quick admin auditing
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('all');
  const [selectedActivity, setSelectedActivity] = useState(null);

  // Quick points assignment state for inline table approvals
  const [inlinePoints, setInlinePoints] = useState({});

  const filteredActivities = useMemo(() => {
    return activities.filter((item) => {
      if (category !== 'all' && item.category.toLowerCase() !== category.toLowerCase()) {
        return false;
      }
      if (status !== 'all' && item.status.toLowerCase() !== status.toLowerCase()) {
        return false;
      }
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchStudent = (item.studentName || '').toLowerCase().includes(q);
        const matchLoc = item.location.toLowerCase().includes(q);
        if (!matchTitle && !matchStudent && !matchLoc) return false;
      }
      return true;
    });
  }, [activities, category, status, search]);

  const handleResetFilters = () => {
    setSearch('');
    setCategory('all');
    setStatus('all');
  };

  const handleQuickApprove = async (id, defaultPoints) => {
    const pts = inlinePoints[id] || defaultPoints || 30;
    await approveActivity(id, pts);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-forest-800 border border-emerald-100 text-xs font-bold mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Verification Central
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Manage Campus Activities
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Review submitted photo evidence, assign points, and manage approvals.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View mode toggle */}
          <div className="inline-flex rounded-xl bg-gray-100 p-1 border border-gray-200">
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg text-xs font-medium transition ${
                viewMode === 'table' ? 'bg-white text-forest-900 shadow-xs' : 'text-gray-500 hover:text-gray-800'
              }`}
              title="Audit Table"
            >
              <TableIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg text-xs font-medium transition ${
                viewMode === 'grid' ? 'bg-white text-forest-900 shadow-xs' : 'text-gray-500 hover:text-gray-800'
              }`}
              title="Card Grid"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={resetData}
            title="Reset demo data to initial state"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-semibold text-gray-600 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <ActivityFilters
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        status={status}
        onStatusChange={setStatus}
        onReset={handleResetFilters}
        totalResults={filteredActivities.length}
      />

      {/* Activity List: Table vs Grid */}
      {filteredActivities.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-emerald-950/5 shadow-soft space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-gray-900">No matching activities found</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Try resetting your search query or status filter to see all submissions.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-forest-800 text-white text-xs font-bold"
          >
            Clear Filters
          </button>
        </div>
      ) : viewMode === 'table' ? (
        <div className="bg-white rounded-3xl border border-emerald-950/5 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-700">
              <thead className="bg-gray-50/80 border-b border-gray-100 text-gray-500 uppercase tracking-wider font-bold">
                <tr>
                  <th scope="col" className="px-6 py-4">Student & Activity</th>
                  <th scope="col" className="px-6 py-4">Category</th>
                  <th scope="col" className="px-6 py-4">Date & Place</th>
                  <th scope="col" className="px-6 py-4">Status</th>
                  <th scope="col" className="px-6 py-4">Assigned Points</th>
                  <th scope="col" className="px-6 py-4 text-right">Verification Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredActivities.map((act) => {
                  const isPending = act.status === 'Pending';
                  return (
                    <tr key={act.id} className="hover:bg-gray-50/60 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={act.proofImage}
                            alt={act.title}
                            className="w-12 h-12 rounded-xl object-cover ring-1 ring-gray-200 cursor-pointer hover:opacity-90"
                            onClick={() => setSelectedActivity(act)}
                          />
                          <div>
                            <p className="font-bold text-gray-900 line-clamp-1">{act.title}</p>
                            <div className="flex items-center gap-2 mt-0.5 text-[11px] text-gray-500">
                              <span className="font-semibold text-forest-800">{act.studentName}</span>
                              <span>•</span>
                              <span>{act.studentEmail}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <CategoryBadge category={act.category} />
                      </td>

                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-800">{new Date(act.date).toLocaleDateString()}</p>
                        <p className="text-[11px] text-gray-400 truncate max-w-[150px]">{act.location}</p>
                      </td>

                      <td className="px-6 py-4">
                        <StatusBadge status={act.status} />
                      </td>

                      <td className="px-6 py-4">
                        {isPending ? (
                          <div className="flex items-center gap-1.5">
                            <input
                              type="number"
                              min="5"
                              max="200"
                              step="5"
                              value={inlinePoints[act.id] !== undefined ? inlinePoints[act.id] : act.points || 30}
                              onChange={(e) =>
                                setInlinePoints({ ...inlinePoints, [act.id]: Number(e.target.value) })
                              }
                              className="w-16 px-2 py-1 rounded-lg border border-gray-300 text-xs font-bold text-forest-900 focus:outline-none focus:ring-1 focus:ring-forest-800"
                            />
                            <span className="text-[11px] text-gray-400">pts</span>
                          </div>
                        ) : (
                          <span className="font-bold text-forest-800">
                            {act.points > 0 ? `+${act.points} pts` : '0 pts'}
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {isPending && (
                            <>
                              <button
                                type="button"
                                onClick={() => handleQuickApprove(act.id, act.points)}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-forest-800 hover:bg-forest-900 text-white font-bold text-xs shadow-xs transition"
                                title="Approve"
                              >
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-300" />
                                <span>Approve</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => setSelectedActivity(act)}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs border border-rose-200 transition"
                                title="Reject / Provide Reason"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}

                          <button
                            type="button"
                            onClick={() => setSelectedActivity(act)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs transition"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Details</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onViewDetails={setSelectedActivity}
              showStudent={true}
            />
          ))}
        </div>
      )}

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

