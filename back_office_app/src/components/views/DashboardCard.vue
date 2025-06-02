<script setup lang="ts">
import { useRouter } from 'vue-router';
import Card from '../../design-system/components/Card.vue';

const props = defineProps<{
  title: string;
  description: string;
  route: string;
}>();

const router = useRouter();

const navigateTo = () => {
  router.push(props.route);
};
</script>

<template>
  <Card 
    class="dashboard-card" 
    variant="default" 
    shadow="md" 
    padding="lg" 
    @click="navigateTo"
  >
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
  </Card>
</template>

<style scoped>
.dashboard-card {
  width: 300px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.dashboard-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}

h2 {
  color: var(--secondary-color);
  margin-bottom: var(--space-sm);
  font-size: var(--font-size-lg);
}

p {
  color: var(--text-muted);
  font-size: var(--font-size-md);
}

@media (max-width: 768px) {
  .dashboard-card {
    width: 100%;
  }
}
</style>