<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { userApi } from '../services/api';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

const users = ref<User[]>([]);
const loading = ref(true);
const error = ref('');

// Load all users
const loadUsers = async () => {
  loading.value = true;
  error.value = '';
  
  try {
    const response = await userApi.getAllUsers();
    users.value = response.data;
  } catch (err) {
    console.error('Error loading users:', err);
    error.value = 'Failed to load users. Please try again.';
  } finally {
    loading.value = false;
  }
};

// Load users when component is mounted
onMounted(() => {
  loadUsers();
});
</script>

<template>
  <div class="users-container">
    <h1>Users Management</h1>
    
    <!-- Error message -->
    <div v-if="error" class="error-message">{{ error }}</div>
    
    <!-- Users list -->
    <div class="users-list">
      <h2>All Users</h2>
      <div v-if="loading" class="loading">Loading users...</div>
      <div v-else-if="users.length === 0" class="no-users">No users found.</div>
      <table v-else class="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.users-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  color: #42b883;
  margin-bottom: 2rem;
  text-align: center;
}

h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.error-message {
  background-color: #ffebee;
  color: #c62828;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.loading, .no-users {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
}

.users-table th, .users-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.users-table th {
  background-color: #f2f2f2;
  font-weight: 600;
}

.users-table tr:hover {
  background-color: #f9f9f9;
}
</style>