<template>
  <wrapper :isShowCompleteSteps="isShowCompleteSteps">
    <template v-slot:completeSetup>
      <completeSetupWrap 
        v-if="isShowCompleteSteps" 
        @finish="finish"
        :userData="userData"
      />
    </template>

    <template v-slot:image>
      <imageBlock />
    </template>

    <template v-slot:form>
      <SignInForm 
        :isSignIn="false"
        :otpSent="otpSent"
        :phoneError="phoneError"
        subHead="To sign up on PressWorld, start by entering your phone number."
        btnText="Register"
        footerHead="Already have an account?"
        footerLinkText="Sign in"
        footerLink="/sign-in"
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
import { EVENTS, track } from "@/helpers";
import wrapper from "@/components/SignIn/wrapper.vue"
import completeSetupWrap from "@/components/CompleteSetup/completeSetupWrap.vue"
import SignInForm from "@/components/SignIn/SignInForm.vue"
import SignInFooter from "@/components/SignIn/footer.vue"
import imageBlock from "@/components/SignIn/imageBlock.vue"

const authStore = useAuthStore()
const route = useRoute()

const phoneError = ref('')
const otpSent = ref(false)
const userData = ref({})
const isShowCompleteSteps = ref(false)
const isCompleteStepsFinished = ref(false)

const onSubmit = async (data) => {
  phoneError.value = ""
  userData.value = { ...data }

  if(!otpSent.value){
    getOTP(data)
  }else{
    if(!isCompleteStepsFinished.value) isShowCompleteSteps.value = true
    else await authStore.login(userData.value.mobile, userData.value.otp, userData.value.rememberMe)
  }
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
      Sentry.captureMessage("Error in getOTP method, SignUpView");
      Sentry.captureException(err);
    });
}
const resendOTP = (data) =>{
  authStore.authError = null
  otpSent.value = false
  onSubmit(data)
}
const finish = () =>{
  isShowCompleteSteps.value = false
  isCompleteStepsFinished.value = true
  authStore.token = null
  
  setTimeout(async () => {
    await authStore.login(userData.value.mobile, userData.value.otp, userData.value.rememberMe)
  }, 0);
}

track(EVENTS.VIEWED_SIGNIN, { route: route.name })

</script>

<style scoped>

</style>
<script> export default { name: 'SignUpView' } </script>