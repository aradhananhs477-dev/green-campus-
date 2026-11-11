// User Service
// Handles student profiles, leaderboard rankings, and student management
// Ready for backend integration (e.g. /api/users/leaderboard, /api/users)

import { INITIAL_STUDENTS } from '../data/mockData';
import { initUsersStorage } from './authService';

const USERS_STORAGE_KEY = 'greencampus_registered_users';

export const userService = {
  /**
   * Get leaderboard rankings
   * Future: return axios.get(`${API_URL}/users/leaderboard`).then(r => r.data);
   */
  getLeaderboard: async () => {
    initUsersStorage();
    await new Promise((resolve) => setTimeout(resolve, 200));

    const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
    const activities = JSON.parse(localStorage.getItem('greencampus_activities') || '[]');

    // Filter to only students
    const students = users.filter((u) => u.role === 'student');

    // Aggregate dynamic stats from activities
    const calculated = students.map((student) => {
      const studentActs = activities.filter((a) => a.studentId === student.id);
      const approvedActs = studentActs.filter((a) => a.status === 'Approved');
      const calculatedPoints = approvedActs.reduce((sum, a) => sum + (Number(a.points) || 0), 0);

      // Prefer calculated points if higher than seeded initial points
      const finalPoints = Math.max(student.points || 0, calculatedPoints);
      const approvedCount = Math.max(student.approvedCount || 0, approvedActs.length);

      return {
        ...student,
        points: finalPoints,
        approvedCount: approvedCount,
      };
    });

    // Sort by points descending
    calculated.sort((a, b) => b.points - a.points);

    // Assign rank
    return calculated.map((student, index) => ({
      ...student,
      rank: index + 1,
    }));
  },

  /**
   * Get all registered students for Admin view
   * Future: return axios.get(`${API_URL}/users/students`).then(r => r.data);
   */
  getStudents: async (searchTerm = '') => {
    initUsersStorage();
    const leaderboard = await userService.getLeaderboard();

    if (!searchTerm) return leaderboard;

    const term = searchTerm.toLowerCase();
    return leaderboard.filter(
      (s) =>
        s.name.toLowerCase().includes(term) ||
        s.email.toLowerCase().includes(term) ||
        (s.department && s.department.toLowerCase().includes(term)) ||
        (s.studentId && s.studentId.toLowerCase().includes(term))
    );
  },

  /**
   * Get specific user profile
   */
  getProfile: async (userId) => {
    initUsersStorage();
    const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
    return users.find((u) => u.id === userId) || null;
  },
};

