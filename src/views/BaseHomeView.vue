<template>
  <div id="layout-wrapper">
    <header id="page-topbar">
      <div class="layout-width">
        <Navbar/>
      </div>
    </header>
    <!-- ========== App Menu ========== -->
    <SideMenu/>
    <!-- Left Sidebar End -->
    <!-- Vertical Overlay-->
    <div class="vertical-overlay"></div>

    <!-- ============================================================== -->
    <!-- Start right Content here -->
    <!-- ============================================================== -->
    <div class="main-content">

      <RouterView></RouterView>

      <footer class="footer">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-6">
              {{ new Date().getFullYear() }}
              © PressOne.
            </div>
          </div>
        </div>
      </footer>
    </div>
    <!-- end main content-->

  </div>
  <!-- END layout-wrapper -->


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