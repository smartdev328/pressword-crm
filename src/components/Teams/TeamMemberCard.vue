<template>
  <div class="card team-box">
    <div class="team-cover" style="margin-bottom: -115px;">
      <img src="@/assets/images/cover-pattern.png" alt="" class="img-fluid" style="height: 115px;">
    </div>
    <div class="card-body p-4">
      <div class="row align-items-center team-row">
        <div class="col-lg-4 col">
          <div class="team-profile-img">
            <div class="avatar-lg img-thumbnail rounded-circle flex-shrink-0">
              <img src="@/assets/images/anonymous.png" alt="" class="member-img img-fluid d-block rounded-circle">
            </div>
            <div class="team-content">
              <a class="member-name" data-bs-toggle="offcanvas" href="#" @click.prevent="viewTeamMember(member)" aria-controls="member-overview">
                <h5 class="fs-16 mb-1">{{ member.receiver_name }} <span class="ri-checkbox-circle-fill"></span></h5>
              </a>
              <p class="text-muted member-designation mb-0">{{ member.receiver_role }}</p>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col">
          <div class="row text-muted text-center">
            <div class="col-12 border-end border-end-dashed">
              <h5 class="mb-1 projects-num">{{ member.phone_number }}</h5>
              <p class="text-muted mb-0">Invited {{ parseDate(member.date_invited) }}</p>
            </div>
          </div>
        </div>
        <div class="col-lg-2 col">
          <div class="d-flex justify-content-center align-items-center mt-3">
            <span class="badge badge-label bg-primary" v-for="(perm, i) in memberPermissions" :key="i">
              <i class="mdi mdi-circle-medium"></i> {{ perm }}
            </span>
          </div>

          <ul class="list-inline mb-2 mt-4 d-flex align-items-center justify-content-between">
            <li class="list-inline-item avatar-xs d-flex align-items-center justify-content-center">
              <a href="#" @click.prevent="viewTeamMember(member)" class="text-primary fs-15 rounded">
                <i class="ri-eye-fill ri-2x"></i>
              </a>
            </li>
            <li class="list-inline-item avatar-xs d-flex align-items-center justify-content-center">
              <a href="#" @click.prevent="$emit('updateTeamMember', this.member)" class="text-primary fs-15 rounded">
                <i class="ri-pencil-line ri-2x"></i>
              </a>
            </li>
            <li class="list-inline-item avatar-xs d-flex align-items-center justify-content-center">
              <a href="#" @click.prevent="$emit('deleteTeamMember', this.member)" class="text-danger fs-15 rounded">
                <i class="ri-delete-bin-2-line ri-2x"></i>
              </a>
            </li>
            <li class="list-inline-item avatar-xs d-flex align-items-center justify-content-center">
              <a href="#" @click.prevent="$emit('setAsPrimary', this.member)" class="text-warning fs-15 rounded" title="Is Primary Receiver">
                <i class="ri-star-fill ri-2x" v-if="member.is_primary_receiver"></i>
                <i class="ri-star-line ri-2x" v-else></i>
              </a>
            </li>
          </ul>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import {parseTeamMemberPermissionsAsStringArray} from "@/helpers/teamMembers";
import TeamMemberDetails from "@/components/Teams/TeamMemberDetails.vue";

export default {
  name: "TeamMemberCard",
  components: {
    TeamMemberDetails
  },
  props: {
    member: Object
  },
  data() {
    return {
      showTeamMemberDetailsModal: false
    }
  },
  methods: {
    parseDate(timestamp) {
      return moment(timestamp).fromNow()
    },
    viewTeamMember(member) {
      this.$emit("viewTeamMember", member)
    }
  },
  computed: {
    memberPermissions() {
      return parseTeamMemberPermissionsAsStringArray(this.member)
    }
  }
}
</script>

<style scoped>

</style>