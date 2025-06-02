<script setup lang="ts">
import { computed, ref } from 'vue';
import type { PropType } from 'vue';
import Button from '../design-system/components/Button.vue';
import Input from '../design-system/components/Input.vue';
import Modal from '../design-system/patterns/Modal.vue';
import Card from '../design-system/components/Card.vue';


interface LoofCharacteristic {
  id: number;
  name: string;
  code?: string;
  details?: string;
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
  details?: string;
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
      <Button variant="primary" @click="openCreateForm">Créer {{ singularTitle }}</Button>
    </div>

    <div v-if="error" class="bg-error error-message">
      <span class="error-icon">⚠️</span> {{ error }}
    </div>

    <div v-if="loading" class="loading">
      <div class="loading-spinner"></div>
      <p>Chargement des {{ title.toLowerCase() }}...</p>
    </div>

    <div v-else-if="!hasItems" class="no-items">
      <p>Aucun éléments trouvé. Créez votre premier {{ singularTitle.toLowerCase() }} pour commencer !</p>
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
            <td v-if="showDescription">{{ item.details || '-' }}</td>
            <td class="actions">
              <Button variant="info" size="sm" @click="openEditForm(item)">Modifier</Button>
              <Button variant="danger" size="sm" @click="deleteItem(item.id)">Supprimer</Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Modal v-model="showForm" :title="`${isEditing ? 'Modifier' : 'Créer'} ${singularTitle}`">
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <Input 
            v-model="formData.name" 
            label="Nom"
            placeholder="Entrez le nom"
            required
            fullWidth
          />
        </div>

        <div v-if="showCode" class="form-group">
          <Input 
            v-model="formData.code" 
            label="Code"
            placeholder="Entrez le code"
            fullWidth
          />
        </div>

        <div v-if="showDescription" class="form-group">
          <label for="description">Description (Optionnel)</label>
          <textarea 
            id="description" 
            v-model="formData.details"
            placeholder="Entrez la details"
            rows="3"
            class="ds-textarea"
          ></textarea>
        </div>

        <div class="form-actions">
          <Button variant="secondary" type="button" @click="closeForm">Annuler</Button>
          <Button variant="primary" type="submit" :disabled="formSubmitting">
            {{ isEditing ? 'Mettre à jour' : 'Créer' }}
          </Button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<style scoped>
.loof-characteristics-list {
  background-color: var(--bg-light);
  padding: var(--space-lg);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  border: 2px solid var(--border-medium);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-lg);
}

h2 {
  color: var(--secondary-color);
  font-size: var(--font-size-lg);
  margin: 0;
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

.loading {
  text-align: center;
  padding: var(--space-xl);
  color: var(--secondary-color);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loading-spinner {
  border: 4px solid rgba(108, 92, 231, 0.3);
  border-radius: 50%;
  border-top: 4px solid var(--secondary-color);
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: var(--space-md);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.no-items {
  text-align: center;
  padding: var(--space-xl);
  color: var(--text-muted);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.item-emoji {
  font-size: 3rem;
  margin-top: var(--space-md);
}

.table-container {
  overflow-x: auto;
}

.items-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: var(--space-md);
}

.items-table th, .items-table td {
  padding: var(--space-sm);
  text-align: left;
  border-bottom: 1px solid var(--border-light);
}

.items-table th {
  background-color: var(--bg-muted);
  font-weight: var(--font-weight-medium);
  color: var(--text-dark);
}

.item-row {
  transition: background-color 0.2s;
}

.item-row:hover {
  background-color: var(--bg-muted);
}

.item-name {
  font-weight: var(--font-weight-medium);
  color: var(--secondary-color);
}

.actions {
  display: flex;
  gap: var(--space-xs);
}

/* Form styles */
.form-group {
  margin-bottom: var(--space-md);
}

label {
  display: block;
  margin-bottom: var(--space-xs);
  font-weight: var(--font-weight-medium);
  color: var(--text-dark);
}

.ds-textarea {
  width: 100%;
  padding: var(--space-sm);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-md);
  transition: border-color 0.2s;
  font-family: var(--font-family);
}

.ds-textarea:focus {
  outline: none;
  border-color: var(--secondary-color);
  box-shadow: var(--shadow-focus);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-md);
  margin-top: var(--space-lg);
}

@media (max-width: 768px) {
  .loof-characteristics-list {
    padding: var(--space-md);
  }

  .header {
    flex-direction: column;
    gap: var(--space-md);
    align-items: flex-start;
  }

  h2 {
    font-size: calc(var(--font-size-lg) * 0.85);
  }

  .items-table th, .items-table td {
    padding: var(--space-xs);
    font-size: var(--font-size-sm);
  }

  .actions {
    flex-direction: column;
    gap: var(--space-xs);
  }

  .form-actions {
    flex-direction: column-reverse;
    gap: var(--space-xs);
  }
}
</style>
