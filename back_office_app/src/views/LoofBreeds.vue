<template>
  <PageLayout 
    title="Gestion des races de chats"
    description="Gérez les races de chats reconnues LOOF. Ces races sont utilisées pour enregistrer les chats dans le système LOOF."
  >
    <LoofCharacteristicsList
      title="Races"
      singularTitle="une race"
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
  </PageLayout>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useLoofCharacteristicsStore } from '../stores/loofCharacteristics';
import LoofCharacteristicsList from '../components/LoofCharacteristicsList.vue';
import PageLayout from '../components/views/PageLayout.vue';
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
/* All styling is handled by the PageLayout component */
</style>
