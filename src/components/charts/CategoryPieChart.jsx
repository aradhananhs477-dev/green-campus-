import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export const CategoryPieChart = ({
  data,
  title = 'Category-Wise Contributions',
  subtext = 'Breakdown of campus sustainability actions',
}) => {
  const COLORS = ['#166534', '#059669', '#0D9488', '#0284C7', '#D97706', '#6366F1', '#10B981'];

  return (
    <div className="bg-white rounded-2xl p-6 border border-emerald-950/5 shadow-soft flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-base font-bold text-gray-900">{title}</h3>
          <p className="text-xs text-gray-500">{subtext}</p>
        </div>
      </div>

      <div className="h-64 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={4}
              dataKey={data[0]?.count !== undefined ? 'count' : 'activities'}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color || COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#0F172A',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '12px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend list */}
      <div className="grid grid-cols-2 gap-2 mt-2 pt-3 border-t border-gray-100 text-xs">
        {data.slice(0, 6).map((item, idx) => (
          <div key={item.name} className="flex items-center gap-2 truncate">
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: item.color || COLORS[idx % COLORS.length] }}
            />
            <span className="text-gray-600 truncate">{item.name}</span>
            <span className="font-bold text-gray-900 ml-auto">
              {item.count ?? item.activities}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

