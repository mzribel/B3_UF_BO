<template>
  <div class="loof-coat-colors-view">
    <h1>Coat Color Management</h1>
    <p class="description">
      Manage coat colors recognized by LOOF. These colors are used when creating and updating cats.
    </p>
    
    <LoofCharacteristicsList
      title="Coat Colors"
      singularTitle="Coat Color"
      :items="coatColors"
      :loading="loading"
      :error="error"
      :showCode="true"
      :showDescription="false"
      emptyStateEmoji="🎨"
      @create="createCoatColor"
      @update="updateCoatColor"
      @delete="deleteCoatColor"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useLoofCharacteristicsStore } from '../stores/loofCharacteristics';
import LoofCharacteristicsList from '../components/LoofCharacteristicsList.vue';
import type { NewCoatColor } from '../types';

// Store
const loofStore = useLoofCharacteristicsStore();

// Computed properties
const coatColors = computed(() => loofStore.coatColors);
const loading = computed(() => loofStore.loading);
const error = computed(() => loofStore.error);

// Methods
const createCoatColor = async (colorData: NewCoatColor) => {
  await loofStore.createCoatColor(colorData);
};

const updateCoatColor = async (id: number, colorData: NewCoatColor) => {
  await loofStore.updateCoatColor(id, colorData);
};

const deleteCoatColor = async (id: number) => {
  await loofStore.deleteCoatColor(id);
};

// Fetch coat colors on component mount
onMounted(() => {
  loofStore.fetchCoatColors();
});
</script>

<style scoped>
.loof-coat-colors-view {
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
  .loof-coat-colors-view {
    padding: 1rem;
  }
  
  h1 {
    font-size: 1.5rem;
  }
}
</style>