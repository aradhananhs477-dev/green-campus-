// GreenCampus API Client Helper
// Backend base URL loaded from environment variable import.meta.env.VITE_API_URL

const RAW_URL = import.meta.env.VITE_API_URL || 'https://green-campus-backend-gacz.onrender.com';

// Normalizes the base URL by stripping trailing slashes
export const BACKEND_URL = RAW_URL.replace(/\/+$/, '');

// Normalizes API base URL ensuring standard /api path prefix
export const API_BASE_URL = BACKEND_URL.endsWith('/api') ? BACKEND_URL : `${BACKEND_URL}/api`;

