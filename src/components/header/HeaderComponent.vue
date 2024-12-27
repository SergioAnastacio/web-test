<template>
  <header class="bg-white shadow-sm">
    <nav class="container navbar navbar-expand-lg navbar-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img src="/logo1.png" alt="Logo" height="40">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            
            <li class="nav-item">
              <a class="nav-link" href="#">Productos</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Soporte</a>
            </li>
          </ul>

        <div v-if="auth.getToken()" class="d-flex align-items-center">
            <i class="bi bi-person m-3">
              <span class="m-1">{{ user.user ? user.user.name : 'Cargando...' }}</span>
            </i>
            <button @click="logout" class="btn btn-outline-primary">Cerrar sesión</button>
      </div>
      </div>
      </div>
      
    </nav>
  </header>
</template>

<script setup lang="ts">
import router from '@/router';
import { useAuthStore } from '@/stores/useAuthStorage';
import { useIamStore } from '@/stores/useIamStore';
import { onMounted } from 'vue';

const auth = useAuthStore();
const user= useIamStore();

onMounted(() => {
  if (!auth.getToken()) {
  }else{
    user.fetchUser();
  }
});

const logout = () => {
  auth.removeToken();
  user.flushData();
}

</script>

<style scoped>
 
</style>