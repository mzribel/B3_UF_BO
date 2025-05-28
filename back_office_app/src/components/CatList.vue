<script setup lang="ts">
import { computed, ref } from 'vue';
import { useCatsStore } from '../store/cats';
import { Cat } from '../types';
import CatEditForm from './CatEditForm.vue';

// Store
const catsStore = useCatsStore();

// Computed properties
const cats = computed(() => catsStore.cats);
const loading = computed(() => catsStore.loading);
const error = computed(() => catsStore.error);
const hasCats = computed(() => cats.value.length > 0);

// State for edit modal
const showEditModal = ref(false);
const selectedCat = ref<Cat | null>(null);

// Format date
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString();
};

// Get gender display name
const getGenderDisplay = (gender: string): string => {
  return gender === 'MALE' ? 'Male' : gender === 'FEMALE' ? 'Female' : gender;
};

// Open edit modal
const openEditModal = (cat: Cat) => {
  selectedCat.value = cat;
  showEditModal.value = true;
};

// Delete cat
const deleteCat = async (id: number) => {
  if (confirm('Are you sure you want to delete this cat?')) {
    await catsStore.deleteCat(id);
  }
};
</script>

<template>
  <div class="cat-list">
    <h2>Your Feline Friends</h2>

    <!-- Error message -->
    <div v-if="error" class="error-message">
      <span class="error-icon">⚠️</span> {{ error }}
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="loading">
      <div class="loading-spinner"></div>
      <p>Loading your furry friends...</p>
    </div>

    <!-- Empty state -->
    <div v-else-if="!hasCats" class="no-cats">
      <p>No cats found. Add your first feline friend above!</p>
      <div class="cat-emoji">😿</div>
    </div>

    <!-- Cats table -->
    <div v-else class="table-container">
      <table class="cats-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Birth Date</th>
            <th>Gender</th>
            <th>Coat Color</th>
            <th>Coat Pattern</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cat in cats" :key="cat.id" class="cat-row">
            <td>{{ cat.id }}</td>
            <td class="cat-name">{{ cat.name }}</td>
            <td>{{ formatDate(cat.birthDate) }}</td>
            <td>{{ getGenderDisplay(cat.gender) }}</td>
            <td>{{ cat.coat.color }}</td>
            <td>{{ cat.coat.pattern }}</td>
            <td class="actions">
              <button class="btn-edit" @click="openEditModal(cat)">Edit</button>
              <button class="btn-delete" @click="deleteCat(cat.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Edit Cat Modal -->
  <CatEditForm 
    v-if="selectedCat" 
    :cat="selectedCat" 
    :show="showEditModal" 
    @close="showEditModal = false" 
    @cat-updated="catsStore.fetchCats()" 
  />
</template>

<style scoped>
.cat-list {
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 2px solid #e9ecef;
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

.no-cats {
  text-align: center;
  padding: 2rem;
  color: #636e72;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cat-emoji {
  font-size: 3rem;
  margin-top: 1rem;
}

.table-container {
  overflow-x: auto;
}

.cats-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.cats-table th, .cats-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #dfe6e9;
}

.cats-table th {
  background-color: #f1f2f6;
  font-weight: 600;
  color: #2d3436;
}

.cat-row {
  transition: background-color 0.2s;
}

.cat-row:hover {
  background-color: #f8f9fa;
}

.cat-name {
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

@media (max-width: 768px) {
  .cat-list {
    padding: 1rem;
  }

  h2 {
    font-size: 1.3rem;
  }

  .cats-table th, .cats-table td {
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
}
</style>
