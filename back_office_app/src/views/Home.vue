<script setup lang="ts">
import DashboardCard from '../components/views/DashboardCard.vue';
</script>

<template>
  <div class="home">
    <h1>Système de Gestion de Chats</h1>
    <p class="home-description">Bienvenue dans le système de gestion de chats. Sélectionnez une option ci-dessous pour commencer.</p>

    <div class="card-container">
      <DashboardCard 
        title="Chatteries" 
        description="Gérez les chatteries, leurs éleveurs et leurs chats. Ajoutez, modifiez ou supprimez des chatteries."
        route="/catteries"
      />

      <DashboardCard 
        title="Utilisateurs" 
        description="Gérez les utilisateurs du système. Ajoutez, modifiez ou supprimez des comptes utilisateurs."
        route="/users"
      />

      <DashboardCard 
        title="Caractéristiques LOOF" 
        description="Gérez les caractéristiques LOOF comme les races, couleurs, motifs et effets de pelage."
        route="/loof"
      />
    </div>
  </div>
</template>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-xl);
  text-align: center;
}

h1 {
  color: var(--primary-color);
  margin-bottom: var(--space-md);
  font-size: var(--font-size-lg);
}

.home-description {
  color: var(--text-muted);
  margin-bottom: var(--space-xl);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.card-container {
  display: flex;
  justify-content: center;
  gap: var(--space-xl);
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .home {
    padding: var(--space-md);
  }

  .card-container {
    gap: var(--space-lg);
  }
}
</style>
