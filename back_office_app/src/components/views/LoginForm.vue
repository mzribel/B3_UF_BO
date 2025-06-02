<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import Form from '../../design-system/patterns/Form.vue';
import Input from '../../design-system/components/Input.vue';
import Card from '../../design-system/components/Card.vue';

const emit = defineEmits(['login-success', 'login-error']);

const router = useRouter();
const authStore = useAuthStore();
const error = ref('');
const loading = ref(false);

const credentials = ref({
  email: '',
  password: ''
});

const handleSubmit = async () => {
  loading.value = true;
  error.value = '';

  try {
    const success = await authStore.login(credentials.value);

    if (success) {
      emit('login-success');
      await router.push('/');
    } else {
      error.value = 'Échec de connexion. Veuillez vérifier vos identifiants et réessayer.';
      emit('login-error', error.value);
    }
  } catch (err) {
    console.error('Error logging in:', err);
    error.value = 'Échec de connexion. Veuillez vérifier vos identifiants et réessayer.';
    emit('login-error', error.value);
  } finally {
    loading.value = false;
  }
};

const handleCancel = () => {
  credentials.value.email = '';
  credentials.value.password = '';
};
</script>

<template>
  <Card class="login-form" variant="primary" shadow="md" padding="lg">
    <template #header>
      <h2>Connexion</h2>
    </template>

    <div v-if="error" class="bg-error error-message">
      {{ error }}
    </div>

    <Form 
      :loading="loading" 
      submitLabel="Se connecter" 
      cancelLabel="Réinitialiser" 
      @submit="handleSubmit"
      @cancel="handleCancel"
      fullWidth
    >
      <Input 
        v-model="credentials.email" 
        type="email"
        label="Email"
        placeholder="Entrez votre adresse email"
        required
        fullWidth
      />
      
      <Input 
        v-model="credentials.password" 
        type="password"
        label="Mot de passe"
        placeholder="Entrez votre mot de passe"
        required
        fullWidth
      />
    </Form>
  </Card>
</template>

<style scoped>
.login-form {
  max-width: 500px;
  margin: 0 auto;
}

h2 {
  color: var(--secondary-color);
  text-align: center;
  margin: 0;
}

.error-message {
  margin-bottom: var(--space-md);
  padding: var(--space-sm);
  border-radius: var(--radius-sm);
}
</style>