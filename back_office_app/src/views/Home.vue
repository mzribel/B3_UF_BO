<script setup lang="ts">
import DashboardCard from '../components/views/DashboardCard.vue';
import PageLayout from "../components/views/PageLayout.vue";
</script>

<template>
    <PageLayout title="Système de Gestion de Chats" description="Bienvenue dans le système de gestion de chats. Sélectionnez une option ci-dessous pour commencer.">
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
    </PageLayout>
</template>

<style scoped>

h1 {
  color: var(--primary-color);
  margin-bottom: var(--space-md);
  font-size: var(--font-size-lg);
}

.card-container {
  display: flex;
  justify-content: center;
  gap: var(--space-xl);
  flex-wrap: wrap;
  padding: var(--space-lg);
}

@media (max-width: 768px) {

  .card-container {
    gap: var(--space-lg);
  }
}
</style>
