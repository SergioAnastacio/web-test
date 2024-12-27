<template>
    <FormKit
              type="form"
              id="loginForm"
              :actions="false"
              @submit="handleSubmit"
              #default="{ state }"
            >
            <FormKit
                type="email"
                name="email"
                label="Correo Electrónico"
                placeholder="tu@email.com"
                validation="required|email"
                :classes="{
                  outer: 'mb-4 outer',
                  label: 'form-label label',
                  input: 'form-control form-control-lg input',
                  help: 'form-text text-muted help',
                  messages: 'messages',
                  message: 'text-danger message'
                }"
                help="Ingresa tu correo electrónico registrado"
              />

              <FormKit
                type="password"
                name="password"
                label="Contraseña"
                placeholder="Contraseña"
                validation="required|length:8"
                :classes="{
                  outer: 'mb-4 outer',
                  label: 'form-label label',
                  input: 'form-control form-control-lg input',
                  help: 'form-text text-muted help',
                  messages: 'messages',
                  message: 'text-danger message'
                }"
                help="La contraseña debe tener al menos 8 caracteres"
              />

              <FormKit
                type="submit"
                label="Iniciar Sesión"
                :classes="{
                  input: 'btn btn-primary btn-lg w-100 mb-4'
                }"
              />

              <div class="text-center messages">
                <a href="#" class="text-primary message">¿Olvidaste tu contraseña?</a>
              </div>
            </FormKit>
</template>

<script setup lang="ts">
import type { LoginFormDTO } from "@/core/adapter/DTOs/LoginDTO";
import { LoginRepositoryImp } from "@/core/adapter/LoginRepositoryImp";
import router from "@/router";
import { useAuthStore } from "@/stores/useAuthStorage";
import { FormKit, reset } from "@formkit/vue";
import { inject } from "vue";
const notification = inject<Notification>("notification");
const auth = useAuthStore();
const log = new LoginRepositoryImp();
interface Notification {
	success: (message: string) => void;
	error: (message: string) => void;
	warning: (message: string) => void;
	info: (message: string) => void;
	default: (message: string) => void;
}

const handleSubmit = async (formData: LoginFormDTO) => {
	try {
		const token = await log.login(formData);
		console.log("Token recibido:", token);
		auth.setToken(token);
		reset("loginForm");
		notification?.success("¡Bienvenido!");
		router.push("/dashboard");
	} catch (error) {
		notification?.warning(
			"Error al iniciar sesión: " + (error as Error).message,
		);
	}
};
</script>

<style scoped>
.formkit-input:focus {
  border-color: var(--color-secondary);
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}
</style>