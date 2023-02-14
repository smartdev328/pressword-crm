<template>
  <div class="page-content">
    <div class="container-fluid">
      <!-- start page title -->
      <div class="row">
        <div class="col-12">
          <div
              class="page-title-box d-sm-flex align-items-center justify-content-between"
          >
            <h5 class="mb-sm-0">Team Members</h5>
          </div>
        </div>
      </div>
      <!-- end page title -->

      <div class="row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-header">
              <div class="d-flex align-items-center flex-wrap gap-2">
                <div class="flex-grow-1">
                </div>
                <div class="flex-shrink-0">
                  <div class="hstack text-nowrap gap-2">
                    <button class="btn btn-info add-btn" @click="showTeamMemberFormModal = true">
                      <i class="ri-add-fill me-1 align-bottom"></i> Add Team Member
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--end col-->
        <div class="col-12">
          <div class="card" id="contactList">
            <div class="card-header">
              <div class="row g-3">
                <div class="col-md-4">
                  <div class="search-box">
                    <input type="text" class="form-control search" v-model="searchQuery"
                           placeholder="Search for team member..." @keyup="searchTeamMember">
                    <i class="ri-search-line search-icon"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div>
                <div id="teamlist">
                  <template v-if="!isLoading">
                    <div class="table-responsive" v-if="teamMembers?.length">
                      <table class="table table-borderless table-nowrap align-middle mb-0">
                        <thead class="table-light">
                        <tr>
                          <th></th>
                          <th scope="col">Extension</th>
                          <th scope="col">Forwards To</th>
                          <th scope="col">User</th>
                          <th scope="col">Title</th>
                          <th scope="col">Permissions</th>
                          <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(member, i) in teamMembers" :key="i">
                          <td>
                            <a href="#" @click.prevent="setTeamMemberAsPrimary(member)" class="text-success fs-15 rounded">
                              <i class="ri-star-fill" v-if="member.is_primary_receiver" title="This is the primary receiver for the line. Click to toggle off."></i>
                              <i class="ri-star-line" v-else title="Not the primary receiver for the line. Click to make primary receiver."></i>
                            </a>
                          </td>
                          <td>{{ member.asterisk_extension }}</td>
                          <td>{{ member.phone_number }}</td>
                          <td>
                            <div class="d-flex gap-2 align-items-center">
                              <div class="flex-shrink-0">
                                <img src="@/assets/images/anonymous.png" alt="" class="avatar-xs rounded-circle" />
                              </div>
                              <div class="flex-grow-1">
                                {{ member.receiver_name }}
                              </div>
                            </div>
                          </td>
                          <td>{{ member.receiver_role }}</td>
                          <td class="text-success">
                            <div class="d-flex justify-content-center">
                              <span class="badge badge-label bg-primary" v-for="(perm, i) in memberPermissions(member)" :key="i">
                                <i class="mdi mdi-circle-medium"></i> {{ perm }}
                              </span>
                            </div>
                          </td>
                          <td>
                            <ul class="list-inline hstack gap-2 mb-0">
                              <li class="list-inline-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="View">
                                <a href="#" @click.prevent="viewTeamMember(member)" class="view-item-btn"><i class="ri-eye-fill align-bottom text-muted"></i></a>
                              </li>
                              <li class="list-inline-item edit" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Call">
                                <a href="#" @click.prevent="callTeamMember(member)" class="text-muted d-inline-block">
                                  <i class="ri-phone-line fs-16"></i>
                                </a>
                              </li>
                              <li class="list-inline-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Edit">
                                <a class="edit-item-btn" href="#" @click.prevent="openUpdateTeamMember(member)" data-bs-toggle="modal"><i class="ri-pencil-fill align-bottom text-muted"></i></a>
                              </li>
                              <li class="list-inline-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Delete">
                                <a class="remove-item-btn" data-bs-toggle="modal" @click.prevent="openDeleteTeamMember(member)">
                                  <i class="ri-delete-bin-fill align-bottom text-muted"></i>
                                </a>
                              </li>
                            </ul>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                      <!-- end table -->
                    </div>
                    <NoResultsFound
                        v-else
                        description="You do not have any team members yet. 😄"
                    />
                  </template>
                  <Loading v-else/>
                </div>
              </div>
            </div>
          </div>
          <!--end card-->
        </div>
        <!--end col-->
        <!--end col-->
      </div>
      <!--end row-->

      <Modal v-model="showTeamMemberFormModal" id="team-member-form-modal">
        <template v-slot:title>
          {{ !!teamMemberBeingUpdated ? 'Update Team Member' : 'New Team Member' }}
        </template>
        <TeamMemberForm
            @success="teamMemberFormSubmitted"
            @addExtension="showAddExtension"
            :team-member-being-updated="teamMemberBeingUpdated"
        />
      </Modal>
      <Modal 
        v-model="showAddExtensionModal" 
        :showTitle="false"
        id="add-extension-form-modal"
      >
        <div class="modal-body py-4 px-5">
          <div class="avatar-lg bg-light rounded-circle mx-auto d-flex align-items-center justify-content-center mt-4">
            <div class="airplay-wrap bg-info rounded-circle mx-auto d-flex align-items-center justify-content-center">
              <i class="ri-airplay-line text-white" :style="{ fontSize: '33px' }"></i>
            </div>
          </div>
          <h4 class="text-center fw-medium mt-4">Member Limit Exceeded</h4>
          <p class="text-center text-muted mb-0 px-1">
            Please note that adding more than 2 members in this plan would attract a charge of #500 for each person. Continue either way?
          </p>
        </div>
        <div class="modal-footer justify-content-center gap-2 flex-nowrap pb-5 pt-2 px-5">
          <button 
            type="button" 
            class="btn btn-light w-50 m-0"
            @click="showAddExtensionModal = false"
          >
            Cancel
          </button>
          <button 
            type="button" 
            class="btn btn-primary w-50 m-0" 
            @click="confirmAddExtensions"
          >
            Continue
          </button>
        </div>
      </Modal>

      <Modal
          v-model="showViewTeamMemberModal"
          id="team-member-details-modal"
      >
        <template v-slot:title>
          <h5>{{ teamMemberBeingUpdated?.receiver_name }}</h5>
        </template>
        <TeamMemberDetails
            :member="teamMemberBeingUpdated"
            @update-team-member="openUpdateTeamMember"
            @delete-team-member="openDeleteTeamMember"
            v-if="teamMemberBeingUpdated"
        />
      </Modal>

      <ConfirmationModal
          title="Are you sure you want to delete this team member?"
          confirm-text="Yes, please"
          v-model="showConfirmDeleteTeamMember"
          @confirm="confirmDeletion"
      />

    </div>
  </div>
