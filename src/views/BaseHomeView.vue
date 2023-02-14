<template>
  <div id="layout-wrapper">
    <header id="page-topbar" v-if="isAuthenticated">
      <div class="layout-width">
        <Navbar/> <!-- App to Navbar-->
      </div>
    </header>
    <SideMenu v-if="isAuthenticated"/> <!-- Left Sidebar -->

    <div class="vertical-overlay" v-if="isAuthenticated"></div> <!-- Vertical Overlay-->

    <div :class="[ isAuthenticated ? 'main-content' : '' ]">
      <ActiveCall />
      <RouterView></RouterView> <!-- Child component is HomeView -->

      <footer class="footer" v-if="isAuthenticated">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-6">
              {{ new Date().getFullYear() }}
              © PressOne Africa. Crafted with <i class="mdi mdi-coffee text-black white"></i>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>


<script setup>
import { useAuthStore } from '@/stores';
import Navbar from "@/components/Navbar.vue";
import SideMenu from "@/components/SideMenu.vue";
// import {InitAppJS} from "@/assets/js/app"
import ActiveCall from "@/components/Shared/ActiveCall.vue";

const { isAuthenticated } = useAuthStore()
</script>

<style scoped>

</style>
<script> export default { name: 'BaseHomeView' } </script>