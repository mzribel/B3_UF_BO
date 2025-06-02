<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text',
    validator: (value: string) => ['text', 'password', 'email', 'number', 'tel', 'url', 'search', 'date'].includes(value)
  },
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  },
  helpText: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'md',
    validator: (value: string) => ['sm', 'md', 'lg'].includes(value)
  },
  fullWidth: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue', 'focus', 'blur', 'input']);

const inputRef = ref<HTMLInputElement | null>(null);

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
  emit('input', event);
};

const handleFocus = (event: FocusEvent) => {
  emit('focus', event);
};

const handleBlur = (event: FocusEvent) => {
  emit('blur', event);
};

const focus = () => {
  inputRef.value?.focus();
};

const inputClasses = computed(() => {
  return {
    'ds-input': true,
    [`ds-input--${props.size}`]: true,
    'ds-input--error': !!props.error,
    'ds-input--disabled': props.disabled,
    'ds-input--full-width': props.fullWidth
  };
});

const wrapperClasses = computed(() => {
  return {
    'ds-input-wrapper': true,
    'ds-input-wrapper--full-width': props.fullWidth
  };
});

defineExpose({ focus });
</script>

<template>
  <div :class="wrapperClasses">
    <label v-if="label" class="ds-input-label">
      {{ label }}
      <span v-if="required" class="ds-input-required">*</span>
    </label>
    
    <input
      ref="inputRef"
      :class="inputClasses"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      @input="updateValue"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    
    <div v-if="error" class="ds-input-error">{{ error }}</div>
    <div v-else-if="helpText" class="ds-input-help">{{ helpText }}</div>
  </div>
</template>

<style scoped>
.ds-input-wrapper {
  display: flex;
  flex-direction: column;
  margin-bottom: var(--space-md);
}

.ds-input-wrapper--full-width {
  width: 100%;
}

.ds-input-label {
  display: block;
  margin-bottom: var(--space-xs);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  color: var(--text-dark);
}

.ds-input-required {
  color: var(--error);
  margin-left: var(--space-xs);
}

.ds-input {
  font-family: var(--font-family);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  background-color: var(--bg-light);
  color: var(--text-dark);
  transition: border-color 0.2s, box-shadow 0.2s;
}

.ds-input:focus {
  outline: none;
  border-color: var(--secondary-color);
  box-shadow: var(--shadow-focus);
}

.ds-input::placeholder {
  color: var(--text-muted);
}

/* Size variants */
.ds-input--sm {
  padding: calc(var(--space-xs) * 0.8) var(--space-sm);
  font-size: var(--font-size-sm);
}

.ds-input--md {
  padding: var(--space-sm);
  font-size: var(--font-size-md);
}

.ds-input--lg {
  padding: var(--space-md);
  font-size: calc(var(--font-size-md) * 1.1);
}

/* States */
.ds-input--error {
  border-color: var(--error);
}

.ds-input--error:focus {
  box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.2);
}

.ds-input--disabled {
  background-color: var(--bg-muted);
  cursor: not-allowed;
  opacity: 0.7;
}

.ds-input--full-width {
  width: 100%;
}

.ds-input-error {
  margin-top: var(--space-xs);
  font-size: var(--font-size-sm);
  color: var(--error);
}

.ds-input-help {
  margin-top: var(--space-xs);
  font-size: var(--font-size-sm);
  color: var(--text-muted);
}
</style>