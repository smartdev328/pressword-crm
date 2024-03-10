<template>
  <form class="form-wrap bg-white" @submit.prevent="submit">
    <p class="font-urbanist-md text-base text-sub-heding mb-0">
      What do you want PressWorld to do for you?
    </p>

    <radioBtn 
      v-for="(item, index) in list"
      v-model="checkedRadio"
      :key="`${index}-key`"
      class="mt-3"
      :item="item"
    />

    <p class="font-urbanist-md text-base text-sub-heding mt-4 mb-3">
      Tell us more? (Optional)
    </p>
    <texteareaInput 
      v-model="comment"
      placeholder="Active"
    />

    <div class="d-flex justify-content-end btn-wrap">
      <button class="btn btn-success btn-lg font-urbanist " type="submit">
        Submit
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import radioBtn from '@/components/form-items/radio-btn.vue'
import texteareaInput from '@/components/form-items/textarea.vue'

const props = defineProps({
  list: Array
})
const emit = defineEmits(['submit'])
const checkedRadio = ref(props.list[0])
const comment = ref('')

const submit = ()=> emit('submit', {
  checkedRadio: checkedRadio.value,
  comment: comment.value
})
</script>

<style scoped>
.form-wrap{
  padding: 32px;
  border: 1px solid rgba(17, 54, 69, 0.05);
  box-shadow: 0px 2px 8px rgba(21, 31, 50, 0.15);
  border-radius: 6px;
}
.btn-wrap{
  margin-top: 36px;
}
</style>