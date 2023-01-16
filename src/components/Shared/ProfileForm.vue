<template>
  <form action="javascript:void(0);" @submit="submitProfile">
    <div class="alert alert-danger shadow" role="alert" v-if="errorMessage">
      <strong> Error! </strong> {{ errorMessage }}
    </div>

    <div class="row">
      <div class="col-6">
        <div class="mb-3">
          <label htmlFor="first-name-input" class="form-label">
            First Name
          </label>
          <input
            type="text"
            class="form-control"
            placeholder="First Name"
            id="first-name-input"
            v-model="user.first_name"
          />
        </div>
      </div>
      <div class="col-6">
        <div class="mb-3">
          <label htmlFor="last-name-input" class="form-label">
            Last Name
          </label>
          <input
            type="text"
            class="form-control"
            placeholder="Last Name"
            id="last-name-input"
            v-model="user.last_name"
          />
        </div>
      </div>

      <div class="col-6">
        <div class="mb-3">
          <label htmlFor="email-input" class="form-label">
            Email
          </label>
          <input
            type="text"
            class="form-control"
            placeholder="Email"
            id="email-input"
            v-model="user.personal_email"
          />
        </div>
      </div>
      <div class="col-6">
        <div class="mb-3">
          <label htmlFor="mobile-number-input" class="form-label">
            Mobile Number
          </label>
          <input
            type="text"
            class="form-control"
            placeholder="Mobile Number"
            id="mobile-number-input"
            v-model="user.mobile"
          />
        </div>
      </div>

      <!--end col-->
      <div class="col-12">
        <div class="mb-3">
          <label htmlFor="home-address-input" class="form-label">
            Home Address
          </label>
          <input
            type="text"
            class="form-control"
            placeholder="Home Address"
            id="home-address-input"
            v-model="user.home_address"
          />
        </div>
      </div>
      <div class="col-lg-12">
        <div class="text-end">
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { useUsersStore } from "@/stores";
import {updateUserProfile} from "@/helpers";
import { storeToRefs } from "pinia";

export default {
  name: "ProfileForm",
  props: {},
  data() {
    return {
      errorMessage: null,
      user: storeToRefs(this.userStore.currentUser),
    }
  },
  methods: {
    async submitProfile() {
      this.errorMessage = ""
      try {
          await updateUserProfile(this.userStore.currentUser.id, this.user)
      } catch (e) {
        this.errorMessage = String(e)
        return
      }

      this.$emit("success", null)
      this.userStore.showEditProfile = false
      await this.userStore.loadCurrentUser()
    }
  },
  setup() {
    const userStore = useUsersStore()
    return {
      userStore
    }
  },
}
</script>

<style scoped>

</style>