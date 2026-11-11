import React from 'react';
import { TreePine, Droplets, Zap, Trash2, Wind, Users } from 'lucide-react';
import { IMPACT_METRICS } from '../../data/mockData';

export const ImpactMetricsGrid = ({ metrics = IMPACT_METRICS }) => {
  const cards = [
    {
      label: 'CO₂ Emissions Offset',
      value: `${(metrics.co2SavedKg || 14250).toLocaleString()} kg`,
      sub: 'Equivalent to 310 car trips avoided',
      icon: Wind,
      color: 'text-emerald-700',
      bg: 'bg-emerald-50',
      border: 'border-emerald-100',
    },
    {
      label: 'Trees & Saplings Planted',
      value: `${(metrics.treesPlanted || 780).toLocaleString()}`,
      sub: 'Across 4 campus micro-forest plots',
      icon: TreePine,
      color: 'text-forest-800',
      bg: 'bg-forest-50',
      border: 'border-forest-100',
    },
    {
      label: 'Plastic & Waste Diverted',
      value: `${(metrics.wasteDivertedKg || 4120).toLocaleString()} kg`,
      sub: 'Composted & recycled materials',
      icon: Trash2,
      color: 'text-teal-700',
      bg: 'bg-teal-50',
      border: 'border-teal-100',
    },
    {
      label: 'Campus Water Conserved',
      value: `${(metrics.waterSavedLiters || 44200).toLocaleString()} L`,
      sub: 'Rainwater & faucet aerator audits',
      icon: Droplets,
      color: 'text-sky-700',
      bg: 'bg-sky-50',
      border: 'border-sky-100',
    },
    {
      label: 'Clean Energy Saved',
      value: `${(metrics.energySavedKwh || 11450).toLocaleString()} kWh`,
      sub: 'LED audits and solar charging arrays',
      icon: Zap,
      color: 'text-amber-700',
      bg: 'bg-amber-50',
      border: 'border-amber-100',
    },
    {
      label: 'Active Student Changemakers',
      value: `${(metrics.activeStudents || 348).toLocaleString()}`,
      sub: 'Representing 14 university clubs',
      icon: Users,
      color: 'text-indigo-700',
      bg: 'bg-indigo-50',
      border: 'border-indigo-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((item, i) => {
        const Icon = item.icon;
        return (
          <div
            key={i}
            className={`p-5 rounded-2xl bg-white border ${item.border} shadow-soft hover:shadow-soft-lg transition-all duration-300 relative overflow-hidden group`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {item.label}
                </p>
                <h4 className="text-2xl font-extrabold text-gray-900 mt-1">
                  {item.value}
                </h4>
              </div>
              <div className={`p-3 rounded-xl ${item.bg} ${item.color} group-hover:scale-110 transition-transform`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {item.sub}
            </p>
          </div>
        );
      })}
    </div>
  );
};

