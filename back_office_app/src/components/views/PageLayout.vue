<script setup lang="ts">
import Card from '../../design-system/components/Card.vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  useCard: {
    type: Boolean,
    default: true
  },
  cardVariant: {
    type: String,
    default: 'default'
  },
  cardShadow: {
    type: String,
    default: 'none'
  },
  cardPadding: {
    type: String,
    default: 'none'
  }
});
</script>

<template>
  <div class="page-layout">
    <h1>{{ title }}</h1>
    <p v-if="description" class="page-description">{{ description }}</p>
    
    <Card 
      v-if="useCard" 
      class="content-card"
      :variant="cardVariant"
      :shadow="cardShadow"
      :padding="cardPadding"
    >
      <slot></slot>
    </Card>
    
    <div v-else class="content-container">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.page-layout {
  padding: 0;
  margin: 0;
}

h1 {
  color: var(--h1-color);
  margin-bottom: var(--space-md);
  text-align: center;
  font-size: calc(var(--font-size-lg) * 1.3);
}

.page-description {
  text-align: center;
  color: var(--text-muted);
  margin-bottom: var(--space-xl);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.content-card,
.content-container {
  margin-bottom: var(--space-xl);
}

@media (max-width: 768px) {
  .page-layout {
    padding: var(--space-md);
  }
  
  h1 {
    font-size: var(--font-size-lg);
  }
}
</style>