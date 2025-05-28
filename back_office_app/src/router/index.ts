import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '../stores/auth';

// Define routes
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/cats',
    name: 'Cats',
    component: () => import('../views/Cats.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('../views/Users.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { requiresAuth: false }
  }
];

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // Initialize auth from localStorage if needed
  if (!authStore.isAuthenticated && localStorage.getItem('token')) {
    authStore.initializeAuth();
  }

  // Check if the route requires authentication
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);

  // If route requires authentication and user is not authenticated, redirect to login
  if (requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login' });
    return;
  }

  // If route requires admin and user is not admin, redirect to home
  if (requiresAdmin && !authStore.isAdmin) {
    next({ name: 'Home' });
    return;
  }

  // If user is authenticated and tries to access login/register, redirect to home
  if (authStore.isAuthenticated && to.meta.requiresAuth === false) {
    next({ name: 'Home' });
    return;
  }

  // Otherwise proceed normally
  next();
});

export default router;
