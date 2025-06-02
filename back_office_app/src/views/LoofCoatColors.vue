<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useLoofCharacteristicsStore } from '../stores/loofCharacteristics';
import LoofCharacteristicsList from '../components/LoofCharacteristicsList.vue';
import PageLayout from '../components/views/PageLayout.vue';
import type { NewCoatColor } from '../types';

const loofStore = useLoofCharacteristicsStore();

const coatColors = computed(() => loofStore.coatColors);
const loading = computed(() => loofStore.loading);
const error = computed(() => loofStore.error);

const createCoatColor = async (colorData: NewCoatColor) => {
  await loofStore.createCoatColor(colorData);
};

const updateCoatColor = async (id: number, colorData: NewCoatColor) => {
  await loofStore.updateCoatColor(id, colorData);
};

const deleteCoatColor = async (id: number) => {
  await loofStore.deleteCoatColor(id);
};

onMounted(() => {
  loofStore.fetchCoatColors();
});
</script>
<template>
  <PageLayout 
    title="Gestion des couleurs"
    description="Gérez les couleurs de robe reconnues par le LOOF. Ces couleurs sont utilisées lors de la création et de la mise à jour des chats."
  >
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
  </PageLayout>
</template>

<style scoped>
</style>
