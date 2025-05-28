import axios from 'axios';
import type { Cat, NewCat } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to dynamically set the Authorization header
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Cat API
export const catApi = {
  getAllCats: () => api.get<Cat[]>('/cats'),
  createCat: (catData: NewCat) => api.post<Cat>('/cats', catData),
  updateCat: (id: number, catData: NewCat) => api.put<Cat>(`/cats/${id}`, catData),
  deleteCat: (id: number) => api.delete(`/cats/${id}`),
  getCatteryCats: (catteryId: number) => api.get<Cat[]>(`/cattery/${catteryId}`)
};

// User API
export const userApi = {
  getAllUsers: () => api.get('/users/'),
  getUserById: (userId: number) => api.get(`/users/${userId}/`)
};

// Auth API
export const authApi = {
  register: (userData: any) => api.post('/auth/register', userData),
  login: (credentials: { email: string; password: string }) => api.post('/auth/login', credentials)
};

export default api;
