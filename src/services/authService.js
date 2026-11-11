// Authentication Service
// Ready for backend integration (e.g., Axios to /api/auth/login, /api/auth/register)
// Currently uses localStorage mock persistence for seamless frontend demo

import { INITIAL_STUDENTS, INITIAL_ADMIN } from '../data/mockData';

const AUTH_STORAGE_KEY = 'greencampus_current_user';
const USERS_STORAGE_KEY = 'greencampus_registered_users';

// Initialize registered users in localStorage if not already present
export const initUsersStorage = () => {
  const existing = localStorage.getItem(USERS_STORAGE_KEY);
  if (!existing) {
    const defaultUsers = [
      INITIAL_ADMIN,
      ...INITIAL_STUDENTS,
      // Default demo student
      {
        id: 'usr-103',
        name: 'Aarav Sharma',
        email: 'student@greencampus.edu',
        password: 'password123',
        role: 'student',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        department: 'Computer Science & Engineering',
        year: '2nd Year',
        studentId: 'GC-2024-892',
        points: 420,
      },
      // Default demo admin
      {
        ...INITIAL_ADMIN,
        email: 'admin@greencampus.edu',
        password: 'password123',
      }
    ];
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(defaultUsers));
  }
};

export const authService = {
  /**
   * Log in a user (student or admin)
   * To connect to backend later:
   * return axios.post(`${API_URL}/auth/login`, { email, password }).then(res => res.data);
   */
  login: async (email, password) => {
    initUsersStorage();
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 350));

    const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
    const normalizedEmail = email.trim().toLowerCase();

    // Check matching user or demo defaults
    let matchedUser = users.find((u) => u.email.toLowerCase() === normalizedEmail);

    if (!matchedUser) {
      // If user typed admin@... treat as admin, else student
      const role = normalizedEmail.includes('admin') ? 'admin' : 'student';
      matchedUser = {
        id: `usr-${Date.now()}`,
        name: normalizedEmail.split('@')[0].replace('.', ' ').toUpperCase(),
        email: normalizedEmail,
        role: role,
        avatar: role === 'admin'
          ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
          : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        department: role === 'admin' ? 'Campus Sustainability Committee' : 'Environmental Science',
        points: role === 'student' ? 120 : 0,
      };
      // Save newly logged in user
      users.push(matchedUser);
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    }

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(matchedUser));
    return matchedUser;
  },

  /**
   * Register a new user
   * Backend future: axios.post(`${API_URL}/auth/register`, userData)
   */
  register: async ({ name, email, password, role = 'student', department = 'General Studies' }) => {
    initUsersStorage();
    await new Promise((resolve) => setTimeout(resolve, 400));

    const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
    const normalizedEmail = email.trim().toLowerCase();

    if (users.some((u) => u.email.toLowerCase() === normalizedEmail)) {
      throw new Error('An account with this campus email already exists.');
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      name,
      email: normalizedEmail,
      role,
      department,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
      studentId: role === 'student' ? `GC-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}` : undefined,
      points: 0,
      approvedCount: 0,
      pendingCount: 0,
      joinedDate: new Date().toISOString().split('T')[0],
      badges: ['New Eco Member'],
    };

    users.push(newUser);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));

    return newUser;
  },

  /**
   * Get currently authenticated user
   */
  getCurrentUser: () => {
    try {
      const data = localStorage.getItem(AUTH_STORAGE_KEY);
      if (data) return JSON.parse(data);
    } catch {
      // Fallback
    }
    // Default fallback to demo student Aarav Sharma if not set
    const defaultUser = {
      id: 'usr-103',
      name: 'Aarav Sharma',
      email: 'student@greencampus.edu',
      role: 'student',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      department: 'Computer Science & Engineering',
      year: '2nd Year',
      studentId: 'GC-2024-892',
      points: 420,
    };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(defaultUser));
    return defaultUser;
  },

  /**
   * Log out
   */
  logout: async () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return true;
  },
};

