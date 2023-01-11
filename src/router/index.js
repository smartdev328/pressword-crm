import { createRouter, createWebHistory } from 'vue-router'
import SignInView from "@/views/SignInView.vue";
import HomeView from "@/views/HomeView.vue";
import BaseHomeView from "@/views/BaseHomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BaseHomeView,
      children : [
        {
          path: '/',
          component: HomeView
        }
      ]
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignInView
    }
  ]
})

export default router
