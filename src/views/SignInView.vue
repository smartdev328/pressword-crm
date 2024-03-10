<template>
<wrapper>
  <template v-slot:image>
    <imageBlock />
  </template>

  <template v-slot:form>
    <SignInForm
      :otpSent="otpSent"
      :phoneError="phoneError"
      subHead="Sign in to continue to PressWorld."
      btnText="Sign In"
      footerHead="Don't have an account ?"
      footerLinkText="Sign up"
      footerLink="/sign-up"
      @submit="onSubmit"
      @resendOTP="resendOTP"
    />
  </template>

  <template v-slot:footer>
    <SignInFooter />
  </template>
</wrapper>
</template>


<script setup>
import { ref } from 'vue'
import * as Sentry from "@sentry/vue"

import { useAuthStore } from "@/stores"
import { useRoute } from 'vue-router'
import { EVENTS, track } from "@/helpers"
import wrapper from "@/components/SignIn/wrapper.vue"
import SignInForm from "@/components/SignIn/SignInForm.vue"
import SignInFooter from "@/components/SignIn/footer.vue"
import imageBlock from "@/components/SignIn/imageBlock.vue"

const authStore = useAuthStore()
const route = useRoute()

const phoneError = ref('')
const otpSent = ref(false)

const onSubmit = async (data) => {
  phoneError.value = ""

  if(!otpSent.value) getOTP(data) 
  else await authStore.login(data.mobile, data.otp, data.rememberMe)
}

const getOTP = (data) => {
  track(EVENTS.REQUEST_OTP, { "mobile": data.mobile })
  authStore.getOTP(data.mobile)
    .then((res)=>{
      authStore.loading = false
      if('detail' in res){ //response from server has a property "detail" that contains "We texted you a login code" or  "Unable to send you a login code. Try again later."
        if(res.detail.toLowerCase().includes("unable") || res.detail.toLowerCase().includes("try") ){
          phoneError.value = res.detail;
        }
        else{
          otpSent.value = true
          setTimeout(() => {
            document.getElementById('password-input').focus(); //move the focus to OTP input
          }, 0);
        }
      }else if('mobile' in res ){ //response from server says something is wrong with mobile number
        phoneError.value = res['mobile'][0];
      }else{
        //something weird went wrong
        phoneError.value = res;
      }
    }).catch((err)=>{ // fetch-wrapper already extracted err as text
      authStore.loading = false
      phoneError.value = err
      Sentry.captureMessage("Error in getOTP method, SignInView");
      Sentry.captureException(err);
    });
}
const resendOTP = (data) =>{
  authStore.authError = null
  otpSent.value = false
  onSubmit(data)
}

track(EVENTS.VIEWED_SIGNIN, { route: route.name })
</script>

<style scoped>

</style>
<script> export default { name: 'SignInView' } </script>