import { createRouter, createWebHashHistory } from 'vue-router';
import routes from './router.config';

export const router = createRouter({
	history: createWebHashHistory(), // createWebHistory => 不带#号,需后端支持  createWebHashHistory带#号
	routes,
	scrollBehavior(to, from, savedPosition) {
		return {
			el: '#app',
			top: 0,
			behavior: 'smooth',
		}
	},
});
