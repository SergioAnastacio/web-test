<template>
  <header class="bg-white shadow-sm">
    <nav class="container navbar navbar-expand-lg navbar-light">
      <div class="container-fluid">
        <LogoComponent />
        <NavMenuComponent :menuItems="menuItems" />
        <UserMenuComponent :token="auth.getToken()"
         :userName="user.user ? user.user.name : null"
          @logout="logout" />
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import LogoComponent from "./LogoComponent.vue";
import NavMenuComponent from "./NavMenuComponent.vue";
import UserMenuComponent from "./UserMenuComponent.vue";
import { useAuthStore } from "@/stores/useAuthStorage";
import { useIamStore } from "@/stores/useIamStore";
import { onMounted } from "vue";

const auth = useAuthStore();
const user = useIamStore();

const menuItems = ref([{ text: "Inicio", link: "/" }]);

onMounted(async () => {
	if (!auth.getToken()) {
	} else {
		user.fetchUser();
	}
});

const logout = () => {
	auth.removeToken();
	user.flushData();
};
</script>

<style scoped>
 
</style>