import React, { useState, useEffect } from 'react';
import { statsService } from '../../services/statsService';
import { ImpactMetricsGrid } from '../../components/charts/ImpactMetricsGrid';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import {
  BarChart3,
  Download,
  Calendar,
  FileCheck,
  TreePine,
  Sparkles,
  Printer,
} from 'lucide-react';

export const ReportsPage = () => {
  const [reportsData, setReportsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      const data = await statsService.getReportsData();
      setReportsData(data);
      setLoading(false);
    };
    fetchReports();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-forest-800 border border-emerald-100 text-xs font-bold mb-1">
            <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
            Institutional Audit & ESG Intelligence
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Sustainability & Impact Reports
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Comprehensive audit metrics, participation benchmarks, and category breakdown.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold transition shadow-xs"
          >
            <Printer className="w-4 h-4 text-gray-500" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Environmental Impact Statistics Section */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
          <TreePine className="w-4 h-4 text-emerald-600" />
          Campus Environmental Impact Summary
        </h3>
        <ImpactMetricsGrid metrics={reportsData?.impact} />
      </div>

      {/* Recharts Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Monthly Participation Bar Chart */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-emerald-950/5 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-gray-900">Monthly Student Participation</h3>
              <p className="text-xs text-gray-500">Total activities submitted vs approved per month</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
              H2 2026 Audit
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={reportsData?.monthlyTrends || []}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="month" tickLine={false} axisLine={{ stroke: '#E2E8F0' }} tick={{ fontSize: 12, fill: '#64748B' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderRadius: '12px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="activities" name="Total Submissions" fill="#166534" radius={[6, 6, 0, 0]} />
                <Bar dataKey="approved" name="Verified Approved" fill="#10B981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-6 pt-2 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-md bg-forest-800" />
              <span>Total Submissions</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-md bg-emerald-500" />
              <span>Verified Approved</span>
            </div>
          </div>
        </div>

        {/* Approved vs Pending Review Donut Chart */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-emerald-950/5 shadow-soft space-y-4">
          <div>
            <h3 className="text-base font-bold text-gray-900">Verification Status Ratio</h3>
            <p className="text-xs text-gray-500">Distribution of approved vs pending vs revision needed</p>
          </div>

          <div className="h-72 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={reportsData?.statusComparison || []}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={88}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {(reportsData?.statusComparison || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderRadius: '12px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-2 border-t border-gray-100">
            {(reportsData?.statusComparison || []).map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-gray-600">{item.name}</span>
                </div>
                <span className="font-bold text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category-Wise Contributions Bar Graph */}
      <div className="bg-white rounded-3xl p-6 border border-emerald-950/5 shadow-soft space-y-4">
        <div>
          <h3 className="text-base font-bold text-gray-900">Category-Wise Action Breakdown</h3>
          <p className="text-xs text-gray-500">Number of verified contributions across all 7 environmental streams</p>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={reportsData?.categoryDistribution || []}
              layout="vertical"
              margin={{ top: 10, right: 20, left: 60, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
              <XAxis type="number" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
              <YAxis
                type="category"
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: '#1F2937' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0F172A',
                  borderRadius: '12px',
                  border: 'none',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="activities" name="Activities" fill="#166534" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

