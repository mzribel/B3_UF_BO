<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useLoofCharacteristicsStore } from '../stores/loofCharacteristics';
import LoofCharacteristicsList from '../components/LoofCharacteristicsList.vue';
import PageLayout from '../components/views/PageLayout.vue';
import type { NewCoatPattern } from '../types';

const loofStore = useLoofCharacteristicsStore();

const coatPatterns = computed(() => loofStore.coatPatterns);
const loading = computed(() => loofStore.loading);
const error = computed(() => loofStore.error);

const createCoatPattern = async (patternData: NewCoatPattern) => {
  await loofStore.createCoatPattern(patternData);
};

const updateCoatPattern = async (id: number, patternData: NewCoatPattern) => {
  await loofStore.updateCoatPattern(id, patternData);
};

const deleteCoatPattern = async (id: number) => {
  await loofStore.deleteCoatPattern(id);
};

onMounted(() => {
  loofStore.fetchCoatPatterns();
});
</script>
<template>
  <PageLayout 
    title="Gestion des motifs de robe"
    description="Gérez les motifs de robe reconnus par le LOOF. Ces motifs sont utilisés lors de la création et de la mise à jour des chats."
  >
    <LoofCharacteristicsList
      title="Motif du pelage"
      singularTitle="un Motif du pelage"
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
  </PageLayout>
</template>

<style scoped>
</style>
