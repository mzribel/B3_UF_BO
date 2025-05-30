<script setup lang="ts">
import { onMounted } from 'vue';
import { useCatteriesStore } from '../stores/catteries';
import CatteryList from '../components/CatteryList.vue';

const catteriesStore = useCatteriesStore();

onMounted(() => {
  catteriesStore.fetchCatteries();
});
</script>

<template>
  <div class="catteries-view">
    <h1>Gestion des chatteries</h1>
    <p class="description">
      Gérez vos chatteries, ajoutez-en de nouvelles ou modifiez les existantes.
      Vous pouvez également supprimer des chatteries si nécessaire.
      Cliquez sur le bouton ci-dessous pour créer une nouvelle chatterie.
    </p>
    
    <CatteryList />
  </div>
</template>

<style scoped>
.catteries-view {
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

@media (max-width: 768px) {
  .catteries-view {
    padding: 1rem;
  }
  
  h1 {
    font-size: 1.5rem;
  }
}
</style>