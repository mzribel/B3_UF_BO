import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { userApi } from '../services/api';
import type { User } from '../types';

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([]);
  const loading = ref(false);
  const error = ref('');
  const sortKey = ref<keyof User>('id');
  const sortOrder = ref<'asc' | 'desc'>('asc');

  const sortedUsers = computed(() => {
    return [...users.value].sort((a, b) => {
      const aValue = a[sortKey.value];
      const bValue = b[sortKey.value];

      if (aValue < bValue) return sortOrder.value === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder.value === 'asc' ? 1 : -1;
      return 0;
    });
  });

  const loadUsers = async () => {
    loading.value = true;
    error.value = '';

    try {
      const response = await userApi.getAllUsers();
      users.value = response.data;
    } catch (err) {
      console.error('Error loading users:', err);
      error.value = 'Echec lors du chargement des utilisateurs. Veuillez réessayer.';
    } finally {
      loading.value = false;
    }
  };

  const getUserById = async (userId: number) => {
    loading.value = true;
    error.value = '';

    try {
      const response = await userApi.getUserById(userId);
      return response.data;
    } catch (err) {
      console.error(`Error loading user ${userId}:`, err);
      error.value = 'Impossible de charger l\'utilisateur. Veuillez réessayer.';
      return null;
    } finally {
      loading.value = false;
    }
  };

  const toggleAdminStatus = async (user: User) => {
    try {
      if (user.admin) {
        await userApi.demoteUserFromAdmin(user.id);
        const userIndex = users.value.findIndex(u => u.id === user.id);
        if (userIndex !== -1) {
          users.value[userIndex].admin = false;
        }
      } else {
        await userApi.promoteUserToAdmin(user.id);
        const userIndex = users.value.findIndex(u => u.id === user.id);
        if (userIndex !== -1) {
          users.value[userIndex].admin = true;
        }
      }
      return true;
    } catch (err) {
      console.error('Error updating user role:', err);
      error.value = 'Impossible de mettre à jour le rôle de l\'utilisateur. Veuillez réessayer.';
      await loadUsers();
      return false;
    }
  };

  const setSort = (key: keyof User) => {
    if (sortKey.value === key) {
      sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    } else {
      sortKey.value = key;
      sortOrder.value = 'asc';
    }
  };

  return {
    users,
    loading,
    error,
    sortKey,
    sortOrder,
    sortedUsers,
    loadUsers,
    getUserById,
    toggleAdminStatus,
    setSort
  };
});
