<template>
  <div class="page-content">
    <div class="container-fluid">
      <!-- start page title -->
      <div class="row">
        <div class="col-12">
          <div class="page-title-box d-sm-flex align-items-center justify-content-between">
            <h5 class="mb-sm-0">Home</h5>
            <!-- For when we need to implement breadcrumb
            <div class="page-title-right">
              <ol class="breadcrumb m-0">
                <li class="breadcrumb-item"><a href="javascript: void(0);">{{ this.numbersStore.activeNumberLabel }}</a>
                </li>
                <li class="breadcrumb-item active">Home</li>
              </ol>
            </div>
            -->

          </div>
        </div>
      </div>
      <!-- end page title -->

      <div class="row">
        <div class="col-xl-12">
          <div class="card crm-widget">
            <div class="card-body p-0">
              <div class="row row-cols-xxl-3 row-cols-md-3 row-cols-1 g-0">
                <div class="col">
                  <StatCard
                      card-class="py-4 px-3"
                      title="Available Balance"
                      value-prefix="₦"
                      :value="parseFloat(currentUser.balance)"
                      :animate-value="false"
                      icon-class="ri-exchange-dollar-line"
                  >
                    <template v-slot:button>
                      <button class="btn btn-info add-btn ms-5" @click="topUpModal = true">
                        Top Up Airtime
                      </button>
                    </template>
                  </StatCard>
                </div>
                <!-- end col -->
                <div class="col">
                  <StatCard
                      card-class="mt-3 mt-md-0 py-4 px-3"
                      title="Total Calls"
                      value-prefix=""
                      :value="calls?.length || 0"
                      :animate-value="false"
                      icon-class="ri-contacts-book-line"
                  />
                </div>
                <!-- end col -->
                <div class="col">
                  <StatCard
                      card-class="mt-3 mt-md-0 py-4 px-3"
                      title="Avg Calls Per User (last 7 days)"
                      value-prefix=""
                      :value="calls?.length || 0"
                      :animate-value="false"
                      icon-class="ri-team-line"
                  />
                </div>
                <!-- end col -->
              </div>
              <!-- end row -->
            </div>
            <!-- end card body -->
          </div>
          <!-- end card -->
        </div>
        <!-- end col -->
      </div>
      <!-- end row -->

      <div class="row">
        <div class="col-xl-7">
          <div class="card">
            <div class="card-header align-items-center d-flex">
              <h4 class="card-title mb-0 flex-grow-1">Recent Calls</h4>
            </div>
            <!-- end card header -->

            <div class="card-body home-card">
              <div class="table-responsive">
                <template v-if="!isLoadingCalls">
                  <CallsTable
                      :calls="calls" :limit="5" :hide-agent="true"
                      v-if="calls?.length"
                  />
                  <NoResultsFound
                      v-else
                      description="Once you make a call or receive one, it would show up here. 😄"
                  />
                </template>

                <Loading v-else/>
              </div>
              <!-- end table responsive -->
            </div>
            <!-- end card body -->
          </div>
          <!-- end card -->
        </div>
        <!-- end col -->

        <div class="col-xl-5">
          <div class="card">
            <div class="card-header align-items-center d-flex">
              <h4 class="card-title mb-0 flex-grow-1">Recent Notes</h4>
            </div>
            <!-- end card header -->
            <template v-if="!isLoadingNotes">
              <div class="card-body home-card pt-0">
                <Notes
                    :notes="notes.results"
                    v-if="notes?.results?.length"
                />
                <NoResultsFound
                    v-else
                    description="Add notes to your calls and they'd show up here. 😄"
                />
              </div>
            </template>
            <Loading v-else/>
            <!-- end card body -->
          </div>
          <!-- end card -->
        </div>
        <!-- end col -->

        <div class="col-xl-7">
          <div class="card card-height-100 mb-0">
            <div class="card-header align-items-center d-flex">
              <h4 class="card-title mb-0 flex-grow-1">Quick Contact Add</h4>
            </div>

            <div class="card-body home-card p-4">
              <ContactForm/>
            </div>
          </div>
        </div>
        <!-- end col -->

        <div class="col col-xl-5">
          <div class="card card-height-100 mb-0">
            <div class="card-header align-items-center d-flex">
              <h4 class="card-title mb-0 flex-grow-1">User Profile</h4>
            </div>

            <div class="card-body home-card p-4">
              <UserProfile/>
            </div>
          </div>
        </div>
      </div>
      <!-- end row -->
    </div>

    <Modal
      v-model="topUpModal"
      id="team-member-details-modal"
    >
      <template v-slot:title>
        Top Up Airtime
      </template>
      <form @submit.prevent="topUpPayment">
        <div class="modal-body py-4 px-3">
          <div class="col-12 mb-4">
            <label class="form-label">
              Amount
            </label>
            <div class="input-group">
              <span class="input-group-text" id="top-up-amount-aria">NGN</span>
              <input 
                v-model="topUpAmount"
                type="number" 
                step="1"
                min="1"
                class="form-control" 
                placeholder="0.00" 
                aria-label="0.00" 
                aria-describedby="top-up-amount-aria"
                required
              >
            </div>
          </div>
          <div class="col-12">
            <label class="form-label">
              Note
            </label>
            <p class="text-muted mb-0">
              You will be directed to purchase airtime with your debit card. Please ensure you input the right details to complete purchase.
            </p>
          </div>
        </div>

        <div class="modal-footer justify-content-end gap-2 pb-3 px-3">
          <button 
            type="button" 
            class="btn btn-light"
            @click="topUpModal = false"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            class="btn btn-primary"
          >
            Continue to Payment
          </button>
        
        </div>
      </form>
    </Modal>

    <ModalSuccess 
      v-model="topUpModalSuccess"
      id="charge-success"
      title="Airtime Top Up Successful"
      text="You have successfully topped up your airtime balance. Talk more with PressOne."
    />
    <ModalError
      v-model="topUpModalError" 
      id="charge-error"
      title="Airtime Top Up Failed"
      text="Your airtime top up failed due to an issue with your bank. Please contact your bank and try again."
      btnText="Okay"
    />
    <!-- container-fluid -->
  </div>
  <!-- End Page-content -->
