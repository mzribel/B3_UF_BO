import { defineStore } from 'pinia';
import { ref } from 'vue';
import { 
  breedApi, 
  coatColorApi, 
  coatEffectApi, 
  coatPatternApi, 
  coatWhiteMarkingApi, 
  polyTypeApi 
} from '../services/api';
import type { 
  Breed, 
  CoatColor, 
  CoatEffect, 
  CoatPattern, 
  CoatWhiteMarking, 
  PolyType,
  NewBreed,
  NewCoatColor,
  NewCoatEffect,
  NewCoatPattern,
  NewCoatWhiteMarking,
  NewPolyType
} from '../types';

export const useLoofCharacteristicsStore = defineStore('loofCharacteristics', () => {

  const breeds = ref<Breed[]>([]);
  const coatColors = ref<CoatColor[]>([]);
  const coatEffects = ref<CoatEffect[]>([]);
  const coatPatterns = ref<CoatPattern[]>([]);
  const coatWhiteMarkings = ref<CoatWhiteMarking[]>([]);
  const polyTypes = ref<PolyType[]>([]);
  const loading = ref(false);
  const error = ref('');

  const fetchBreeds = async () => {
    loading.value = true;
    error.value = '';

    try {
      const response = await breedApi.getAllBreeds();
      breeds.value = response.data;
    } catch (err) {
      console.error('Error loading breeds:', err);
      error.value = 'Erreur lors du chargement des races LOOF. Veuillez réessayer.';
    } finally {
      loading.value = false;
    }
  };

  const fetchCoatColors = async () => {
    loading.value = true;
    error.value = '';

    try {
      const response = await coatColorApi.getAllCoatColors();
      coatColors.value = response.data;
    } catch (err) {
      console.error('Error loading coat colors:', err);
      error.value = 'Impossible de charger les couleurs de pelage. Veuillez réessayer.';
    } finally {
      loading.value = false;
    }
  };

  const fetchCoatEffects = async () => {
    loading.value = true;
    error.value = '';

    try {
      const response = await coatEffectApi.getAllCoatEffects();
      coatEffects.value = response.data;
    } catch (err) {
      console.error('Error loading coat effects:', err);
      error.value = 'Impossible de charger les effets de pelage. Veuillez réessayer.';
    } finally {
      loading.value = false;
    }
  };

  const fetchCoatPatterns = async () => {
    loading.value = true;
    error.value = '';

    try {
      const response = await coatPatternApi.getAllCoatPatterns();
      coatPatterns.value = response.data;
    } catch (err) {
      console.error('Error loading coat patterns:', err);
      error.value = 'Impossible de charger les motifs de pelage. Veuillez réessayer.';
    } finally {
      loading.value = false;
    }
  };

  const fetchCoatWhiteMarkings = async () => {
    loading.value = true;
    error.value = '';

    try {
      const response = await coatWhiteMarkingApi.getAllCoatWhiteMarkings();
      coatWhiteMarkings.value = response.data;
    } catch (err) {
      console.error('Error loading coat white markings:', err);
      error.value = 'Impossible de charger les marques blanches de pelage. Veuillez réessayer.';
    } finally {
      loading.value = false;
    }
  };

  const fetchPolyTypes = async () => {
    loading.value = true;
    error.value = '';

    try {
      const response = await polyTypeApi.getAllPolyTypes();
      polyTypes.value = response.data;
    } catch (err) {
      console.error('Error loading poly types:', err);
      error.value = 'Impossible de charger les types de polydactylies. Veuillez réessayer.';
    } finally {
      loading.value = false;
    }
  };

  const createBreed = async (breedData: NewBreed) => {
    loading.value = true;
    error.value = '';

    try {
      const response = await breedApi.createBreed(breedData);
      await fetchBreeds();
      return response.data;
    } catch (err) {
      console.error('Error creating breed:', err);
      error.value = 'Impossible de créer une race de chat. Veuillez réessayer.';
      return null;
    } finally {
      loading.value = false;
    }
  };

  const updateBreed = async (id: number, breedData: NewBreed) => {
    loading.value = true;
    error.value = '';

    try {
      const response = await breedApi.updateBreed(id, breedData);
      await fetchBreeds();
      return response.data;
    } catch (err) {
      console.error(`Error updating breed ${id}:`, err);
      error.value = 'Impossible de mettre à jour la race de chat. Veuillez réessayer.';
      return null;
    } finally {
      loading.value = false;
    }
  };

  const deleteBreed = async (id: number) => {
    loading.value = true;
    error.value = '';

    try {
      await breedApi.deleteBreed(id);
      await fetchBreeds();
      return true;
    } catch (err) {
      console.error(`Error deleting breed ${id}:`, err);
      error.value = 'Erreur lors de la suppression de la race de chat. Veuillez réessayer.';
      return false;
    } finally {
      loading.value = false;
    }
  };

  const createCoatColor = async (colorData: NewCoatColor) => {
    loading.value = true;
    error.value = '';

    try {
      const response = await coatColorApi.createCoatColor(colorData);
      await fetchCoatColors();
      return response.data;
    } catch (err) {
      console.error('Error creating coat color:', err);
      error.value = 'Echec de la création de la couleur de pelage. Veuillez réessayer.';
      return null;
    } finally {
      loading.value = false;
    }
  };

  const updateCoatColor = async (id: number, colorData: NewCoatColor) => {
    loading.value = true;
    error.value = '';

    try {
      const response = await coatColorApi.updateCoatColor(id, colorData);
      await fetchCoatColors();
      return response.data;
    } catch (err) {
      console.error(`Error updating coat color ${id}:`, err);
      error.value = 'Echec de la mise à jour de la couleur de pelage. Veuillez réessayer.';
      return null;
    } finally {
      loading.value = false;
    }
  };

  const deleteCoatColor = async (id: number) => {
    loading.value = true;
    error.value = '';

    try {
      await coatColorApi.deleteCoatColor(id);
      await fetchCoatColors();
      return true;
    } catch (err) {
      console.error(`Error deleting coat color ${id}:`, err);
      error.value = 'Echec de la suppression de la couleur de pelage. Veuillez réessayer.';
      return false;
    } finally {
      loading.value = false;
    }
  };

  const createCoatEffect = async (effectData: NewCoatEffect) => {
    loading.value = true;
    error.value = '';

    try {
      const response = await coatEffectApi.createCoatEffect(effectData);
      await fetchCoatEffects();
      return response.data;
    } catch (err) {
      console.error('Error creating coat effect:', err);
      error.value = 'Impossible de créer l\'effet de pelage. Veuillez réessayer.';
      return null;
    } finally {
      loading.value = false;
    }
  };

  const updateCoatEffect = async (id: number, effectData: NewCoatEffect) => {
    loading.value = true;
    error.value = '';

    try {
      const response = await coatEffectApi.updateCoatEffect(id, effectData);
      await fetchCoatEffects();
      return response.data;
    } catch (err) {
      console.error(`Error updating coat effect ${id}:`, err);
      error.value = 'Impossible de mettre à jour l\'effet de pelage. Veuillez réessayer.';
      return null;
    } finally {
      loading.value = false;
    }
  };

  const deleteCoatEffect = async (id: number) => {
    loading.value = true;
    error.value = '';

    try {
      await coatEffectApi.deleteCoatEffect(id);
      await fetchCoatEffects();
      return true;
    } catch (err) {
      console.error(`Error deleting coat effect ${id}:`, err);
      error.value = 'Echec de la suppression de l\'effet de pelage. Veuillez réessayer.';
      return false;
    } finally {
      loading.value = false;
    }
  };

  const createCoatPattern = async (patternData: NewCoatPattern) => {
    loading.value = true;
    error.value = '';

    try {
      const response = await coatPatternApi.createCoatPattern(patternData);
      await fetchCoatPatterns();
      return response.data;
    } catch (err) {
      console.error('Error creating coat pattern:', err);
      error.value = 'Erreur lors de la création du motif de pelage. Veuillez réessayer.';
      return null;
    } finally {
      loading.value = false;
    }
  };

  const updateCoatPattern = async (id: number, patternData: NewCoatPattern) => {
    loading.value = true;
    error.value = '';

    try {
      const response = await coatPatternApi.updateCoatPattern(id, patternData);
      await fetchCoatPatterns();
      return response.data;
    } catch (err) {
      console.error(`Error updating coat pattern ${id}:`, err);
      error.value = 'Echec de la mise à jour du motif de pelage. Veuillez réessayer.';
      return null;
    } finally {
      loading.value = false;
    }
  };

  const deleteCoatPattern = async (id: number) => {
    loading.value = true;
    error.value = '';

    try {
      await coatPatternApi.deleteCoatPattern(id);
      await fetchCoatPatterns();
      return true;
    } catch (err) {
      console.error(`Error deleting coat pattern ${id}:`, err);
      error.value = 'Echec de la suppression du motif de pelage. Veuillez réessayer.';
      return false;
    } finally {
      loading.value = false;
    }
  };

  const createCoatWhiteMarking = async (markingData: NewCoatWhiteMarking) => {
    loading.value = true;
    error.value = '';

    try {
      const response = await coatWhiteMarkingApi.createCoatWhiteMarking(markingData);
      await fetchCoatWhiteMarkings();
      return response.data;
    } catch (err) {
      console.error('Error creating coat white marking:', err);
      error.value = 'Echec de la création de la marque blanche de pelage. Veuillez réessayer.';
      return null;
    } finally {
      loading.value = false;
    }
  };

  const updateCoatWhiteMarking = async (id: number, markingData: NewCoatWhiteMarking) => {
    loading.value = true;
    error.value = '';

    try {
      const response = await coatWhiteMarkingApi.updateCoatWhiteMarking(id, markingData);
      await fetchCoatWhiteMarkings();
      return response.data;
    } catch (err) {
      console.error(`Error updating coat white marking ${id}:`, err);
      error.value = 'Echec de la mise à jour de la marque blanche de pelage. Veuillez réessayer.';
      return null;
    } finally {
      loading.value = false;
    }
  };

  const deleteCoatWhiteMarking = async (id: number) => {
    loading.value = true;
    error.value = '';

    try {
      await coatWhiteMarkingApi.deleteCoatWhiteMarking(id);
      await fetchCoatWhiteMarkings();
      return true;
    } catch (err) {
      console.error(`Error deleting coat white marking ${id}:`, err);
      error.value = 'Echec de la suppression de la marque blanche de pelage. Veuillez réessayer.';
      return false;
    } finally {
      loading.value = false;
    }
  };

  const createPolyType = async (polyTypeData: NewPolyType) => {
    loading.value = true;
    error.value = '';

    try {
      const response = await polyTypeApi.createPolyType(polyTypeData);
      await fetchPolyTypes();
      return response.data;
    } catch (err) {
      console.error('Error creating poly type:', err);
      error.value = 'Echec de la création du type de polydactylie. Veuillez réessayer.';
      return null;
    } finally {
      loading.value = false;
    }
  };

  const updatePolyType = async (id: number, polyTypeData: NewPolyType) => {
    loading.value = true;
    error.value = '';

    try {
      const response = await polyTypeApi.updatePolyType(id, polyTypeData);
      await fetchPolyTypes();
      return response.data;
    } catch (err) {
      console.error(`Error updating poly type ${id}:`, err);
      error.value = 'Impossible de mettre à jour le type de polydactylie. Veuillez réessayer.';
      return null;
    } finally {
      loading.value = false;
    }
  };

  const deletePolyType = async (id: number) => {
    loading.value = true;
    error.value = '';

    try {
      await polyTypeApi.deletePolyType(id);
      await fetchPolyTypes();
      return true;
    } catch (err) {
      console.error(`Error deleting poly type ${id}:`, err);
      error.value = 'Echec de la suppression du type de polydactylie. Veuillez réessayer.';
      return false;
    } finally {
      loading.value = false;
    }
  };

  const fetchAllCharacteristics = async () => {
    error.value = '';
    loading.value = true;

    try {
      await Promise.all([
        fetchBreeds(),
        fetchCoatColors(),
        fetchCoatEffects(),
        fetchCoatPatterns(),
        fetchCoatWhiteMarkings(),
        fetchPolyTypes()
      ]);
    } catch (err) {
      console.error('Error loading LOOF characteristics:', err);
      error.value = 'Erreur lors du chargement des caractéristiques LOOF. Veuillez réessayer.';
    } finally {
      loading.value = false;
    }
  };

  return {
    breeds,
    coatColors,
    coatEffects,
    coatPatterns,
    coatWhiteMarkings,
    polyTypes,
    loading,
    error,

    fetchBreeds,
    fetchCoatColors,
    fetchCoatEffects,
    fetchCoatPatterns,
    fetchCoatWhiteMarkings,
    fetchPolyTypes,
    fetchAllCharacteristics,

    createBreed,
    updateBreed,
    deleteBreed,

    createCoatColor,
    updateCoatColor,
    deleteCoatColor,

    createCoatEffect,
    updateCoatEffect,
    deleteCoatEffect,

    createCoatPattern,
    updateCoatPattern,
    deleteCoatPattern,

    createCoatWhiteMarking,
    updateCoatWhiteMarking,
    deleteCoatWhiteMarking,

    createPolyType,
    updatePolyType,
    deletePolyType
  };
});
