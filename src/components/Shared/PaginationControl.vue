<template>
  <div class="d-flex justify-content-end mt-3">
    <div class="pagination-wrap hstack gap-2">
      <a :class="['page-item', 'pagination-prev', !isPreviousEnabled && 'disabled']" href="#" @click.prevent="onPrevious">
        Previous
      </a>
      <ul class="pagination listjs-pagination mb-0"></ul>
      <a :class="['page-item', 'pagination-next', !isNextEnabled && 'disabled']" href="#" @click.prevent="onNext">
        Next
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaginationControl",
  props: {
    onNext: Function,
    onPrevious: Function,
    isNextEnabled: Boolean,
    isPreviousEnabled: Boolean
  },
}
</script>

<style scoped>

</style>