// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
	{
		path: "/",
		component: () => import("@/views/pages/login/Login.vue"),
	},
	{
		path: "/dashboard",
		component: () => import("@/views/pages/dashboard/Dashboard.vue"),
	},
	{
		path: "/data",
		component: () => import("@/views/pages/datahihi/DataHihi.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
