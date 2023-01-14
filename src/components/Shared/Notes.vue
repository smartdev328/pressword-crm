<template>
  <ul class="list-group list-group-flush border-dashed">
    <NoteItem
        v-for="(note, i) in notes"
        :note="note"
        :key="i"
    />
  </ul>
  <!-- end -->
</template>

<script>
import NoteItem from "@/components/Notes/NoteItem.vue";
import NoResultsFound from "@/components/Shared/NoResultsFound.vue";

export default {
  name: "Notes",
  components: {
    NoResultsFound,
    NoteItem
  },
  props: {
    notes: Array
  },
}
</script>

<style scoped>

</style>