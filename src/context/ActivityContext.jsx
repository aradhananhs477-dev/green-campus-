import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { activityService, initActivitiesStorage } from '../services/activityService';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

const ActivityContext = createContext(null);

export const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { showToast } = useToast();

  const loadActivities = useCallback(async () => {
    setLoading(true);
    try {
      initActivitiesStorage();
      const data = await activityService.getActivities();
      setActivities(data);
    } catch (err) {
      console.error('Failed to load activities', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  const submitActivity = async (activityData) => {
    try {
      const newAct = await activityService.submitActivity(activityData, user);
      setActivities((prev) => [newAct, ...prev]);
      showToast('Activity submitted successfully! It is currently Pending admin review.', 'success');
      return newAct;
    } catch (err) {
      showToast(err.message || 'Failed to submit activity', 'error');
      throw err;
    }
  };

  const approveActivity = async (id, points) => {
    try {
      const updated = await activityService.approveActivity(id, points);
      setActivities((prev) => prev.map((a) => (a.id === id ? updated : a)));
      showToast(`Activity approved and ${points} sustainability points awarded!`, 'success');
      return updated;
    } catch (err) {
      showToast(err.message || 'Failed to approve activity', 'error');
      throw err;
    }
  };

  const rejectActivity = async (id, rejectionReason) => {
    try {
      const updated = await activityService.rejectActivity(id, rejectionReason);
      setActivities((prev) => prev.map((a) => (a.id === id ? updated : a)));
      showToast('Activity marked as rejected with feedback for the student.', 'info');
      return updated;
    } catch (err) {
      showToast(err.message || 'Failed to reject activity', 'error');
      throw err;
    }
  };

  const resetData = () => {
    activityService.resetToDefault();
    loadActivities();
    showToast('Demo activities reset to default state.', 'info');
  };

  // Derived user activities
  const userActivities = user
    ? activities.filter((a) => a.studentId === user.id)
    : [];

  const pendingActivities = activities.filter((a) => a.status === 'Pending');
  const approvedActivities = activities.filter((a) => a.status === 'Approved');

  const value = {
    activities,
    userActivities,
    pendingActivities,
    approvedActivities,
    loading,
    refreshActivities: loadActivities,
    submitActivity,
    approveActivity,
    rejectActivity,
    resetData,
  };

  return <ActivityContext.Provider value={value}>{children}</ActivityContext.Provider>;
};

export const useActivities = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error('useActivities must be used within an ActivityProvider');
  }
  return context;
};

