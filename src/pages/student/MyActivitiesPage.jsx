import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useActivities } from '../../context/ActivityContext';
import { ActivityCard } from '../../components/activities/ActivityCard';
import { ActivityFilters } from '../../components/activities/ActivityFilters';
import { ActivityDetailModal } from '../../components/activities/ActivityDetailModal';
import { StatusBadge, CategoryBadge } from '../../components/common/Badge';
import {
  ListTodo,
  LayoutGrid,
  Table as TableIcon,
  PlusCircle,
  Eye,
  Calendar,
  MapPin,
  Award,
} from 'lucide-react';

export const MyActivitiesPage = () => {
  const { user } = useAuth();
  const { activities, approveActivity, rejectActivity } = useActivities();

  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('all');
  const [selectedActivity, setSelectedActivity] = useState(null);

  // Filter student's own activities
  const studentActivities = useMemo(() => {
    return activities.filter((a) => a.studentId === user?.id);
  }, [activities, user]);

  // Apply search and dropdown filters
  const filteredActivities = useMemo(() => {
    return studentActivities.filter((item) => {
      // Category filter
      if (category !== 'all' && item.category.toLowerCase() !== category.toLowerCase()) {
        return false;
      }
      // Status filter
      if (status !== 'all' && item.status.toLowerCase() !== status.toLowerCase()) {
        return false;
      }
      // Search term
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchLoc = item.location.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchLoc) return false;
      }
      return true;
    });
  }, [studentActivities, category, status, search]);

  const handleResetFilters = () => {
    setSearch('');
    setCategory('all');
    setStatus('all');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-forest-800 border border-emerald-100 text-xs font-bold mb-1">
            <ListTodo className="w-3.5 h-3.5 text-emerald-600" />
            Personal Action Log
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            My Submitted Activities
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Review your activity records, verification statuses, and earned points.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="inline-flex rounded-xl bg-gray-100 p-1 border border-gray-200">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg text-xs font-medium transition ${
                viewMode === 'grid'
                  ? 'bg-white text-forest-900 shadow-xs'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
              title="Card Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg text-xs font-medium transition ${
                viewMode === 'table'
                  ? 'bg-white text-forest-900 shadow-xs'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
              title="Table View"
            >
              <TableIcon className="w-4 h-4" />
            </button>
          </div>

          <Link
            to="/student/submit"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-semibold text-xs shadow-xs transition hover:scale-102"
          >
            <PlusCircle className="w-4 h-4 text-emerald-400" />
            <span>Submit New</span>
          </Link>
        </div>
      </div>

      {/* Filter Component */}
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

      {/* List Output: Grid vs Table */}
      {filteredActivities.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-emerald-950/5 shadow-soft space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <ListTodo className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">No matching activities found</h3>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            Try adjusting your search criteria or submit a new eco-friendly activity to get started.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-4 py-2 rounded-xl text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
            >
              Clear Filters
            </button>
            <Link
              to="/student/submit"
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-forest-800 hover:bg-forest-900 transition"
            >
              Submit Activity
            </Link>
          </div>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onViewDetails={setSelectedActivity}
            />
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-3xl border border-emerald-950/5 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-700">
              <thead className="bg-gray-50/80 border-b border-gray-100 text-gray-500 uppercase tracking-wider font-bold">
                <tr>
                  <th scope="col" className="px-6 py-4">Activity Name & Location</th>
                  <th scope="col" className="px-6 py-4">Category</th>
                  <th scope="col" className="px-6 py-4">Date</th>
                  <th scope="col" className="px-6 py-4">Status</th>
                  <th scope="col" className="px-6 py-4">Points</th>
                  <th scope="col" className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredActivities.map((act) => (
                  <tr key={act.id} className="hover:bg-gray-50/60 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={act.proofImage}
                          alt={act.title}
                          className="w-10 h-10 rounded-xl object-cover ring-1 ring-gray-200"
                        />
                        <div>
                          <p className="font-bold text-gray-900 line-clamp-1">{act.title}</p>
                          <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-emerald-600" />
                            {act.location}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <CategoryBadge category={act.category} />
                    </td>
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                      {new Date(act.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={act.status} />
                    </td>
                    <td className="px-6 py-4 font-bold text-forest-800">
                      {act.points > 0 ? (
                        <span className="inline-flex items-center gap-1">
                          <Award className="w-3.5 h-3.5 text-emerald-600" />
                          +{act.points}
                        </span>
                      ) : (
                        <span className="text-gray-400 font-normal">Pending</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedActivity(act)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-forest-50 hover:bg-forest-100 text-forest-800 transition"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Details Modal */}
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

