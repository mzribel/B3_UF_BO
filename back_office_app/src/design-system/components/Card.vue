<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value: string) => ['default', 'primary', 'secondary', 'outlined', 'flat'].includes(value)
  },
  shadow: {
    type: String,
    default: 'md',
    validator: (value: string) => ['none', 'sm', 'md', 'lg'].includes(value)
  },
  padding: {
    type: String,
    default: 'md',
    validator: (value: string) => ['none', 'sm', 'md', 'lg', 'xl'].includes(value)
  },
  rounded: {
    type: String,
    default: 'md',
    validator: (value: string) => ['none', 'sm', 'md', 'lg', 'full'].includes(value)
  },
  fullWidth: {
    type: Boolean,
    default: false
  }
});

const cardClasses = computed(() => {
  return {
    'ds-card': true,
    [`ds-card--${props.variant}`]: true,
    [`ds-card--shadow-${props.shadow}`]: props.shadow !== 'none',
    [`ds-card--padding-${props.padding}`]: props.padding !== 'none',
    [`ds-card--rounded-${props.rounded}`]: props.rounded !== 'none',
    'ds-card--full-width': props.fullWidth
  };
});
</script>

<template>
  <div :class="cardClasses">
    <div v-if="$slots.header" class="ds-card-header">
      <slot name="header"></slot>
    </div>
    
    <div class="ds-card-body">
      <slot></slot>
    </div>
    
    <div v-if="$slots.footer" class="ds-card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped>
.ds-card {
  display: flex;
  flex-direction: column;
  background-color: var(--bg-light);
  border: 1px solid var(--border-light);
  overflow: hidden;
}

/* Variants */
.ds-card--primary {
  border-top: 4px solid var(--primary-color);
}

.ds-card--secondary {
  border-top: 4px solid var(--secondary-color);
}

.ds-card--outlined {
  border: 1px solid var(--border-medium);
  background-color: transparent;
}

.ds-card--flat {
  border: none;
  background-color: transparent;
}

/* Shadow variants */
.ds-card--shadow-sm {
  box-shadow: var(--shadow-sm);
}

.ds-card--shadow-md {
  box-shadow: var(--shadow-md);
}

.ds-card--shadow-lg {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

/* Padding variants */
.ds-card--padding-sm {
  padding: var(--space-sm);
}

.ds-card--padding-md {
  padding: var(--space-md);
}

.ds-card--padding-lg {
  padding: var(--space-lg);
}

.ds-card--padding-xl {
  padding: var(--space-xl);
}

/* Border radius variants */
.ds-card--rounded-sm {
  border-radius: var(--radius-sm);
}

.ds-card--rounded-md {
  border-radius: var(--radius-md);
}

.ds-card--rounded-lg {
  border-radius: var(--radius-lg);
}

.ds-card--rounded-full {
  border-radius: 9999px;
}

/* Width */
.ds-card--full-width {
  width: 100%;
}

/* Card sections */
.ds-card-header {
  padding: var(--space-md);
  border-bottom: 1px solid var(--border-light);
  font-weight: var(--font-weight-medium);
}

.ds-card-body {
  flex: 1;
}

.ds-card-footer {
  padding: var(--space-md);
  border-top: 1px solid var(--border-light);
  background-color: var(--bg-muted);
}

/* When card has padding, don't add padding to sections */
.ds-card--padding-sm .ds-card-header,
.ds-card--padding-md .ds-card-header,
.ds-card--padding-lg .ds-card-header,
.ds-card--padding-xl .ds-card-header,
.ds-card--padding-sm .ds-card-footer,
.ds-card--padding-md .ds-card-footer,
.ds-card--padding-lg .ds-card-footer,
.ds-card--padding-xl .ds-card-footer {
  padding: 0;
  margin-bottom: var(--space-md);
}

.ds-card--padding-sm .ds-card-footer,
.ds-card--padding-md .ds-card-footer,
.ds-card--padding-lg .ds-card-footer,
.ds-card--padding-xl .ds-card-footer {
  margin-bottom: 0;
  margin-top: var(--space-md);
}
</style>