</template>

<script>
import TeamMemberForm from "@/components/Teams/TeamMemberForm.vue";
import Modal from "@/components/Shared/Modal.vue";
import {deleteTeamMember, fetchTeamMembers, updateTeamMemberAsPrimary} from "@/helpers";
import NoResultsFound from "@/components/Shared/NoResultsFound.vue";
import Loading from "@/components/Shared/Loading.vue";
import TeamMemberDetails from "@/components/Teams/TeamMemberDetails.vue";
import ConfirmationModal from "@/components/Shared/ConfirmationModal.vue";
import {useNumbersStore} from "@/stores";
import { parseTeamMemberPermissionsAsStringArray } from "@/helpers/teamMembers";
import { buildWebdialerLink } from "@/helpers/utils";
import {useDialerStore} from "@/stores/dialer.store";
import {notify} from "@kyvg/vue3-notification";

export default {
  name: "TeamView",
  components: {
    TeamMemberForm,
    Modal,
    NoResultsFound,
    Loading,
    TeamMemberDetails,
    ConfirmationModal
  },
  data() {
    return {
      unfilteredTeamMembers: null,
      teamMembers: null,
      searchQuery: "",
      showTeamMemberFormModal: false,
      teamMemberBeingUpdated: null,
      isLoading: false,
      showViewTeamMemberModal: false,
      teamMemberBeingDeleted: null,
      showConfirmDeleteTeamMember: false,
      showAddExtensionModal: false
    }
  },
  methods: {
    searchTeamMember() {
      this.teamMembers = this.unfilteredTeamMembers?.filter(
          member => member.receiver_name.toLowerCase().includes(this.searchQuery.toLowerCase()) || member.phone_number.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    },
    async loadTeamMembers() {
      this.isLoading = true
      this.teamMembers = await fetchTeamMembers()
      this.unfilteredTeamMembers = [...this.teamMembers]
      this.isLoading = false
    },
    teamMemberFormSubmitted() {
      this.showTeamMemberFormModal = false
      this.loadTeamMembers()
    },
    viewTeamMember(member) {
      this.teamMemberBeingUpdated = member
      this.showViewTeamMemberModal = true
    },
    openUpdateTeamMember(member) {
      this.teamMemberBeingUpdated = member
      this.showViewTeamMemberModal = false
      this.showTeamMemberFormModal = true
    },
    openDeleteTeamMember(member) {
      this.teamMemberBeingDeleted = member
      this.showViewTeamMemberModal = false
      this.showConfirmDeleteTeamMember = true
    },
    async confirmDeletion() {
      await deleteTeamMember(this.teamMemberBeingDeleted.id)
      this.showConfirmDeleteTeamMember = false
      await this.loadTeamMembers()
    },
    async setTeamMemberAsPrimary(member) {
      await updateTeamMemberAsPrimary(member.id)
      await this.loadTeamMembers()
    },
    callTeamMember(member) {
      this.dialerStore.beginCall(member.phone_number)
    },
    memberPermissions(member) {
      return parseTeamMemberPermissionsAsStringArray(member)
    },
    showAddExtension(){
      this.showTeamMemberFormModal = false
      this.showAddExtensionModal = true
    },
    confirmAddExtensions(){
      fetch('https://pressone-staging.herokuapp.com/api/buy_additional_number_extensions/', {
        method: 'POST',
        body: JSON.stringify({
          "number": 1,
          "units_to_add": 10
        })
      })
      .then(async res => {
        if(res.status != 200){
          const { detail } = await res.json()
          throw new Error(detail)
        }
      })
      .catch(err => {
        notify({
          title: "Error",
          text: err,
          type: 'error'
        })
      })
      .finally(() => {
        this.showAddExtensionModal = false
      });
    }
  },
  async mounted() {
    await this.loadTeamMembers()
  },
  setup() {
    const numbersStore = useNumbersStore()
    const dialerStore = useDialerStore()
    return {
      numbersStore,
      dialerStore
    }
  }
}
</script>

<style scoped>
.airplay-wrap{
  width: 53px;
  height: 53px;
}
</style>