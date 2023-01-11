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

      <RouterView></RouterView> <!-- Child component is HomeView -->

      <footer class="footer">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-6">
              {{ new Date().getFullYear() }}
              © PressOne Africa.
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
  <!--start back-to-top-->
  <button onclick="topFunction()" class="btn btn-danger btn-icon" id="back-to-top">
    <i class="ri-arrow-up-line"></i>
  </button>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import SideMenu from "@/components/SideMenu.vue";
export default {
  name: "BaseHomeView",
  components : {
    Navbar,
    SideMenu
  }
};
</script>

<style scoped>

</style>