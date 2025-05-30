<template>
  <div class="loof-coat-patterns-view">
    <h1>Coat Pattern Management</h1>
    <p class="description">
      Manage coat patterns recognized by LOOF. These patterns are used when creating and updating cats.
    </p>
    
    <LoofCharacteristicsList
      title="Coat Patterns"
      singularTitle="Coat Pattern"
      :items="coatPatterns"
      :loading="loading"
      :error="error"
      :showCode="true"
      :showDescription="false"
      emptyStateEmoji="🔄"
      @create="createCoatPattern"
      @update="updateCoatPattern"
      @delete="deleteCoatPattern"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useLoofCharacteristicsStore } from '../stores/loofCharacteristics';
import LoofCharacteristicsList from '../components/LoofCharacteristicsList.vue';
import type { NewCoatPattern } from '../types';

// Store
const loofStore = useLoofCharacteristicsStore();

// Computed properties
const coatPatterns = computed(() => loofStore.coatPatterns);
const loading = computed(() => loofStore.loading);
const error = computed(() => loofStore.error);

// Methods
const createCoatPattern = async (patternData: NewCoatPattern) => {
  await loofStore.createCoatPattern(patternData);
};

const updateCoatPattern = async (id: number, patternData: NewCoatPattern) => {
  await loofStore.updateCoatPattern(id, patternData);
};

const deleteCoatPattern = async (id: number) => {
  await loofStore.deleteCoatPattern(id);
};

// Fetch coat patterns on component mount
onMounted(() => {
  loofStore.fetchCoatPatterns();
});
</script>

<style scoped>
.loof-coat-patterns-view {
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
  .loof-coat-patterns-view {
    padding: 1rem;
  }
  
  h1 {
    font-size: 1.5rem;
  }
}
</style>