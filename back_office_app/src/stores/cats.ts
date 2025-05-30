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
      error.value = 'Failed to load cats. Please try again.';
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
      error.value = 'Failed to create cat. Please try again.';
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
      error.value = 'Failed to update cat. Please try again.';
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
      error.value = 'Failed to delete cat. Please try again.';
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
    } catch (err) {
      console.error(`Error loading cats for cattery ${catteryId}:`, err);
      error.value = 'Failed to load cats for this cattery. Please try again.';
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
