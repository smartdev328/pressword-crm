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
      <form class="app-search d-md-block" @submit.prevent="callNumber">
        <div class="position-relative d-flex">
          <input
            type="text"
            class="form-control"
            :placeholder=dialerPlaceholder
            :disabled="!activeNumber"
            autocomplete="off"
            id="dialer-input"
            v-model="dialerNumber"
            required
            style="border-radius: 3px 0 0 3px;"
          />
          <button :disabled="!activeNumber" class="mdi mdi-phone mdi-24px bg-secondary text-bg-secondary" style="appearance: none; border: none; padding: 0 12px; border-radius: 0 3px 3px 0; margin-left: -3px;"></button>
          <!--          <span class="mdi mdi-phone search-widget-icon"></span>-->
<!--          <span-->
<!--            class="mdi mdi-phone search-widget-icon search-widget-icon-close d-none"-->
<!--            id="search-close-options"-->
<!--          ></span>-->
        </div>
      </form>
    </div>

    <div class="d-flex align-items-center">
      <Modal v-model="userStore.showEditProfile">
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
                >{{formatPhoneNumber(activePhoneNumber)}}</span
              >
            </span>
          </span>
        </button>
        <div class="dropdown-menu dropdown-menu-end">
          <!-- item-->
          <h6 class="dropdown-header">Welcome {{ currentUser.first_name }}!</h6>
          <a class="dropdown-item" href="#" @click.prevent="userStore.showEditProfile = true"
            ><i
              class="mdi mdi-account-circle text-muted fs-16 align-middle me-1"
            ></i>
            <span class="align-middle">Profile</span></a
          >
          <a class="dropdown-item" href="https://pressone.freshdesk.com/support/home" target="_blank"
            ><i class="mdi mdi-lifebuoy text-muted fs-16 align-middle me-1"></i>
            <span class="align-middle">Help</span></a
          >
          <a class="dropdown-item" :href="this.$router.resolve('/pricing').href"
          ><i
            class="mdi mdi-cash text-muted fs-16 align-middle me-1"
          ></i>
            <span class="align-middle">Buy Number</span></a
          >
          <div v-show="numbers.length > 1">

            <div class="dropdown-divider"></div>
            <h6 class="dropdown-header" title="Tap any number to view that number">Switch Account</h6>
            <a class="dropdown-item" href="#"
               v-for="(number, i) in numbers" :key="i"
               @click.prevent="setActiveNumber(number, i)"
               v-show="number.phone_number !== activePhoneNumber"
            ><i
              class="mdi mdi-swap-horizontal text-muted fs-16 align-middle me-1"></i>
              <span class="align-middle">{{ formatPhoneNumber(number.phone_number) }}</span>
              <p class="align-middle small text-muted"><span class="me-1" style="width: 16px;display: inline-block">&nbsp;</span>{{ number.phone_number.substring(0,19) }} </p>
            </a>
          </div>
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
import { useAuthStore, useUsersStore, useNumbersStore } from "@/stores";
import Modal from "@/components/Shared/Modal.vue";
import ProfileForm from "@/components/Shared/ProfileForm.vue";
import { buildWebdialerLink, formatPhoneNumber } from "@/helpers/utils";

export default {
  name: "Navbar",
  components: {
    ProfileForm,
    Modal
  },
  data() {
      return {
        dialerNumber: ""
      }
  },
  computed: {
    currentUser() {
      return this.userStore.currentUser
    },
    activeNumber(){ // number object
      return this.numberStore.activeNumber
    },
    activePhoneNumber(){ //actual phone number string
      return this.numberStore.activeNumber ? this.numberStore.activeNumber.phone_number : "";
    },
    numbers() {
      return this.numberStore.numbers
    },
    dialerPlaceholder() {
      return this.activeNumber ? "Enter Phone Number" : "Purchase a Number to Activate"
    }
  },
  methods:{
    formatPhoneNumber,
    logout(){
      const authStore = useAuthStore();
      authStore.logout();
    },
    callNumber() {
      window.open(buildWebdialerLink(this.dialerNumber, this.numberStore.activeNumber.id), "_blank")
    },
    setActiveNumber(number, index){
      //number is an item in user.receivers data gotten from the getuserbymobile api endpoint.
      this.numberStore.setActiveNumber(number)
      this.$router.go()
    }
  },
  setup() {
    const authStore = useAuthStore()
    const numberStore = useNumbersStore()
    const userStore = useUsersStore()
    return {
      authStore,
      numberStore,
      userStore
    }
  },
  async mounted() {
    await this.numberStore.getUserPhones()
  }
};
</script>

<style scoped></style>
