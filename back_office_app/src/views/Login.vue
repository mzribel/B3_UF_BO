<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();
const error = ref('');
const loading = ref(false);

// Form data for login
const credentials = ref({
  email: '',
  password: ''
});

// Login user
const login = async () => {
  loading.value = true;
  error.value = '';

  try {
    const success = await authStore.login(credentials.value);

    if (success) {
      // Redirect to home page (router guard will handle this automatically)
      await router.push('/');
    } else {
      error.value = 'Failed to login. Please check your credentials and try again.';
    }
  } catch (err) {
    console.error('Error logging in:', err);
    error.value = 'Failed to login. Please check your credentials and try again.';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="login-container">
    <h1>Login</h1>

    <!-- Error message -->
    <div v-if="error" class="error-message">{{ error }}</div>

    <!-- Login form -->
    <div class="form-container">
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email:</label>
          <input id="email" type="email" v-model="credentials.email" required />
        </div>

        <div class="form-group">
          <label for="password">Password:</label>
          <input id="password" type="password" v-model="credentials.password" required />
        </div>

        <button type="submit" class="btn-submit" :disabled="loading">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  color: #42b883;
  margin-bottom: 2rem;
  text-align: center;
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

input {
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
