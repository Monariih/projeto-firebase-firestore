import { createRouter, createWebHistory } from 'vue-router'
import LoginView from "../views/LoginView.vue";
import createView from "../views/CreateView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/create',
      name: 'create',
      component: createView
    }
  ]
})

export default router
