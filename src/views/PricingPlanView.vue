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
            <h4 class="fw-semibold fs-22">Choose the plan that's right for you</h4>
            <p class="text-muted mb-4 fs-15">Simple pricing. No hidden fees. Call management features for your business. Upgrade Anytime.</p>
          </div>
        </div>
        <!--end col-->
      </div>
      <!--end row-->

      <div class="row justify-content-center">
        <div class="col-xl-9">
          <div class="row">
            <div class="col-lg-4">
              <div class="card pricing-box">
                <div class="card-body p-4 m-2">
                  <div class="d-flex align-items-center">
                    <div class="flex-grow-1">
                      <h5 class="mb-1 fw-semibold">Basic Plan</h5>
                      <p class="text-muted mb-0">Starter</p>
                    </div>
                    <div class="avatar-sm">
                      <div class="avatar-title bg-light rounded-circle text-primary">
                        <i class="ri-book-mark-line fs-20"></i>
                      </div>
                    </div>
                  </div>
                  <div class="pt-4">
                    <h2><sup><small>&#8358;</small></sup>1,499 <span class="fs-13 text-muted">/Month</span></h2>
                  </div>
                  <hr class="my-4 text-muted">
                  <div>
                    <ul class="list-unstyled text-muted vstack gap-3">
                      <li v-for="feature in features">
                        <div class="d-flex">
                          <div class="flex-shrink-0 text-success me-1">
                            <i class="fs-15 align-middle" :class="feature.plan1"></i>
                          </div>
                          <div class="flex-grow-1" v-html="feature.title"></div>
                        </div>
                      </li>
                    </ul>
                    <div class="mt-4">
                      <a :href="buildPaymentLink(currentUser,1499)" target="_blank" class="btn btn-soft-success w-100 waves-effect waves-light">Get started</a>
                    </div>
                  </div>
                  <div class="mt-4 mb-4 text-center">
                    <p class="text-muted">A great way to start, and see it work.</p>
                  </div>
                </div>
              </div>
            </div>
            <!--end col-->
            <div class="col-lg-4">
              <div class="card pricing-box ribbon-box right">
                <div class="card-body p-4 m-2">
                  <div class="ribbon-two ribbon-two-danger"><span>Popular</span></div>
                  <div>
                    <div class="d-flex align-items-center">
                      <div class="flex-grow-1">
                        <h5 class="mb-1 fw-semibold">Pro Business</h5>
                        <p class="text-muted mb-0">Professional plan</p>
                      </div>
                      <div class="avatar-sm">
                        <div class="avatar-title bg-light rounded-circle text-primary">
                          <i class="ri-medal-line fs-20"></i>
                        </div>
                      </div>
                    </div>

                    <div class="pt-4">
                      <h2><sup><small>&#8358; </small></sup> 4,999<span class="fs-13 text-muted">/Month</span></h2>
                    </div>
                  </div>
                  <hr class="my-4 text-muted">
                  <div>
                    <ul class="list-unstyled vstack gap-3 text-muted">
                      <li v-for="feature in features">
                        <div class="d-flex">
                          <div class="flex-shrink-0 text-success me-1">
                            <i class="fs-15 align-middle" :class="feature.plan2"></i>
                          </div>
                          <div class="flex-grow-1" v-html="feature.title2 ? feature.title2 : feature.title"></div>
                        </div>
                      </li>
                    </ul>
                    <div class="mt-4">
                      <a :href="buildPaymentLink(currentUser,4999)" target="_blank" class="btn btn-success w-100 waves-effect waves-light">Get started</a>
                    </div>
                  </div>
                  <div class="mt-4 mb-4 text-center">
                    <p class="text-muted">Enjoy amazing call management features.</p>
                  </div>
                </div>
              </div>
            </div>
            <!--end col-->
            <div class="col-lg-4">
              <div class="card pricing-box">
                <div class="card-body p-4 m-2">
                  <div>
                    <div class="d-flex align-items-center">
                      <div class="flex-grow-1">
                        <h5 class="mb-1 fw-semibold">Platinum Plan</h5>
                        <p class="text-muted mb-0">International</p>
                      </div>
                      <div class="avatar-sm">
                        <div class="avatar-title bg-light rounded-circle text-primary">
                          <i class="ri-stack-line fs-20"></i>
                        </div>
                      </div>
                    </div>

                    <div class="pt-4">
                      <h2><sup><small>&#8358; </small></sup> 9,999<span class="fs-13 text-muted">/Month</span></h2>
                    </div>
                  </div>
                  <hr class="my-4 text-muted">
                  <div>
                    <ul class="list-unstyled vstack gap-3 text-muted">
                      <li v-for="feature in features">
                        <div class="d-flex">
                          <div class="flex-shrink-0 text-success me-1">
                            <i class="fs-15 align-middle" :class="feature.plan3"></i>
                          </div>
                          <div class="flex-grow-1" v-html="feature.title3 ? feature.title3 : feature.title"></div>
                        </div>
                      </li>
                    </ul>
                    <div class="mt-4">
                      <a :href="buildPaymentLink(currentUser,9999)" target="_blank" class="btn btn-soft-success w-100 waves-effect waves-light">Get started</a>
                    </div>
                  </div>
                  <div class="mt-4 mb-4 text-center">
                    <p class="text-muted">For businesses that are international.</p>
                  </div>
                </div>
              </div>
            </div>
            <!--end col-->
          </div>
          <!--end row-->
        </div>
        <!--end col-->
      </div>
      <!--end row-->
      <div class="row justify-content-center">
        <div class="col-xl-9">
          <div class="mt-3 mb-5">
            <div class="d-flex align-items-center mb-2">
              <div class="flex-shrink-0 me-1">
                <i class="ri-question-line fs-24 align-middle text-success me-1"></i>
              </div>
              <div class="flex-grow-1">
                <h5 class="fs-16 mb-0 fw-semibold">Payment Questions</h5>
              </div>
            </div>

            <div class="accordion accordion-border-box" id="genques-accordion">
              <div class="accordion-item shadow">
                <h2 class="accordion-header" id="genques-headingOne">
                  <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#genques-collapseOne" aria-expanded="true" aria-controls="genques-collapseOne">
                    What are my paying for, per month ?
                  </button>
                </h2>
                <div id="genques-collapseOne" class="accordion-collapse collapse show" aria-labelledby="genques-headingOne" data-bs-parent="#genques-accordion">
                  <div class="accordion-body">
                    Your PressOne service is attached to one phone number. You are paying for that service monthly. Depending on the plan you choose, one phone number may allow you add more users who can make and receive calls with that number.
                    <br/><br/>
                    You may purchase as many phone numbers as you want, and you pay for each monthly. Users can make or receive calls through the web or mobile app.
                  </div>
                </div>
              </div>
              <div class="accordion-item shadow">
                <h2 class="accordion-header" id="genques-headingOpt">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#genques-collapseOpt" aria-expanded="false" aria-controls="genques-collapseOpt">
                    What payment options are support ?
                  </button>
                </h2>
                <div id="genques-collapseOpt" class="accordion-collapse collapse" aria-labelledby="genques-headingOpt" data-bs-parent="#genques-accordion">
                  <div class="accordion-body">
                    Since this is a monthly subscription, you can only pay by debit/credit card. We process payments through Paystack, so all Nigerian debit cards are supported.
                  </div>
                </div>
              </div>
              <div class="accordion-item shadow">
                <h2 class="accordion-header" id="genques-headingTwo">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#genques-collapseTwo" aria-expanded="false" aria-controls="genques-collapseTwo">
                    What is an extra user ?
                  </button>
                </h2>
                <div id="genques-collapseTwo" class="accordion-collapse collapse" aria-labelledby="genques-headingTwo" data-bs-parent="#genques-accordion">
                  <div class="accordion-body">
                    All subscriptions come with one phone number and 2 users. Which means you can share the phone number with another person without paying extra. But if you want to share with more than 2 people, you have to purchase extra users.
                    <br/><br/>Note, some plans have a maximum number of users that can be on it. For example, this means you can only purchase 1 extra user on the Starter plan.
                    <br/><br/>If it helps, you may think of "users" as phone extensions. So a plan with a maximum of 3 users means you can only have 3 extensions on that phone number.
                  </div>
                </div>
              </div>
              <div class="accordion-item shadow">
                <h2 class="accordion-header" id="genques-headingThree">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#genques-collapseThree" aria-expanded="false" aria-controls="genques-collapseThree">
                    What are concurrent calls ?
                  </button>
                </h2>
                <div id="genques-collapseThree" class="accordion-collapse collapse" aria-labelledby="genques-headingThree" data-bs-parent="#genques-accordion">
                  <div class="accordion-body">
                    Concurrent calls are the number of calls that can happen at the same time on one phone number. You can purchase as many extra users as allowed by the plan, however not all users can make or receive calls simultaneously.
                    <br/><br/>If you have users who will be making calls frequently, consider purchasing separate plans for them.
                  </div>
                </div>
              </div>
              <div class="accordion-item shadow">
                <h2 class="accordion-header" id="genques-headingFour">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#genques-collapseFour" aria-expanded="false" aria-controls="genques-collapseFour">
                    Do I pay for calls ?
                  </button>
                </h2>
                <div id="genques-collapseFour" class="accordion-collapse collapse" aria-labelledby="genques-headingFour" data-bs-parent="#genques-accordion">
                  <div class="accordion-body">
                    Yes, you pay for calls. PressOne is not internet to internet call like WhatsApp. You may be calling through the internet, but your customers are getting the call on their normal phones. You will pay the standard carrier fees for making the call connection to your customer.
                  </div>
                </div>
              </div>
              <div class="accordion-item shadow">
                <h2 class="accordion-header" id="genques-headingFive">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#genques-collapseFive" aria-expanded="false" aria-controls="genques-collapseFive">
                    What integrations are available ?
                  </button>
                </h2>
                <div id="genques-collapseFive" class="accordion-collapse collapse" aria-labelledby="genques-headingFive" data-bs-parent="#genques-accordion">
                  <div class="accordion-body">
                    At time of writing, we currently have Zoho CRM Integration. We can integrate with any third party software you want, at no extra cost to you, as long as the software is not an internal tool built specifically for your business.
                  </div>
                </div>
              </div>
            </div>
            <!--end accordion-->
          </div>
        </div>
      </div>
    </div>
    <!-- container-fluid -->
  </div>
  <!-- End Page-content -->
