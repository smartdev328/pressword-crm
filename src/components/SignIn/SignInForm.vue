<template>
<div class="p-lg-5 p-4">
  <div>
    <h5 class="text-primary">Welcome</h5>
    <p class="text-muted">{{ props.subHead }}</p>
  </div>

  <div class="mt-4">
    <form @submit.prevent="onSubmit">

      <div class="mb-3">
        <div class="float-end">
          <span class="text-muted text-sm-end">(An OTP will be sent to your Phone)</span>
        </div>
        <label for="username" class="form-label">Mobile Phone</label>
        <input 
          v-model="mobile" 
          type="tel" 
          class="form-control" 
          id="username"
          placeholder="07080672831"
          autocomplete="off"
        >
        <div class="text-danger" v-show="props.phoneError">{{ props.phoneError }}</div>
      </div>

      <div class="mb-3" v-if="props.otpSent">
          <label class="form-label" for="password-input">OTP</label>
          <input 
            v-model="otp"
            type="text" 
            class="form-control"  
            placeholder="Enter OTP" 
            id="password-input"
            name="password-input"
            required
          >
          <div class="text-danger" v-show="authStore.authError">{{ authStore.authError }}</div>
      </div>

      <div class="form-check" v-show="props.isSignIn">
        <input class="form-check-input" type="checkbox" v-model="rememberMe" id="auth-remember-check">
        <label class="form-check-label" for="auth-remember-check">This is my device (Remember me)</label>
      </div>

      <div class="mt-4">
        <button class="btn btn-success w-100 btn-load" type="submit">
          <span class="spinner-grow flex-shrink-0" role="status" v-show="authStore.loading"></span>
          {{ props.otpSent ? 'Submit OTP' : props.btnText }}
        </button>
      </div>

    </form>
  </div>

  <div class="mt-5 text-center">
    <p v-if="props.otpSent" class="mb-0">
      Didn`t receive OTP?
      <span
        class="fw-semibold text-primary text-decoration-underline cursor-pointer"
        @click="resendOTP"
      >
        Resend OTP
      </span>
    </p>
    <p v-else class="mb-0">
      {{ props.footerHead }}
      <router-link
        :to="footerLink" 
        class="fw-semibold text-primary text-decoration-underline"
      >
        {{ props.footerLinkText }}
      </router-link>
    </p>

  </div>
</div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useAuthStore } from "@/stores"
import { EVENTS, track_error } from "@/helpers"

const props = defineProps({
  isSignIn: {
    type: Boolean,
    default: true
  },
  otpSent: {
    type: Boolean,
    default: true
  },
  subHead: String,
  btnText: String,
  footerHead: String,
  footerLink: String,
  footerLinkText: String,
  phoneError: [String, Number, Error]
})

const emit = defineEmits(['submit', 'resendOTP'])

const authStore = useAuthStore();

const mobile = ref("") // This is binds to mobile phone input
const otp = ref()  //this is binds to otp input
const rememberMe = ref(true)

const onSubmit = () => {
  emit('submit', {
    mobile: mobile.value,
    isSignIn: props.isSignIn,
    otpSent: props.otpSent,
    otp: otp.value,
    rememberMe: rememberMe.value
  })
}
const resendOTP = () => {
  otp.value = ""
  emit('resendOTP', {
    mobile: mobile.value,
    isSignIn: props.isSignIn,
    otpSent: props.otpSent,
    otp: otp.value,
    rememberMe: rememberMe.value
  })
} 

watch(() => props.phoneError, (value) => {
  track_error(EVENTS.LOGIN_ISSUE, props.phoneError)
  if(value) authStore.loading = false
})
</script>

<style scoped>

</style>