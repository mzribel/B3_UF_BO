import { defineStore } from 'pinia';
import { authApi } from '../services/api';
import axios from 'axios';
import parseJwt from "../services/jwtParser.ts";

interface User {
  id: number;
  email: string;
  displayName?: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  adminState?: boolean;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: localStorage.getItem('token'),
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    isAuthenticated: !!localStorage.getItem('token'),
    adminState: parseJwt(localStorage.getItem('token') || '')?.admin || false
  }),
  
  getters: {
    isAdmin: (state) => state.adminState,
    getToken: (state) => state.token
  },
  
  actions: {
    async login(credentials: { email: string; password: string }) {
      try {
        const response = await authApi.login(credentials);
        
        this.token = response.data.token;
        this.user = response.data.user;
        this.isAuthenticated = true;

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        
        return true;
      } catch (error) {
        console.error('Login error:', error);
        return false;
      }
    },
    
    async register(userData: any) {
      try {
        await authApi.register(userData);
        return true;
      } catch (error) {
        console.error('Registration error:', error);
        return false;
      }
    },
    
    logout() {
      this.token = null;
      this.user = null;
      this.isAuthenticated = false;

      localStorage.removeItem('token');
      localStorage.removeItem('user');

      delete axios.defaults.headers.common['Authorization'];
    },
    
    initializeAuth() {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      
      if (token && user) {
        this.token = token;
        this.user = JSON.parse(user);
        this.isAuthenticated = true;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    }
  }
});