<template>
  <div :class="cardClass">
    <div class="d-inline-block">
      <h5 class="d-flex align-items-center text-muted text-uppercase fs-13">
        {{title}}
        <i
          class="ri-information-fill fs-18 align-middle ms-2"
          :title=explanation
          data-bs-toggle="tooltip" data-bs-placement="bottom"
        ></i>
      </h5>
      <div class="d-flex align-items-center">
        <div class="flex-shrink-0">
          <i :class="`${iconClass} display-6 text-muted`"></i>
        </div>
        <div class="flex-grow-1 ms-3">
          <h2 class="mb-0">
            {{valuePrefix}}
            <span class="counter-value" :data-target="animateValue ? '0' : value">
              {{value}}
            </span>
          </h2>
        </div>
        <slot name="button"></slot>
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
    iconClass: String,
    explanation: String
  }
}
</script>

<style scoped>

</style>