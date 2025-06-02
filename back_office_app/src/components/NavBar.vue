<script setup lang="ts">
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const logout = async () => {
  authStore.logout();
  await router.push('/login');
};
</script>

<template>
  <nav class="navbar">
    <div class="nav-brand">Application Back Office</div>
    <div class="nav-links">
      <router-link to="/" class="nav-link">Accueil</router-link>
      <router-link v-if="authStore.isAdmin" to="/catteries" class="nav-link">Chatteries</router-link>
      <router-link v-if="authStore.isAdmin" to="/users" class="nav-link">Utilisateurs</router-link>
      <router-link v-if="authStore.isAdmin" to="/loof" class="nav-link">Caractéristiques LOOF</router-link>

      <div v-if="authStore.isAuthenticated" class="user-info">
        <span>{{ authStore.user?.email }}</span>
        <button @click="logout" class="logout-btn">Déconnexion</button>
      </div>

      <div v-else>
        <router-link to="/login" class="nav-link">Connexion</router-link>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--primary-color);
  color: var(--text-light);
  padding: var(--space-md) var(--space-xl);
}

.nav-brand {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
}

.nav-link {
  color: var(--text-light);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
}

.nav-link:hover {
  text-decoration: underline;
}

.user-info {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.logout-btn {
  background-color: var(--text-light);
  color: var(--primary-color);
  border: none;
  padding: var(--space-xs) var(--space-md);
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-weight: var(--font-weight-medium);
}

.logout-btn:hover {
  background-color: var(--bg-muted);
}
</style>
