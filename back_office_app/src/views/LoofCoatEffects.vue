<template>
  <div class="loof-coat-effects-view">
    <h1>Coat Effect Management</h1>
    <p class="description">
      Manage coat effects recognized by LOOF. These effects are used when creating and updating cats.
    </p>
    
    <LoofCharacteristicsList
      title="Coat Effects"
      singularTitle="Coat Effect"
      :items="coatEffects"
      :loading="loading"
      :error="error"
      :showCode="true"
      :showDescription="false"
      emptyStateEmoji="✨"
      @create="createCoatEffect"
      @update="updateCoatEffect"
      @delete="deleteCoatEffect"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useLoofCharacteristicsStore } from '../stores/loofCharacteristics';
import LoofCharacteristicsList from '../components/LoofCharacteristicsList.vue';
import type { NewCoatEffect } from '../types';

// Store
const loofStore = useLoofCharacteristicsStore();

// Computed properties
const coatEffects = computed(() => loofStore.coatEffects);
const loading = computed(() => loofStore.loading);
const error = computed(() => loofStore.error);

// Methods
const createCoatEffect = async (effectData: NewCoatEffect) => {
  await loofStore.createCoatEffect(effectData);
};

const updateCoatEffect = async (id: number, effectData: NewCoatEffect) => {
  await loofStore.updateCoatEffect(id, effectData);
};

const deleteCoatEffect = async (id: number) => {
  await loofStore.deleteCoatEffect(id);
};

// Fetch coat effects on component mount
onMounted(() => {
  loofStore.fetchCoatEffects();
});
</script>

<style scoped>
.loof-coat-effects-view {
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
  .loof-coat-effects-view {
    padding: 1rem;
  }
  
  h1 {
    font-size: 1.5rem;
  }
}
</style>