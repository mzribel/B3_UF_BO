<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth'; // Assurez-vous que le chemin est correct

const router = useRouter();
const authStore = useAuthStore();

const logout = async () => {
  await authStore.logout();
  router.push('/login');
};

</script>

<template>
  <div class="sidebar-nav">
    <div class="logo-container">
      <span class="logo-icon">🐾</span>
      <span class="logo-text">CatManager</span>
    </div>
    <nav>
      <ul>
        <li>
          <router-link to="/" active-class="active">
            <span class="icon-placeholder">🏠</span> Tableau de bord
          </router-link>
        </li>
        <li v-if="authStore.isAdmin">
          <router-link  to="/catteries" active-class="active">
            <span class="icon-placeholder">😺</span> Chatteries
          </router-link>
        </li>
        <li v-if="authStore.isAdmin">
          <router-link to="/users" active-class="active">
            <span class="icon-placeholder">👥</span> Utilisateurs
          </router-link>
        </li>
        <li v-if="authStore.isAdmin">
          <router-link to="/loof" active-class="active">
            <span class="icon-placeholder">📋</span> Caractéristiques LOOF
          </router-link>
        </li>
      </ul>
    </nav>
    <div class="logout-section">
      <button @click="logout">
        <span class="icon-placeholder">🚪</span> Déconnexion
      </button>
      <div>Connecté en tant que :</div>
      <div v-if="authStore.isAuthenticated" >
        <span>{{ authStore.user?.displayName }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar-nav {
  width: 450px;
  background-color: #fdf0e5;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 20px;
  color: #4a4a4a;
  box-shadow: 2px 0 5px rgba(0,0,0,0.1);
}

.logo-container {
  display: flex;
  align-items: center;
  padding-bottom: 30px;
  margin-bottom: 20px;
  border-bottom: 1px solid #f2e0d0; /* Séparateur léger */
}

.logo-icon {
  font-size: 28px;
  margin-right: 10px;
  color: #d3a77f; /* Couleur de l'icône patte */
}

.logo-text {
  font-size: 24px;
  font-weight: bold;
  color: #6b4f3a; /* Couleur de texte plus foncée pour le logo */
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
}

nav li {
  margin-bottom: 10px;
}

nav a {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  text-decoration: none;
  color: #6b4f3a; /* Couleur de texte pour les liens */
  border-radius: 8px;
  font-weight: 500;
  transition: background-color 0.3s, color 0.3s;
}

nav a:hover {
  background-color: #f8e6d7; /* Fond légèrement plus foncé au survol */
  color: #5a3f2a;
}

nav a.active {
  background-color: #f5d9c4; /* Couleur de fond pour l'élément actif */
  color: #d35400; /* Couleur de texte pour l'élément actif, inspiré du orange/brun */
  font-weight: bold;
}

.icon-placeholder {
  margin-right: 12px;
  font-size: 20px; /* Ajustez selon les icônes réelles */
  min-width: 24px; /* Pour aligner le texte si les icônes ont des largeurs différentes */
  text-align: center;
}

.logout-section {
  margin-top: auto; /* Pousse le bouton de déconnexion en bas */
  padding-top: 20px;
  border-top: 1px solid #f2e0d0; /* Séparateur léger */
}

.logout-section button {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px 15px;
  background-color: transparent;
  border: none;
  color: #6b4f3a;
  font-size: 16px;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s, color 0.3s;
}

.logout-section button:hover {
  background-color: #f8e6d7;
  color: #5a3f2a;
}
</style> 