<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateTo = (route: string) => {
  router.push(route);
};
</script>

<template>
  <div class="home">
    <h1>Cat Management System</h1>
    <div class="card-container">
      <div class="card" @click="navigateTo('/cats')">
        <h2>Cats</h2>
        <p>Manage your cats</p>
      </div>
      <div class="card" @click="navigateTo('/users')">
        <h2>Users</h2>
        <p>Manage users</p>
      </div>
      <div class="card" @click="navigateTo('/register')">
        <h2>Register</h2>
        <p>Register a new user</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

h1 {
  margin-bottom: 2rem;
  color: #42b883;
}

.card-container {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.card {
  background-color: #f8f8f8;
  border-radius: 8px;
  padding: 1.5rem;
  width: 250px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

h2 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

p {
  color: #666;
}
</style>