<script setup lang="ts">
import { ref } from 'vue';
import Button from '../components/Button.vue';
import Input from '../components/Input.vue';
import Card from '../components/Card.vue';
import Form from '../patterns/Form.vue';
import Modal from '../patterns/Modal.vue';

// State for examples
const inputValue = ref('');
const passwordValue = ref('');
const errorInputValue = ref('');
const isModalOpen = ref(false);
const isFormLoading = ref(false);

// Form submit handler
const handleFormSubmit = () => {
  isFormLoading.value = true;
  // Simulate API call
  setTimeout(() => {
    isFormLoading.value = false;
    alert('Form submitted successfully!');
  }, 1500);
};

// Form cancel handler
const handleFormCancel = () => {
  alert('Form cancelled!');
};
</script>

<template>
  <div class="showcase">
    <h1>Design System Showcase</h1>
    
    <section class="showcase-section">
      <h2>Buttons</h2>
      
      <div class="showcase-row">
        <h3>Variants</h3>
        <div class="showcase-items">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="success">Success</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="info">Info</Button>
          <Button variant="light">Light</Button>
          <Button variant="dark">Dark</Button>
        </div>
      </div>
      
      <div class="showcase-row">
        <h3>Sizes</h3>
        <div class="showcase-items">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>
      
      <div class="showcase-row">
        <h3>States</h3>
        <div class="showcase-items">
          <Button>Normal</Button>
          <Button disabled>Disabled</Button>
          <Button fullWidth>Full Width</Button>
        </div>
      </div>
    </section>
    
    <section class="showcase-section">
      <h2>Inputs</h2>
      
      <div class="showcase-row">
        <h3>Basic</h3>
        <div class="showcase-items">
          <Input 
            v-model="inputValue" 
            label="Username" 
            placeholder="Enter your username"
          />
        </div>
      </div>
      
      <div class="showcase-row">
        <h3>Types</h3>
        <div class="showcase-items">
          <Input 
            v-model="passwordValue" 
            type="password" 
            label="Password" 
            placeholder="Enter your password"
          />
          <Input 
            type="email" 
            label="Email" 
            placeholder="Enter your email"
          />
          <Input 
            type="number" 
            label="Age" 
            placeholder="Enter your age"
          />
        </div>
      </div>
      
      <div class="showcase-row">
        <h3>States</h3>
        <div class="showcase-items">
          <Input 
            label="Required" 
            placeholder="This field is required" 
            required
          />
          <Input 
            label="Disabled" 
            placeholder="This field is disabled" 
            disabled
          />
          <Input 
            v-model="errorInputValue" 
            label="Error" 
            placeholder="This field has an error" 
            error="This field is required"
          />
          <Input 
            label="Help Text" 
            placeholder="This field has help text" 
            helpText="This is some helpful information"
          />
        </div>
      </div>
      
      <div class="showcase-row">
        <h3>Sizes</h3>
        <div class="showcase-items">
          <Input 
            size="sm" 
            label="Small" 
            placeholder="Small input"
          />
          <Input 
            size="md" 
            label="Medium" 
            placeholder="Medium input"
          />
          <Input 
            size="lg" 
            label="Large" 
            placeholder="Large input"
          />
        </div>
      </div>
    </section>
    
    <section class="showcase-section">
      <h2>Cards</h2>
      
      <div class="showcase-row">
        <h3>Variants</h3>
        <div class="showcase-items card-items">
          <Card>
            <template #header>Default Card</template>
            This is a default card with header and footer.
            <template #footer>Footer</template>
          </Card>
          
          <Card variant="primary">
            <template #header>Primary Card</template>
            This is a primary card with header and footer.
            <template #footer>Footer</template>
          </Card>
          
          <Card variant="secondary">
            <template #header>Secondary Card</template>
            This is a secondary card with header and footer.
            <template #footer>Footer</template>
          </Card>
        </div>
      </div>
      
      <div class="showcase-row">
        <h3>Shadow & Padding</h3>
        <div class="showcase-items card-items">
          <Card shadow="sm" padding="sm">
            <template #header>Small Shadow & Padding</template>
            This card has small shadow and padding.
          </Card>
          
          <Card shadow="md" padding="md">
            <template #header>Medium Shadow & Padding</template>
            This card has medium shadow and padding.
          </Card>
          
          <Card shadow="lg" padding="lg">
            <template #header>Large Shadow & Padding</template>
            This card has large shadow and padding.
          </Card>
        </div>
      </div>
    </section>
    
    <section class="showcase-section">
      <h2>Forms</h2>
      
      <div class="showcase-row">
        <h3>Basic Form</h3>
        <div class="showcase-items">
          <Form 
            :loading="isFormLoading" 
            submitLabel="Submit Form" 
            cancelLabel="Cancel Form"
            @submit="handleFormSubmit"
            @cancel="handleFormCancel"
          >
            <Input 
              v-model="inputValue" 
              label="Username" 
              placeholder="Enter your username"
              required
            />
            <Input 
              v-model="passwordValue" 
              type="password" 
              label="Password" 
              placeholder="Enter your password"
              required
            />
          </Form>
        </div>
      </div>
      
      <div class="showcase-row">
        <h3>Inline Form</h3>
        <div class="showcase-items">
          <Form 
            inline
            submitLabel="Search"
            cancelLabel="Reset"
            @submit="handleFormSubmit"
            @cancel="handleFormCancel"
          >
            <Input 
              placeholder="Search..."
            />
          </Form>
        </div>
      </div>
    </section>
    
    <section class="showcase-section">
      <h2>Modals</h2>
      
      <div class="showcase-row">
        <h3>Basic Modal</h3>
        <div class="showcase-items">
          <Button @click="isModalOpen = true">Open Modal</Button>
          
          <Modal 
            v-model="isModalOpen" 
            title="Example Modal"
          >
            <p>This is an example modal dialog.</p>
            <p>You can close it by clicking the X, pressing ESC, or clicking outside.</p>
            
            <template #footer>
              <Button variant="secondary" @click="isModalOpen = false">Cancel</Button>
              <Button variant="primary" @click="isModalOpen = false">Confirm</Button>
            </template>
          </Modal>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.showcase {
  padding: var(--space-xl);
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  font-size: calc(var(--font-size-lg) * 1.5);
  margin-bottom: var(--space-xl);
  color: var(--text-dark);
  text-align: center;
}

.showcase-section {
  margin-bottom: var(--space-xl);
  padding: var(--space-lg);
  background-color: var(--bg-light);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.showcase-section h2 {
  font-size: var(--font-size-lg);
  margin-bottom: var(--space-lg);
  color: var(--primary-color);
  border-bottom: 1px solid var(--border-light);
  padding-bottom: var(--space-sm);
}

.showcase-row {
  margin-bottom: var(--space-lg);
}

.showcase-row h3 {
  font-size: var(--font-size-md);
  margin-bottom: var(--space-md);
  color: var(--secondary-color);
}

.showcase-items {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
  align-items: flex-start;
}

.card-items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-md);
}

@media (max-width: 768px) {
  .showcase {
    padding: var(--space-md);
  }
  
  .showcase-section {
    padding: var(--space-md);
  }
  
  .card-items {
    grid-template-columns: 1fr;
  }
}
</style>