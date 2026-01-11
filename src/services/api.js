const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to handle responses
const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    // If status is 401 (Unauthorized), redirect to login
    if (response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    const error = data.message || 'Something went wrong';
    throw new Error(error);
  }
  return data;
};

// Set auth token in headers
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Auth API
export const authApi = {
  // Register a new user
  register: async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  // Login user
  login: async (credentials) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: getAuthHeader(),
    });
    return handleResponse(response);
  },
};

// Verification API
export const verificationApi = {
  // Submit verification data
  submitVerification: async (verificationData) => {
    const response = await fetch(`${API_URL}/verification`, {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify(verificationData),
    });
    return handleResponse(response);
  },

  // Get verification status
  getVerificationStatus: async (userId) => {
    const response = await fetch(`${API_URL}/verification/status/${userId}`, {
      headers: getAuthHeader(),
    });
    return handleResponse(response);
  },

  // Get all verification requests (admin)
  getAllVerifications: async () => {
    const response = await fetch(`${API_URL}/verification`, {
      headers: getAuthHeader(),
    });
    return handleResponse(response);
  },

  // Update verification status (admin)
  updateVerificationStatus: async (id, statusData) => {
    const response = await fetch(`${API_URL}/verification/${id}/status`, {
      method: 'PATCH',
      headers: getAuthHeader(),
      body: JSON.stringify(statusData),
    });
    return handleResponse(response);
  },
};

// Add more API methods as needed
export default {
  auth: authApi,
  verification: verificationApi,
};
