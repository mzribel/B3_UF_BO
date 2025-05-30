<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCatteriesStore } from '../stores/catteries';
import { useRouter } from 'vue-router';
import type { NewCattery } from '../types';

const props = defineProps<{
  isEdit?: boolean;
  catteryId?: number;
}>();

const router = useRouter();

const catteriesStore = useCatteriesStore();

const name = ref('');
const breederId = ref<number | null>(null);
const loading = computed(() => catteriesStore.loading);
const error = computed(() => catteriesStore.error);

const formErrors = ref<{ name?: string }>({});
const validateForm = (): boolean => {
  formErrors.value = {};

  if (!name.value.trim()) {
    formErrors.value.name = 'Le nom de la chatterie est requis';
    return false;
  }

  return true;
};

const submitForm = async () => {
  if (!validateForm()) return;

  const catteryData: NewCattery = {
    name: name.value.trim(),
    breederId: breederId.value || undefined
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

const cancelForm = () => {
  router.push('/catteries');
};
</script>

<template>
  <div class="cattery-form">
    <h2>{{ isEdit ? 'Modifier la Chatterie' : 'Créer une Nouvelle Chatterie' }}</h2>

    <div v-if="error" class="error-message">
      <span class="error-icon">⚠️</span> {{ error }}
    </div>

    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Nom de la Chatterie</label>
        <input 
          id="name" 
          v-model="name" 
          type="text" 
          placeholder="Entrez le nom de la chatterie"
          :class="{ 'input-error': formErrors.name }"
        >
        <div v-if="formErrors.name" class="error-text">{{ formErrors.name }}</div>
      </div>

      <div class="form-group">
        <label for="breederId">ID de l'Éleveur (Optionnel)</label>
        <input 
          id="breederId" 
          v-model="breederId" 
          type="number" 
          placeholder="Entrez l'ID de l'éleveur si disponible"
        >
        <div class="help-text">Laissez vide si vous souhaitez configurer l'éleveur plus tard</div>
      </div>

      <div class="form-actions">
        <button type="button" class="btn-cancel" @click="cancelForm">Annuler</button>
        <button type="submit" class="btn-submit" :disabled="loading">
          <span v-if="loading">Traitement en cours...</span>
          <span v-else>{{ isEdit ? 'Mettre à Jour la Chatterie' : 'Créer la Chatterie' }}</span>
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.cattery-form {
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 2px solid #e9ecef;
  max-width: 600px;
  margin: 0 auto;
}

h2 {
  color: #6c5ce7;
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.5rem;
}

.error-message {
  background-color: #ffebee;
  color: #c62828;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}

.error-icon {
  margin-right: 0.5rem;
  font-size: 1.2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #2d3436;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #dfe6e9;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

input:focus {
  outline: none;
  border-color: #6c5ce7;
  box-shadow: 0 0 0 2px rgba(108, 92, 231, 0.2);
}

.input-error {
  border-color: #e74c3c;
}

.error-text {
  color: #e74c3c;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

.help-text {
  color: #636e72;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.btn-cancel, .btn-submit {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-cancel {
  background-color: #e9ecef;
  color: #2d3436;
}

.btn-cancel:hover {
  background-color: #dee2e6;
}

.btn-submit {
  background-color: #6c5ce7;
  color: white;
}

.btn-submit:hover {
  background-color: #5b4bc4;
}

.btn-submit:disabled {
  background-color: #b2bec3;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .cattery-form {
    padding: 1rem;
  }

  h2 {
    font-size: 1.3rem;
  }

  .form-actions {
    flex-direction: column-reverse;
    gap: 0.5rem;
  }

  .btn-cancel, .btn-submit {
    width: 100%;
    padding: 0.6rem 1rem;
  }
}
</style>
