<script setup lang="ts">
import { RouterView } from 'vue-router'
import SidebarNav from './components/SidebarNav.vue'
import { useAuthStore } from './stores/auth';
import { onMounted } from 'vue';

const authStore = useAuthStore();

// Initialize auth state when app loads
onMounted(() => {
  authStore.initializeAuth();
});
</script>

<template>
  <div class="app-layout" :class="{ 'guest-layout': !authStore.isAuthenticated }">
    <SidebarNav v-if="authStore.isAuthenticated" />

    <div class="main-content-wrapper">
      <main class="main-content">
        <RouterView />
      </main>
<!--      TODO : Uncomment footer if needed -->
<!--      <footer v-if="authStore.isAuthenticated">-->
<!--        <p>&copy; {{ new Date().getFullYear() }} Cat Management System</p>-->
<!--      </footer>-->
    </div>
  </div>
</template>

<style>
.app-layout {
  display: flex;
  min-height: 100vh;
  max-height: 100vh;
  background-color: var(--app-bg);
}

.main-content-wrapper {
  width: 100%;
  height: 100vh;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background-color: var(--app-bg);
}

.main-content {
  flex-grow: 1;
  padding: var(--space-lg);
}

.guest-layout {
  display: block;
}

.guest-layout .main-content-wrapper {
  width: 100%;
  max-width: 700px; /* Largeur pour le formulaire de connexion */
  min-height: 100vh; /* Prend toute la hauteur */
  margin: 0 auto; /* Centre horizontalement */
  display: flex; /* Utilise flex pour centrer verticalement .main-content */
  flex-direction: column;
  justify-content: center; /* Centre verticalement */
  padding: var(--space-md); /* Un peu d'espace autour si la fenêtre est très petite */
}

.guest-layout .main-content {
  padding: var(--space-xl) var(--space-lg);
  background-color: var(--card-bg); /* Fond de carte pour le formulaire */
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  width: 100%; /* Prend toute la largeur du wrapper */
}

.guest-layout footer {
 display: none; /* Cache le footer sur la page de connexion */
}

footer {
  background-color: var(--topbar-bg); /* Ou var(--app-bg) si vous préférez */
  color: var(--text-secondary);
  text-align: center;
  padding: var(--space-md) 0;
  border-top: 1px solid var(--border-color);
  width: 100%; /* Assure que le footer prend toute la largeur du main-content-wrapper */
}
</style>
