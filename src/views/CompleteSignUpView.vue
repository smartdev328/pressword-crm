<template>
  <div class="page-content">
    <div class="container-fluid">

      <!-- start page title -->
      <div class="row">
        <div class="col-12">
          <div class="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 class="mb-sm-0">&nbsp;</h4>
          </div>
        </div>
      </div>
      <!-- end page title -->

      <div class="row justify-content-center mt-5">
        <div class="col-lg-5">
          <div class="text-center mb-4 pb-2">
            <h4 class="fw-semibold fs-22">Complete your sign up</h4>
            <p class="text-muted mb-4 fs-15">Call management features for your business.</p>
          </div>
        </div>
        <!--end col-->
      </div>
      <!--end row-->

      <div class="row justify-content-center mt-2">
        <div class="col-xl-6">
          <div class="card">
            <div class="card-body">
              <div class="m-4">
                <form action="javascript:void(0);">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label for="firstNameinput" class="form-label">First Name</label>
                        <input type="text" class="form-control" placeholder="Enter your firstname" id="firstNameinput">
                      </div>
                    </div>
                    <!--end col-->
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label for="lastNameinput" class="form-label">Last Name</label>
                        <input type="text" class="form-control" placeholder="Enter your lastname" id="lastNameinput">
                      </div>
                    </div>
                    <!--end col-->
                    <div class="col-md-12">
                      <div class="mb-3">
                        <label for="companyNameinput" class="form-label">Company Name</label>
                        <input type="text" class="form-control" placeholder="Enter company name" id="companyNameinput">
                      </div>
                    </div>
                    <!--end col-->
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label for="emailidInput" class="form-label">Email Address</label>
                        <input type="email" class="form-control" placeholder="me@business.com" id="emailidInput">
                      </div>
                    </div>


                    <div class="col-md-6">
                      <div class="mb-3">
                        <label for="ForminputState" class="form-label">Team Size</label>
                        <select class="form-select mb-3" aria-label="Default select example">
                          <option selected>Less than 5 people</option>
                          <option value="1">5  - 10 people</option>
                          <option value="2">10 - 20 people</option>
                          <option value="3">20 - 50 people</option>
                          <option value="3">More than 50 people</option>
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
          <!-- end card -->
        </div>
      </div>
    </div>
    <!-- container-fluid -->
  </div>
  <!-- End Page-content -->
</template>

<script>
import { useNumbersStore, useUsersStore } from "@/stores";

export default {
  name: "CompleteSignUpView",
  setup() {
    const numberStore = useNumbersStore()
    const userStore = useUsersStore()
    return {
      numberStore, userStore
    }
  },
  computed: {
    currentUser() {
      return this.userStore.currentUser
    },
  },
  methods: {

  },
  mounted() {

  }
};
</script>

<style scoped>

</style>