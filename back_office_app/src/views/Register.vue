<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();
const error = ref('');
const success = ref('');
const loading = ref(false);

// Form data for user registration
const userData = ref({
  email: '',
  password: '',
  displayName: ''
});

// Register a new user
const register = async () => {
  loading.value = true;
  error.value = '';
  success.value = '';

  try {
    const registerSuccess = await authStore.register(userData.value);

    if (registerSuccess) {
      success.value = 'Registration successful!';

      // Reset form
      userData.value = {
        email: '',
        password: '',
        displayName: ''
      };

      // Redirect to login page after a short delay
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } else {
      error.value = 'Failed to register user. Please try again.';
    }
  } catch (err) {
    console.error('Error registering user:', err);
    error.value = 'Failed to register user. Please try again.';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="register-container">
    <h1>Register New User</h1>

    <!-- Success message -->
    <div v-if="success" class="success-message">{{ success }}</div>

    <!-- Error message -->
    <div v-if="error" class="error-message">{{ error }}</div>

    <!-- Registration form -->
    <div class="form-container">
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="email">Email:</label>
          <input id="email" type="email" v-model="userData.email" required />
        </div>

        <div class="form-group">
          <label for="password">Password:</label>
          <input id="password" type="password" v-model="userData.password" required />
        </div>

        <div class="form-group">
          <label for="displayName">Display Name:</label>
          <input id="displayName" v-model="userData.displayName" placeholder="Optional" />
        </div>

        <button type="submit" class="btn-submit" :disabled="loading">
          {{ loading ? 'Registering...' : 'Register' }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.register-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  color: #42b883;
  margin-bottom: 2rem;
  text-align: center;
}

.success-message {
  background-color: #e8f5e9;
  color: #2e7d32;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.error-message {
  background-color: #ffebee;
  color: #c62828;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.form-container {
  background-color: #f8f8f8;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

input, select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.btn-submit {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
  width: 100%;
}

.btn-submit:hover:not(:disabled) {
  background-color: #3aa876;
}

.btn-submit:disabled {
  background-color: #a0d9c1;
  cursor: not-allowed;
}
</style>
