import { defineStore } from 'pinia';
import { ref } from 'vue';
import { breederApi } from '../services/api';
import type { Breeder, UpdateBreeder } from '../types';

export const useBreederStore = defineStore('breeder', () => {

  const breeder = ref<Breeder | null>(null);
  const loading = ref(false);
  const error = ref('');

  const getCatteryBreeder = async (catteryId: number) => {
    loading.value = true;
    error.value = '';

    try {
      const response = await breederApi.getCatteryBreeder(catteryId);
      breeder.value = response.data;
      return response.data;
    } catch (err) {
      console.error(`Error loading breeder for cattery ${catteryId}:`, err);
      error.value = 'Failed to load breeder information. Please try again.';
      return null;
    } finally {
      loading.value = false;
    }
  };

  const updateCatteryBreeder = async (catteryId: number, breederData: UpdateBreeder) => {
    loading.value = true;
    error.value = '';

    try {
      const response = await breederApi.updateCatteryBreeder(catteryId, breederData);
      breeder.value = response.data;
      return true;
    } catch (err) {
      console.error(`Error updating breeder for cattery ${catteryId}:`, err);
      error.value = 'Failed to update breeder information. Please try again.';
      return false;
    } finally {
      loading.value = false;
    }
  };

  const getAllContactBreeders = async (catteryId: number) => {
    loading.value = true;
    error.value = '';

    try {
      const response = await breederApi.getAllContactBreeders(catteryId);
      return response.data;
    } catch (err) {
      console.error(`Error loading contact breeders for cattery ${catteryId}:`, err);
      error.value = 'Failed to load contact breeders. Please try again.';
      return [];
    } finally {
      loading.value = false;
    }
  };

  const createContactBreeder = async (catteryId: number, breederData: UpdateBreeder) => {
    loading.value = true;
    error.value = '';

    try {
      const response = await breederApi.createContactBreeder(catteryId, breederData);
      return response.data;
    } catch (err) {
      console.error(`Error creating contact breeder for cattery ${catteryId}:`, err);
      error.value = 'Failed to create contact breeder. Please try again.';
      return null;
    } finally {
      loading.value = false;
    }
  };

  const updateContactBreeder = async (catteryId: number, breederId: number, breederData: UpdateBreeder) => {
    loading.value = true;
    error.value = '';

    try {
      const response = await breederApi.updateContactBreeder(catteryId, breederId, breederData);
      return response.data;
    } catch (err) {
      console.error(`Error updating contact breeder ${breederId} for cattery ${catteryId}:`, err);
      error.value = 'Failed to update contact breeder. Please try again.';
      return null;
    } finally {
      loading.value = false;
    }
  };

  const deleteContactBreeder = async (catteryId: number, breederId: number) => {
    loading.value = true;
    error.value = '';

    try {
      await breederApi.deleteContactBreeder(catteryId, breederId);
      return true;
    } catch (err) {
      console.error(`Error deleting contact breeder ${breederId} for cattery ${catteryId}:`, err);
      error.value = 'Failed to delete contact breeder. Please try again.';
      return false;
    } finally {
      loading.value = false;
    }
  };

  // Return state and actions
  return {
    breeder,
    loading,
    error,
    getCatteryBreeder,
    updateCatteryBreeder,
    getAllContactBreeders,
    createContactBreeder,
    updateContactBreeder,
    deleteContactBreeder
  };
});