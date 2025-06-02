<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useCatteriesStore } from '../stores/catteries';
import { useCatsStore } from '../stores/cats';
import { useBreederStore } from '../stores/breeder';
import { useRouter } from 'vue-router';
import CatList from './CatList.vue';
import BreederForm from './BreederForm.vue';
import Card from '../design-system/components/Card.vue';
import Button from '../design-system/components/Button.vue';

const props = defineProps<{
  catteryId: number;
}>();

const router = useRouter();

const catteriesStore = useCatteriesStore();
const catsStore = useCatsStore();
const breederStore = useBreederStore();

const activeTab = ref('cats'); // 'cats', 'members', 'breeder'
const showBreederForm = ref(false);

const cattery = computed(() => catteriesStore.currentCattery);
const loading = computed(() => catteriesStore.loading);
const error = computed(() => catteriesStore.error);
const cats = computed(() => catsStore.cats);
const catsLoading = computed(() => catsStore.loading);
const catsError = computed(() => catsStore.error);

const fetchCatteryData = async () => {
  await catteriesStore.fetchCatteryById(props.catteryId);
  if (activeTab.value === 'cats') {
    await catsStore.fetchCatsByCatteryId(props.catteryId);
  }
};

watch(activeTab, async (newTab) => {
  if (newTab === 'cats') {
    await catsStore.fetchCatsByCatteryId(props.catteryId);
  }
});

const addNewCat = () => {
  router.push(`/catteries/${props.catteryId}/cats/new`);
};

const deleteCattery = async () => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette chatterie ?')) {
    const success = await catteriesStore.deleteCattery(props.catteryId);
    if (success) {
      router.push('/catteries');
    }
  }
};

const goBack = () => {
  router.push('/catteries');
};

const openBreederForm = () => {
  showBreederForm.value = true;
};

const handleBreederUpdated = async () => {
  await fetchCatteryData();
};

onMounted(fetchCatteryData);
</script>

<template>
  <Card class="cattery-details" variant="default" shadow="md" padding="lg">
    <div v-if="loading" class="loading">
      <div class="loading-spinner"></div>
      <p>Chargement des détails de la chatterie...</p>
    </div>

    <div v-else-if="error" class="bg-error error-message">
      <span class="error-icon">⚠️</span> {{ error }}
      <Button variant="danger" size="sm" @click="fetchCatteryData">Réessayer</Button>
    </div>

    <div v-else-if="cattery" class="cattery-content">
      <div class="header">
        <Button variant="secondary" @click="goBack">← Retour aux Chatteries</Button>
        <h2>{{ cattery.name }}</h2>
        <div class="actions">
          <Button variant="danger" @click="deleteCattery">Supprimer la Chatterie</Button>
        </div>
      </div>

      <div class="tabs">
        <button 
          class="tab" 
          :class="{ active: activeTab === 'cats' }" 
          @click="activeTab = 'cats'"
        >
          Chats
        </button>
        <button 
          class="tab" 
          :class="{ active: activeTab === 'members' }" 
          @click="activeTab = 'members'"
        >
          Membres
        </button>
        <button 
          class="tab" 
          :class="{ active: activeTab === 'breeder' }" 
          @click="activeTab = 'breeder'"
        >
          Éleveur
        </button>
      </div>

      <div v-if="activeTab === 'cats'" class="tab-content">
        <div class="tab-header">
          <h3>Chats dans cette Chatterie</h3>
          <button class="btn-add" @click="addNewCat">Ajouter un Chat</button>
        </div>

        <div v-if="catsLoading" class="loading">
          <div class="loading-spinner"></div>
          <p>Chargement des chats...</p>
        </div>

        <div v-else-if="catsError" class="error-message">
          <span class="error-icon">⚠️</span> {{ catsError }}
          <button class="btn-retry" @click="catsStore.fetchCatsByCatteryId(catteryId)">Réessayer</button>
        </div>

        <div v-else>
          <CatList />
        </div>
      </div>

      <div v-else-if="activeTab === 'members'" class="tab-content">
        <div class="tab-header">
          <h3>Membres de la Chatterie</h3>
          <button class="btn-add" disabled>Ajouter un Membre</button>
        </div>

        <div v-if="cattery.members && cattery.members.length > 0" class="members-list">
          <div v-for="member in cattery.members" :key="member.id" class="member-card">
            <div class="member-info">
              <h4>{{ member.firstName }} {{ member.lastName }}</h4>
              <p>{{ member.email }}</p>
              <p class="member-role">{{ member.role }}</p>
            </div>
            <button class="btn-remove" disabled>Supprimer</button>
          </div>
        </div>

        <div v-else class="empty-state">
          <p>Aucun membre trouvé pour cette chatterie.</p>
        </div>
      </div>

      <div v-else-if="activeTab === 'breeder'" class="tab-content">
        <div class="tab-header">
          <h3>Éleveur de la Chatterie</h3>
          <button class="btn-add" @click="openBreederForm">Mettre à jour l'Éleveur</button>
        </div>

        <div v-if="cattery.breeder" class="breeder-info">
          <div class="info-group">
            <label>Nom :</label>
            <p>{{ cattery.breeder.firstName }} {{ cattery.breeder.lastName }}</p>
          </div>

          <div class="info-group">
            <label>Email :</label>
            <p>{{ cattery.breeder.email || 'Non fourni' }}</p>
          </div>

          <div class="info-group">
            <label>Téléphone :</label>
            <p>{{ cattery.breeder.phone || 'Non fourni' }}</p>
          </div>

          <div v-if="cattery.breeder.address" class="info-group">
            <label>Adresse :</label>
            <p>
              {{ cattery.breeder.address.street || '' }}<br v-if="cattery.breeder.address.street">
              {{ cattery.breeder.address.city || '' }}{{ cattery.breeder.address.city && cattery.breeder.address.state ? ', ' : '' }}{{ cattery.breeder.address.state || '' }} {{ cattery.breeder.address.zipCode || '' }}<br v-if="cattery.breeder.address.city || cattery.breeder.address.state || cattery.breeder.address.zipCode">
              {{ cattery.breeder.address.country || '' }}
            </p>
          </div>
        </div>

        <div v-else class="empty-state">
          <p>Aucune information d'éleveur trouvée pour cette chatterie. Cliquez sur "Mettre à jour l'Éleveur" pour ajouter les informations de l'éleveur.</p>
        </div>
      </div>
    </div>

    <div v-else class="not-found">
      <h2>Chatterie Non Trouvée</h2>
      <p>La chatterie que vous recherchez n'existe pas ou vous n'avez pas la permission de la consulter.</p>
      <button class="btn-back" @click="goBack">Retour aux Chatteries</button>
    </div>
  </Card>

  <BreederForm 
    :catteryId="catteryId" 
    :show="showBreederForm" 
    @close="showBreederForm = false" 
    @breeder-updated="handleBreederUpdated" 
  />
