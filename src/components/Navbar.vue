<script setup>
import { storeToRefs } from 'pinia';

import { useUsersStore } from '@/stores';

const userStore = useUsersStore();
const { users, user } = storeToRefs(userStore);

</script>
<template>
  <div class="navbar-header">
    <div class="d-flex">
      <button
        type="button"
        class="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger shadow-none"
        id="topnav-hamburger-icon"
      >
        <span class="hamburger-icon">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      <!-- App Search-->
      <form class="app-search d-none d-md-block">
        <div class="position-relative">
          <input
            type="text"
            class="form-control"
            placeholder="Search..."
            autocomplete="off"
            id="search-options"
            value=""
          />
          <span class="mdi mdi-magnify search-widget-icon"></span>
          <span
            class="mdi mdi-close-circle search-widget-icon search-widget-icon-close d-none"
            id="search-close-options"
          ></span>
        </div>
        <div class="dropdown-menu dropdown-menu-lg" id="search-dropdown">
          <div data-simplebar style="max-height: 320px">
            <!-- item-->
            <div class="dropdown-header">
              <h6 class="text-overflow text-muted mb-0 text-uppercase">
                Recent Searches
              </h6>
            </div>

            <div class="dropdown-header mt-2">
              <h6 class="text-overflow text-muted mb-2 text-uppercase">
                Contacts
              </h6>
            </div>

            <div class="notification-list">
              <!-- item -->
              <a
                href="javascript:void(0);"
                class="dropdown-item notify-item py-2"
              >
                <div class="d-flex">
                  <img
                    src="@/assets/images/users/avatar-2.jpg"
                    class="me-3 rounded-circle avatar-xs"
                    alt="user-pic"
                  />
                  <div class="flex-1">
                    <h6 class="m-0">Angela Bernier</h6>
                    <span class="fs-11 mb-0 text-muted">Manager</span>
                  </div>
                </div>
              </a>
              <!-- item -->
              <a
                href="javascript:void(0);"
                class="dropdown-item notify-item py-2"
              >
                <div class="d-flex">
                  <img
                    src="@/assets/images/users/avatar-3.jpg"
                    class="me-3 rounded-circle avatar-xs"
                    alt="user-pic"
                  />
                  <div class="flex-1">
                    <h6 class="m-0">David Grasso</h6>
                    <span class="fs-11 mb-0 text-muted">Web Designer</span>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div class="text-center pt-3 pb-1">
            <a href="#" class="btn btn-primary btn-sm"
              >View All Results <i class="ri-arrow-right-line ms-1"></i
            ></a>
          </div>
        </div>
      </form>
    </div>

    <div class="d-flex align-items-center">
      <div class="dropdown d-md-none topbar-head-dropdown header-item">
        <button
          type="button"
          class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle shadow-none"
          id="page-header-search-dropdown"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i class="bx bx-search fs-22"></i>
        </button>
        <div
          class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
          aria-labelledby="page-header-search-dropdown"
        >
          <form class="p-3">
            <div class="form-group m-0">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search ..."
                  aria-label="Recipient's username"
                />
                <button class="btn btn-primary" type="submit">
                  <i class="mdi mdi-magnify"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div class="dropdown ms-sm-3 header-item topbar-user">
        <button
          type="button"
          class="btn shadow-none"
          id="page-header-user-dropdown"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span class="d-flex align-items-center">
            <img
              class="rounded-circle header-profile-user"
              src="@/assets/images/users/avatar-1.jpg"
              alt="Header Avatar"
            />
            <span class="text-start ms-xl-2">
              <span
                class="d-none d-xl-inline-block ms-1 fw-medium user-name-text"
                >{{ user.first_name }}</span
              >
              <span
                class="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text"
                >Founder</span
              >
            </span>
          </span>
        </button>
        <div class="dropdown-menu dropdown-menu-end">
          <!-- item-->
          <h6 class="dropdown-header">Welcome {{ user.first_name }}!</h6>
          <a class="dropdown-item" href="#"
            ><i
              class="mdi mdi-account-circle text-muted fs-16 align-middle me-1"
            ></i>
            <span class="align-middle">Profile</span></a
          >
          <a class="dropdown-item" href="#"
            ><i class="mdi mdi-lifebuoy text-muted fs-16 align-middle me-1"></i>
            <span class="align-middle">Help</span></a
          >
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#" @click.prevent="logout"
            ><i class="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>
            <span class="align-middle" data-key="t-logout">Logout</span></a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores";
export default {
  name: "Navbar",
  methods:{
    logout(){
      const authStore = useAuthStore();
      authStore.logout();
    }
  }
};
</script>

<style scoped></style>
