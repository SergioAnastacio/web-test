<template>
    <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow-lg border-0">
          <div class="card-body p-5">
            <h2 class="text-center mb-4 text-primary">Iniciar Sesión</h2>
            <LoginFormComponent />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginFormComponent from "@/components/auth/LoginFormComponent.vue";
</script>

<style scoped>
.formkit-input:focus {
  border-color: var(--color-secondary);
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}
</style>