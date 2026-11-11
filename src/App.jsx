import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { ActivityProvider } from './context/ActivityContext';

// Layouts
import { StudentLayout } from './layouts/StudentLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Public Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { PublicLeaderboardPage } from './pages/PublicLeaderboardPage';

// Student Pages
import { StudentDashboard } from './pages/student/StudentDashboard';
import { SubmitActivityPage } from './pages/student/SubmitActivityPage';
import { MyActivitiesPage } from './pages/student/MyActivitiesPage';
import { LeaderboardPage } from './pages/student/LeaderboardPage';
import { StudentProfilePage } from './pages/student/StudentProfilePage';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ManageActivitiesPage } from './pages/admin/ManageActivitiesPage';
import { ManageStudentsPage } from './pages/admin/ManageStudentsPage';
import { ReportsPage } from './pages/admin/ReportsPage';

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <ActivityProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/leaderboard" element={<PublicLeaderboardPage />} />

              {/* Student Portal Routes */}
              <Route path="/student" element={<StudentLayout />}>
                <Route index element={<StudentDashboard />} />
                <Route path="submit" element={<SubmitActivityPage />} />
                <Route path="activities" element={<MyActivitiesPage />} />
                <Route path="leaderboard" element={<LeaderboardPage />} />
                <Route path="profile" element={<StudentProfilePage />} />
              </Route>

              {/* Admin Console Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="activities" element={<ManageActivitiesPage />} />
                <Route path="students" element={<ManageStudentsPage />} />
                <Route path="reports" element={<ReportsPage />} />
              </Route>

              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </ActivityProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

