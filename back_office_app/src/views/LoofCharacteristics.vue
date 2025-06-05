<script setup lang="ts">
import { useRouter } from 'vue-router';
import PageLayout from '../components/views/PageLayout.vue';

const router = useRouter();

const navigateTo = (path: string) => {
  router.push(path);
};
</script>
<template>
  <PageLayout 
    title="Gestion des caractéristiques LOOF"
    description="Gérez les caractéristiques LOOF pour les chats, incluant les races, couleurs de robe, motifs, effets, marques blanches et types poly."
  >
    <div class="characteristics-grid">
      <div class="characteristic-card" @click="navigateTo('/loof/breeds')">
        <h2>Races</h2>
        <p>Gérer les races de chats reconnues par le LOOF</p>
        <div class="card-icon">🐱</div>
      </div>

      <div class="characteristic-card" @click="navigateTo('/loof/coat-colors')">
        <h2>Couleurs de robe</h2>
        <p>Gérer les couleurs de robe des chats</p>
        <div class="card-icon">🎨</div>
      </div>

      <div class="characteristic-card" @click="navigateTo('/loof/coat-patterns')">
        <h2>Motifs de robe</h2>
        <p>Gérer les motifs de robe des chats</p>
        <div class="card-icon">🐈</div>
      </div>

      <div class="characteristic-card" @click="navigateTo('/loof/coat-effects')">
        <h2>Effets de robe</h2>
        <p>Gérer les effets de robe des chats</p>
        <div class="card-icon">✨</div>
      </div>

      <div class="characteristic-card" @click="navigateTo('/loof/coat-white-markings')">
        <h2>Marques blanches</h2>
        <p>Gérer les marques blanches sur la robe des chats</p>
        <div class="card-icon">⚪</div>
      </div>

      <div class="characteristic-card" @click="navigateTo('/loof/poly-types')">
        <h2>Types de polydactylie</h2>
        <p>Gérer les différents types de polydactylie</p>
        <div class="card-icon">🐾</div>
      </div>
    </div>
  </PageLayout>
</template>

<style scoped>

h1 {
  color: #6c5ce7;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 2rem;
}

.characteristics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: var(--space-lg);
}

.characteristic-card {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 2px solid #e9ecef;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.characteristic-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  border-color: #6c5ce7;
}

.characteristic-card h2 {
  color: #6c5ce7;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}

.characteristic-card p {
  color: #636e72;
  margin-bottom: 1rem;
}

.card-icon {
  font-size: 3rem;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  h1 {
    font-size: 1.5rem;
  }

  .characteristics-grid {
    grid-template-columns: 1fr;
    padding: var(--space-md);
  }
}
</style>
