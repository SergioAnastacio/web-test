<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div class="container mt-2 app-container">
    <RouterView />
  </div>
</template>

<style scoped>
.app-container {
  background-color: var(--color-light);
  color: var(--color-dark);
}

h1 {
  color: var(--color-primary);
}

button {
  background-color: var(--color-secondary);
  color: var(--color-light);
}

button:hover {
  background-color: var(--color-accent);
  color: var(--color-light);
}
</style>
