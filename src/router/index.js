import { createRouter, createWebHistory } from 'vue-router'
import SignInView from "@/views/SignInView.vue";
import HomeView from "@/views/HomeView.vue";
import BaseHomeView from "@/views/BaseHomeView.vue";

import { useAuthStore, useAlertStore } from '@/stores';
import ContactsView from "@/views/ContactsView.vue";
import CallsView from "@/views/CallsView.vue";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: BaseHomeView,
      children : [
        {
          path: '/',
          component: HomeView
        },
        {
          path: '/contacts',
          component: ContactsView
        },
        {
          path: '/calls',
          component: CallsView
        }
      ]
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignInView
    },
    // catch all redirect to home page
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ]
})

router.beforeEach(async (to) => {
  // clear alert on route change
  const alertStore = useAlertStore();
  alertStore.clear();

  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/sign-in'];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();

  if (authRequired && !authStore.isAuthenticated()) {
    authStore.returnUrl = to.fullPath;
    return '/sign-in';
  }
});
