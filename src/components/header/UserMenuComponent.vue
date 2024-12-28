<template>
  <div v-if="token" class="d-flex align-items-center">
    <i class="bi bi-person m-3">
      <span class="m-1">{{ userName ? userName : 'Cargando...' }}</span>
    </i>
    <button @click="handleLogout" class="btn btn-outline-primary">Cerrar sesión</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  token: string | null;
  userName: string | null;
}>();

const emit = defineEmits(['logout']);

const handleLogout = () => {
  emit('logout');
};
</script>

<style scoped>
</style>