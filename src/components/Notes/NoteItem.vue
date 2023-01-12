<template>
  <li class="list-group-item ps-0">
    <div class="row align-items-center g-3">
      <div class="col-auto">
        <div
            class="avatar-sm p-1 py-2 h-auto bg-light rounded-3 shadow"
        >
          <div class="text-center">
            <h5 class="mb-0">{{parseNoteDate(note.last_modified).day}}</h5>
            <div class="text-muted">{{parseNoteDate(note.last_modified).weekDay}}</div>
          </div>
        </div>
      </div>
      <div class="col">
        <h5 class="text-muted mt-0 mb-1 fs-13">{{parseNoteTime(note.last_modified)}} - Call with {{note.contact_number}}</h5>
        <a href="#" class="text-reset fs-14 mb-0">
          {{note.note}}
        </a>
      </div>
      <div class="col-sm-auto"></div>
    </div>
    <!-- end row -->
  </li>
</template>

<script>
import moment from "moment";

export default {
  name: "NoteItem",
  props: {
    note: Object
  },
  methods: {
    parseNoteDate(timestamp) {
      const parsedMoment = moment(timestamp)
      return {
        weekDay: parsedMoment.format("ddd"),
        day: parsedMoment.format("DD")
      }
    },
    parseNoteTime (timestamp) {
      const parsedMoment = moment(timestamp)
      return parsedMoment.format("hh:mma")
    }
  }
}
</script>

<style scoped>

</style>