<template>
  <div class="w-100">
    <h1 class="text-center text-head font-recoleta-bold text-darker mb-1">
      {{ props.head }}
    </h1>
    <p class="text-center font-urbanist text-base text-grey">
      <slot></slot>
    </p>
  </div>
</template>

<script setup>

const props = defineProps({
  head: String,
  subHead: String
})
</script>

<style scoped>

</style>