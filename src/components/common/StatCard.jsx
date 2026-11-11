import React from 'react';

export const StatCard = ({
  title,
  value,
  subtext,
  icon: Icon,
  iconColor = 'text-emerald-600',
  iconBg = 'bg-emerald-50',
  trend,
  trendType = 'positive',
  className = '',
}) => {
  return (
    <div
      className={`bg-white rounded-2xl p-6 border border-emerald-950/5 shadow-soft hover:shadow-soft-lg transition-all duration-300 relative overflow-hidden group ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</p>
          <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">{value}</h3>
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl ${iconBg} ${iconColor} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>

      {(subtext || trend) && (
        <div className="mt-4 flex items-center gap-2 text-xs">
          {trend && (
            <span
              className={`inline-flex items-center font-semibold px-2 py-0.5 rounded-full ${
                trendType === 'positive'
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-rose-50 text-rose-700'
              }`}
            >
              {trend}
            </span>
          )}
          {subtext && <span className="text-gray-500 font-normal">{subtext}</span>}
        </div>
      )}

      {/* Subtle bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-forest-800/10 via-emerald-500/20 to-transparent group-hover:from-forest-800 group-hover:via-emerald-500 transition-all duration-500" />
    </div>
  );
};

