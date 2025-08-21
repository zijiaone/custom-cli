import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '@/views/Home.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/About.vue'),
    },
  ],
});

export default router;
