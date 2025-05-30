<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateTo = (path: string) => {
  router.push(path);
};
</script>
<template>
  <div class="loof-characteristics-view">
    <h1>LOOF Characteristics Management</h1>
    <p class="description">
      Manage LOOF characteristics for cats, including breeds, coat colors, patterns, effects, white markings, and poly types.
    </p>
    
    <div class="characteristics-grid">
      <div class="characteristic-card" @click="navigateTo('/loof/breeds')">
        <h2>Breeds</h2>
        <p>Manage cat breeds recognized by LOOF</p>
        <div class="card-icon">🐱</div>
      </div>
      
      <div class="characteristic-card" @click="navigateTo('/loof/coat-colors')">
        <h2>Coat Colors</h2>
        <p>Manage coat colors for cats</p>
        <div class="card-icon">🎨</div>
      </div>
      
      <div class="characteristic-card" @click="navigateTo('/loof/coat-patterns')">
        <h2>Coat Patterns</h2>
        <p>Manage coat patterns for cats</p>
        <div class="card-icon">🔄</div>
      </div>
      
      <div class="characteristic-card" @click="navigateTo('/loof/coat-effects')">
        <h2>Coat Effects</h2>
        <p>Manage coat effects for cats</p>
        <div class="card-icon">✨</div>
      </div>
      
      <div class="characteristic-card" @click="navigateTo('/loof/coat-white-markings')">
        <h2>White Markings</h2>
        <p>Manage coat white markings for cats</p>
        <div class="card-icon">⚪</div>
      </div>
      
      <div class="characteristic-card" @click="navigateTo('/loof/poly-types')">
        <h2>Poly Types</h2>
        <p>Manage poly types for cats</p>
        <div class="card-icon">👣</div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.loof-characteristics-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

h1 {
  color: #6c5ce7;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 2rem;
}

.description {
  text-align: center;
  color: #636e72;
  margin-bottom: 2rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.characteristics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.characteristic-card {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 2px solid #e9ecef;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.characteristic-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  border-color: #6c5ce7;
}

.characteristic-card h2 {
  color: #6c5ce7;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}

.characteristic-card p {
  color: #636e72;
  margin-bottom: 1rem;
}

.card-icon {
  font-size: 3rem;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .loof-characteristics-view {
    padding: 1rem;
  }
  
  h1 {
    font-size: 1.5rem;
  }
  
  .characteristics-grid {
    grid-template-columns: 1fr;
  }
}
</style>