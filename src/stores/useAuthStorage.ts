import router from "@/router";
import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useAuthStore = defineStore("authStore", () => {
	const token = ref<string>(localStorage.getItem("token") || "");

	const setToken = (value: string) => {
		token.value = value;
		localStorage.setItem("token", value);
	};

	const getToken = () => {
		return token.value;
	};

	const removeToken = () => {
		token.value = "";
		localStorage.removeItem("token");
	};

	watch(token, (newToken) => {
		if (!newToken) {
			router.push("/auth/login");
		}
	});

	return { token, setToken, getToken, removeToken };
});
