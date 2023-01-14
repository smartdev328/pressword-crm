<template>
  <div class="card" id="contact-view-detail" style="margin-bottom: 0; padding-bottom: 24px;">
    <div class="card-body text-center">
      <div class="position-relative d-inline-block">
        <img src="@/assets/images/anonymous.png" alt="" class="avatar-lg rounded-circle img-thumbnail shadow">
        <span class="contact-active position-absolute rounded-circle bg-success">
          <span class="visually-hidden"></span>
        </span>
      </div>
      <h5 class="mt-4 mb-1">{{member.receiver_name}}</h5>
      <p class="text-muted">{{member.receiver_role}}</p>

      <ul class="list-inline mb-0">
        <li class="list-inline-item avatar-xs">
          <a href="#" @click.prevent="$emit('updateTeamMember', this.member)" class="avatar-title bg-soft-primary text-primary fs-15 rounded">
            <i class="ri-pencil-line"></i>
          </a>
        </li>
        <li class="list-inline-item avatar-xs">
          <a href="#" @click.prevent="$emit('deleteTeamMember', this.member)" class="avatar-title bg-soft-danger text-danger fs-15 rounded">
            <i class="ri-delete-bin-2-line"></i>
          </a>
        </li>
      </ul>
    </div>
    <div class="card-body">
      <h6 class="text-muted text-uppercase fw-semibold mb-3">Other Details</h6>
      <div class="table-responsive table-card">
        <table class="table table-borderless mb-0">
          <tbody>
          <tr>
            <td class="fw-medium" scope="row">Phone Number</td>
            <td>{{member.phone_number}}</td>
          </tr>
          <tr>
            <td class="fw-medium" scope="row">Email</td>
            <td>{{member.receiver_email || "Unset"}}</td>
          </tr>
          <tr>
            <td class="fw-medium" scope="row">Ring Group Position</td>
            <td>{{ member.ring_group_position }}</td>
          </tr>
          <tr>
            <td class="fw-medium" scope="row">Permissions</td>
            <td>
              <span class="badge badge-soft-primary" v-for="(perm, i) in memberPermissions" :key="i">{{perm}}</span>
            </td>
          </tr>
          <tr>
            <td class="fw-medium" scope="row">Date Invited</td>
            <td>{{parseDate(member.date_invited)}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment/moment";
import {parseTeamMemberPermissionsAsStringArray} from "@/helpers/teamMembers";

export default {
  name: "TeamMemberDetails",
  props: {
    member: Object
  },
  methods: {
    parseDate(timestamp) {
      return moment(timestamp).fromNow()
    },
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