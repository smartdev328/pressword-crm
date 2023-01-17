<template>
  <form action="javascript:void(0);" @submit="submitProfile">
    <div class="alert alert-danger shadow" role="alert" v-if="errorMessage">
      <strong> Error! </strong> {{ errorMessage }}
    </div>

    <div class="row">
      <div class="col-6">
        <div class="mb-3">
          <label class="form-label">
            First Name
          </label>
          <input
            type="text"
            class="form-control"
            placeholder="First Name"
            id="first-name-input"
            v-model="this.user.first_name"
          />
        </div>
      </div>
      <div class="col-6">
        <div class="mb-3">
          <label class="form-label">
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
          <label class="form-label">
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
          <label class="form-label">
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
          <label class="form-label">
            Job Title
          </label>
          <input
            type="text"
            class="form-control"
            placeholder="Manager @ Company Name"
            id="home-address-input"
            v-model="user.job_title"
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
    }
  },
  computed: {
    user() {
      return {
        first_name: this.userStore.currentUser.first_name,
        last_name: this.userStore.currentUser.last_name,
        mobile: this.userStore.currentUser.mobile,
        job_title: this.userStore.currentUser.job_title,
        personal_email: this.userStore.currentUser.personal_email,
      };
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
      await this.userStore.loadCurrentUser(this.userStore.currentUser.mobile)
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