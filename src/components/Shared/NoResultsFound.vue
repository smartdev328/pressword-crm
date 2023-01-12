<template>
  <div class="noresult mt-5 mb-3">
    <div class="text-center">
      <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop" colors="primary:#121331,secondary:#08a88a" style="width:75px;height:75px"></lord-icon>
      <h5 class="mt-2">{{ title || 'Sorry! No Result Found' }}</h5>
      <p class="text-muted mb-0">{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoResultsFound",
  props: {
    description: String,
    title: String
  }
}
</script>

<style scoped>

</style>