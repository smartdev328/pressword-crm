<template>
  <table class="table align-middle mb-0">
    <thead class="table-light">
    <tr>
      <th scope="col" style="width: 5px"></th> <!--Direction of call-->
      <th scope="col">Phone</th>
      <th scope="col">Duration</th>
      <th scope="col">Agent</th>
      <th scope="col">Time</th>
      <th scope="col">Actions</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(call, i) in calls" :key="i">
      <td style="width: 5px">
        <i class="mdi mdi-call-made" v-if="call.direction === 'outbound'"></i>
        <i class="mdi mdi-call-received" v-else></i>
      </td>
      <td>
        <a href="tel:+2348183948394" class="fw-semibold">
          {{call.recipient_number}}
        </a>
      </td>
      <td>
        {{formatCallDuration(call.duration_secs)}}
      </td>
      <td>
        <div class="d-flex gap-2 align-items-center">
          <div class="flex-shrink-0">
            <img
                src="@/assets/images/anonymous.png"
                alt=""
                class="avatar-xs rounded-circle"
            />
          </div>
          <div class="flex-grow-1">{{call.recipient_name || 'Unknown'}}</div>
        </div>
      </td>
      <td>{{formatCallTimestamp(call.last_modified)}}</td>
      <td>
        <ul class="list-inline hstack gap-2 mb-0">
          <li class="list-inline-item edit" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top"
              title="Call">
            <a href="#" class="text-muted d-inline-block" @click.prevent="callNumber(call.recipient_number)">
              <i class="ri-phone-line fs-16"></i>
            </a>
          </li>
        </ul>
      </td>
    </tr>
    </tbody>
  </table>
  <!-- end table -->
</template>

<script>
import moment from "moment";
import {buildWebdialerLink} from "@/helpers/utils";

export default {
  name: "CallsTable",
  props: {
    calls: Array
  },
  methods: {
    formatCallDuration(duration){
      return `${duration / 60}:${duration % 60}`
    },
    formatCallTimestamp(timestamp) {
      return moment(timestamp).format("ddd MMM, hh:mm a")
    },
    callNumber(mobile_number) {
      window.open(buildWebdialerLink(mobile_number), "_blank")
    }
  }
}
</script>

<style scoped>

</style>