<template>
  <div class="form-check d-flex align-items-center cursor-pointer">
    <input 
      class="form-check-input cursor-pointer" 
      type="radio" 
      :value="props.item"
      :id="props.item.value"
      :name="props.item.value"
      :required="props.required"
      :checked="props.item.value == props.modelValue?.value"
      @change="updateValue(props.item)"
    />
    <label 
      class="form-check-label mb-0 cursor-pointer font-urbanist text-base text-sub-heding mb-0" 
      :for="props.item.value"
    > 
      {{ props.item.text }}
    </label>
  </div>
</template>

<script setup>
  const props = defineProps({
    item: Object,
    required: {
      type: Boolean,
      default: false
    },
    modelValue: Object
  })
  const emit = defineEmits(['update:modelValue'])

  const updateValue = (item) => {
    emit('update:modelValue', item)
  }
</script>

<style scoped>
.form-check-input{
  width: 20px;
  height: 20px;
  margin-right: 4px;
  border-color: #D9E2E7;
  border-width: 2px;
  position: relative;
}
.form-check-input:checked {
  background-color: transparent !important;
  border-color: #0E99D2 !important;
}
.form-check-input:after{
  content: '';
  width: 10px;
  height: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -5px;
  margin-top: -5px;
  background-color: #0E99D2;
  opacity: 0;
  border-radius: 100%;
}
.form-check-input:checked:after{
  opacity: 1;
}
.form-check-label {
  padding-left: 0.375rem;
}
</style>