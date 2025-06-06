<script setup lang="ts">
import { computed } from 'vue';
import { useUsersStore } from '../stores/users';
import Card from '../design-system/components/Card.vue';
import type { User } from '../types';

const usersStore = useUsersStore();

const users = computed(() => usersStore.sortedUsers);
const loading = computed(() => usersStore.loading);
const error = computed(() => usersStore.error);
const sortKey = computed(() => usersStore.sortKey);
const sortOrder = computed(() => usersStore.sortOrder);
const hasUsers = computed(() => users.value.length > 0);

const sort = (key: keyof User) => {
  usersStore.setSort(key);
};

const toggleAdminStatus = async (user: User) => {
  await usersStore.toggleAdminStatus(user);
};
</script>

<template>
  <Card class="users-list" variant="default" shadow="md" padding="lg">
    <div class="header">
      <h2>Tous les Utilisateurs</h2>
    </div>

    <div v-if="error" class="bg-error error-message">
      <span class="error-icon">⚠️</span> {{ error }}
    </div>

    <div v-if="loading" class="loading">
      <div class="loading-spinner"></div>
      <p>Chargement des utilisateurs...</p>
    </div>

    <div v-else-if="!hasUsers" class="no-users">
      <p>Aucun utilisateur trouvé.</p>
      <div class="user-emoji">👤</div>
    </div>

    <div v-else class="table-container">
      <table class="users-table">
        <thead>
          <tr>
            <th @click="sort('id')" class="sortable">
              ID
              <span v-if="sortKey === 'id'" class="sort-indicator">
                {{ sortOrder === 'asc' ? '▲' : '▼' }}
              </span>
            </th>
            <th @click="sort('displayName')" class="sortable">
              Nom d'utilisateur
              <span v-if="sortKey === 'displayName'" class="sort-indicator">
                {{ sortOrder === 'asc' ? '▲' : '▼' }}
              </span>
            </th>
            <th @click="sort('email')" class="sortable">
              Email
              <span v-if="sortKey === 'email'" class="sort-indicator">
                {{ sortOrder === 'asc' ? '▲' : '▼' }}
              </span>
            </th>
            <th>Admin</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id" class="user-row">
            <td>{{ user.id }}</td>
            <td class="user-name">{{ user.displayName }}</td>
            <td>{{ user.email }}</td>
            <td>
              <div class="toggle-switch">
                <label class="switch">
                  <input 
                    type="checkbox" 
                    :checked="user.admin" 
                    @change="toggleAdminStatus(user)"
                  >
                  <span class="slider round"></span>
                </label>
                <span class="toggle-label">{{ user.admin ? 'Oui' : 'Non' }}</span>
              </div>
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
  padding: var(--space-sm);
  border-radius: 4px;
  background-color: #ffebee;
  color: #c62828;
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

.no-users {
  text-align: center;
  padding: var(--space-xl);
  color: var(--text-muted);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-emoji {
  font-size: 3rem;
  margin-top: var(--space-md);
}

.table-container {
  overflow-x: auto;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: var(--space-md);
}

.users-table th, .users-table td {
  padding: var(--space-sm);
  text-align: left;
  border-bottom: 1px solid var(--border-light);
}

.users-table th {
  background-color: var(--bg-muted);
  font-weight: var(--font-weight-medium);
  color: var(--text-dark);
}

.sortable {
  cursor: pointer;
  user-select: none;
  position: relative;
}

.sortable:hover {
  background-color: #e0e0e0;
}

.sort-indicator {
  margin-left: 5px;
  font-size: 0.8em;
}

.user-row {
  transition: background-color 0.2s;
}

.user-row:hover {
  background-color: var(--bg-muted);
}

.user-name {
  font-weight: var(--font-weight-medium);
  color: var(--secondary-color);
}

/* Toggle Switch Styles */
.toggle-switch {
  display: flex;
  align-items: center;
}

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  margin-right: 10px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
}

input:checked + .slider {
  background-color: var(--primary-color);
}

input:focus + .slider {
  box-shadow: 0 0 1px var(--primary-color);
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.slider.round {
  border-radius: 24px;
}

.slider.round:before {
  border-radius: 50%;
}

.toggle-label {
  font-size: 0.9em;
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

  .users-table th, .users-table td {
    padding: var(--space-xs);
    font-size: var(--font-size-sm);
  }
}
</style>
