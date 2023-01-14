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
<!--      <form class="app-search d-none d-md-block">-->
<!--        <div class="position-relative">-->
<!--          <input-->
<!--            type="text"-->
<!--            class="form-control"-->
<!--            placeholder="Search..."-->
<!--            autocomplete="off"-->
<!--            id="search-options"-->
<!--            value=""-->
<!--          />-->
<!--          <span class="mdi mdi-magnify search-widget-icon"></span>-->
<!--          <span-->
<!--            class="mdi mdi-close-circle search-widget-icon search-widget-icon-close d-none"-->
<!--            id="search-close-options"-->
<!--          ></span>-->
<!--        </div>-->
<!--      </form>-->
    </div>

    <div class="d-flex align-items-center">
      <Modal v-model="authStore.showEditProfile">
        <template v-slot:title>
          Update Profile
        </template>
        <div class="card card-height-100 mb-0">
          <div class="card-body p-4">
            <ProfileForm/>
          </div>
        </div>
      </Modal>

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
              src="@/assets/images/anonymous.png"
              alt="Header Avatar"
            />
            <span class="text-start ms-xl-2">
              <span
                class="d-none d-xl-inline-block ms-1 fw-medium user-name-text"
                >{{ currentUser.first_name }}</span
              >
              <span
                class="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text"
                >{{currentUser.mobile}}</span
              >
            </span>
          </span>
        </button>
        <div class="dropdown-menu dropdown-menu-end">
          <!-- item-->
          <h6 class="dropdown-header">Welcome {{ currentUser.first_name }}!</h6>
          <a class="dropdown-item" href="#" @click.prevent="authStore.showEditProfile = true"
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
import {useNumbersStore} from "@/stores";
import Modal from "@/components/Shared/Modal.vue";
import ProfileForm from "@/components/Shared/ProfileForm.vue";

export default {
  name: "Navbar",
  components: {
    ProfileForm,
    Modal
  },
  computed: {
    currentUser() {
      return this.authStore.currentUser
    },
    numbers() {
      return this.numberStore.numbers
    }
  },
  methods:{
    logout(){
      const authStore = useAuthStore();
      authStore.logout();
    }
  },
  setup() {
    const authStore = useAuthStore()
    const numberStore = useNumbersStore()
    return {
      authStore,
      numberStore
    }
  },
  async mounted() {
    await this.numberStore.getUserPhones()
  }
};
</script>

<style scoped></style>
