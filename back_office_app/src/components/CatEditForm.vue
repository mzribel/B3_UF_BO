<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCatsStore } from '../stores/cats';
import type { Cat, NewCat } from '../types';
import Modal from '../design-system/patterns/Modal.vue';
import Button from '../design-system/components/Button.vue';
import Input from '../design-system/components/Input.vue';

const props = defineProps<{
  cat: Cat;
  show: boolean;
}>();

const emit = defineEmits(['close', 'cat-updated']);

const catsStore = useCatsStore();

const editedCat = ref<NewCat>({
  name: '',
  birthDate: '',
  gender: '',
  coat: {
    color: '',
    pattern: ''
  }
});

onMounted(() => {
  if (props.cat) {
    editedCat.value = {
      name: props.cat.name,
      birthDate: props.cat.birthDate,
      gender: props.cat.gender,
      coat: {
        color: props.cat.coat.color,
        pattern: props.cat.coat.pattern
      }
    };
  }
});

const submitForm = async () => {
  const success = await catsStore.updateCat(props.cat.id, editedCat.value);

  if (success) {
    // Emit event
    emit('cat-updated');
    // Close modal
    emit('close');
  }
};

const closeModal = () => {
  emit('close');
};
</script>

<template>
  <Modal v-if="show" title="Modifier le Chat" @close="closeModal">
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <Input 
          v-model="editedCat.name" 
          label="Nom :"
          placeholder="Entrez le nom de votre chat"
          required
          fullWidth
        />
      </div>

      <div class="form-group">
        <Input 
          v-model="editedCat.birthDate" 
          type="date"
          label="Date de Naissance :"
          required
          fullWidth
        />
      </div>

      <div class="form-group">
        <label for="gender">Genre :</label>
        <select id="gender" v-model="editedCat.gender" required class="ds-select">
          <option value="">Sélectionnez le genre</option>
          <option value="MALE">Mâle</option>
          <option value="FEMALE">Femelle</option>
        </select>
      </div>

      <div class="form-group">
        <Input 
          v-model="editedCat.coat.color" 
          label="Couleur du Pelage :"
          placeholder="ex : Orange, Noir, Blanc"
          required
          fullWidth
        />
      </div>

      <div class="form-group">
        <Input 
          v-model="editedCat.coat.pattern" 
          label="Motif du Pelage :"
          placeholder="ex : Tabby, Uni, Calico"
          required
          fullWidth
        />
      </div>

      <div class="button-group">
        <Button type="button" variant="secondary" @click="closeModal">Annuler</Button>
        <Button type="submit" variant="primary">Mettre à Jour le Chat</Button>
      </div>
    </form>
  </Modal>
</template>

<style scoped>
form {
  padding: var(--space-lg);
}

.form-group {
  margin-bottom: var(--space-md);
}

label {
  display: block;
  margin-bottom: var(--space-xs);
  font-weight: var(--font-weight-medium);
  color: var(--text-dark);
}

.ds-select {
  width: 100%;
  padding: var(--space-sm);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  background-color: var(--bg-light);
  color: var(--text-dark);
  font-size: var(--font-size-md);
  font-family: var(--font-family);
  transition: border-color 0.2s, box-shadow 0.2s;
}

.ds-select:focus {
  outline: none;
  border-color: var(--secondary-color);
  box-shadow: var(--shadow-focus);
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-md);
  margin-top: var(--space-lg);
}

@media (max-width: 768px) {
  form {
    padding: var(--space-md);
  }

  .button-group {
    flex-direction: column-reverse;
    gap: var(--space-xs);
  }
}
</style>
