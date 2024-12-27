<template>
    <div>
      <HeaderComponent />
      <router-view />
      <FooterComponent />
    </div>
</template>

<script setup lang="ts">
import FooterComponent from "@/components/footer/FooterComponent.vue";
import HeaderComponent from "@/components/header/HeaderComponent.vue";
import router from "@/router";
//TODO: Fix import routes
</script>

<style scoped>
</style>