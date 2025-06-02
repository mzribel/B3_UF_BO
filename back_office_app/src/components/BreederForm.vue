<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useBreederStore } from '../stores/breeder';
import type { UpdateBreeder } from '../types';
import Modal from '../design-system/patterns/Modal.vue';
import Button from '../design-system/components/Button.vue';
import Input from '../design-system/components/Input.vue';

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
  <Modal v-if="show" title="Mettre à jour les informations de l'éleveur" @close="closeModal">
    <div v-if="error" class="bg-error error-message">
      <span class="error-icon">⚠️</span> {{ error }}
    </div>

    <form @submit.prevent="submitForm">
      <div class="form-row">
        <div class="form-group">
          <Input 
            v-model="breederData.firstName" 
            label="Prénom"
            placeholder="Entrez le prénom"
            :error="formErrors.firstName"
            required
            fullWidth
          />
        </div>

        <div class="form-group">
          <Input 
            v-model="breederData.lastName" 
            label="Nom"
            placeholder="Entrez le nom"
            :error="formErrors.lastName"
            required
            fullWidth
          />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <Input 
            v-model="breederData.email" 
            type="email"
            label="Email (Optionnel)"
            placeholder="Entrez l'adresse email"
            fullWidth
          />
        </div>

        <div class="form-group">
          <Input 
            v-model="breederData.phone" 
            type="tel"
            label="Téléphone (Optionnel)"
            placeholder="Entrez le numéro de téléphone"
            fullWidth
          />
        </div>
      </div>

      <h4>Adresse (Optionnel)</h4>

      <div class="form-group">
        <Input 
          v-model="breederData.address.street" 
          label="Rue"
          placeholder="Entrez l'adresse"
          fullWidth
        />
      </div>

      <div class="form-row">
        <div class="form-group">
          <Input 
            v-model="breederData.address.city" 
            label="Ville"
            placeholder="Entrez la ville"
            fullWidth
          />
        </div>

        <div class="form-group">
          <Input 
            v-model="breederData.address.state" 
            label="État/Province"
            placeholder="Entrez l'état ou la province"
            fullWidth
          />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <Input 
            v-model="breederData.address.zipCode" 
            label="Code Postal"
            placeholder="Entrez le code postal"
            fullWidth
          />
        </div>

        <div class="form-group">
          <Input 
            v-model="breederData.address.country" 
            label="Pays"
            placeholder="Entrez le pays"
            fullWidth
          />
        </div>
      </div>

      <div class="form-actions">
        <Button type="button" variant="secondary" @click="closeModal">Annuler</Button>
        <Button type="submit" variant="primary" :disabled="loading">
          <span v-if="loading">Mise à jour...</span>
          <span v-else>Mettre à jour l'éleveur</span>
        </Button>
      </div>
    </form>

    <template #footer>
      <div class="modal-footer-info">
        <p>Les champs marqués d'un * sont obligatoires.</p>
      </div>
    </template>
  </Modal>
</template>

<style scoped>
.error-message {
  margin-bottom: var(--space-md);
  display: flex;
  align-items: center;
}

.error-icon {
  margin-right: var(--space-xs);
  font-size: 1.2rem;
}

.form-row {
  display: flex;
  gap: var(--space-md);
  margin-bottom: var(--space-md);
}

.form-group {
  flex: 1;
  margin-bottom: var(--space-md);
}

h4 {
  margin: var(--space-md) 0;
  color: var(--text-dark);
  font-weight: var(--font-weight-medium);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-md);
  margin-top: var(--space-lg);
}

.modal-footer-info {
  color: var(--text-muted);
  font-size: var(--font-size-sm);
  text-align: center;
}

@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
    gap: 0;
  }

  .form-actions {
    flex-direction: column-reverse;
    gap: var(--space-xs);
  }
}
</style>
