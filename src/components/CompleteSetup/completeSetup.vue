<template>
  <headSection head="Complete setup">
    This would help us know how to serve you best
  </headSection>
  <formSection class="mt-5" :list="radioList" @submit="submit"/>
</template>

<script setup>
import headSection from '@/components/CompleteSetup/head.vue';
import formSection from '@/components/CompleteSetup/form.vue';

const emit = defineEmits(['submit'])
const radioList = [
  {
    text: 'Sales Optimization',
    value: 'sales'
  },
  {
    text: 'Customer Support Optimization',
    value: 'support'
  },
  {
    text: 'Customer Management Optimization',
    value: 'management'
  },
  {
    text: 'Other',
    value: 'other'
  }
]

const submit = (value) => emit('submit', value)
</script>

<style scoped>

</style>