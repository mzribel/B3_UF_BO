<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useCatsStore } from '../stores/cats';
import { useLoofCharacteristicsStore } from '../stores/loofCharacteristics';
import type { NewCat } from '../types';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps<{
  catteryId?: number;
}>();
const emit = defineEmits(['cat-added']);

const route = useRoute();
const router = useRouter();

const catsStore = useCatsStore();
const loofStore = useLoofCharacteristicsStore();

const catteryId = computed(() => {
  return props.catteryId || (route.params.catteryId ? Number(route.params.catteryId) : undefined);
});

const newCat = ref<NewCat>({
  name: '',
  birthDate: '',
  gender: '',
  coat: {
    color: '',
    pattern: '',
    effect: '',
    whiteMarking: ''
  },
  breedId: undefined
});

const selectedColorId = ref<number | null>(null);
const selectedPatternId = ref<number | null>(null);
const selectedEffectId = ref<number | null>(null);
const selectedWhiteMarkingId = ref<number | null>(null);
const selectedBreedId = ref<number | null>(null);

const formErrors = ref<Record<string, string>>({});

onMounted(async () => {
  await loofStore.fetchAllCharacteristics();
});

const breeds = computed(() => loofStore.breeds);
const coatColors = computed(() => loofStore.coatColors);
const coatPatterns = computed(() => loofStore.coatPatterns);
const coatEffects = computed(() => loofStore.coatEffects);
const coatWhiteMarkings = computed(() => loofStore.coatWhiteMarkings);
const isLoading = computed(() => loofStore.loading);
const loofError = computed(() => loofStore.error);

const validateForm = (): boolean => {
  formErrors.value = {};

  if (!newCat.value.name.trim()) {
    formErrors.value.name = 'Le nom est requis';
    return false;
  }

  if (!newCat.value.birthDate) {
    formErrors.value.birthDate = 'La date de naissance est requise';
    return false;
  }

  if (!newCat.value.gender) {
    formErrors.value.gender = 'Le genre est requis';
    return false;
  }

  if (!selectedColorId.value) {
    formErrors.value.coatColor = 'La couleur du pelage est requise';
    return false;
  }

  if (!selectedPatternId.value) {
    formErrors.value.coatPattern = 'Le motif du pelage est requis';
    return false;
  }

  if (!catteryId.value) {
    formErrors.value.general = 'L\'ID de la chatterie est requis';
    return false;
  }

  return true;
};

const submitForm = async () => {
  if (!validateForm()) return;

  const selectedColor = coatColors.value.find(color => color.id === selectedColorId.value);
  const selectedPattern = coatPatterns.value.find(pattern => pattern.id === selectedPatternId.value);
  const selectedEffect = selectedEffectId.value ? 
    coatEffects.value.find(effect => effect.id === selectedEffectId.value) : null;
  const selectedWhiteMarking = selectedWhiteMarkingId.value ? 
    coatWhiteMarkings.value.find(marking => marking.id === selectedWhiteMarkingId.value) : null;

  newCat.value.coat.color = selectedColor ? selectedColor.name : '';
  newCat.value.coat.pattern = selectedPattern ? selectedPattern.name : '';
  newCat.value.coat.effect = selectedEffect ? selectedEffect.name : '';
  newCat.value.coat.whiteMarking = selectedWhiteMarking ? selectedWhiteMarking.name : '';
  newCat.value.breedId = selectedBreedId.value || undefined;

  const success = await catsStore.addCat(catteryId.value!, newCat.value);

  if (success) {
    newCat.value = {
      name: '',
      birthDate: '',
      gender: '',
      coat: {
        color: '',
        pattern: '',
        effect: '',
        whiteMarking: ''
      },
      breedId: undefined
    };

    selectedColorId.value = null;
    selectedPatternId.value = null;
    selectedEffectId.value = null;
    selectedWhiteMarkingId.value = null;
    selectedBreedId.value = null;

    emit('cat-added');

    if (route.path.includes('/catteries/') && route.path.includes('/cats/new')) {
      router.push(`/catteries/${catteryId.value}`);
    }
  }
};
</script>

