<template>
  <div class="app-menu navbar-menu">
    <!-- LOGO -->
    <div class="navbar-brand-box">
      <!-- Dark Logo-->
      <a href="#" class="logo logo-dark">
        <span class="logo-sm">
          <img src="@/assets/images/pressone-logo.png" alt="" height="22" />
        </span>
        <span class="logo-lg">
          <img src="@/assets/images/pressone-full-text-logo.png" alt="" height="22" />
        </span>
      </a>
      <!-- Light Logo-->
      <a href="#" class="logo logo-light">
        <span class="logo-sm">
          <img src="@/assets/images/pressone-logo.png" alt="" height="22" />
        </span>
        <span class="logo-lg">
          <img src="@/assets/images/pressone-full-whitetext-logo.png" alt="" height="22" />
        </span>
      </a>
      <button
        type="button"
        class="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
        id="vertical-hover"
      >
        <i class="ri-record-circle-line"></i>
      </button>
    </div>

    <div id="scrollbar">
      <div class="container-fluid">
        <div id="two-column-menu"></div>
        <ul class="navbar-nav" id="navbar-nav">
          <li class="menu-title"><span data-key="t-menu">Menu</span></li>
          <li class="nav-item">
            <router-link class="nav-link menu-link" to="/home">
              <i class="mdi mdi-home"></i>
              <span data-key="t-home"> Home </span>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link menu-link" to="/calls">
              <i class="mdi mdi-call-received"></i>
              <span data-key="t-contacts"> Calls </span>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link menu-link" to="/contacts">
              <i class="mdi mdi-contacts-outline"></i>
              <span data-key="t-contacts"> Contacts </span>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link menu-link" to="/team">
              <i class="mdi mdi-account-supervisor-outline"></i>
              <span data-key="t-team"> Team </span>
            </router-link>
          </li>
        </ul>
      </div>
      <!-- Sidebar -->
    </div>

    <div class="sidebar-background"></div>
  </div>
</template>

<script>
// import 'https://code.jquery.com/jquery-3.6.0.min.js';

export default {
  name: "SideMenu",
  mounted() {
    // $(".active-phone-selector").select2()
  }
};
</script>

<style scoped>
/*@import "https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css";*/
</style>
