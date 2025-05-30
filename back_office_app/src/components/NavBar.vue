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
      <router-link to="/cats" class="nav-link">Chats</router-link>
      <router-link to="/catteries" class="nav-link">Chatteries</router-link>
      <router-link to="/users" class="nav-link">Utilisateurs</router-link>
      <router-link to="/loof" class="nav-link">Caractéristiques LOOF</router-link>

      <div v-if="authStore.isAuthenticated" class="user-info">
        <span>{{ authStore.user?.email }}</span>
        <button @click="logout" class="logout-btn">Déconnexion</button>
      </div>

      <div v-else>
        <router-link to="/login" class="nav-link">Connexion</router-link>
        <router-link to="/register" class="nav-link">Inscription</router-link>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #42b883;
  color: white;
  padding: 1rem 2rem;
}

.nav-brand {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
}

.nav-link:hover {
  text-decoration: underline;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logout-btn {
  background-color: white;
  color: #42b883;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.logout-btn:hover {
  background-color: #f0f0f0;
}
</style>
