<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useLoofCharacteristicsStore } from '../stores/loofCharacteristics';
import LoofCharacteristicsList from '../components/LoofCharacteristicsList.vue';
import PageLayout from '../components/views/PageLayout.vue';
import type { NewCoatEffect } from '../types';

const loofStore = useLoofCharacteristicsStore();

const coatEffects = computed(() => loofStore.coatEffects);
const loading = computed(() => loofStore.loading);
const error = computed(() => loofStore.error);

const createCoatEffect = async (effectData: NewCoatEffect) => {
  await loofStore.createCoatEffect(effectData);
};

const updateCoatEffect = async (id: number, effectData: NewCoatEffect) => {
  await loofStore.updateCoatEffect(id, effectData);
};

const deleteCoatEffect = async (id: number) => {
  await loofStore.deleteCoatEffect(id);
};

onMounted(() => {
  loofStore.fetchCoatEffects();
});
</script>
<template>
  <PageLayout 
    title="Gestion des effets de robe"
    description="Gérez les effets de robe reconnus par le LOOF. Ces effets sont utilisés lors de la création et de la mise à jour des chats."
  >
    <LoofCharacteristicsList
      title="Effets de robe"
      singularTitle="un effet de robe"
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
  </PageLayout>
</template>

<style scoped>
/* All styling is handled by the PageLayout component */
</style>
