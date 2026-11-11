import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export const ActivityTrendsChart = ({ data, title = 'Weekly Activity Trends', subtext = 'Submissions and points recorded' }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-emerald-950/5 shadow-soft flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-gray-900">{title}</h3>
          <p className="text-xs text-gray-500">{subtext}</p>
        </div>
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-100">
          Live Track
        </span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#166534" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#166534" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis
              dataKey={data[0]?.day ? 'day' : 'month'}
              tickLine={false}
              axisLine={{ stroke: '#E2E8F0' }}
              tick={{ fill: '#64748B', fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#64748B', fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0F172A',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '12px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
              }}
              labelStyle={{ fontWeight: 'bold', color: '#34D399', marginBottom: '4px' }}
            />
            <Area
              type="monotone"
              dataKey={data[0]?.points !== undefined ? 'points' : 'activities'}
              name={data[0]?.points !== undefined ? 'Points' : 'Activities'}
              stroke="#166534"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorPoints)"
            />
            <Area
              type="monotone"
              dataKey={data[0]?.count !== undefined ? 'count' : 'approved'}
              name={data[0]?.count !== undefined ? 'Actions' : 'Approved'}
              stroke="#10B981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorCount)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-6 mt-3 text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-forest-800" />
          <span>Sustainability Points</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500" />
          <span>Verified Actions</span>
        </div>
      </div>
    </div>
  );
};

