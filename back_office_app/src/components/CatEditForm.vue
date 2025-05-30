<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCatsStore } from '../stores/cats';
import type { Cat, NewCat } from '../types';

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
  <div v-if="show" class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Modifier le Chat</h2>
        <button class="close-button" @click="closeModal">&times;</button>
      </div>

      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">Nom :</label>
          <input id="name" v-model="editedCat.name" required placeholder="Entrez le nom de votre chat" />
        </div>

        <div class="form-group">
          <label for="birthDate">Date de Naissance :</label>
          <input id="birthDate" type="date" v-model="editedCat.birthDate" required />
        </div>

        <div class="form-group">
          <label for="gender">Genre :</label>
          <select id="gender" v-model="editedCat.gender" required>
            <option value="">Sélectionnez le genre</option>
            <option value="MALE">Mâle</option>
            <option value="FEMALE">Femelle</option>
          </select>
        </div>

        <div class="form-group">
          <label for="coatColor">Couleur du Pelage :</label>
          <input id="coatColor" v-model="editedCat.coat.color" required placeholder="ex : Orange, Noir, Blanc" />
        </div>

        <div class="form-group">
          <label for="coatPattern">Motif du Pelage :</label>
          <input id="coatPattern" v-model="editedCat.coat.pattern" required placeholder="ex : Tabby, Uni, Calico" />
        </div>

        <div class="button-group">
          <button type="button" class="btn-cancel" @click="closeModal">Annuler</button>
          <button type="submit" class="btn-submit">Mettre à Jour le Chat</button>
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
  z-index: 100;
}

.modal-content {
  background-color: #093A3E;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #3AAFB9;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #3AAFB9;
}

.modal-header h2 {
  color: #97C8EB;
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #97C8EB;
  cursor: pointer;
}

form {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #c3d8e4;
}

input, select {
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

input:focus, select:focus {
  outline: none;
  border-color: #97C8EB;
  box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.2);
}

input::placeholder {
  color: #b2bec3;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.btn-cancel {
  background-color: #64748b;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
}

.btn-submit {
  background-color: #46667b;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
}

.btn-cancel:hover {
  background-color: #475569;
}

.btn-submit:hover {
  background-color: #5b4cdb;
}

@media (max-width: 768px) {
  .modal-content {
    width: 95%;
  }

  form {
    padding: 1rem;
  }

  .button-group {
    flex-direction: column;
    gap: 0.5rem;
  }

  .btn-cancel, .btn-submit {
    width: 100%;
  }
}
</style>
