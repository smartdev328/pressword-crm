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
                <CallsTable
                  :calls="calls"
                  v-if="calls?.length"
                />
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
import CallsTable from "@/components/Shared/CallsTable.vue";
import NoResultsFound from "@/components/Shared/NoResultsFound.vue";
import {fetchUserCalls} from "@/helpers";
import {useNumbersStore} from "@/stores";
import Loading from "@/components/Shared/Loading.vue";

export default {
  name: "CallsView",
  components: {
    NoResultsFound,
    CallsTable,
    Loading
  },
  data() {
    return {
      calls: null,
      isLoading: false,
    }
  },
  setup() {
    const numbersStore = useNumbersStore()
    return {
      numbersStore
    }
  },
  async mounted() {
    try {
      this.isLoading = true
      this.calls = await fetchUserCalls()
    } catch (error) {
      console.log(error)
    } finally{
      this.isLoading = false
    }
  }
}
</script>

<style scoped>

</style>