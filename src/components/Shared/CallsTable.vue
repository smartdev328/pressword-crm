<template>
  <div>
    <table class="table align-middle mb-0">
      <thead class="table-light">
      <tr>
        <th scope="col" style="width: 5px"></th> <!--Direction of call-->
        <th scope="col">Phone</th>
        <th scope="col">Duration</th>
        <th scope="col" v-show="!hideAgent">Agent</th>
        <th scope="col">Time</th>
        <th scope="col">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(call, i) in callList" :key="i">
        <td style="width: 5px">
          <i class="mdi mdi-call-made" v-if="call.direction === 'outbound'" title="Outgoing Call"></i>
          <i class="mdi mdi-call-received" title="Incoming Call" v-else></i>
        </td>
        <td>
          <a href="#" @click.prevent="callNumber(call.recipient_number)" class="fw-semibold">
            {{ formatPhoneNumber(call.recipient_number, call.recipient_name) }}
          </a>
        </td>
        <td>
          {{ formatCallDuration(call.duration_secs) }}
        </td>
        <td v-show="!hideAgent">
          <div class="d-flex gap-2 align-items-center">
            <div class="flex-shrink-0">
              <img
                  src="@/assets/images/anonymous.png"
                  alt=""
                  class="avatar-xs rounded-circle"
              />
            </div>
            <div class="flex-grow-1">{{ call.user || 'Unknown' }}</div>
          </div>
        </td>
        <td>{{ formatCallTimestamp(call.last_modified) }}</td>
        <td>
          <ul class="list-inline hstack gap-2 mb-0">
            <li class="list-inline-item edit" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top"
                title="Play Recording">
              <a href="#" class="text-muted d-inline-block" @click.prevent="playCall(call.recording)">
                <i class="ri-pause-circle-fill fs-20" v-if="currentlyPlayingUrl === call.recording && isPlayingAudio"></i>
                <i class="ri-play-circle-line fs-20" v-else></i>
              </a>
            </li>
            <li class="list-inline-item edit" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top"
                title="Call">
              <a href="#" class="text-muted d-inline-block" @click.prevent="callNumber(call.recipient_number)">
                <i class="ri-phone-line fs-20"></i>
              </a>
            </li>
            <li class="list-inline-item edit" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top"
                title="See Notes">
              <a href="#" class="text-muted d-inline-block" @click.prevent="openNotes(call)">
                <i class="ri-sticky-note-2-line fs-20"></i>
              </a>
            </li>
          </ul>
        </td>
      </tr>
      </tbody>
    </table>
    <Modal v-model="showNotesModal" id="notes-modal">
      <template v-slot:title>
        <h5>Notes with {{ callToShowNotes?.recipient_name || callToShowNotes?.recipient_number }}</h5>
      </template>
      <div class="m-4">
        <Notes
            :notes="callToShowNotes?.call_notes"
        />
      </div>
    </Modal>
  </div>
  <!-- end table -->
</template>

<script>
import moment from "moment";
import {Howl} from "howler";
import { buildWebdialerLink, formatPhoneNumber } from "@/helpers/utils";
import Modal from "@/components/Shared/Modal.vue";
import Notes from "@/components/Shared/Notes.vue";
import {useNumbersStore} from "@/stores";
import {useDialerStore} from "@/stores/dialer.store";

export default {
  name: "CallsTable",
  components: {
    Modal,
    Notes
  },
  props: {
    calls: Array,
    limit: 0,
    hideAgent: false
  },
  data() {
    return {
      showNotesModal: false,
      callToShowNotes: null,
      howlPlayer: null,
      currentlyPlayingUrl: null,
      isPlayingAudio: false
    }
  },
  computed:{
    // Table connects to callList. since it can be limited to any number of calls (for recent calls implementation)
    callList(){
      return this.limit ? this.calls.slice(0,this.limit) : this.calls;
    }
  },
  methods: {
    formatPhoneNumber,
    formatCallDuration(duration) {
      if(duration < 3600)
        return new Date(duration * 1000).toISOString().substring(14, 19)
      else
        return new Date(duration * 1000).toISOString().substring(11, 16)
    },
    formatCallTimestamp(timestamp) {
      return moment(timestamp).format("ddd MMM, hh:mm a")
    },
    callNumber(mobile_number) {
      this.dialerStore.beginCall(mobile_number)
    },
    openNotes(call) {
      this.callToShowNotes = call
      this.showNotesModal = true
    },
    playCall(url) {
      if (url === this.currentlyPlayingUrl) {
        if (this.isPlayingAudio) {
          this.howlPlayer.stop()
          this.isPlayingAudio = false
        }
        else {
          // Resume if it's same one paused
          this.howlPlayer.play()
          this.isPlayingAudio = true
        }
      } else {
        if(this.howlPlayer) {
          this.howlPlayer.stop()
        }
        this.currentlyPlayingUrl = url
        this.howlPlayer = new Howl({
          src: [url]
        })
        this.howlPlayer.play()
        this.isPlayingAudio = true
        this.howlPlayer.on("end", () => {
          this.currentlyPlayingUrl = ""
          this.isPlayingAudio = false
        })
      }
    }
  },
  setup () {
    const numberStore = useNumbersStore()
    const dialerStore = useDialerStore()
    return {
      numberStore,
      dialerStore
    }
  }
}
</script>

<style scoped>

</style>