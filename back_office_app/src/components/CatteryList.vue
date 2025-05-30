<script setup lang="ts">
import { computed, ref } from 'vue';
import { useCatteriesStore } from '../stores/catteries';
import { Cattery } from '../types';
import { useRouter } from 'vue-router';

const router = useRouter();

const catteriesStore = useCatteriesStore();

const catteries = computed(() => catteriesStore.catteries);
const loading = computed(() => catteriesStore.loading);
const error = computed(() => catteriesStore.error);
const hasCatteries = computed(() => catteries.value.length > 0);

const deleteCattery = async (id: number) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette chatterie ?')) {
    await catteriesStore.deleteCattery(id);
  }
};

const viewCatteryDetails = (id: number) => {
  router.push(`/catteries/${id}`);
};

const createNewCattery = () => {
  router.push('/catteries/new');
};
</script>

<template>
  <div class="cattery-list">
    <div class="header">
      <h2>Vos Chatteries</h2>
      <button class="btn-create" @click="createNewCattery">Créer une Nouvelle Chatterie</button>
    </div>

    <div v-if="error" class="error-message">
      <span class="error-icon">⚠️</span> {{ error }}
    </div>

    <div v-if="loading" class="loading">
      <div class="loading-spinner"></div>
      <p>Chargement de vos chatteries...</p>
    </div>

    <div v-else-if="!hasCatteries" class="no-catteries">
      <p>Aucune chatterie trouvée. Créez votre première chatterie pour commencer !</p>
      <div class="cattery-emoji">🏠</div>
    </div>

    <div v-else class="table-container">
      <table class="catteries-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Éleveur</th>
            <th>Membres</th>
            <th>Chats</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cattery in catteries" :key="cattery.id" class="cattery-row">
            <td>{{ cattery.id }}</td>
            <td class="cattery-name">{{ cattery.name }}</td>
            <td>
              <span v-if="cattery.breeder">
                {{ cattery.breeder.firstName }} {{ cattery.breeder.lastName }}
              </span>
              <span v-else>-</span>
            </td>
            <td>{{ cattery.members?.length || 0 }}</td>
            <td>{{ cattery.cats?.length || 0 }}</td>
            <td class="actions">
              <button class="btn-view" @click="viewCatteryDetails(cattery.id)">Voir</button>
              <button class="btn-delete" @click="deleteCattery(cattery.id)">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.cattery-list {
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

.no-catteries {
  text-align: center;
  padding: 2rem;
  color: #636e72;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cattery-emoji {
  font-size: 3rem;
  margin-top: 1rem;
}

.table-container {
  overflow-x: auto;
}

.catteries-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.catteries-table th, .catteries-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #dfe6e9;
}

.catteries-table th {
  background-color: #f1f2f6;
  font-weight: 600;
  color: #2d3436;
}

.cattery-row {
  transition: background-color 0.2s;
}

.cattery-row:hover {
  background-color: #f8f9fa;
}

.cattery-name {
  font-weight: 600;
  color: #6c5ce7;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.btn-view, .btn-delete {
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.btn-view {
  background-color: #3498db;
  color: white;
}

.btn-view:hover {
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
  .cattery-list {
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

  .catteries-table th, .catteries-table td {
    padding: 0.5rem;
    font-size: 0.9rem;
  }

  .actions {
    flex-direction: column;
    gap: 0.3rem;
  }

  .btn-view, .btn-delete {
    padding: 0.3rem 0.6rem;
    font-size: 0.8rem;
  }
}
</style>
