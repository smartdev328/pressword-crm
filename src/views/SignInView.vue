<template>
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
                      <p class="text-muted">Sign in to continue to PressOne.</p>
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
                        </div>


                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="" id="auth-remember-check">
                          <label class="form-check-label" for="auth-remember-check">This is my device (Remember me)</label>
                        </div>

                        <div class="mt-4">
                          <button class="btn btn-success w-100" type="submit">{{buttonLabel}}</button>
                        </div>

                      </form>
                    </div>

                    <div class="mt-5 text-center">
                      <p class="mb-0">Don't have an account ? <a href="#" class="fw-semibold text-primary text-decoration-underline"> Signup</a> </p>
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
              <p class="mb-0">&copy;
                2023 PressOne Africa. Crafted with <i class="mdi mdi-coffee text-success mdi-18px white"></i>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <!-- end Footer -->
  </div>
  <!-- end auth-page-wrapper -->
</template>


<script>
import { useAuthStore } from "@/stores";
import kelvinTeamBg from "@/assets/images/team-kelvin.jpg"
import patternBg from "@/assets/images/cover-pattern.png"

export default {
  name: "SignInView",
  data(){
    return {
      mobile: "", // This is binds to mobile phone input
      otp: "",  //this is binds to otp input
      buttonLabel: "Sign In",
      otpSent: false,
      phoneError:"",
      kelvinTeamBg,
      patternBg
    }
  },
  methods: {
    async onSubmit() {
      this.phoneError = "";
      const authStore = useAuthStore();
      if(!this.otp){
        authStore.getOTP(this.mobile).then((res)=>{
          if('detail' in res){ //response from server has a property "detail" that contains "We texted you a login code" or  "Unable to send you a login code. Try again later."
            if(res.detail.toLowerCase().includes("unable") || res.detail.toLowerCase().includes("try") ){
              this.phoneError = res.detail;
            }
            else{
              this.otpSent = true
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
        await authStore.login(this.mobile, this.otp);
      }
    }
  },
  watch : {
    otpSent: {
      handler (sent) {
        this.buttonLabel = sent ? "Submit OTP" : "Sign In";
      },
      immediate: true
    }
  }
};
</script>

<style scoped>

</style>