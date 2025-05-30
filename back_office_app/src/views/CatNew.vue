<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import CatForm from '../components/CatForm.vue';

const route = useRoute();
const router = useRouter();
const catteryId = Number(route.params.catteryId);

if (!catteryId) {
  router.push('/catteries');
}
</script>

<template>
  <div class="cat-new-view">
    <h1>Ajouter un Nouveau Chat à la Chatterie</h1>
    <p class="description">
      Ajoutez un nouveau chat à votre chatterie. Remplissez les détails ci-dessous pour enregistrer votre ami félin.
    </p>

    <CatForm :catteryId="catteryId" />

    <div class="actions">
      <button class="btn-back" @click="router.push(`/catteries/${catteryId}`)">
        Retour à la Chatterie
      </button>
    </div>
  </div>
</template>

<style scoped>
.cat-new-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

h1 {
  color: #6c5ce7;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 2rem;
}

.description {
  text-align: center;
  color: #636e72;
  margin-bottom: 2rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.actions {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}

.btn-back {
  background-color: #e9ecef;
  color: #2d3436;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.btn-back:hover {
  background-color: #dee2e6;
}

@media (max-width: 768px) {
  .cat-new-view {
    padding: 1rem;
  }

  h1 {
    font-size: 1.5rem;
  }

  .btn-back {
    width: 100%;
    padding: 0.6rem 1rem;
  }
}
</style>
