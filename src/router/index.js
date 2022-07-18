import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/repos',
      name: 'repos',
      component: () => import('../views/ReposView.vue'),
    },
  ],
  linkActiveClass: 'active',
});

export default router;
