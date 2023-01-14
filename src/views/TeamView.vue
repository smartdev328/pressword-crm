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
                  <form @submit="searchTeamMember" class="search-box">
                    <input type="text" class="form-control search" v-model="searchQuery"
                           placeholder="Search for team member...">
                    <i class="ri-search-line search-icon"></i>
                  </form>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div>
                <div id="teamlist">
                  <template v-if="!isLoading">
                    <div class="team-list grid-view-filter row" id="team-member-list" v-if="teamMembers?.length">
                      <div class="col" v-for="(member, i) in teamMembers" :key="i">
                        <TeamMemberCard
                            :member="member"
                            @view-team-member="viewTeamMember"
                            @update-team-member="openUpdateTeamMember"
                            @delete-team-member="openDeleteTeamMember"
                            @set-as-primary="setTeamMemberAsPrimary"
                        />
                      </div>
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
          {{!!teamMemberBeingUpdated ? 'Update Team Member' : 'New Team Member'}}
        </template>
        <TeamMemberForm
            @success="teamMemberFormSubmitted"
            :team-member-being-updated="teamMemberBeingUpdated"
        />
      </Modal>

      <Modal
          v-model="showViewTeamMemberModal"
          id="team-member-details-modal"
      >
        <template v-slot:title>
          <h5>{{teamMemberBeingUpdated?.receiver_name}}</h5>
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
import TeamMemberCard from "@/components/Teams/TeamMemberCard.vue";
import TeamMemberForm from "@/components/Teams/TeamMemberForm.vue";
import Modal from "@/components/Shared/Modal.vue";
import {deleteTeamMember, fetchTeamMembers, updateTeamMemberAsPrimary} from "@/helpers";
import NoResultsFound from "@/components/Shared/NoResultsFound.vue";
import Loading from "@/components/Shared/Loading.vue";
import TeamMemberDetails from "@/components/Teams/TeamMemberDetails.vue";
import ConfirmationModal from "@/components/Shared/ConfirmationModal.vue";

export default {
  name: "TeamView",
  components: {
    TeamMemberForm,
    TeamMemberCard,
    Modal,
    NoResultsFound,
    Loading,
    TeamMemberDetails,
    ConfirmationModal
  },
  data() {
    return {
      teamMembers: null,
      searchQuery: "",
      showTeamMemberFormModal: false,
      teamMemberBeingUpdated: null,
      isLoading: false,
      showViewTeamMemberModal: false,
      teamMemberBeingDeleted: null,
      showConfirmDeleteTeamMember: false
    }
  },
  methods: {
    searchTeamMember() {

    },
    async loadTeamMembers() {
      this.isLoading = true
      this.teamMembers = await fetchTeamMembers()
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
    }
  },
  async mounted() {
    await this.loadTeamMembers()
  }
}
</script>

<style scoped>

</style>