<template>
  <div class="loof-poly-types-view">
    <h1>Poly Type Management</h1>
    <p class="description">
      Manage poly types recognized by LOOF. These types are used when creating and updating cats.
    </p>
    
    <LoofCharacteristicsList
      title="Poly Types"
      singularTitle="Poly Type"
      :items="polyTypes"
      :loading="loading"
      :error="error"
      :showCode="true"
      :showDescription="false"
      emptyStateEmoji="👣"
      @create="createPolyType"
      @update="updatePolyType"
      @delete="deletePolyType"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useLoofCharacteristicsStore } from '../stores/loofCharacteristics';
import LoofCharacteristicsList from '../components/LoofCharacteristicsList.vue';
import type { NewPolyType } from '../types';

// Store
const loofStore = useLoofCharacteristicsStore();

// Computed properties
const polyTypes = computed(() => loofStore.polyTypes);
const loading = computed(() => loofStore.loading);
const error = computed(() => loofStore.error);

// Methods
const createPolyType = async (polyTypeData: NewPolyType) => {
  await loofStore.createPolyType(polyTypeData);
};

const updatePolyType = async (id: number, polyTypeData: NewPolyType) => {
  await loofStore.updatePolyType(id, polyTypeData);
};

const deletePolyType = async (id: number) => {
  await loofStore.deletePolyType(id);
};

// Fetch poly types on component mount
onMounted(() => {
  loofStore.fetchPolyTypes();
});
</script>

<style scoped>
.loof-poly-types-view {
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
  .loof-poly-types-view {
    padding: 1rem;
  }
  
  h1 {
    font-size: 1.5rem;
  }
}
</style>