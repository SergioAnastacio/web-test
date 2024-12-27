<script setup lang="ts">
import FooterComponent from "@/components/footer/FooterComponent.vue";
import HeaderComponent from "@/components/header/HeaderComponent.vue";
import router from "@/router";
import { useAuthStore } from "@/stores/useAuthStorage";
import { useIamStore } from "@/stores/useIamStore";
//* Fix import routes
import { onMounted } from "vue";
const authStore = useAuthStore();
const userStore = useIamStore();

onMounted(() => {
	if (!authStore.getToken()) {
		router.push("/auth/login");
	} else {
		userStore.fetchUser();
	}
});
</script>
<template>
  <div>
    <HeaderComponent />
    <router-view />
    <FooterComponent />
  </div>
</template>

