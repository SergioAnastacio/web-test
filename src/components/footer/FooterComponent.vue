<template>
  <footer class="bg-light mt-5 py-3">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-4">
          <span class="text-muted">© {{ year }} Digitalife. Todos los derechos reservados.</span>
        </div>
        <div class="col-md-4 text-center">
          <img src="/logo1.png" alt="Logo" height="30">
        </div>
        <div class="col-md-4 text-end">
          <span class="text-muted">dev@sergioanastacio.icu</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const date = new Date();
const year = date.getFullYear();
</script>