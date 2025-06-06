import { defineStore } from 'pinia';
import { ref } from 'vue';
import { catteryApi } from '../services/api';
import type { Cattery, NewCattery } from '../types';

export const useCatteriesStore = defineStore('catteries', () => {

  const catteries = ref<Cattery[]>([]);
  const currentCattery = ref<Cattery | null>(null);
  const loading = ref(false);
  const error = ref('');

  const fetchCatteries = async () => {
    loading.value = true;
    error.value = '';

    try {
      const response = await catteryApi.getAllCatteries();
      catteries.value = response.data;
    } catch (err) {
      console.error('Error loading catteries:', err);
      error.value = 'Erreur lors du chargement des chatteries. Veuillez réessayer.';
    } finally {
      loading.value = false;
    }
  };

  const fetchCatteryById = async (id: number) => {
    loading.value = true;
    error.value = '';

    try {
      const response = await catteryApi.getCatteryById(id);
      currentCattery.value = response.data;
      return response.data;
    } catch (err) {
      console.error(`Error loading cattery with id ${id}:`, err);
      error.value = 'Erreur lors du chargement de la chatterie. Veuillez réessayer.';
      return null;
    } finally {
      loading.value = false;
    }
  };

  const createCattery = async (catteryData: NewCattery) => {
    loading.value = true;
    error.value = '';

    try {
      const response = await catteryApi.createCattery(catteryData);
      await fetchCatteries();
      return response.data;
    } catch (err) {
      console.error('Error creating cattery:', err);
      error.value = 'Impossible de créer la chatterie. Veuillez réessayer.';
      return null;
    } finally {
      loading.value = false;
    }
  };

  const deleteCattery = async (id: number) => {
    loading.value = true;
    error.value = '';

    try {
      await catteryApi.deleteCatteryById(id);
      await fetchCatteries();
      return true;
    } catch (err) {
      console.error('Error deleting cattery:', err);
      error.value = 'Impossible de supprimer la chatterie. Veuillez réessayer.';
      return false;
    } finally {
      loading.value = false;
    }
  };

  const addUserToCattery = async (catteryId: number, userId: number) => {
    loading.value = true;
    error.value = '';

    try {
      await catteryApi.addUserToCattery(catteryId, { userId });
      if (currentCattery.value && currentCattery.value.id === catteryId) {
        await fetchCatteryById(catteryId);
      }
      return true;
    } catch (err) {
      console.error('Error adding user to cattery:', err);
      error.value = 'Impossible d\'ajouter l\'utilisateur à la chatterie. Veuillez réessayer.';
      return false;
    } finally {
      loading.value = false;
    }
  };

  const removeUserFromCattery = async (catteryId: number, userId: number) => {
    loading.value = true;
    error.value = '';

    try {
      await catteryApi.removeUserFromCattery(catteryId, userId);
      if (currentCattery.value && currentCattery.value.id === catteryId) {
        await fetchCatteryById(catteryId);
      }
      return true;
    } catch (err) {
      console.error('Error removing user from cattery:', err);
      error.value = 'Impossible de retirer l\'utilisateur de la chatterie. Veuillez réessayer.';
      return false;
    } finally {
      loading.value = false;
    }
  };

  const promoteUserToCatteryAdmin = async (catteryId: number, userId: number) => {
    loading.value = true;
    error.value = '';

    try {
      await catteryApi.promoteUserToCatteryAdmin(catteryId, userId);
      if (currentCattery.value && currentCattery.value.id === catteryId) {
        await fetchCatteryById(catteryId);
      }
      return true;
    } catch (err) {
      console.error('Error promoting user to cattery admin:', err);
      error.value = 'Impossible de promouvoir l\'utilisateur en administrateur de la chatterie. Veuillez réessayer.';
      return false;
    } finally {
      loading.value = false;
    }
  }

  return {
    catteries,
    currentCattery,
    loading,
    error,
    fetchCatteries,
    fetchCatteryById,
    createCattery,
    deleteCattery,
    addUserToCattery,
    removeUserFromCattery,
    promoteUserToCatteryAdmin
  };
});