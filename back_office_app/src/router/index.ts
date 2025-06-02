import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('../views/Users.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/catteries',
    name: 'Catteries',
    component: () => import('../views/Catteries.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/catteries/new',
    name: 'CatteryNew',
    component: () => import('../views/CatteryNew.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/catteries/:id',
    name: 'CatteryDetail',
    component: () => import('../views/CatteryDetail.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/catteries/:catteryId/cats/new',
    name: 'CatNew',
    component: () => import('../views/CatNew.vue'),
    meta: { requiresAuth: true }
  },

  {
    path: '/loof',
    name: 'LoofCharacteristics',
    component: () => import('../views/LoofCharacteristics.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/loof/breeds',
    name: 'LoofBreeds',
    component: () => import('../views/LoofBreeds.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/loof/coat-colors',
    name: 'LoofCoatColors',
    component: () => import('../views/LoofCoatColors.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/loof/coat-patterns',
    name: 'LoofCoatPatterns',
    component: () => import('../views/LoofCoatPatterns.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/loof/coat-effects',
    name: 'LoofCoatEffects',
    component: () => import('../views/LoofCoatEffects.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/loof/coat-white-markings',
    name: 'LoofCoatWhiteMarkings',
    component: () => import('../views/LoofCoatWhiteMarkings.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/loof/poly-types',
    name: 'LoofPolyTypes',
    component: () => import('../views/LoofPolyTypes.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/design-system',
    name: 'DesignSystem',
    component: () => import('../design-system/documentation/Showcase.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/design-system-test',
    name: 'DesignSystemTest',
    component: () => import('../views/DesignSystemTest.vue'),
    meta: { requiresAuth: false }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (!authStore.isAuthenticated && localStorage.getItem('token')) {
    authStore.initializeAuth();
  }

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);

  if (requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login' });
    return;
  }

  if (requiresAdmin && !authStore.adminState) {
    next({ name: 'Home' });
    return;
  }

  if (authStore.isAuthenticated && to.meta.requiresAuth === false) {
    next({ name: 'Home' });
    return;
  }

  next();
});

export default router;