</template>

<style scoped>
.cattery-details {
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 2px solid #e9ecef;
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

.btn-retry {
  margin-left: auto;
  background-color: #c62828;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.btn-back {
  background-color: #e9ecef;
  color: #2d3436;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.btn-back:hover {
  background-color: #dee2e6;
}

h2 {
  color: #6c5ce7;
  font-size: 1.5rem;
  margin: 0;
  flex-grow: 1;
  text-align: center;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.btn-delete {
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.btn-delete:hover {
  background-color: #c0392b;
}

.tabs {
  display: flex;
  border-bottom: 2px solid #e9ecef;
  margin-bottom: 1.5rem;
}

.tab {
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 500;
  color: #636e72;
  transition: all 0.2s;
  position: relative;
}

.tab:hover {
  color: #6c5ce7;
}

.tab.active {
  color: #6c5ce7;
}

.tab.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #6c5ce7;
}

.tab-content {
  padding: 1rem 0;
}

.tab-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

h3 {
  color: #2d3436;
  font-size: 1.2rem;
  margin: 0;
}

.btn-add {
  background-color: #6c5ce7;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.btn-add:hover {
  background-color: #5b4bc4;
}

.btn-add:disabled {
  background-color: #b2bec3;
  cursor: not-allowed;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: #636e72;
}

.members-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.member-card {
  border: 1px solid #dfe6e9;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.member-info h4 {
  margin: 0 0 0.5rem 0;
  color: #2d3436;
}

.member-info p {
  margin: 0.25rem 0;
  color: #636e72;
}

.member-role {
  font-size: 0.875rem;
  color: #6c5ce7 !important;
  font-weight: 500;
}

.btn-remove {
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.btn-remove:hover {
  background-color: #c0392b;
}

.btn-remove:disabled {
  background-color: #b2bec3;
  cursor: not-allowed;
}

.breeder-info {
  border: 1px solid #dfe6e9;
  border-radius: 8px;
  padding: 1.5rem;
}

.info-group {
  margin-bottom: 1rem;
}

.info-group:last-child {
  margin-bottom: 0;
}

.info-group label {
  font-weight: 600;
  color: #2d3436;
  display: block;
  margin-bottom: 0.25rem;
}

.info-group p {
  margin: 0;
  color: #636e72;
}

.not-found {
  text-align: center;
  padding: 2rem;
}

.not-found h2 {
  color: #e74c3c;
  margin-bottom: 1rem;
}

.not-found p {
  color: #636e72;
  margin-bottom: 1.5rem;
}

@media (max-width: 768px) {
  .cattery-details {
    padding: 1rem;
  }

  .header {
    flex-direction: column;
    align-items: stretch;
  }

  .btn-back {
    order: 1;
  }

  h2 {
    order: 0;
    margin-bottom: 1rem;
  }

  .actions {
    order: 2;
    justify-content: center;
  }

  .tabs {
    overflow-x: auto;
    white-space: nowrap;
    padding-bottom: 0.5rem;
  }

  .tab {
    padding: 0.5rem 1rem;
  }

  .tab-header {
    flex-direction: column;
    gap: 0.5rem;
  }

  .btn-add {
    width: 100%;
  }
}
</style>
