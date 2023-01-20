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
                      explanation="This is your call credit balance. You may top-up your balance at anytime."
                  />
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
                      explanation="Total number of calls dialed and received in the last 7 days. Does not include missed calls."
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
                      explanation="Average number of calls per agent or employee"
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
                <CallsTable
                    :calls="calls" :limit="5" :hide-agent="true"
                    v-if="calls?.length"
                />
                <NoResultsFound
                    v-else
                    description="Once you make a call or receive one, it would show up here. 😄"
                />
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
import {fetchCallNotes, fetchUserCalls} from "@/helpers";
import NoResultsFound from "@/components/Shared/NoResultsFound.vue";
import { userJustJoined } from "@/helpers/utils";

export default {
  name: "HomeView",
  components: {
    UserProfile,
    StatCard,
    CallsTable,
    ContactForm,
    Notes,
    NoResultsFound
  },
  computed: {
    currentUser() {
      return this.userStore.currentUser
    }
  },
  data() {
    return {
      notes: null,
      calls: null
    }
  },
  methods: {},
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
    if(userJustJoined(this.currentUser.first_name, this.currentUser.last_name, this.currentUser.date_joined))
    {
      this.$router.push('complete-signup')
      return
    }
    if(this.currentUser.receivers.length === 0){
      this.$router.push('pricing')
      return;
    }
    this.calls = await fetchUserCalls()
    this.notes = await fetchCallNotes()
  },
};
</script>

<style scoped>
.home-card {
  max-height: 350px;
  overflow-y: scroll;
}
</style>
