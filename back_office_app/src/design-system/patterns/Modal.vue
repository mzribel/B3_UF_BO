<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import Button from '../components/Button.vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'md',
    validator: (value: string) => ['sm', 'md', 'lg', 'xl', 'full'].includes(value)
  },
  persistent: {
    type: Boolean,
    default: false
  },
  hideClose: {
    type: Boolean,
    default: false
  },
  closeOnEsc: {
    type: Boolean,
    default: true
  },
  closeOnClickOutside: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['update:modelValue', 'close']);

const modalRef = ref<HTMLDivElement | null>(null);
const modalContentRef = ref<HTMLDivElement | null>(null);

const isVisible = ref(props.modelValue);

// Watch for changes to modelValue prop
watch(() => props.modelValue, (newValue) => {
  isVisible.value = newValue;
  if (newValue) {
    document.body.classList.add('ds-modal-open');
    nextTick(() => {
      focusTrap();
    });
  } else {
    document.body.classList.remove('ds-modal-open');
  }
});

// Close the modal
const close = () => {
  if (!props.persistent) {
    isVisible.value = false;
    emit('update:modelValue', false);
    emit('close');
  }
};

// Handle click outside
const handleClickOutside = (event: MouseEvent) => {
  if (
    props.closeOnClickOutside &&
    modalContentRef.value &&
    !modalContentRef.value.contains(event.target as Node)
  ) {
    close();
  }
};

// Handle ESC key
const handleKeyDown = (event: KeyboardEvent) => {
  if (props.closeOnEsc && event.key === 'Escape') {
    close();
  }
};

// Focus trap
const focusTrap = () => {
  if (modalContentRef.value) {
    const focusableElements = modalContentRef.value.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length) {
      (focusableElements[0] as HTMLElement).focus();
    }
  }
};

// Computed classes
const modalClasses = computed(() => {
  return {
    'ds-modal': true,
    'ds-modal--visible': isVisible.value,
    [`ds-modal--${props.size}`]: true
  };
});

// Lifecycle hooks
onMounted(() => {
  document.addEventListener('keydown', handleKeyDown);
  if (props.modelValue) {
    document.body.classList.add('ds-modal-open');
  }
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown);
  document.body.classList.remove('ds-modal-open');
});

// For Vue 3, we need to import nextTick
const nextTick = () => new Promise(resolve => setTimeout(resolve, 0));
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isVisible"
      ref="modalRef"
      :class="modalClasses"
      @click="handleClickOutside"
    >
      <div ref="modalContentRef" class="ds-modal-content">
        <div class="ds-modal-header">
          <h3 v-if="title" class="ds-modal-title">{{ title }}</h3>
          <Button
            v-if="!hideClose"
            variant="light"
            size="sm"
            class="ds-modal-close"
            @click="close"
          >
            ✕
          </Button>
        </div>
        
        <div class="ds-modal-body">
          <slot></slot>
        </div>
        
        <div v-if="$slots.footer" class="ds-modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style>
/* Global styles (not scoped) */
body.ds-modal-open {
  overflow: hidden;
}
</style>

<style scoped>
.ds-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  padding: var(--space-md);
}

.ds-modal-content {
  background-color: var(--bg-light);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - var(--space-xl) * 2);
  width: 100%;
  overflow: hidden;
}

.ds-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-md);
  border-bottom: 1px solid var(--border-light);
}

.ds-modal-title {
  margin: 0;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  color: var(--text-dark);
}

.ds-modal-close {
  font-size: var(--font-size-lg);
  line-height: 1;
  padding: var(--space-xs);
  min-width: auto;
  min-height: auto;
}

.ds-modal-body {
  padding: var(--space-md);
  overflow-y: auto;
  flex: 1;
}

.ds-modal-footer {
  padding: var(--space-md);
  border-top: 1px solid var(--border-light);
  display: flex;
  justify-content: flex-end;
  gap: var(--space-sm);
}

/* Size variants */
.ds-modal--sm .ds-modal-content {
  max-width: 400px;
}

.ds-modal--md .ds-modal-content {
  max-width: 600px;
}

.ds-modal--lg .ds-modal-content {
  max-width: 800px;
}

.ds-modal--xl .ds-modal-content {
  max-width: 1000px;
}

.ds-modal--full .ds-modal-content {
  max-width: calc(100vw - var(--space-xl) * 2);
  max-height: calc(100vh - var(--space-xl) * 2);
}

@media (max-width: 768px) {
  .ds-modal {
    padding: var(--space-sm);
  }
  
  .ds-modal-content {
    max-height: calc(100vh - var(--space-md) * 2);
  }
  
  .ds-modal--sm .ds-modal-content,
  .ds-modal--md .ds-modal-content,
  .ds-modal--lg .ds-modal-content,
  .ds-modal--xl .ds-modal-content {
    max-width: 100%;
  }
}
</style>