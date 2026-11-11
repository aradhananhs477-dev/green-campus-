
// Activity Service - Connected to MongoDB backend



const API_URL = 'http://localhost:5000/api/activities';

// Common helper for API requests
const apiRequest = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

// Kept for compatibility with existing components.
// Activities are now stored in MongoDB, not localStorage.
export const initActivitiesStorage = () => { };

export const activityService = {
  // Get all activities with optional filters
  getActivities: async (filters = {}) => {
    const params = new URLSearchParams();

    if (filters.studentId) params.append('studentId', filters.studentId);
    if (filters.category) params.append('category', filters.category);
    if (filters.status) params.append('status', filters.status);
    if (filters.search) params.append('search', filters.search);

    const query = params.toString();
    const url = query ? `${API_URL}?${query}` : API_URL;

    const activities = await apiRequest(url);

    return activities.map((activity) => ({
      ...activity,
      submissionDate: activity.createdAt || activity.date,
    }));
  },

  // Get one activity by ID
  getActivityById: async (id) => {
    try {
      const activity = await apiRequest(
        `${API_URL}/${encodeURIComponent(id)}`
      );

      return {
        ...activity,
        submissionDate: activity.createdAt || activity.date,
      };
    } catch (error) {
      if (error.message === 'Activity not found') {
        return null;
      }
      throw error;
    }
  },

  // Submit a new activity
  submitActivity: async (activityData, currentUser) => {


    const newActivity = {
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentEmail: currentUser.email || '',
      studentAvatar:
        currentUser.avatar ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      title: activityData.title.trim(),
      category: activityData.category,
      description: activityData.description.trim(),
      date: activityData.date,
      location: activityData.location.trim(),
      proofImage:
        activityData.proofImage ||
        'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80',
      points: 25,
    };

    const savedActivity = await apiRequest(API_URL, {
      method: 'POST',
      body: JSON.stringify(newActivity),
    });

    return {
      ...savedActivity,
      submissionDate: savedActivity.createdAt || savedActivity.date,
    };
  },

  // Approve an activity
  approveActivity: async (id, points) => {
    const updatedActivity = await apiRequest(
      `${API_URL}/${encodeURIComponent(id)}/approve`,
      {
        method: 'PATCH',
        body: JSON.stringify({ points: Number(points) || 25 }),
      }
    );

    // Keep the existing local user-points update for compatibility.
    const users = JSON.parse(
      localStorage.getItem('greencampus_registered_users') || '[]'
    );

    const userIndex = users.findIndex(
      (u) => u.id === updatedActivity.studentId
    );

    if (userIndex !== -1) {
      users[userIndex].points =
        (users[userIndex].points || 0) + updatedActivity.points;

      users[userIndex].approvedCount =
        (users[userIndex].approvedCount || 0) + 1;

      localStorage.setItem(
        'greencampus_registered_users',
        JSON.stringify(users)
      );
    }

    return {
      ...updatedActivity,
      submissionDate: updatedActivity.createdAt || updatedActivity.date,
    };
  },

  // Reject an activity
  rejectActivity: async (id, rejectionReason) => {
    const updatedActivity = await apiRequest(
      `${API_URL}/${encodeURIComponent(id)}/reject`,
      {
        method: 'PATCH',
        body: JSON.stringify({ rejectionReason }),
      }
    );

    return {
      ...updatedActivity,
      submissionDate: updatedActivity.createdAt || updatedActivity.date,
    };
  },

  // Delete an activity
  deleteActivity: async (id) => {
    await apiRequest(`${API_URL}/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });

    return true;
  },

  // Reset is not available through the backend yet.
  resetToDefault: async () => {
    throw new Error(
      'Reset to default is not available with MongoDB storage.'
    );
  },
};
