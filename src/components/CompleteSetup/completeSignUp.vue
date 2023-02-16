<template>
  <div class="text-center mb-4 pb-2">
    <h4 class="fw-semibold fs-22">Complete your sign up</h4>
    <p class="text-muted mb-4 fs-15">Call management features for your business.</p>
  </div>

  <div class="card mt-2">
    <div class="card-body">
      <div class="m-4">
        <form action="javascript:void(0);" @submit.prevent="submitProfile">
          <div class="alert alert-danger shadow" role="alert" v-show="errorMessage">
            <strong> Error! </strong> {{ errorMessage }}
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="mb-3">
                <label for="firstNameinput" class="form-label">First Name</label>
                <input type="text" class="form-control" v-model="user.first_name" placeholder="Enter your firstname" id="firstNameinput">
              </div>
            </div>
            <!--end col-->
            <div class="col-md-6">
              <div class="mb-3">
                <label for="lastNameinput" class="form-label">Last Name</label>
                <input type="text" class="form-control" v-model="user.last_name" placeholder="Enter your lastname" id="lastNameinput">
              </div>
            </div>
            <!--end col-->
            <div class="col-md-12">
              <div class="mb-3">
                <label for="companyNameinput" class="form-label">Company Name</label>
                <input type="text" class="form-control" v-model="user.business_name" placeholder="Enter company name" id="companyNameinput">
              </div>
            </div>
            <!--end col-->
            <div class="col-md-6">
              <div class="mb-3">
                <label for="emailidInput" class="form-label">Email Address</label>
                <input type="email" class="form-control" v-model="user.personal_email" placeholder="me@business.com" id="emailidInput">
              </div>
            </div>


            <div class="col-md-6">
              <div class="mb-3">
                <label for="ForminputState" class="form-label">Team Size</label>
                <select class="form-select mb-3" aria-label="Team Size" v-model="user.team_size" >
                  <option selected value="0">Less than 5 people</option>
                  <option value="5">5  - 10 people</option>
                  <option value="10">10 - 20 people</option>
                  <option value="20">20 - 50 people</option>
                  <option value="50">More than 50 people</option>
                </select>
              </div>
            </div>
            <!--end col-->
            <div class="col-lg-12">
              <div class="text-end">
                <button type="submit" class="btn btn-primary">Submit</button>
              </div>
            </div>
            <!--end col-->
          </div>
          <!--end row-->
        </form>
      </div>
    </div>
    <!-- end card body -->
  </div>

</template>

<script setup>
import { ref } from 'vue'
import * as Sentry from "@sentry/vue"

import { useAuthStore } from '@/stores';
import { updateUserProfile, track, EVENTS, register, getUserDetailsByPhone, verifyLoginToken } from "@/helpers"
import { validateMobile} from "@/helpers/utils";

const authStore = useAuthStore();

const emit = defineEmits(['submit'])
const props = defineProps({
  userData: Object
})

const errorMessage = ref(null)
const user = ref({
  first_name: "",
  last_name: "",
  personal_email: "",
  business_name: "",
  team_size: ""
})

const submitProfile = async () => {
  errorMessage.value = ""
  try {
    try {
      register(user.value)
      track(EVENTS.SIGNED_UP, user.value)
    }catch (e) {
      //do nothing
      Sentry.captureMessage("Error in register method, CompleteSignUp component");
      Sentry.captureException(e);
    }
    const { data } = await verifyLoginToken(validateMobile(props.userData.mobile), props.userData.otp, props.userData.rememberMe);
    authStore.token = data.token;

    const currentUser = await getUserDetailsByPhone(validateMobile(props.userData.mobile))
    await updateUserProfile(currentUser.id, user.value)
  } catch (e) {
    errorMessage.value = String(e)
    Sentry.captureMessage("Error in verifyLoginToken or getUserDetailsByPhone method, CompleteSignUp component");
    Sentry.captureException(e);
    return
  }

  emit("submit", { nextStep: 'completeSetup' })
  // await this.userStore.loadCurrentUser(this.userStore.currentUser.mobile);
  // this.$router.push('/home')
}
</script>

<style scoped>

</style>
<script> export default { name: 'completeSignUp' } </script>