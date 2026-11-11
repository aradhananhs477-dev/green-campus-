import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService, initUsersStorage } from '../services/authService';
import { INITIAL_ADMIN, INITIAL_STUDENTS } from '../data/mockData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initUsersStorage();
    const stored = authService.getCurrentUser();
    setUser(stored);
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const loggedInUser = await authService.login(email, password);
      setUser(loggedInUser);
      return loggedInUser;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const newUser = await authService.register(userData);
      setUser(newUser);
      return newUser;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  // Quick switch role utility for effortless demo testing
  const quickSwitchRole = (targetRole) => {
    if (targetRole === 'admin') {
      const adminUser = {
        ...INITIAL_ADMIN,
        email: 'admin@greencampus.edu',
      };
      localStorage.setItem('greencampus_current_user', JSON.stringify(adminUser));
      setUser(adminUser);
    } else {
      const studentUser = INITIAL_STUDENTS[2]; // Aarav Sharma
      localStorage.setItem('greencampus_current_user', JSON.stringify(studentUser));
      setUser(studentUser);
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isStudent: user?.role === 'student',
    login,
    register,
    logout,
    quickSwitchRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

