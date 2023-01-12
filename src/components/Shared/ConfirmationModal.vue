<template>
  <Modal id="confirm" v-model="showConfirmation">
    <div class="m-4 text-center">
      <h4 class="fs-semibold">{{ title }}</h4>
      <p class="text-muted fs-14 mb-4 pt-1">{{ description || "" }}</p>
      <div class="hstack gap-2 justify-content-center remove">
        <button
            @click="showConfirmation = false"
            class="btn btn-link link-success fw-medium text-decoration-none"
            id="deleteRecord-close"
            data-bs-dismiss="modal"
        >
          <i class="ri-close-line me-1 align-middle"></i> Close
        </button>
        <button class="btn btn-danger" @click="confirm">{{ confirmText || "Yes" }}</button>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from "@/components/Shared/Modal.vue";

export default {
  name: "ConfirmationModal",
  props: {
    modelValue: Boolean,
    confirmText: String,
    title: String,
    description: String
  },
  emits: ["update:modelValue"],
  components: {
    Modal
  },
  data() {
    return {
      showConfirmation: this.modelValue
    }
  },
  watch: {
    showConfirmation(newVal) {
      this.$emit("update:modelValue", newVal)
    },
    modelValue(newVal) {
      this.showConfirmation = newVal
    }
  },
  methods: {
    confirm() {
      this.$emit("confirm")
    }
  }
}
</script>

<style scoped>

</style>