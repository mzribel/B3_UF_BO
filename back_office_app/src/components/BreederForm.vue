<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useBreederStore } from '../stores/breeder';
import type { UpdateBreeder } from '../types';

const props = defineProps<{
  catteryId: number;
  show: boolean;
}>();

const emit = defineEmits(['close', 'breeder-updated']);

const breederStore = useBreederStore();

const breederData = ref<UpdateBreeder>({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: {
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  }
});

const formErrors = ref<Record<string, string>>({});

const loading = computed(() => breederStore.loading);
const error = computed(() => breederStore.error);

watch(() => props.show, async (newValue) => {
  if (newValue) {
    await fetchBreederData();
  }
});

const fetchBreederData = async () => {
  const breeder = await breederStore.getCatteryBreeder(props.catteryId);
  if (breeder) {
    breederData.value = {
      firstName: breeder.firstName || '',
      lastName: breeder.lastName || '',
      email: breeder.email || '',
      phone: breeder.phone || '',
      address: breeder.address || {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
      }
    };
  }
};

const validateForm = (): boolean => {
  formErrors.value = {};

  if (!breederData.value.firstName.trim()) {
    formErrors.value.firstName = 'Le prénom est requis';
    return false;
  }

  if (!breederData.value.lastName.trim()) {
    formErrors.value.lastName = 'Le nom est requis';
    return false;
  }

  return true;
};

const submitForm = async () => {
  if (!validateForm()) return;

  const success = await breederStore.updateCatteryBreeder(props.catteryId, breederData.value);

  if (success) {
    emit('breeder-updated');
    emit('close');
  }
};

const closeModal = () => {
  emit('close');
};
</script>

<template>
  <div v-if="show" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h3>Mettre à jour les informations de l'éleveur</h3>
        <button class="btn-close" @click="closeModal">&times;</button>
      </div>

      <div v-if="error" class="error-message">
        <span class="error-icon">⚠️</span> {{ error }}
      </div>

      <form @submit.prevent="submitForm">
        <div class="form-row">
          <div class="form-group">
            <label for="firstName">Prénom</label>
            <input 
              id="firstName" 
              v-model="breederData.firstName" 
              type="text" 
              placeholder="Entrez le prénom"
              :class="{ 'input-error': formErrors.firstName }"
            >
            <div v-if="formErrors.firstName" class="error-text">{{ formErrors.firstName }}</div>
          </div>

          <div class="form-group">
            <label for="lastName">Nom</label>
            <input 
              id="lastName" 
              v-model="breederData.lastName" 
              type="text" 
              placeholder="Entrez le nom"
              :class="{ 'input-error': formErrors.lastName }"
            >
            <div v-if="formErrors.lastName" class="error-text">{{ formErrors.lastName }}</div>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="email">Email (Optionnel)</label>
            <input 
              id="email" 
              v-model="breederData.email" 
              type="email" 
              placeholder="Entrez l'adresse email"
            >
          </div>

          <div class="form-group">
            <label for="phone">Téléphone (Optionnel)</label>
            <input 
              id="phone" 
              v-model="breederData.phone" 
              type="tel" 
              placeholder="Entrez le numéro de téléphone"
            >
          </div>
        </div>

        <h4>Adresse (Optionnel)</h4>

        <div class="form-group">
          <label for="street">Rue</label>
          <input 
            id="street" 
            v-model="breederData.address.street" 
            type="text" 
            placeholder="Entrez l'adresse"
          >
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="city">Ville</label>
            <input 
              id="city" 
              v-model="breederData.address.city" 
              type="text" 
              placeholder="Entrez la ville"
            >
          </div>

          <div class="form-group">
            <label for="state">État/Province</label>
            <input 
              id="state" 
              v-model="breederData.address.state" 
              type="text" 
              placeholder="Entrez l'état ou la province"
            >
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="zipCode">Code Postal</label>
            <input 
              id="zipCode" 
              v-model="breederData.address.zipCode" 
              type="text" 
              placeholder="Entrez le code postal"
            >
          </div>

          <div class="form-group">
            <label for="country">Pays</label>
            <input 
              id="country" 
              v-model="breederData.address.country" 
              type="text" 
              placeholder="Entrez le pays"
            >
          </div>
        </div>

        <div class="form-actions">
          <button type="button" class="btn-cancel" @click="closeModal">Annuler</button>
          <button type="submit" class="btn-submit" :disabled="loading">
            <span v-if="loading">Mise à jour...</span>
            <span v-else>Mettre à jour l'éleveur</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.modal-header h3 {
  margin: 0;
  color: #6c5ce7;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #636e72;
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

.form-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-group {
  flex: 1;
  margin-bottom: 1rem;
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

h4 {
  margin: 1rem 0;
  color: #2d3436;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
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
  .form-row {
    flex-direction: column;
    gap: 0;
  }

  .form-actions {
    flex-direction: column-reverse;
    gap: 0.5rem;
  }

  .btn-cancel, .btn-submit {
    width: 100%;
  }
}
</style>
