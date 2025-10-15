
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with credentials
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important for sessions
});

// Request interceptor to add logs
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    console.log(`Response received: ${response.status}`);
    return response;
  },
  (error) => {
    console.error('API Error:', {
      status: error.response?.status,
      message: error.response?.data?.message,
      url: error.config?.url
    });
    
    if (error.response?.status === 401) {
      // Redirect to login if unauthorized
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;


