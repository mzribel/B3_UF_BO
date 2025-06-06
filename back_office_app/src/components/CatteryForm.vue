<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCatteriesStore } from '../stores/catteries';
import { useRouter } from 'vue-router';
import type { NewCattery } from '../types';
import Button from '../design-system/components/Button.vue';
import Input from '../design-system/components/Input.vue';
import Form from '../design-system/patterns/Form.vue';

const props = defineProps<{
  isEdit?: boolean;
  catteryId?: number;
}>();

const router = useRouter();

const catteriesStore = useCatteriesStore();

const name = ref('');
const loading = computed(() => catteriesStore.loading);
const error = computed(() => catteriesStore.error);

const nameError = ref('');

const validateForm = (): boolean => {
  nameError.value = '';

  if (!name.value.trim()) {
    nameError.value = 'Le nom de la chatterie est requis';
    return false;
  }

  return true;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  const catteryData: NewCattery = {
    name: name.value.trim(),
  };

  let success;
  if (props.isEdit && props.catteryId) {
    alert('La modification des chatteries n\'est pas prise en charge par l\'API');
    return;
  } else {
    const result = await catteriesStore.createCattery(catteryData);
    success = !!result;
  }

  if (success) {
    router.push('/catteries');
  }
};

const handleCancel = () => {
  router.push('/catteries');
};
</script>

<template>
  <div class="cattery-form">
    <div v-if="error" class="bg-error error-message">
      <span class="error-icon">⚠️</span> {{ error }}
    </div>

    <Form 
      :loading="loading" 
      :submitLabel="isEdit ? 'Mettre à Jour la Chatterie' : 'Créer la Chatterie'" 
      cancelLabel="Annuler"
      @submit="handleSubmit"
      @cancel="handleCancel"
      fullWidth
    >
      <Input 
        v-model="name" 
        label="Nom de la Chatterie"
        placeholder="Entrez le nom de la chatterie"
        :error="nameError"
        required
        fullWidth
      />
    </Form>
  </div>
</template>

<style scoped>
.cattery-form {
  background-color: var(--bg-light);
  padding: var(--space-lg);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  border: 2px solid var(--border-medium);
  max-width: 600px;
  margin: 0 auto;
}

h2 {
  color: var(--secondary-color);
  margin-bottom: var(--space-lg);
  text-align: center;
  font-size: var(--font-size-lg);
}

.error-message {
  margin-bottom: var(--space-md);
  display: flex;
  align-items: center;
}

.error-icon {
  margin-right: var(--space-xs);
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .cattery-form {
    padding: var(--space-md);
  }

  h2 {
    font-size: calc(var(--font-size-lg) * 0.85);
  }
}
</style>
