<template>
  <textarea 
    name="" 
    id="" 
    cols="30" 
    rows="3"
    class="w-100 custom font-urbanist text-sm"
    :placeholder="props.placeholder"
    :value="props.modelValue" 
    @input="updateValue"
  ></textarea>
</template>

<script setup>
const props = defineProps({
  placeholder: String,
  modelValue: String,
})
const emit = defineEmits(['update:modelValue'])

const updateValue = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>

<style scoped>
.custom{
  background: #FFFFFF;
  border: 1px solid #EEEEEE;
  border-radius: 4px;
  padding: 12px 16px;
  outline: none;
  resize: none;
}
.custom::placeholder{
  color: #CCD3D9;
}
</style>