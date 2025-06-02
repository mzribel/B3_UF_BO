<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import { useAuthStore } from './stores/auth';
import { onMounted } from 'vue';

const authStore = useAuthStore();

// Initialize auth state when app loads
onMounted(() => {
  authStore.initializeAuth();
});
</script>

<template>
  <div class="app">
    <header>
      <NavBar />
    </header>

    <main>
      <RouterView />
    </main>

    <footer>
      <p>&copy; {{ new Date().getFullYear() }} Cat Management System</p>
    </footer>
  </div>
</template>

<style>
/* Global styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* App layout */
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Header styles */
header {
  background-color: var(--bg-header);
  color: var(--text-highlight);
  padding: var(--space-md) var(--space-xl);
  box-shadow: var(--shadow-sm);
  border-radius: var(--radius-md);
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.logo a {
  color: var(--primary-light);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  text-decoration: none;
}

.nav-links {
  display: flex;
  list-style: none;
}

.nav-links li {
  margin-left: var(--space-lg);
}

.nav-links a {
  color: var(--secondary-light);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  transition: opacity 0.3s;
}

.nav-links a:hover {
  opacity: 0.8;
}

.nav-links a.router-link-active {
  border-bottom: 2px solid var(--border-active);
}

/* Main content */
main {
  flex: 1;
  padding: var(--space-xl);
}

/* Footer styles */
footer {
  background-color: var(--bg-footer);
  color: var(--text-highlight);
  text-align: center;
  padding: var(--space-md);
  margin-top: auto;
}
</style>
