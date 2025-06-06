<script setup lang="ts">
import { computed } from 'vue';
import { useCatteriesStore } from '../stores/catteries';
import { useRouter } from 'vue-router';
import Button from '../design-system/components/Button.vue';
import Card from '../design-system/components/Card.vue';
import {useUsersStore} from "../stores/users.ts";

const router = useRouter();

const catteriesStore = useCatteriesStore();
const userStore = useUsersStore();

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
  <Card class="cattery-list" variant="default" shadow="md" padding="lg">
    <div class="header">
      <h2>Vos Chatteries</h2>
      <Button variant="primary" @click="createNewCattery">Créer une Nouvelle Chatterie</Button>
    </div>

    <div v-if="error" class="bg-error error-message">
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
            <th>Membres</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cattery in catteries" :key="cattery.id" class="cattery-row">
            <td>{{ cattery.id }}</td>
            <td class="cattery-name">{{ cattery.linkedBreeder.name }}</td>
            <td>{{ cattery.members?.length + 1 || 1 }}</td>
            <td class="actions">
              <Button variant="info" size="sm" @click="viewCatteryDetails(cattery.id)">Voir</Button>
              <Button variant="danger" size="sm" @click="deleteCattery(cattery.id)">Supprimer</Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </Card>
</template>

<style scoped>
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

.no-catteries {
  text-align: center;
  padding: var(--space-xl);
  color: var(--text-muted);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cattery-emoji {
  font-size: 3rem;
  margin-top: var(--space-md);
}

.table-container {
  overflow-x: auto;
}

.catteries-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: var(--space-md);
}

.catteries-table th, .catteries-table td {
  padding: var(--space-sm);
  text-align: left;
  border-bottom: 1px solid var(--border-light);
}

.catteries-table th {
  background-color: var(--bg-muted);
  font-weight: var(--font-weight-medium);
  color: var(--text-dark);
}

.cattery-row {
  transition: background-color 0.2s;
}

.cattery-row:hover {
  background-color: var(--bg-muted);
}

.cattery-name {
  font-weight: var(--font-weight-medium);
  color: var(--secondary-color);
}

.actions {
  display: flex;
  gap: var(--space-xs);
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    gap: var(--space-md);
    align-items: flex-start;
  }

  h2 {
    font-size: calc(var(--font-size-lg) * 0.85);
  }

  .catteries-table th, .catteries-table td {
    padding: var(--space-xs);
    font-size: var(--font-size-sm);
  }

  .actions {
    flex-direction: column;
    gap: var(--space-xs);
  }
}
</style>
