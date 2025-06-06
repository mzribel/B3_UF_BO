<template>
  <PageLayout 
    title="Gestion des types de polydactylie"
    description="Gérez les types de polydactylie reconnus par le LOOF. Ces types sont utilisés lors de la création et de la mise à jour des chats."
  >
    <LoofCharacteristicsList
      title="Types de polydactylie"
      singularTitle="un type de polydactylie"
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
  </PageLayout>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useLoofCharacteristicsStore } from '../stores/loofCharacteristics';
import LoofCharacteristicsList from '../components/LoofCharacteristicsList.vue';
import PageLayout from '../components/views/PageLayout.vue';
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
/* All styling is handled by the PageLayout component */
</style>
