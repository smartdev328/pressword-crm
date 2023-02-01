<template>
  <div>
    <!-- auth-page wrapper -->
    <div class="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
      <div class="bg-overlay" :style="{backgroundImage: `url(${patternBg})`}"></div>
      <!-- auth-page content -->
      <div class="auth-page-content overflow-hidden pt-lg-5">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="card overflow-hidden">
                <div class="row g-0">
                  <div class="col-lg-6">
                    <div class="p-lg-5 p-4 auth-one-bg h-100" :style="{backgroundImage: `url(${kelvinTeamBg})`}">
                      <div class="bg-overlay"></div>
                      <div class="position-relative h-100 d-flex flex-column">
                        <div class="mb-4">
                          <a href="#" class="d-block">
                            <img src="@/assets/images/pressone-full-whitetext-logo.png" alt="" height="18">
                          </a>
                        </div>

                      </div>
                    </div>
                  </div>
                  <!-- end col -->

                  <div class="col-lg-6">
                    <div class="p-lg-5 p-4">
                      <div>
                        <h5 class="text-primary">Welcome</h5>
                        <p class="text-muted">{{this.signUpMode ? 'To sign up on PressOne, start by entering your phone number.' : 'Sign in to continue to PressOne.'}}</p>
                      </div>

                      <div class="mt-4">
                        <form @submit.prevent="onSubmit">

                          <div class="mb-3">
                            <div class="float-end">
                              <span class="text-muted text-sm-end">(An OTP will be sent to your Phone)</span>
                            </div>
                            <label for="username" class="form-label">Mobile Phone</label>
                            <input type="tel" class="form-control" id="username" v-model="mobile" placeholder="07080672831">
                            <div class="text-danger" v-show="phoneError">{{ phoneError }}</div>
                          </div>

                          <div class="mb-3" v-show="otpSent">
                              <label class="form-label" for="password-input">OTP</label>
                              <input type="text" class="form-control" v-model="otp" placeholder="Enter OTP" id="password-input">
                              <div class="text-danger" v-show="this.authStore.authError">{{ this.authStore.authError }}</div>
                              <p class="mb-0" v-show="this.authStore.authError"><a href="#" class="fw-semibold text-primary text-decoration-underline" @click.prevent="resendOTP">
                                Resend OTP</a> </p>
                          </div>


                          <div class="form-check" v-show="!signUpMode">
                            <input class="form-check-input" type="checkbox" v-model="this.rememberMe" id="auth-remember-check">
                            <label class="form-check-label" for="auth-remember-check">This is my device (Remember me)</label>
                          </div>

                          <div class="mt-4">
                            <button class="btn btn-success w-100 btn-load" type="submit">
                              <span class="spinner-grow flex-shrink-0" role="status" v-show="this.authStore.loading"></span>
                              {{buttonLabel}}
                            </button>
                          </div>

                        </form>
                      </div>

                      <div class="mt-5 text-center">
                        <p class="mb-0">{{ signUpLabel }} <a href="#" class="fw-semibold text-primary text-decoration-underline" @click.prevent="this.signUpMode = !this.signUpMode">
                          {{ this.signUpMode? "Sign in" : "Sign up" }}</a> </p>
                      </div>
                    </div>
                  </div>
                  <!-- end col -->
                </div>
                <!-- end row -->
              </div>
              <!-- end card -->
            </div>
            <!-- end col -->

          </div>
          <!-- end row -->
        </div>
        <!-- end container -->
      </div>
      <!-- end auth page content -->

      <!-- footer -->
      <footer class="footer">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="text-center">
                <p class="mb-0">
                  {{ new Date().getFullYear() }}
                  © PressOne Africa. Crafted with <i class="mdi mdi-coffee text-success mdi-18px white"></i>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <!-- end Footer -->
    </div>
    <!-- end auth-page-wrapper -->
    <completeSetupWrap v-if="false"/>
  </div>
</template>


<script>
import { useAuthStore } from "@/stores";
import kelvinTeamBg from "@/assets/images/team-kelvin.jpg"
import patternBg from "@/assets/images/cover-pattern.png"
import completeSetupWrap from "@/components/CompleteSetup/completeSetupWrap.vue"

export default {
  name: "SignInView",
  components: {
    completeSetupWrap
  },
  data(){
    return {
      mobile: "", // This is binds to mobile phone input
      otp: "",  //this is binds to otp input
      buttonLabel: "Sign In",
      otpSent: false,
      phoneError:"",
      kelvinTeamBg,
      patternBg,
      signUpMode: false,
      signUpLabel:"Don't have an account ?",
      rememberMe:true
    }
  },
  setup(){
    const authStore = useAuthStore();
    return {
      authStore
    }
  },
  methods: {
    async onSubmit() {
      this.phoneError = "";
      if(!this.otp){
        this.authStore.getOTP(this.mobile).then((res)=>{
          this.authStore.loading = false
          if('detail' in res){ //response from server has a property "detail" that contains "We texted you a login code" or  "Unable to send you a login code. Try again later."
            if(res.detail.toLowerCase().includes("unable") || res.detail.toLowerCase().includes("try") ){
              this.phoneError = res.detail;
            }
            else{
              this.otpSent = true
              document.getElementById('password-input').focus(); //move the focus to OTP input
            }

          }else if('mobile' in res ){ //response from server says something is wrong with mobile number
            this.phoneError = res['mobile'][0];
          }else{
            //something weird went wrong
            this.phoneError = res;
          }
        }).catch((err)=>{ // fetch-wrapper already extracted err as text
          this.phoneError = err
        });
      }else{  //otp was entered
        await this.authStore.login(this.mobile, this.otp, this.rememberMe);
      }
    },
    resendOTP(){
      this.authStore.authError = null;
      this.otp = "";
      this.otpSent = false;
      this.onSubmit();
    }
  },
  mounted() {
    if(this.$route.name === "sign-up"){
      this.signUpMode = true;
    }
  },
  watch : {
    phoneError: {
      handler(value){
        if(value){
          this.authStore.loading = false;
        }
      },
      immediate: true
    },
    otpSent: {
      handler (sent) {
        this.buttonLabel = sent ? "Submit OTP" : "Sign In";
      },
      immediate: true
    },
    signUpMode: {
      handler (mode){
        this.signUpLabel = mode ? "Already have an account?" : "Don't have an account ?"
        this.buttonLabel = mode ? "Register" : "Sign In"
      },
      immediate: true
    }
  }
};
</script>

<style scoped>

</style>