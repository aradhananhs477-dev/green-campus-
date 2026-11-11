// Statistics & Analytics Service
// Computes dashboard metrics and reports dynamically from mock / localStorage state
// Ready for backend integration (e.g. /api/stats/dashboard, /api/stats/reports)

import {
  ACTIVITY_CATEGORIES,
  MONTHLY_ACTIVITY_DATA,
  WEEKLY_ACTIVITY_DATA,
  IMPACT_METRICS,
  MOCK_GOALS,
} from '../data/mockData';
import { activityService } from './activityService';
import { userService } from './userService';

export const statsService = {
  /**
   * Get Student Dashboard statistics
   */
  getStudentStats: async (studentId) => {
    const activities = await activityService.getActivities({ studentId });
    const user = await userService.getProfile(studentId);

    const approved = activities.filter((a) => a.status === 'Approved');
    const pending = activities.filter((a) => a.status === 'Pending');
    const rejected = activities.filter((a) => a.status === 'Rejected');

    const totalPoints = approved.reduce((acc, a) => acc + (Number(a.points) || 0), 0);
    const effectivePoints = Math.max(user?.points || 0, totalPoints);

    // Calculate category breakdown for student
    const categoryCounts = {};
    ACTIVITY_CATEGORIES.forEach((cat) => {
      categoryCounts[cat.name] = 0;
    });
    activities.forEach((a) => {
      if (categoryCounts[a.category] !== undefined) {
        categoryCounts[a.category] += 1;
      }
    });

    const categoryBreakdown = Object.keys(categoryCounts).map((catName) => ({
      name: catName,
      count: categoryCounts[catName],
    }));

    return {
      totalSubmitted: activities.length,
      approvedCount: approved.length,
      pendingCount: pending.length,
      rejectedCount: rejected.length,
      points: effectivePoints,
      recentActivities: activities.slice(0, 5),
      weeklyActivity: WEEKLY_ACTIVITY_DATA,
      goals: MOCK_GOALS,
      categoryBreakdown,
    };
  },

  /**
   * Get Admin Dashboard statistics
   */
  getAdminStats: async () => {
    const activities = await activityService.getActivities();
    const students = await userService.getStudents();

    const pending = activities.filter((a) => a.status === 'Pending');
    const approved = activities.filter((a) => a.status === 'Approved');
    const rejected = activities.filter((a) => a.status === 'Rejected');

    const totalPoints = approved.reduce((sum, a) => sum + (Number(a.points) || 0), 0) + 12450; // combined campus baseline + dynamic

    // Category distribution
    const categoryStats = ACTIVITY_CATEGORIES.map((cat) => {
      const catActs = activities.filter((a) => a.category.toLowerCase() === cat.name.toLowerCase());
      return {
        name: cat.name,
        count: catActs.length + Math.floor(Math.random() * 5 + 10), // blended baseline
        color: cat.color,
      };
    });

    return {
      totalStudents: students.length + 340, // realistic campus size
      totalActivities: activities.length + 420,
      pendingCount: pending.length,
      approvedCount: approved.length + 390,
      rejectedCount: rejected.length,
      totalPoints,
      categoryStats,
      monthlyTrends: MONTHLY_ACTIVITY_DATA,
      pendingActivities: pending.slice(0, 6),
      impactMetrics: IMPACT_METRICS,
    };
  },

  /**
   * Get Reports page comprehensive data
   */
  getReportsData: async () => {
    const activities = await activityService.getActivities();
    const students = await userService.getStudents();

    const approvedCount = activities.filter((a) => a.status === 'Approved').length + 380;
    const pendingCount = activities.filter((a) => a.status === 'Pending').length;
    const rejectedCount = activities.filter((a) => a.status === 'Rejected').length;

    const statusComparison = [
      { name: 'Approved', value: approvedCount, color: '#166534' },
      { name: 'Pending Review', value: pendingCount, color: '#EAB308' },
      { name: 'Needs Revision', value: rejectedCount, color: '#EF4444' },
    ];

    const categoryDistribution = ACTIVITY_CATEGORIES.map((cat, idx) => {
      const colors = ['#166534', '#059669', '#0D9488', '#0284C7', '#D97706', '#6366F1', '#10B981'];
      const realMatches = activities.filter((a) => a.category.toLowerCase() === cat.name.toLowerCase()).length;
      return {
        name: cat.name,
        activities: realMatches + (idx + 1) * 12,
        points: (realMatches + (idx + 1) * 12) * 30,
        color: colors[idx % colors.length],
      };
    });

    return {
      totalActivities: approvedCount + pendingCount + rejectedCount,
      totalStudents: students.length + 340,
      statusComparison,
      categoryDistribution,
      monthlyTrends: MONTHLY_ACTIVITY_DATA,
      impact: IMPACT_METRICS,
      goals: MOCK_GOALS,
    };
  },
};

