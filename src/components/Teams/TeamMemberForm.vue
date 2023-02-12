<template>
  <NoResultsFound
    v-if="numberStore.hasNoNumber()"
    title="You don't have an active number"
    description="Purchase a number to setup your team."
  />
  <div v-else class="card card-height-100 mb-0">
    <div class="card-body p-4">
      <form action="javascript:void(0);" @submit="submitTeamMember">
        <div class="alert alert-danger shadow" role="alert" v-if="errorMessage">
          <strong> Error! </strong> {{ errorMessage }}
        </div>

        <div class="row">
          <template v-if="!isUpdate">
            <div class="col-12">
              <div class="mb-3">
                <label htmlFor="name-input" class="form-label">
                  Name
                </label>
                <input
                    type="text"
                    class="form-control"
                    placeholder="Name"
                    id="name-input"
                    v-model="teamMember.user_display_name"
                />
              </div>
            </div>
            <!--end col-->
            <div class="col-6">
              <div class="mb-3">
                <label htmlFor="mobile-input" class="form-label">
                  Mobile Number
                </label>
                <input
                    type="text"
                    class="form-control"
                    placeholder="Mobile Number"
                    id="mobile-input"
                    v-model="teamMember.mobile"
                />
              </div>
            </div>
            <!--end col-->
            <div class="col-6">
              <div class="mb-3">
                <label htmlFor="role-input" class="form-label">
                  Designation
                </label>
                <input
                    type="text"
                    class="form-control"
                    placeholder="Designation"
                    id="role-input"
                    v-model="teamMember.role"
                />
              </div>
            </div>

            <div class="col-12">
              <div class="mb-3">
                <label htmlFor="business-number-input" class="form-label">
                  Invite to
                </label>
                <select v-model="teamMember.business_number" class="form-select">
                  <template 
                    v-for="(number, i) in numberStore.numbers"
                    :key="i"
                  >
                    <option
                      v-if="number.business_number && number.business_number.phone_number"
                      :value="number.business_number.id"
                      :selected="number.business_number.id === teamMember.business_number"
                    >
                      {{ formatPhoneNumber(number.business_number.phone_number) }}
                    </option>
                  </template>
                </select>
              </div>
            </div>
          </template>

          <template v-else>
            <!--end col-->
            <div class="col-12">
              <div class="mb-3">
                <label htmlFor="name-input" class="form-label">
                  Name
                </label>
                <input
                    type="text"
                    class="form-control"
                    placeholder="Name"
                    id="name-input"
                    v-model="teamMemberUpdatePayload.receiver_name"
                />
              </div>
            </div>
          </template>

          <div class="col-lg-12">
            <div class="text-end">
              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
    <!-- end card body -->
  </div>
</template>

<!--TODO: Question why we have different payload names for adding and editing-->

<script>
import {useNumbersStore} from "@/stores";
import {addNewTeamMember, updateTeamMember} from "@/helpers";
import NoResultsFound from "@/components/Shared/NoResultsFound.vue";
import { formatPhoneNumber } from "@/helpers/utils";

export default {
  name: "TeamMemberForm",
  components: { NoResultsFound },
  props: {
    teamMemberBeingUpdated: Object
  },
  data() {
    return {
      errorMessage: null,
      teamMember: {
        mobile: "",
        user_display_name: "",
        role: "",
        business_number: this.numberStore.numbers[0]?.business_number?.id
      },
      teamMemberUpdatePayload: {
        receiver_name: ""
      },
      formatPhoneNumber: formatPhoneNumber
    }
  },
  watch: {
    teamMemberBeingUpdated: {
      handler(newVal) {
        if (newVal.receiver_name) {
          this.teamMemberUpdatePayload.receiver_name = newVal.receiver_name
        }
      },
      deep: true
    }
  },
  computed: {
    isUpdate() {
      return !!this.teamMemberBeingUpdated
    }
  },
  methods: {
    resetForm() {
      this.teamMember = {
        mobile: "",
        user_display_name: "",
        role: ""
      }
    },
    validateFields() {
      this.errorMessage = ""

      if (this.isUpdate) {
        if (!this.teamMemberUpdatePayload.receiver_name) {
          this.errorMessage = "Please complete all the fields."
        }
      } else {
        if (
            !this.teamMember.mobile ||
            !this.teamMember.user_display_name ||
            !this.teamMember.role
        ) {
          this.errorMessage = "Please complete all the fields."
        }
      }
    },
    async submitTeamMember() {
      this.validateFields()
      if (this.errorMessage) return

      try {
        if (this.isUpdate) {
          await updateTeamMember(this.teamMemberBeingUpdated.id, this.teamMemberUpdatePayload)
        } else {
          await addNewTeamMember(this.teamMember)
        }
      } catch (e) {
        console.log(e, 'error')
        if(String(e) == 'Receiver number limit exceeded'){
          this.resetForm()
          this.$emit("addExtension")
          return
        }else{
          this.errorMessage = String(e)
          return
        }
      }

      this.resetForm()
      this.$emit("success", null)
    }
  },
  setup() {
    const numberStore = useNumbersStore()
    return {
      numberStore
    }
  },
}
</script>

<style scoped>

</style>