</template>

<script>
import StatCard from "@/components/Home/StatCard.vue";
import CallsTable from "@/components/Shared/CallsTable.vue";
import {useUsersStore, useNumbersStore} from "@/stores";
import ContactForm from "@/components/Shared/ContactForm.vue";
import Notes from "@/components/Shared/Notes.vue";
import UserProfile from "@/components/Home/UserProfile.vue";
import { fetchCallNotes, fetchUserCalls, isCardExsist, cargeCardAuth, cargeNewCard, verifyTopUpPayment } from "@/helpers";
import NoResultsFound from "@/components/Shared/NoResultsFound.vue";
import { userJustJoined } from "@/helpers/utils";
import Loading from "@/components/Shared/Loading.vue";
import Modal from "@/components/Shared/Modal.vue";
import ModalSuccess from "@/components/Shared/ModalSuccess.vue";
import ModalError from "@/components/Shared/ModalError.vue";

export default {
  name: "HomeView",
  components: {
    UserProfile,
    StatCard,
    CallsTable,
    ContactForm,
    Notes,
    NoResultsFound,
    Loading,
    Modal,
    ModalSuccess,
    ModalError
  },
  computed: {
    currentUser() {
      return this.userStore.currentUser
    }
  },
  data() {
    return {
      notes: null,
      calls: null,
      isLoadingCalls: false,
      isLoadingNotes: false,
      topUpModal: false,
      topUpModalSuccess: false,
      topUpModalError: false,
      topUpAmount: null
    }
  },
  methods: {
    async topUpPayment(){
      this.topUpModal = false
      try {
        const isExsistData = await isCardExsist(this.currentUser.id)
        let response = null
        if(isExsistData && isExsistData.length){
          response = await cargeCardAuth({ amount: this.topUpAmount })
          if(response.status.toUpperCase() == 'SUCCESSFUL') {
            this.topUpModalSuccess = true
            setTimeout(async () => {
              await this.userStore.updateUserBalance(this.currentUser.id)
            }, 1000);
          }else{
            this.topUpModalError = true
          }
        }else{
          response = await cargeNewCard({ amount: this.topUpAmount })
          window.open(response.temp_authorization_url, '_blank')
          this.checkPaymentStatus(response.ref)
        }
      } catch (error) {
        this.topUpModalError = true
        console.log(error)
      } finally{
        this.topUpAmount = null
      }
    },
    checkPaymentStatus(ref){
      const interval = setInterval(async () => {
        const response = await verifyTopUpPayment(ref)
        if(response.staus == 'SUCCESSFUL'){
          this.topUpModalSuccess = true
          setTimeout(async () => {
            await this.userStore.updateUserBalance(this.currentUser.id)
          }, 1000);
        }
        else if(response.staus == 'FAILED') this.topUpModalError = true
        if(response.staus == 'SUCCESSFUL' || response.staus == 'FAILED') clearInterval(interval)
      }, 1000);
    }
  },
  setup() {
    const numbersStore = useNumbersStore()
    const userStore = useUsersStore()
    return {
      numbersStore,
      userStore
    }
  },
  async mounted() {
    //if user just joined, redirect to complete sign up.
    // if(userJustJoined(this.currentUser.first_name, this.currentUser.last_name, this.currentUser.date_joined))
    // {
    //   this.$router.push('complete-signup')
    //   return
    // }
    if(this.currentUser.receivers.length === 0){
      this.$router.push('pricing')
      return;
    }
    this.isLoadingCalls = true
    this.isLoadingNotes = true

    try {
      this.calls = await fetchUserCalls()
    } catch (error) {
      console.log(error)
    }finally{
      this.isLoadingCalls = false
    }
    
    try {
      this.notes = await fetchCallNotes()
    } catch (error) {
      console.log(error)
    }finally{
      this.isLoadingNotes = false
    }

    await this.userStore.updateUserBalance(this.currentUser.id)
  },
};
</script>

<style scoped>
.home-card {
  max-height: 350px;
  overflow-y: scroll;
}
</style>
