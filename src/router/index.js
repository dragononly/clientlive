import { createRouter, createWebHashHistory } from 'vue-router';
import routes from './router.config';
export const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return {
            el: '#app',
            top: 0,
            behavior: 'smooth',
        };
    },
});
//# sourceMappingURL=index.js.map