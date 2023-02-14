<template>
  <div 
    @click="backgroundClick" 
    :class="{modal: true, fade: true, show: props.modelValue}" 
    :style="{display: props.modelValue ? 'block' : 'none', backgroundColor: 'rgba(0,0,0,0.6)'}" 
    :id="props.id" 
    tabindex="-1" 
    aria-labelledby="exampleModalLabel" 
    aria-hidden="true"
  >
    <div 
      class="modal-dialog modal-dialog-centered"
      :class="[props.modalClass]"
    >
      <div class="modal-content border-0">
        <div class="modal-body p-4">
          <div class="avatar-lg bg-light rounded-circle mx-auto d-flex align-items-center justify-content-center mt-4">
            <i class="ri-checkbox-circle-fill text-green" :style="{ fontSize: '60px' }"></i>
          </div>
          <h4 class="text-center fw-medium mt-4">{{ props.title }}</h4>
          <p class="text-center text-muted mb-0">
            {{ props.text }}
          </p>

          <button type="button" class="btn btn-primary w-100 mt-4" @click="closeModal">
            {{ props.btnText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  modelValue: Boolean,
  id: String,
  modalClass: String,
  title: String,
  text: String,
  btnText: {
    type: String,
    default: 'Done'
  }
})

const emit = defineEmits(['update:modelValue'])

const closeModal = () =>  emit("update:modelValue", false)
const backgroundClick = (e) => {
  if(e.target.id === props.id) {
    closeModal()
  }
}
</script>

<style lang="scss" scoped>

</style>
<script> export default { name: 'ModalSuccess' } </script>