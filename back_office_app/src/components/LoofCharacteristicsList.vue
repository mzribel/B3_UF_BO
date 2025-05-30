<script setup lang="ts">
import { computed, ref } from 'vue';
import type { PropType } from 'vue';


interface LoofCharacteristic {
  id: number;
  name: string;
  code?: string;
  description?: string;
}

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  singularTitle: {
    type: String,
    required: true
  },
  items: {
    type: Array as PropType<LoofCharacteristic[]>,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  },
  showCode: {
    type: Boolean,
    default: true
  },
  showDescription: {
    type: Boolean,
    default: false
  },
  emptyStateEmoji: {
    type: String,
    default: '📋'
  }
});

const emit = defineEmits(['create', 'update', 'delete']);

const hasItems = computed(() => props.items.length > 0);

const showForm = ref(false);
const isEditing = ref(false);
const formSubmitting = ref(false);
const formData = ref<{
  id?: number;
  name: string;
  code?: string;
  description?: string;
}>({
  name: '',
  code: '',
  description: ''
});

const openCreateForm = () => {
  formData.value = {
    name: '',
    code: '',
    description: ''
  };
  isEditing.value = false;
  showForm.value = true;
};

const openEditForm = (item: LoofCharacteristic) => {
  formData.value = {
    id: item.id,
    name: item.name,
    code: item.code || '',
    description: item.description || ''
  };
  isEditing.value = true;
  showForm.value = true;
};

const closeForm = () => {
  showForm.value = false;
};

const submitForm = async () => {
  formSubmitting.value = true;

  try {
    if (isEditing.value && formData.value.id) {
      await emit('update', formData.value.id, formData.value);
    } else {
      await emit('create', formData.value);
    }
    closeForm();
  } finally {
    formSubmitting.value = false;
  }
};

const deleteItem = async (id: number) => {
  if (confirm(`Êtes-vous sûr de vouloir supprimer ce ${props.singularTitle.toLowerCase()} ?`)) {
    emit('delete', id);
  }
};
</script>

<template>
  <div class="loof-characteristics-list">
    <div class="header">
      <h2>{{ title }}</h2>
      <button class="btn-create" @click="openCreateForm">Créer un Nouveau {{ singularTitle }}</button>
    </div>

    <div v-if="error" class="error-message">
      <span class="error-icon">⚠️</span> {{ error }}
    </div>

    <div v-if="loading" class="loading">
      <div class="loading-spinner"></div>
      <p>Chargement des {{ title.toLowerCase() }}...</p>
    </div>

    <div v-else-if="!hasItems" class="no-items">
      <p>Aucun {{ title.toLowerCase() }} trouvé. Créez votre premier {{ singularTitle.toLowerCase() }} pour commencer !</p>
      <div class="item-emoji">{{ emptyStateEmoji }}</div>
    </div>

    <div v-else class="table-container">
      <table class="items-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th v-if="showCode">Code</th>
            <th v-if="showDescription">Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id" class="item-row">
            <td>{{ item.id }}</td>
            <td class="item-name">{{ item.name }}</td>
            <td v-if="showCode">{{ item.code || '-' }}</td>
            <td v-if="showDescription">{{ item.description || '-' }}</td>
            <td class="actions">
              <button class="btn-edit" @click="openEditForm(item)">Modifier</button>
              <button class="btn-delete" @click="deleteItem(item.id)">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showForm" class="modal-overlay" @click="closeForm">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>{{ isEditing ? 'Modifier' : 'Créer' }} {{ singularTitle }}</h3>
          <button class="btn-close" @click="closeForm">&times;</button>
        </div>

        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">Nom</label>
            <input 
              id="name" 
              v-model="formData.name" 
              type="text" 
              required
              placeholder="Entrez le nom"
            >
          </div>

          <div v-if="showCode" class="form-group">
            <label for="code">Code (Optionnel)</label>
            <input 
              id="code" 
              v-model="formData.code" 
              type="text" 
              placeholder="Entrez le code"
            >
          </div>

          <div v-if="showDescription" class="form-group">
            <label for="description">Description (Optionnel)</label>
            <textarea 
              id="description" 
              v-model="formData.description" 
              placeholder="Entrez la description"
              rows="3"
            ></textarea>
          </div>

          <div class="form-actions">
            <button type="button" class="btn-cancel" @click="closeForm">Annuler</button>
            <button type="submit" class="btn-submit" :disabled="formSubmitting">
              {{ isEditing ? 'Mettre à jour' : 'Créer' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loof-characteristics-list {
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 2px solid #e9ecef;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

h2 {
  color: #6c5ce7;
  font-size: 1.5rem;
  margin: 0;
}

.btn-create {
  background-color: #6c5ce7;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-create:hover {
  background-color: #5b4bc4;
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

.loading {
  text-align: center;
  padding: 2rem;
  color: #6c5ce7;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loading-spinner {
  border: 4px solid rgba(108, 92, 231, 0.3);
  border-radius: 50%;
  border-top: 4px solid #6c5ce7;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.no-items {
  text-align: center;
  padding: 2rem;
  color: #636e72;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.item-emoji {
  font-size: 3rem;
  margin-top: 1rem;
}

.table-container {
  overflow-x: auto;
}

.items-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.items-table th, .items-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #dfe6e9;
}

.items-table th {
  background-color: #f1f2f6;
  font-weight: 600;
  color: #2d3436;
}

.item-row {
  transition: background-color 0.2s;
}

.item-row:hover {
  background-color: #f8f9fa;
}

.item-name {
  font-weight: 600;
  color: #6c5ce7;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.btn-edit, .btn-delete {
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.btn-edit {
  background-color: #3498db;
  color: white;
}

.btn-edit:hover {
  background-color: #2980b9;
}

.btn-delete {
  background-color: #e74c3c;
  color: white;
}

.btn-delete:hover {
  background-color: #c0392b;
}

/* Modal styles */
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
  max-width: 500px;
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

.form-group {
  margin-bottom: 1.25rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #2d3436;
}

input, textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #dfe6e9;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

input:focus, textarea:focus {
  outline: none;
  border-color: #6c5ce7;
  box-shadow: 0 0 0 2px rgba(108, 92, 231, 0.2);
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
  .loof-characteristics-list {
    padding: 1rem;
  }

  .header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  h2 {
    font-size: 1.3rem;
  }

  .items-table th, .items-table td {
    padding: 0.5rem;
    font-size: 0.9rem;
  }

  .actions {
    flex-direction: column;
    gap: 0.3rem;
  }

  .btn-edit, .btn-delete {
    padding: 0.3rem 0.6rem;
    font-size: 0.8rem;
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
