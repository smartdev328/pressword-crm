<template>
  <div class="text-center m-5">
    <div class="text-primary">
      <i class="mdi mdi-loading mdi-spin fs-20 align-middle me-2"></i> {{text || '⏳ Loading...'}}
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading",
  props: {
    text: String
  }
}
</script>

<style scoped>

</style>