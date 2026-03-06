import axios from 'axios';

const DEFAULT_API_URL = import.meta.env.VITE_API_URL || (typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.hostname}:5000/api` : '/api');

const api = axios.create({
  baseURL: DEFAULT_API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('safedonate_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('safedonate_token');
      localStorage.removeItem('safedonate_user');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default api;
