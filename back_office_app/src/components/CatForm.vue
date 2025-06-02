<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useCatsStore } from '../stores/cats';
import { useLoofCharacteristicsStore } from '../stores/loofCharacteristics';
import type { NewCat } from '../types';
import { useRoute, useRouter } from 'vue-router';
import Card from '../design-system/components/Card.vue';
import Button from '../design-system/components/Button.vue';
import Input from '../design-system/components/Input.vue';

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
  <Card class="cat-form" variant="primary" shadow="md" padding="lg">
    <template #header>
      <h2>Ajouter un nouveau chat</h2>
    </template>

    <div v-if="loofError" class="bg-error error-message">
      <span class="error-icon">⚠️</span> {{ loofError }}
      <Button variant="danger" size="sm" @click="loofStore.fetchAllCharacteristics">Réessayer</Button>
    </div>

    <div v-if="isLoading" class="loading">
      <div class="loading-spinner"></div>
      <p>Chargement des caractéristiques du chat...</p>
    </div>

    <form @submit.prevent="submitForm" v-else>
      <div class="form-group">
        <Input 
          v-model="newCat.name" 
          label="Nom :"
          placeholder="Entrez le nom de votre chat"
          :error="formErrors.name"
          required
          fullWidth
        />
      </div>

      <div class="form-group">
        <Input 
          v-model="newCat.birthDate" 
          type="date"
          label="Date de Naissance :"
          :error="formErrors.birthDate"
          required
          fullWidth
        />
      </div>

      <div class="form-group">
        <label for="gender">Genre :</label>
        <select id="gender" v-model="newCat.gender" required class="ds-select">
          <option value="">Sélectionnez le genre</option>
          <option value="MALE">Mâle</option>
          <option value="FEMALE">Femelle</option>
        </select>
        <div v-if="formErrors.gender" class="error-text">{{ formErrors.gender }}</div>
      </div>

      <div class="form-group">
        <label for="breed">Race :</label>
        <select id="breed" v-model="selectedBreedId" class="ds-select">
          <option value="">Sélectionnez la race (optionnel)</option>
          <option v-for="breed in breeds" :key="breed.id" :value="breed.id">
            {{ breed.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="coatColor">Couleur du Pelage :</label>
        <select id="coatColor" v-model="selectedColorId" required class="ds-select">
          <option value="">Sélectionnez la couleur du pelage</option>
          <option v-for="color in coatColors" :key="color.id" :value="color.id">
            {{ color.name }}
          </option>
        </select>
        <div v-if="formErrors.coatColor" class="error-text">{{ formErrors.coatColor }}</div>
      </div>

      <div class="form-group">
        <label for="coatPattern">Motif du Pelage :</label>
        <select id="coatPattern" v-model="selectedPatternId" required class="ds-select">
          <option value="">Sélectionnez le motif du pelage</option>
          <option v-for="pattern in coatPatterns" :key="pattern.id" :value="pattern.id">
            {{ pattern.name }}
          </option>
        </select>
        <div v-if="formErrors.coatPattern" class="error-text">{{ formErrors.coatPattern }}</div>
      </div>

      <div class="form-group">
        <label for="coatEffect">Effet du Pelage (optionnel) :</label>
        <select id="coatEffect" v-model="selectedEffectId" class="ds-select">
          <option value="">Sélectionnez l'effet du pelage (optionnel)</option>
          <option v-for="effect in coatEffects" :key="effect.id" :value="effect.id">
            {{ effect.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="coatWhiteMarking">Marquage Blanc (optionnel) :</label>
        <select id="coatWhiteMarking" v-model="selectedWhiteMarkingId" class="ds-select">
          <option value="">Sélectionnez le marquage blanc (optionnel)</option>
          <option v-for="marking in coatWhiteMarkings" :key="marking.id" :value="marking.id">
            {{ marking.name }}
          </option>
        </select>
      </div>

      <div v-if="formErrors.general" class="bg-error error-message">
        {{ formErrors.general }}
      </div>

      <Button type="submit" variant="primary" :disabled="isLoading" fullWidth>
        <span class="paw-icon">🐾</span> Ajouter un Chat
      </Button>
    </form>
  </Card>
</template>

<style scoped>
.cat-form {
  margin-bottom: var(--space-xl);
}

.error-message {
  margin-bottom: var(--space-md);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.error-icon {
  margin-right: var(--space-xs);
  font-size: 1.2rem;
}

.loading {
  text-align: center;
  padding: var(--space-xl);
  color: var(--text-highlight);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loading-spinner {
  border: 4px solid rgba(151, 200, 235, 0.3);
  border-radius: 50%;
  border-top: 4px solid var(--text-highlight);
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: var(--space-md);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-text {
  color: var(--error);
  font-size: var(--font-size-sm);
  margin-top: var(--space-xs);
}

h2 {
  color: var(--secondary-color);
  margin: 0;
  text-align: center;
  font-size: var(--font-size-lg);
}

.form-group {
  margin-bottom: var(--space-md);
}

label {
  display: block;
  margin-bottom: var(--space-xs);
  font-weight: var(--font-weight-medium);
  color: var(--text-dark);
}

.ds-select {
  width: 100%;
  padding: var(--space-sm);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  background-color: var(--bg-light);
  color: var(--text-dark);
  font-size: var(--font-size-md);
  font-family: var(--font-family);
  transition: border-color 0.2s, box-shadow 0.2s;
}

.ds-select:focus {
  outline: none;
  border-color: var(--secondary-color);
  box-shadow: var(--shadow-focus);
}

.paw-icon {
  margin-right: var(--space-xs);
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  h2 {
    font-size: calc(var(--font-size-lg) * 0.85);
  }
}
</style>