<template>
  <div class="cat-form">
    <h2>Ajouter un nouveau chat</h2>

    <div v-if="loofError" class="error-message">
      <span class="error-icon">⚠️</span> {{ loofError }}
      <button @click="loofStore.fetchAllCharacteristics" class="btn-retry">Réessayer</button>
    </div>

    <div v-if="isLoading" class="loading">
      <div class="loading-spinner"></div>
      <p>Chargement des caractéristiques du chat...</p>
    </div>

    <form @submit.prevent="submitForm" v-else>
      <div class="form-group">
        <label for="name">Nom :</label>
        <input id="name" v-model="newCat.name" required placeholder="Entrez le nom de votre chat" />
        <div v-if="formErrors.name" class="error-text">{{ formErrors.name }}</div>
      </div>

      <div class="form-group">
        <label for="birthDate">Date de Naissance :</label>
        <input id="birthDate" type="date" v-model="newCat.birthDate" required />
        <div v-if="formErrors.birthDate" class="error-text">{{ formErrors.birthDate }}</div>
      </div>

      <div class="form-group">
        <label for="gender">Genre :</label>
        <select id="gender" v-model="newCat.gender" required>
          <option value="">Sélectionnez le genre</option>
          <option value="MALE">Mâle</option>
          <option value="FEMALE">Femelle</option>
        </select>
        <div v-if="formErrors.gender" class="error-text">{{ formErrors.gender }}</div>
      </div>

      <div class="form-group">
        <label for="breed">Race :</label>
        <select id="breed" v-model="selectedBreedId">
          <option value="">Sélectionnez la race (optionnel)</option>
          <option v-for="breed in breeds" :key="breed.id" :value="breed.id">
            {{ breed.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="coatColor">Couleur du Pelage :</label>
        <select id="coatColor" v-model="selectedColorId" required>
          <option value="">Sélectionnez la couleur du pelage</option>
          <option v-for="color in coatColors" :key="color.id" :value="color.id">
            {{ color.name }}
          </option>
        </select>
        <div v-if="formErrors.coatColor" class="error-text">{{ formErrors.coatColor }}</div>
      </div>

      <div class="form-group">
        <label for="coatPattern">Motif du Pelage :</label>
        <select id="coatPattern" v-model="selectedPatternId" required>
          <option value="">Sélectionnez le motif du pelage</option>
          <option v-for="pattern in coatPatterns" :key="pattern.id" :value="pattern.id">
            {{ pattern.name }}
          </option>
        </select>
        <div v-if="formErrors.coatPattern" class="error-text">{{ formErrors.coatPattern }}</div>
      </div>

      <div class="form-group">
        <label for="coatEffect">Effet du Pelage (optionnel) :</label>
        <select id="coatEffect" v-model="selectedEffectId">
          <option value="">Sélectionnez l'effet du pelage (optionnel)</option>
          <option v-for="effect in coatEffects" :key="effect.id" :value="effect.id">
            {{ effect.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="coatWhiteMarking">Marquage Blanc (optionnel) :</label>
        <select id="coatWhiteMarking" v-model="selectedWhiteMarkingId">
          <option value="">Sélectionnez le marquage blanc (optionnel)</option>
          <option v-for="marking in coatWhiteMarkings" :key="marking.id" :value="marking.id">
            {{ marking.name }}
          </option>
        </select>
      </div>

      <div v-if="formErrors.general" class="error-message">
        {{ formErrors.general }}
      </div>

      <button type="submit" class="btn-submit" :disabled="isLoading">
        <span class="paw-icon">🐾</span> Ajouter un Chat
      </button>
    </form>
  </div>
</template>

<style scoped>
.cat-form {
  background-color: #093A3E;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #3AAFB9;
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

.loading {
  text-align: center;
  padding: 2rem;
  color: #97C8EB;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loading-spinner {
  border: 4px solid rgba(151, 200, 235, 0.3);
  border-radius: 50%;
  border-top: 4px solid #97C8EB;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-text {
  color: #ff6b6b;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

h2 {
  color: #97C8EB;
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.5rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #c3d8e4;
}

input, select {
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

input:focus, select:focus {
  outline: none;
  border-color: #97C8EB;
  box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.2);
}

input::placeholder {
  color: #b2bec3;
}

.btn-submit {
  background-color: #46667b;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
}

.btn-submit:hover {
  background-color: #5b4cdb;
}

.paw-icon {
  margin-right: 0.5rem;
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .cat-form {
    padding: 1rem;
  }

  h2 {
    font-size: 1.3rem;
  }

  input, select {
    padding: 0.6rem;
  }
}
</style>
