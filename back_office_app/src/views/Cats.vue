<script setup lang="ts">
import { onMounted } from 'vue';
import { useCatsStore } from '../stores/cats';
import CatForm from '../components/CatForm.vue';
import CatList from '../components/CatList.vue';

const catsStore = useCatsStore();

onMounted(() => {
  catsStore.fetchCats();
});
</script>

<template>
  <div class="cats-container">
    <header class="page-header">
      <h1>
        <span class="paw-icon">🐱</span> 
        Gestion des Amis Félins
      </h1>
    </header>

    <div class="content-wrapper">
      <CatForm @cat-added="catsStore.fetchCats()" />

      <CatList />
    </div>
  </div>
</template>

<style scoped>
.cats-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
  padding: 1.5rem 0;
}

h1 {
  color: #97C8EB;
  margin-bottom: 0.5rem;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.paw-icon {
  margin-right: 0.75rem;
  font-size: 2.2rem;
}

.subtitle {
  color: #b8ced4;
  font-size: 1.1rem;
  margin-top: 0.5rem;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Responsive styles */
@media (min-width: 768px) {
  .cats-container {
    padding: 2rem;
  }

  h1 {
    font-size: 2.5rem;
  }

  .paw-icon {
    font-size: 2.7rem;
  }
}

@media (min-width: 1024px) {
  .content-wrapper {
    gap: 3rem;
  }
}
</style>
