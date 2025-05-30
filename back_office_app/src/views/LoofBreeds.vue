<template>
  <div class="loof-breeds-view">
    <h1>Gestion des races de chats</h1>
    <p class="description">
      Gérez les races de chats reconnues LOOF. Ces races sont utilisées pour enregistrer les chats dans le système LOOF.
    </p>
    
    <LoofCharacteristicsList
      title="Breeds"
      singularTitle="Breed"
      :items="breeds"
      :loading="loading"
      :error="error"
      :showCode="true"
      :showDescription="true"
      emptyStateEmoji="🐱"
      @create="createBreed"
      @update="updateBreed"
      @delete="deleteBreed"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useLoofCharacteristicsStore } from '../stores/loofCharacteristics';
import LoofCharacteristicsList from '../components/LoofCharacteristicsList.vue';
import type { NewBreed } from '../types';

const loofStore = useLoofCharacteristicsStore();

const breeds = computed(() => loofStore.breeds);
const loading = computed(() => loofStore.loading);
const error = computed(() => loofStore.error);

const createBreed = async (breedData: NewBreed) => {
  await loofStore.createBreed(breedData);
};

const updateBreed = async (id: number, breedData: NewBreed) => {
  await loofStore.updateBreed(id, breedData);
};

const deleteBreed = async (id: number) => {
  await loofStore.deleteBreed(id);
};

onMounted(() => {
  loofStore.fetchBreeds();
});
</script>

<style scoped>
.loof-breeds-view {
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
  .loof-breeds-view {
    padding: 1rem;
  }
  
  h1 {
    font-size: 1.5rem;
  }
}
</style>