<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value: string) => ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value: string) => ['sm', 'md', 'lg'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  fullWidth: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'button',
    validator: (value: string) => ['button', 'submit', 'reset'].includes(value)
  }
});

const emit = defineEmits(['click']);

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event);
  }
};

const buttonClasses = computed(() => {
  return {
    'ds-button': true,
    [`ds-button--${props.variant}`]: true,
    [`ds-button--${props.size}`]: true,
    'ds-button--disabled': props.disabled,
    'ds-button--full-width': props.fullWidth
  };
});
</script>

<template>
  <button
    :class="buttonClasses"
    :type="type"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
.ds-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-family);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-sm);
  border: 1px solid transparent;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s, color 0.2s, box-shadow 0.2s;
}

/* Size variants */
.ds-button--sm {
  padding: calc(var(--space-xs) * 0.8) var(--space-sm);
  font-size: calc(var(--font-size-sm) * 0.9);
}

.ds-button--md {
  padding: var(--space-sm) var(--space-md);
  font-size: var(--font-size-md);
}

.ds-button--lg {
  padding: var(--space-md) var(--space-lg);
  font-size: calc(var(--font-size-md) * 1.1);
}

/* Color variants */
.ds-button--primary {
  background-color: var(--btn-primary-bg, var(--primary-color));
  color: var(--text-light);
}

.ds-button--primary:hover:not(.ds-button--disabled) {
  background-color: var(--btn-primary-hover, var(--primary-dark));
}

.ds-button--secondary {
  background-color: var(--btn-secondary-bg, var(--bg-muted));
  color: var(--btn-secondary-text, var(--text-dark));
}

.ds-button--secondary:hover:not(.ds-button--disabled) {
  background-color: var(--btn-secondary-hover, var(--border-light));
}

.ds-button--success {
  background-color: var(--success);
  color: var(--text-light);
}

.ds-button--success:hover:not(.ds-button--disabled) {
  background-color: color-mix(in srgb, var(--success), #000 10%);
}

.ds-button--danger {
  background-color: var(--error);
  color: var(--text-light);
}

.ds-button--danger:hover:not(.ds-button--disabled) {
  background-color: color-mix(in srgb, var(--error), #000 10%);
}

.ds-button--warning {
  background-color: var(--warning);
  color: var(--text-dark);
}

.ds-button--warning:hover:not(.ds-button--disabled) {
  background-color: color-mix(in srgb, var(--warning), #000 10%);
}

.ds-button--info {
  background-color: var(--text-link);
  color: var(--text-light);
}

.ds-button--info:hover:not(.ds-button--disabled) {
  background-color: color-mix(in srgb, var(--text-link), #000 10%);
}

.ds-button--light {
  background-color: var(--bg-light);
  color: var(--text-dark);
  border: 1px solid var(--border-light);
}

.ds-button--light:hover:not(.ds-button--disabled) {
  background-color: var(--bg-muted);
}

.ds-button--dark {
  background-color: var(--bg-dark);
  color: var(--text-light);
}

.ds-button--dark:hover:not(.ds-button--disabled) {
  background-color: color-mix(in srgb, var(--bg-dark), #fff 10%);
}

/* States */
.ds-button--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.ds-button:focus {
  outline: none;
  box-shadow: var(--shadow-focus);
}

.ds-button--full-width {
  width: 100%;
}
</style>