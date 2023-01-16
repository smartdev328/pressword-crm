<template>
  <div class="">
    <div class="card-body text-center">
      <div class="position-relative d-inline-block">
        <img src="@/assets/images/anonymous.png" alt="" class="avatar-lg rounded-circle img-thumbnail shadow">
        <span class="contact-active position-absolute rounded-circle bg-success">
        <span class="visually-hidden"></span>
      </span>
      </div>
      <h5 class="mt-4 mb-1">
        {{currentUser.first_name}} {{currentUser.last_name}}
      </h5>
      <p class="text-muted">{{currentMobile}}</p>
      <p v-if="currentUser.mobile_verified">
        <span class="badge badge-soft-primary">
          Mobile Verified
          <span class="ri-checkbox-circle-line"></span>
        </span>
      </p>
      <button class="btn btn-primary" @click="userStore.showEditProfile = true">Edit Profile</button>
    </div>
    <div class="card-body m-4">
      <div class="table-responsive table-card">
        <table class="table table-borderless mb-0">
          <tbody>
          <tr>
            <td class="fw-medium" scope="row">Email</td>
            <td>{{currentUser.personal_email}}</td>
          </tr>
          <tr>
            <td class="fw-medium" scope="row">Job Title</td>
            <td>{{currentUser.job_title || "Not set"}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { useUsersStore } from "@/stores";

export default {
  name: "UserProfile",
  computed: {
    currentUser () {
      return this.userStore.currentUser
    },
    currentMobile() {
      return this.userStore.mobile_number
    }
  },
  setup () {
    const userStore = useUsersStore()
    return {
      userStore
    }
  }
}
</script>

<style scoped>

</style>