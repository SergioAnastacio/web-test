import { createRouter, createWebHistory } from "vue-router";

const routes = [
	{
		path: "/",
		name: "home",
		redirect: "/dashboard",
		component: () => import("../views/dashboard/DashboardLayout.vue"),
		children: [
			{
				path: "/dashboard",
				name: "dashboard",
				component: () => import("../views/dashboard/HomeView.vue"),
			},
		],
		meta: { requiresAuth: true },
	},
	{
		path: "/auth",
		name: "auth",
		redirect: "/auth/login",
		component: () => import("../views/auth/AuthLayout.vue"),
		children: [
			{
				path: "login",
				name: "login",
				component: () => import("../views/auth/LoginView.vue"),
			},
		],
	},
	//* Catch all routes that don't exist and redirect to home page
	//TODO : create a 404 page and redirect instead of redirecting to home page
	{
		path: "/:pathMatch(.*)*",
		redirect: "/",
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
