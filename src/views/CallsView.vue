<template>
  <div class="page-content">
    <div class="container-fluid">
      <!-- start page title -->
      <div class="row">
        <div class="col-12">
          <div
              class="page-title-box d-sm-flex align-items-center justify-content-between"
          >
            <h5 class="mb-sm-0">Calls</h5>
          </div>
        </div>
      </div>
      <!-- end page title -->

      <div class="row">
<!--        <div class="col-lg-12">-->
<!--          <div class="card">-->
<!--            <div class="card-header">-->
<!--              <div class="d-flex align-items-center flex-wrap gap-2">-->
<!--                <div class="flex-grow-1">-->
<!--                </div>-->
<!--                <div class="flex-shrink-0">-->
<!--                  &lt;!&ndash;                  Action Button goes here&ndash;&gt;-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
        <!--end col-->
        <div class="col-12">
          <div class="card" id="callList">
            <div class="card-header">
              <div class="row g-3">
                <div class="col-md-4">
                  <form>
                    <select name="sortBy" id="sortBy" class="form-control">
                      <option value="">-- Sort By --</option>
                    </select>
                  </form>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div v-if="!isLoading">
                <template v-if="callsResponse.results?.length">
                  <CallsTable :calls="callsResponse.results"/>
                  <PaginationControl
                    :is-next-enabled="!!callsResponse?.next"
                    :is-previous-enabled="!!callsResponse?.previous"
                    :on-next="onNextPage"
                    :on-previous="onPreviousPage"
                  />
                </template>

                <NoResultsFound
                  v-else
                  description="Once you make a call or receive one, it would show up here. 😄"
                />
              </div>
              <Loading v-else/>
            </div>
          </div>
          <!--end card-->
        </div>
        <!--end col-->

        <!--end col-->
      </div>
      <!--end row-->
    </div>
  </div>
</template>

<script>
import * as Sentry from "@sentry/vue";

import CallsTable from "@/components/Shared/CallsTable.vue";
import NoResultsFound from "@/components/Shared/NoResultsFound.vue";
import {fetchUserCalls} from "@/helpers";
import {useNumbersStore} from "@/stores";
import Loading from "@/components/Shared/Loading.vue";
import PaginationControl from "@/components/Shared/PaginationControl.vue";

export default {
  name: "CallsView",
  components: {
    NoResultsFound,
    CallsTable,
    Loading,
    PaginationControl
  },
  data() {
    return {
      isLoading: false,
      callsResponse: {}
    }
  },
  setup() {
    const numbersStore = useNumbersStore()
    return {
      numbersStore
    }
  },
  methods: {
    async onNextPage(){
      await this.getCalls(this.callsResponse.next)
    },
    async onPreviousPage(){
      await this.getCalls(this.callsResponse.previous)
    },
    async getCalls(link){
      try {
        this.isLoading = true
        this.callsResponse = await fetchUserCalls(link)
      } catch (error) {
        console.log(error)
        Sentry.captureMessage("Error in CallsView");
        Sentry.captureException(error);
      } finally{
        this.isLoading = false
      }
    }
  },  
  async mounted() {
    await this.getCalls()
  }
}
</script>

<style scoped>

</style>