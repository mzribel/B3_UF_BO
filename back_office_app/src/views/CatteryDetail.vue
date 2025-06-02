<script setup lang="ts">
import { useRoute } from 'vue-router';
import CatteryDetails from '../components/CatteryDetails.vue';

const route = useRoute();
const catteryId = Number(route.params.id);
</script>

<template>
  <div class="cattery-detail-view">
    <CatteryDetails :catteryId="catteryId" />
  </div>
</template>

<style scoped>
.cattery-detail-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

@media (max-width: 768px) {
  .cattery-detail-view {
    padding: 1rem;
  }
}
</style>