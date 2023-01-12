<template>
  <div :class="cardClass">
    <h5 class="text-muted text-uppercase fs-13">
      {{title}}
      <i
          class="ri-arrow-up-circle-line text-success fs-18 float-end align-middle"
      ></i>
    </h5>
    <div class="d-flex align-items-center">
      <div class="flex-shrink-0">
        <i
            :class="`${iconClass} display-6 text-muted`"
        ></i>
      </div>
      <div class="flex-grow-1 ms-3">
        <h2 class="mb-0">
          {{valuePrefix}}
          <span class="counter-value" :data-target="animateValue ? '0' : value"
          >{{value}}</span>
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StatCard",
  props: {
    cardClass: String,
    title: String,
    valuePrefix: String,
    value: Number,
    animateValue: Boolean,
    iconClass: String
  }
}
</script>

<style scoped>

</style>