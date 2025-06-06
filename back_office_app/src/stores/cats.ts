import { defineStore } from 'pinia';
import { ref } from 'vue';
import { catApi } from '../services/api.ts';
import type { Cat, NewCat } from '../types';

export const useCatsStore = defineStore('cats', () => {

  const cats = ref<Cat[]>([]);
  const loading = ref(false);
  const error = ref('');

  const fetchCats = async () => {
    loading.value = true;
    error.value = '';

    try {
      const response = await catApi.getAllCats();
      cats.value = response.data;
    } catch (err) {
      console.error('Error loading cats:', err);
      error.value = 'Erreur lors du chargement des chats. Veuillez réessayer.';
    } finally {
      loading.value = false;
    }
  };

  const addCat = async (catteryId: number, newCat: NewCat) => {
    loading.value = true;
    error.value = '';

    try {
      await catApi.createCat(catteryId, newCat);
      await fetchCats();
      return true;
    } catch (err) {
      console.error('Error creating cat:', err);
      error.value = 'Echec de la création du chat. Veuillez réessayer.';
      return false;
    } finally {
      loading.value = false;
    }
  };

  const updateCat = async (id: number, catData: NewCat) => {
    loading.value = true;
    error.value = '';

    try {
      await catApi.updateCat(id, catData);
      await fetchCats();
      return true;
    } catch (err) {
      console.error('Error updating cat:', err);
      error.value = 'Echec de la mise à jour du chat. Veuillez réessayer.';
      return false;
    } finally {
      loading.value = false;
    }
  };

  const deleteCat = async (id: number) => {
    loading.value = true;
    error.value = '';

    try {
      await catApi.deleteCat(id);
      await fetchCats();
      return true;
    } catch (err) {
      console.error('Error deleting cat:', err);
      error.value = 'Impossible de supprimer le chat. Veuillez réessayer.';
      return false;
    } finally {
      loading.value = false;
    }
  };

  const fetchCatsByCatteryId = async (catteryId: number) => {
    loading.value = true;
    error.value = '';

    try {
      const response = await catApi.getCatteryCats(catteryId);
      cats.value = response.data;
      console.log(`Loaded ${cats.value.length} cats for cattery ${catteryId}`);
    } catch (err) {
      console.error(`Error loading cats for cattery ${catteryId}:`, err);
      error.value = 'Erreur lors du chargement des chats pour la chatterie. Veuillez réessayer.';
    } finally {
      loading.value = false;
    }
  };

  return {
    cats,
    loading,
    error,
    fetchCats,
    fetchCatsByCatteryId,
    addCat,
    updateCat,
    deleteCat
  };
});
