import axios from 'axios';

const API_URL = process.env.API_URL;

const safeGetLocalStorage = (key) => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(key);
    }
  } catch (error) {
    console.error('LocalStorage access error:', error);
  }
  return null;
};

const safeRemoveLocalStorage = (key) => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(key);
    }
  } catch (error) {
    console.error('LocalStorage access error:', error);
  }
};

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = safeGetLocalStorage('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      safeRemoveLocalStorage('token');
      safeRemoveLocalStorage('user');
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data)
};

export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  getAllUsers: () => api.get('/users/all'),
  addUser: (data) => api.post('/users/add', data),
  deleteUser: (id) => api.delete(`/users/${id}`)
};

export default api;
