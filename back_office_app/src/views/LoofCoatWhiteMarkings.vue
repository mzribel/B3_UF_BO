<template>
  <div class="loof-coat-white-markings-view">
    <h1>Coat White Marking Management</h1>
    <p class="description">
      Manage coat white markings recognized by LOOF. These markings are used when creating and updating cats.
    </p>
    
    <LoofCharacteristicsList
      title="Coat White Markings"
      singularTitle="Coat White Marking"
      :items="coatWhiteMarkings"
      :loading="loading"
      :error="error"
      :showCode="true"
      :showDescription="false"
      emptyStateEmoji="⚪"
      @create="createCoatWhiteMarking"
      @update="updateCoatWhiteMarking"
      @delete="deleteCoatWhiteMarking"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useLoofCharacteristicsStore } from '../stores/loofCharacteristics';
import LoofCharacteristicsList from '../components/LoofCharacteristicsList.vue';
import type { NewCoatWhiteMarking } from '../types';

// Store
const loofStore = useLoofCharacteristicsStore();

// Computed properties
const coatWhiteMarkings = computed(() => loofStore.coatWhiteMarkings);
const loading = computed(() => loofStore.loading);
const error = computed(() => loofStore.error);

// Methods
const createCoatWhiteMarking = async (markingData: NewCoatWhiteMarking) => {
  await loofStore.createCoatWhiteMarking(markingData);
};

const updateCoatWhiteMarking = async (id: number, markingData: NewCoatWhiteMarking) => {
  await loofStore.updateCoatWhiteMarking(id, markingData);
};

const deleteCoatWhiteMarking = async (id: number) => {
  await loofStore.deleteCoatWhiteMarking(id);
};

// Fetch coat white markings on component mount
onMounted(() => {
  loofStore.fetchCoatWhiteMarkings();
});
</script>

<style scoped>
.loof-coat-white-markings-view {
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
  .loof-coat-white-markings-view {
    padding: 1rem;
  }
  
  h1 {
    font-size: 1.5rem;
  }
}
</style>