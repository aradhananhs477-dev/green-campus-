import React from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';
import { ACTIVITY_CATEGORIES } from '../../data/mockData';

export const ActivityFilters = ({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  status,
  onStatusChange,
  onReset,
  totalResults,
}) => {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-emerald-950/5 shadow-soft mb-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
        {/* Search input */}
        <div className="relative lg:col-span-5">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by title, student, or location..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-800 focus:border-transparent bg-gray-50/50"
          />
        </div>

        {/* Category filter */}
        <div className="lg:col-span-3">
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-800 focus:border-transparent bg-gray-50/50 text-gray-700"
          >
            <option value="all">All Categories</option>
            {ACTIVITY_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Status filter */}
        <div className="lg:col-span-3">
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-800 focus:border-transparent bg-gray-50/50 text-gray-700"
          >
            <option value="all">All Verification Statuses</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending Review</option>
            <option value="Rejected">Needs Revision</option>
          </select>
        </div>

        {/* Reset button */}
        <div className="lg:col-span-1 flex justify-end">
          <button
            type="button"
            onClick={onReset}
            title="Reset filters"
            className="w-full lg:w-auto p-2.5 rounded-xl border border-gray-200 text-gray-500 hover:text-forest-800 hover:bg-emerald-50 hover:border-emerald-200 transition flex items-center justify-center gap-1.5 text-xs font-medium"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="lg:hidden">Reset</span>
          </button>
        </div>
      </div>

      {/* Results counter */}
      <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
        <span className="flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-emerald-600" />
          Showing <strong className="text-gray-800">{totalResults}</strong> activities
        </span>
        {(search || category !== 'all' || status !== 'all') && (
          <span className="text-emerald-700 font-medium">Filtered active</span>
        )}
      </div>
    </div>
  );
};

