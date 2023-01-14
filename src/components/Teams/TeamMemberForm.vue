<template>
  <div class="card card-height-100 mb-0">
    <div class="card-body p-4">
      <form action="javascript:void(0);" @submit="submitTeamMember">
        <div class="alert alert-danger shadow" role="alert" v-if="errorMessage">
          <strong> Error! </strong> {{ errorMessage }}
        </div>

        <div class="row" v-if="!isUpdate">
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

          <!--end col-->
          <div class="col-lg-12">
            <div class="text-end">
              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
          <!--end col-->
        </div>
        <!--end row-->
        <div class="row" v-else>
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

export default {
  name: "TeamMemberForm",
  props: {
    teamMemberBeingUpdated: Object
  },
  data() {
    return {
      errorMessage: null,
      teamMember: {
        mobile: "",
        user_display_name: "",
        role: ""
      },
      teamMemberUpdatePayload: {
        receiver_name: this.teamMemberBeingUpdated?.receiver_name || ""
      }
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
          await addNewTeamMember({
            ...this.teamMember,
            business_number: this.numberStore.activeNumber?.id
          })
        }
      } catch (e) {
        this.errorMessage = String(e)
        return
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