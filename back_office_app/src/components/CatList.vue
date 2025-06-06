<script setup lang="ts">
import { computed, ref } from 'vue';
import { useCatsStore } from '../stores/cats';
import type { Cat } from '../types';
import CatEditForm from './CatEditForm.vue';
import Button from '../design-system/components/Button.vue';
import Card from '../design-system/components/Card.vue';
import {useLoofCharacteristicsStore} from "../stores/loofCharacteristics.ts";

const catsStore = useCatsStore();
const loofCharacteristicsStore = useLoofCharacteristicsStore();

const cats = computed(() => catsStore.cats);
const loading = computed(() => catsStore.loading);
const error = computed(() => catsStore.error);
const hasCats = computed(() => cats.value.length > 0);

const showEditModal = ref(false);
const selectedCat = ref<Cat | null>(null);

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString();
};

const getGenderDisplay = (isFemale: boolean): string => {
  return isFemale ? 'Femelle' : 'Mâle';
};

const openEditModal = (cat: Cat) => {
  selectedCat.value = cat;
  showEditModal.value = true;
};

const deleteCat = async (id: number) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce chat ?')) {
    await catsStore.deleteCat(id);
  }
};
</script>

<template>
  <Card class="cat-list" variant="default" shadow="md" padding="lg">
    <h2>Vos Amis Félins</h2>

    <div v-if="error" class="bg-error error-message">
      <span class="error-icon">⚠️</span> {{ error }}
    </div>

    <div v-if="loading" class="loading">
      <div class="loading-spinner"></div>
      <p>Chargement de vos amis félins...</p>
    </div>

    <div v-else-if="!hasCats" class="no-cats">
      <p>Aucun chat trouvé. Ajoutez votre premier ami félin ci-dessus !</p>
      <div class="cat-emoji">😿</div>
    </div>

    <div v-else class="table-container">
      <table class="cats-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Date de Naissance</th>
            <th>Genre</th>
            <th>Pedigree</th>
            <th>État</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cat in cats" :key="cat.id" class="cat-row">
            <td class="cat-name">
              {{ cat.name }} <br v-if="cat.surname"> {{ cat.surname? `(${cat.surname})` : '' }}
            </td>
            <td>
              {{ cat.litter? formatDate(cat.litter.birthDate) : 'Inconnu' }}
            </td>
            <td>
              {{ cat.isFemale? '♀️' : '♂️' }}
            </td>
            <td>{{ cat.pedigreeNumber }}</td>
            <td>
              <span v-if="cat.isDeceased" class="status-badge deceased">Décédé</span>
              <span v-else-if="cat.isNeutered" class="status-badge neutered">Stérilisé</span>
              <span v-else class="status-badge active">Actif</span>
            </td>
            <td class="actions">
              <Button variant="info" size="sm" @click="openEditModal(cat)" disabled>Modifier</Button>
              <Button variant="danger" size="sm" @click="deleteCat(cat.id)">Supprimer</Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </Card>

  <CatEditForm
    v-if="selectedCat"
    :cat="selectedCat" 
    :show="showEditModal" 
    @close="showEditModal = false" 
    @cat-updated="catsStore.fetchCats()" 
  />
</template>

<style scoped>
h2 {
  color: var(--secondary-color);
  margin-bottom: var(--space-lg);
  text-align: center;
  font-size: var(--font-size-lg);
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

.no-cats {
  text-align: center;
  padding: var(--space-xl);
  color: var(--text-muted);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cat-emoji {
  font-size: 3rem;
  margin-top: var(--space-md);
}

.table-container {
  overflow-x: auto;
}

.cats-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: var(--space-md);
}

.cats-table th, .cats-table td {
  padding: var(--space-sm);
  text-align: left;
  border-bottom: 1px solid var(--border-light);
}

.cats-table th {
  background-color: var(--bg-muted);
  font-weight: var(--font-weight-medium);
  color: var(--text-dark);
}

.cat-row {
  transition: background-color 0.2s;
}

.cat-row:hover {
  background-color: var(--bg-muted);
}

.cat-name {
  font-weight: var(--font-weight-medium);
  color: var(--secondary-color);
}

.actions {
  display: flex;
  gap: var(--space-xs);
}

.status-badge {
  display: inline-block;
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  text-align: center;
}

.status-badge.active {
  background-color: rgba(46, 213, 115, 0.2);
  color: #2ed573;
}

.status-badge.neutered {
  background-color: rgba(255, 165, 2, 0.2);
  color: #ffa502;
}

.status-badge.deceased {
  background-color: rgba(255, 71, 87, 0.2);
  color: #ff4757;
}

@media (max-width: 768px) {
  h2 {
    font-size: calc(var(--font-size-lg) * 0.85);
  }

  .cats-table th, .cats-table td {
    padding: var(--space-xs);
    font-size: var(--font-size-sm);
  }

  .actions {
    flex-direction: column;
    gap: var(--space-xs);
  }

  .status-badge {
    padding: var(--space-xs);
    font-size: calc(var(--font-size-sm) * 0.85);
  }
}
</style>
