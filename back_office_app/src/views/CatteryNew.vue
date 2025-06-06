<script setup lang="ts">
import CatteryForm from '../components/CatteryForm.vue';
</script>

<template>
  <div class="cattery-new-view">
    <h1>Créer une nouvelle chatterie</h1>
    <p class="description">
      Remplissez le formulaire ci-dessous pour créer une nouvelle chatterie. Assurez-vous de fournir toutes les informations nécessaires pour que votre chatterie soit bien enregistrée.
    </p>
    
    <CatteryForm />
  </div>
</template>

<style scoped>
.cattery-new-view {
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
  .cattery-new-view {
    padding: 1rem;
  }
  
  h1 {
    font-size: 1.5rem;
  }
}
</style>