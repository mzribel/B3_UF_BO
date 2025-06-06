<script setup lang="ts">
import { onMounted } from 'vue';
import { useCatteriesStore } from '../stores/catteries';
import CatteryList from '../components/CatteryList.vue';
import PageLayout from "../components/views/PageLayout.vue";

const catteriesStore = useCatteriesStore();

onMounted(() => {
  catteriesStore.fetchCatteries();
});
</script>

<template>
  <PageLayout title="Gestion des Chatteries" description="Gérez vos chatteries, ajoutez-en de nouvelles ou modifiez les existantes.">
    <CatteryList />
  </PageLayout>
</template>

<style scoped>
</style>