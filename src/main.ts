import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { useToast } from "vue-toast-notification";
import { createAutoAnimatePlugin } from "@formkit/addons";
import { plugin, defaultConfig } from "@formkit/vue";

import App from "./App.vue";
import router from "./router";
import "vue-toast-notification/dist/theme-bootstrap.css";

import { API_URL } from "./config";

const $notification = useToast({
	position: "top-right",
	duration: 2000,
});
const app = createApp(App);
app.use(createPinia());
app.provide("config", { API_URL });
app.provide("notification", $notification);
app.use(
	plugin,
	defaultConfig({
		plugins: [
			createAutoAnimatePlugin(
				{
					duration: 250,
					easing: "ease-in-out",
				},
				{
					global: ["outer", "inner"],
					form: ["form"],
					repeater: ["items"],
				},
			),
		],
	}),
);
app.use(router);
app.mount("#app");
