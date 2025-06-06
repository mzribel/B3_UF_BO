<script setup lang="ts">
import { ref } from 'vue';
import LoginForm from '../components/views/LoginForm.vue';

const loginError = ref('');

const handleLoginError = (errorMessage: string) => {
  loginError.value = errorMessage;
};
</script>

<template>
  <div class="login-container">
    <h1>Système de Gestion de Chats</h1>
    <p class="login-description">Connectez-vous pour accéder au système de gestion</p>

    <LoginForm @login-error="handleLoginError" />
  </div>
</template>

<style scoped>
.login-container {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--space-xl);
  text-align: center;
}

h1 {
  color: var(--primary-color);
  margin-bottom: var(--space-md);
  font-size: var(--font-size-lg);
}

.login-description {
  color: var(--text-muted);
  margin-bottom: var(--space-xl);
  font-size: var(--font-size-md);
}

@media (max-width: 768px) {
  .login-container {
    padding: var(--space-md);
  }

  h1 {
    font-size: calc(var(--font-size-lg) * 0.9);
  }
}
</style>
