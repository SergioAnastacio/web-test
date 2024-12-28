<template>
  <div class="" id="navbarNav">
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li v-for="item in menuItems" :key="item.text" class="nav-item">
        <a class="nav-link" :href="item.link">{{ item.text }}</a>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">

interface MenuItem {
  text: string;
  link: string;
}
const props = defineProps<{
  menuItems: MenuItem[];
}>();
</script>