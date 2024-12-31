<template>
    <div class="logo-container">
        <a href="/" class="logo-button">
            <img src="/logo1.png" alt="Logo" class="logo-image" />
        </a>
        
    </div>
</template>

<script setup lang="ts">
import router from "@/router";
const toHome = () => {
	router.push({ name: "Home" });
};
</script>

<style scoped>
.logo-button{
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
}
.logo-image{
   display: block;
}
</style>