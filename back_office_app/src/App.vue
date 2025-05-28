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

body {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #97C8EB;
  background-color: #001011;
}

/* App layout */
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Header styles */
header {
  background-color: #093A3E;
  color: #97C8EB;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.logo a {
  color: #64E9EE;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
}

.nav-links {
  display: flex;
  list-style: none;
}

.nav-links li {
  margin-left: 1.5rem;
}

.nav-links a {
  color: #3AAFB9;
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.3s;
}

.nav-links a:hover {
  opacity: 0.8;
}

.nav-links a.router-link-active {
  border-bottom: 2px solid #847996;
}

/* Main content */
main {
  flex: 1;
  padding: 2rem;
}

/* Footer styles */
footer {
  background-color: #2c3e50;
  color: #97C8EB;
  text-align: center;
  padding: 1rem;
  margin-top: auto;
}
</style>
