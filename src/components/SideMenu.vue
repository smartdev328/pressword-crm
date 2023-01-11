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
          <img src="@/assets/images/pressone-logo.png" alt="" height="17" />
        </span>
      </a>
      <!-- Light Logo-->
      <a href="#" class="logo logo-light">
        <span class="logo-sm">
          <img src="@/assets/images/pressone-full-whitetext-logo.png" alt="" height="22" />
        </span>
        <span class="logo-lg">
          <img src="@/assets/images/pressone-full-whitetext-logo.png" alt="" height="17" />
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
            <a class="nav-link menu-link" href="#">
              <i class="mdi mdi-home"></i>
              <span data-key="t-home"> Home </span>
            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link menu-link" href="#">
              <i class="mdi mdi-contacts-outline"></i>
              <span data-key="t-contacts"> Contacts </span>
            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link menu-link" href="#">
              <i class="mdi mdi-account-supervisor-outline"></i>
              <span data-key="t-team"> Team </span>
            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link menu-link" href="#">
              <i class="mdi mdi-tools"></i>
              <span data-key="t-profile-settings"> Settings </span>
            </a>
          </li>
        </ul>
      </div>
      <!-- Sidebar -->
    </div>

    <div class="sidebar-background"></div>
  </div>
</template>

<script>
export default {
  name: "SideMenu",
};
</script>

<style scoped></style>
