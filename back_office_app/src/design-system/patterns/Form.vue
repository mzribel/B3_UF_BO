<script setup lang="ts">
import { computed, provide, ref } from 'vue';
import Button from '../components/Button.vue';

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  submitLabel: {
    type: String,
    default: 'Submit'
  },
  cancelLabel: {
    type: String,
    default: 'Cancel'
  },
  showCancel: {
    type: Boolean,
    default: true
  },
  inline: {
    type: Boolean,
    default: false
  },
  fullWidth: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['submit', 'cancel']);

const formRef = ref<HTMLFormElement | null>(null);

const handleSubmit = (event: Event) => {
  event.preventDefault();
  emit('submit', event);
};

const handleCancel = (event: Event) => {
  emit('cancel', event);
};

const formClasses = computed(() => {
  return {
    'ds-form': true,
    'ds-form--inline': props.inline,
    'ds-form--full-width': props.fullWidth
  };
});

// Provide form context to child components
provide('formContext', {
  inline: props.inline,
  fullWidth: props.fullWidth
});

// Method to programmatically submit the form
const submit = () => {
  formRef.value?.requestSubmit();
};

// Method to reset the form
const reset = () => {
  formRef.value?.reset();
};

defineExpose({ submit, reset });
</script>

<template>
  <form ref="formRef" :class="formClasses" @submit="handleSubmit">
    <div class="ds-form-fields">
      <slot></slot>
    </div>
    
    <div class="ds-form-actions">
      <Button 
        v-if="showCancel" 
        type="button" 
        variant="secondary" 
        @click="handleCancel"
      >
        {{ cancelLabel }}
      </Button>
      
      <Button 
        type="submit" 
        variant="primary" 
        :disabled="loading"
      >
        <span v-if="loading">Loading...</span>
        <span v-else>{{ submitLabel }}</span>
      </Button>
    </div>
  </form>
</template>

<style scoped>
.ds-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.ds-form--inline {
  flex-direction: row;
  align-items: flex-end;
  flex-wrap: wrap;
}

.ds-form--full-width {
  width: 100%;
}

.ds-form-fields {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  flex: 1;
}

.ds-form--inline .ds-form-fields {
  flex-direction: row;
  align-items: flex-end;
  gap: var(--space-md);
}

.ds-form-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-md);
  margin-top: var(--space-md);
}

.ds-form--inline .ds-form-actions {
  margin-top: 0;
}

@media (max-width: 768px) {
  .ds-form--inline {
    flex-direction: column;
  }
  
  .ds-form--inline .ds-form-fields {
    flex-direction: column;
  }
  
  .ds-form-actions {
    flex-direction: column-reverse;
    width: 100%;
  }
  
  .ds-form-actions button {
    width: 100%;
  }
}
</style>