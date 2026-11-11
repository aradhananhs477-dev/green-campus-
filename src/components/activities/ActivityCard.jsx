import React from 'react';
import { StatusBadge, CategoryBadge } from '../common/Badge';
import { Calendar, MapPin, Award, Eye, User } from 'lucide-react';

export const ActivityCard = ({ activity, onViewDetails, showStudent = false }) => {
  return (
    <div className="bg-white rounded-2xl border border-emerald-950/5 shadow-soft hover:shadow-soft-lg transition-all duration-300 overflow-hidden flex flex-col group">
      {/* Proof Image Banner */}
      <div className="relative h-44 w-full bg-gray-100 overflow-hidden">
        <img
          src={activity.proofImage}
          alt={activity.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <CategoryBadge category={activity.category} className="bg-white/90 backdrop-blur-xs font-semibold shadow-xs" />
          <StatusBadge status={activity.status} />
        </div>

        {/* Bottom image overlay details */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
          <span className="flex items-center gap-1 drop-shadow-sm font-medium">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span className="truncate max-w-[180px]">{activity.location}</span>
          </span>
          {activity.points > 0 && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/90 text-white font-bold backdrop-blur-xs shadow-xs">
              <Award className="w-3.5 h-3.5" />
              +{activity.points} pts
            </span>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {showStudent && (
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
              <img
                src={activity.studentAvatar}
                alt={activity.studentName}
                className="w-5 h-5 rounded-full object-cover ring-1 ring-emerald-500/30"
              />
              <span className="font-semibold text-gray-800">{activity.studentName}</span>
            </div>
          )}

          <h3 className="text-base font-bold text-gray-900 group-hover:text-forest-800 transition line-clamp-1">
            {activity.title}
          </h3>

          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
            {activity.description}
          </p>
        </div>

        <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            <span>{new Date(activity.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>

          <button
            type="button"
            onClick={() => onViewDetails(activity)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-forest-50 hover:bg-forest-100 text-forest-800 text-xs font-bold transition group/btn"
          >
            <Eye className="w-3.5 h-3.5 text-forest-700" />
            <span>Details</span>
          </button>
        </div>
      </div>
    </div>
  );
};

