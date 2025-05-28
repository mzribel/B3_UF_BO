<script setup lang="ts">
import { ref } from 'vue';
import { useCatsStore } from '../store/cats';
import type { NewCat } from '../types';

// Props and emits
const emit = defineEmits(['cat-added']);

// Store
const catsStore = useCatsStore();

// Form data
const newCat = ref<NewCat>({
  name: '',
  birthDate: '',
  gender: '',
  coat: {
    color: '',
    pattern: ''
  }
});

// Form submission
const submitForm = async () => {
  const success = await catsStore.addCat(newCat.value);
  
  if (success) {
    // Reset form
    newCat.value = {
      name: '',
      birthDate: '',
      gender: '',
      coat: {
        color: '',
        pattern: ''
      }
    };
    
    // Emit event
    emit('cat-added');
  }
};
</script>

<template>
  <div class="cat-form">
    <h2>Add New Feline Friend</h2>
    
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Name:</label>
        <input id="name" v-model="newCat.name" required placeholder="Enter your cat's name" />
      </div>
      
      <div class="form-group">
        <label for="birthDate">Birth Date:</label>
        <input id="birthDate" type="date" v-model="newCat.birthDate" required />
      </div>
      
      <div class="form-group">
        <label for="gender">Gender:</label>
        <select id="gender" v-model="newCat.gender" required>
          <option value="">Select gender</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="coatColor">Coat Color:</label>
        <input id="coatColor" v-model="newCat.coat.color" required placeholder="e.g., Orange, Black, White" />
      </div>
      
      <div class="form-group">
        <label for="coatPattern">Coat Pattern:</label>
        <input id="coatPattern" v-model="newCat.coat.pattern" required placeholder="e.g., Tabby, Solid, Calico" />
      </div>
      
      <button type="submit" class="btn-submit">
        <span class="paw-icon">🐾</span> Add Cat
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