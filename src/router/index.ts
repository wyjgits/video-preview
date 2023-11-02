import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    name: 'Home',
    path: '/',
    component: () => import('@/views/videoPlayer/index.vue'),
  },
  {
    name: 'videoWall',
    path: '/videoWall',
    component: () => import('@/views/videoWall/index.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
