<script setup lang="ts">
import { ref } from 'vue';
import Button from '../design-system/components/Button.vue';
import Input from '../design-system/components/Input.vue';
import Card from '../design-system/components/Card.vue';
import Form from '../design-system/patterns/Form.vue';
import Modal from '../design-system/patterns/Modal.vue';

const username = ref('');
const password = ref('');
const isLoading = ref(false);
const isModalOpen = ref(false);

const handleSubmit = () => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    alert(`Form submitted with username: ${username.value}`);
  }, 1500);
};

const handleCancel = () => {
  username.value = '';
  password.value = '';
};

const openModal = () => {
  isModalOpen.value = true;
};
</script>

<template>
  <div class="design-system-test">
    <h1>Design System Test Page</h1>
    
    <p>This page demonstrates the use of design system components in a real application view.</p>
    
    <div class="test-section">
      <h2>Card with Form</h2>
      
      <Card variant="primary" shadow="md" padding="lg">
        <template #header>
          <h3>Login Form</h3>
        </template>
        
        <Form 
          :loading="isLoading" 
          submitLabel="Login" 
          cancelLabel="Reset"
          @submit="handleSubmit"
          @cancel="handleCancel"
          fullWidth
        >
          <Input 
            v-model="username" 
            label="Username" 
            placeholder="Enter your username"
            required
            fullWidth
          />
          
          <Input 
            v-model="password" 
            type="password" 
            label="Password" 
            placeholder="Enter your password"
            required
            fullWidth
          />
        </Form>
        
        <template #footer>
          <p>Need help? Contact support.</p>
        </template>
      </Card>
    </div>
    
    <div class="test-section">
      <h2>Modal Example</h2>
      
      <Button @click="openModal" variant="secondary">Open Modal</Button>
      
      <Modal v-model="isModalOpen" title="Test Modal">
        <p>This is a test modal using the design system components.</p>
        <p>You can close it by clicking the X, pressing ESC, or clicking outside.</p>
        
        <template #footer>
          <Button variant="secondary" @click="isModalOpen = false">Cancel</Button>
          <Button variant="primary" @click="isModalOpen = false">Confirm</Button>
        </template>
      </Modal>
    </div>
  </div>
</template>

<style scoped>
.design-system-test {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--space-xl);
}

h1 {
  color: var(--primary-color);
  margin-bottom: var(--space-lg);
}

h2 {
  color: var(--secondary-color);
  margin-bottom: var(--space-md);
  border-bottom: 1px solid var(--border-light);
  padding-bottom: var(--space-xs);
}

.test-section {
  margin-bottom: var(--space-xl);
}
</style>