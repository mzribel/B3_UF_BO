<script setup lang="ts">
import { onMounted } from 'vue';
import { useUsersStore } from '../stores/users';
import UsersList from '../components/UsersList.vue';
import PageLayout from "../components/views/PageLayout.vue";

const usersStore = useUsersStore();

onMounted(() => {
  usersStore.loadUsers();
});
</script>

<template>
  <PageLayout title="Gestion des Utilisateurs" description="Gérez les utilisateurs de l'application, consultez leurs informations et modifiez leurs droits d'administration.">
    <UsersList />
  </PageLayout>
</template>

<style scoped>

</style>
