<template>
  <!-- auth-page wrapper -->
  <div class="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
    <div class="bg-overlay" style="background-image: url('src/assets/images/cover-pattern.png')"></div>
    <!-- auth-page content -->
    <div class="auth-page-content overflow-hidden pt-lg-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="card overflow-hidden">
              <div class="row g-0">
                <div class="col-lg-6">
                  <div class="p-lg-5 p-4 auth-one-bg h-100" style="background-image: url('src/assets/images/team-kelvin.jpg')">
                    <div class="bg-overlay"></div>
                    <div class="position-relative h-100 d-flex flex-column">
                      <div class="mb-4">
                        <a href="#" class="d-block">
                          <img src="src/assets/images/pressone-full-whitetext-logo.png" alt="" height="18">
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
                          <input type="tel" class="form-control" id="username" v-model="mobile" placeholder="Enter Phone Number">
                        </div>

                        <div class="mb-3" v-show="otpSent">
                            <label class="form-label" for="password-input">OTP</label>
                            <input type="text" class="form-control pe-5 password-input" v-model="otp" placeholder="Enter OTP" id="password-input">
                        </div>


                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="" id="auth-remember-check">
                          <label class="form-check-label" for="auth-remember-check">This is my device (Remember me)</label>
                        </div>

                        <div class="mt-4">
                          <button class="btn btn-success w-100" type="submit">Sign In</button>
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
                2023 PressOne Africa. Crafted with <i class="mdi mdi-coffee text-danger mdi-18px white"></i>
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

export default {
  name: "SignInView",
  data(){
    return {
      mobile: "", // This is the mobile phone number
      otp: "",  //this is the OTP
      otpSent: false
    }
  },
  methods: {
    async onSubmit() {
      const authStore = useAuthStore();
      if(!this.otp || this.otp.isEmpty()){
        this.otpSent = authStore.getOTP(this.mobile);
      }
    }
  }
};
</script>

<style scoped>

</style>