</template>

<script>
import { buildPaymentLink } from "@/helpers/utils";
import {useNumbersStore, useUsersStore} from "@/stores";

export default {
  name: "PricingPlanView",
  components: {
  },
  data () {
   return{
     features:{
       featureCall:{
         title:"Make and Receive Calls",
         plan1:'ri-checkbox-circle-fill',
         plan2:'ri-checkbox-circle-fill',
         plan3:'ri-checkbox-circle-fill'
       },
       featureShared:{
         title:"Maximum of <b>3</b> Users",
         title2:"Unlimited Users",
         title3:"Unlimited Users",
         plan1:'ri-checkbox-circle-fill',
         plan2:'ri-checkbox-circle-fill',
         plan3:'ri-checkbox-circle-fill'
       },
       featureExtra:{
         title:"&#8358;500 per Extra User",
         title2:"&#8358;1,000 per Extra User",
         title3:"&#8358;2,000 per Extra User",
         plan1:'ri-checkbox-circle-fill',
         plan2:'ri-checkbox-circle-fill',
         plan3:'ri-checkbox-circle-fill'
       },
       featureHours:{
         title:"Business Hours",
         plan1:'ri-checkbox-circle-fill',
         plan2:'ri-checkbox-circle-fill',
         plan3:'ri-checkbox-circle-fill'
       },
       featureRecording:{
         title:"Call Recording",
         plan1:'ri-checkbox-circle-fill',
         plan2:'ri-checkbox-circle-fill',
         plan3:'ri-checkbox-circle-fill'
       },
       featureGreeting:{
         title:"Welcome Greeting (IVR)",
         plan1:'ri-checkbox-circle-fill',
         plan2:'ri-checkbox-circle-fill',
         plan3:'ri-checkbox-circle-fill'
       },
       featurePermissions:{
         title:"User Permissions",
         plan1:'ri-checkbox-circle-fill',
         plan2:'ri-checkbox-circle-fill',
         plan3:'ri-checkbox-circle-fill'
       },
       featureContacts:{
         title:"Shared Contacts",
         plan1:'ri-close-circle-fill text-danger',
         plan2:'ri-checkbox-circle-fill',
         plan3:'ri-checkbox-circle-fill'
       },
       featureNotes:{
         title:"Contact Notes",
         plan1:'ri-close-circle-fill text-danger',
         plan2:'ri-checkbox-circle-fill',
         plan3:'ri-checkbox-circle-fill'
       },
       featureConcurrent:{
         title:"No Concurrent Calls",
         title2:"Up to 3 calls at same time",
         title3:"Up to 5 calls at same time",
         plan1:'ri-close-circle-fill text-danger',
         plan2:'ri-checkbox-circle-fill',
         plan3:'ri-checkbox-circle-fill'
       },
       featureIntegrations:{
         title:"Integrations",
         plan1:'ri-close-circle-fill text-danger',
         plan2:'ri-checkbox-circle-fill',
         plan3:'ri-checkbox-circle-fill'
       },
       featureIntl:{
         title:"International Number",
         plan1:'ri-close-circle-fill text-danger',
         plan2:'ri-close-circle-fill text-danger',
         plan3:'ri-checkbox-circle-fill'
       },
     }
   }
  },
  computed: {
    currentUser() {
      return this.userStore.currentUser
    },
    activeNumber(){
      return this.numberStore.activeNumber
    },
    numbers() {
      return this.numberStore.numbers
    },
  },
  methods: {
    buildPaymentLink

  },
  setup() {
    const numberStore = useNumbersStore()
    const userStore = useUsersStore()
    return {
      numberStore, userStore
    }
  },
  mounted() {

  }
}
</script>

<style scoped>

</style>