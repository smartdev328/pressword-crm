<template>
  <div @click="backgroundClick" :class="{modal: true, fade: true, show: modelValue}" :style="{display: modelValue ? 'block' : 'none', backgroundColor: 'rgba(0,0,0,0.6)'}" :id="id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0">
        <div class="modal-header bg-soft-info p-3">
          <h5 class="modal-title" :id="`${id}-header`">
            <slot name="title"></slot>
          </h5>
          <button @click="closeModal" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" :id="`${id}-close-modal`"></button>
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    modelValue: Boolean,
    id: String,
  },
  emits: ["update:modelValue"],
  methods: {
    closeModal() {
      this.$emit("update:modelValue", false)
    },
    backgroundClick (e) {
      if(e.target.id === this.id) {
        this.closeModal()
      }
    }
  }
}
</script>

<style scoped>

</style>