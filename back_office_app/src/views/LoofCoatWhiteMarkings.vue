<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useLoofCharacteristicsStore } from '../stores/loofCharacteristics';
import LoofCharacteristicsList from '../components/LoofCharacteristicsList.vue';
import PageLayout from '../components/views/PageLayout.vue';
import type { NewCoatWhiteMarking } from '../types';

const loofStore = useLoofCharacteristicsStore();

const coatWhiteMarkings = computed(() => loofStore.coatWhiteMarkings);
const loading = computed(() => loofStore.loading);
const error = computed(() => loofStore.error);

const createCoatWhiteMarking = async (markingData: NewCoatWhiteMarking) => {
  await loofStore.createCoatWhiteMarking(markingData);
};

const updateCoatWhiteMarking = async (id: number, markingData: NewCoatWhiteMarking) => {
  await loofStore.updateCoatWhiteMarking(id, markingData);
};

const deleteCoatWhiteMarking = async (id: number) => {
  await loofStore.deleteCoatWhiteMarking(id);
};

onMounted(() => {
  loofStore.fetchCoatWhiteMarkings();
});
</script>
<template>
  <PageLayout 
    title="Taches blanches de la robe"
    description="Gérez les taches blanches de la robe reconnues par le LOOF. Ces taches sont utilisées lors de la création et de la mise à jour des chats."
    >
    <LoofCharacteristicsList
      title="Taches blanches de la robe"
      singularTitle="une tache blanche de la robe"
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
  </PageLayout>
</template>

<style scoped>
/* All styling is handled by the PageLayout component */
</style>
