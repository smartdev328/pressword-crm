import { createRouter, createWebHistory } from 'vue-router'
import SignInView from "@/views/SignInView.vue";
import SignUpView from "@/views/SignUpView.vue";
import HomeView from "@/views/HomeView.vue";
import BaseHomeView from "@/views/BaseHomeView.vue";

import { useAuthStore, useAlertStore } from '@/stores';
import ContactsView from "@/views/ContactsView.vue";
import CallsView from "@/views/CallsView.vue";
import TeamView from "@/views/TeamView.vue";
import PricingPlanView from "@/views/PricingPlanView.vue";
// import CompleteSignUpView from "@/views/CompleteSignUpView.vue";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'main',
      component: BaseHomeView,
      redirect: '/home',
      children : [
        {
          path: 'home',
          component: HomeView
        },
        {
          path: 'contacts',
          component: ContactsView
        },
        {
          path: 'calls',
          component: CallsView
        },
        {
          path: 'team',
          component: TeamView
        },
        
      ]
    },
    // {
    //   path: '/complete-signup',
    //   component: CompleteSignUpView
    // },
    {
      path: '/pricing',
      component: PricingPlanView
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignInView
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUpView
    },
    // catch all redirect to home page
    { path: '/:pathMatch(.*)*', redirect: '/home' }
  ]
})

router.beforeEach(async (to) => {
  // clear alert on route change
  const alertStore = useAlertStore();
  alertStore.clear();

  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/sign-in', '/pricing', '/sign-up', '/complete-signup'];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();

  if (authRequired && !authStore.isAuthenticated()) {
    authStore.returnUrl = to.fullPath;
    return '/sign-in';
  }
});
