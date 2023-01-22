<template>
  <div id="layout-wrapper">
    <header id="page-topbar">
      <div class="layout-width">
        <Navbar/> <!-- App to Navbar-->
      </div>
    </header>
    <SideMenu/> <!-- Left Sidebar -->

    <div class="vertical-overlay"></div> <!-- Vertical Overlay-->

    <div class="main-content">
      <ActiveCall/>
      <RouterView></RouterView> <!-- Child component is HomeView -->

      <footer class="footer">
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
  <!--start back-to-top-->
  <button @click=topFunction class="btn btn-danger btn-icon" id="back-to-top">
    <i class="ri-arrow-up-line"></i>
  </button>
</template>


<script>
import Navbar from "@/components/Navbar.vue";
import SideMenu from "@/components/SideMenu.vue";
import {InitAppJS} from "@/assets/js/app"
import ActiveCall from "@/components/Shared/ActiveCall.vue";

export default {
  name: "BaseHomeView",
  components : {
    Navbar,
    SideMenu,
    ActiveCall
  },
  methods : {
    topFunction() {
      (document.body.scrollTop = 0); (document.documentElement.scrollTop = 0);
    }
  },
  mounted() {
    InitAppJS()
  }
};
</script>

<style scoped>

</style>