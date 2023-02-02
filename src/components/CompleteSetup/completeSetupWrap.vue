<template>
  <div class="wrapper d-flex flex-column">
    <div class="bg-white header-shadow header"></div>
    <div class="main d-flex flex-wrap justify-content-center">
      <div class="row w-100 justify-content-center">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <component 
            :is='components[currentView]' 
            :key="currentView"
            @submit="submit"
          ></component>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import completeSetup from '@/components/CompleteSetup/completeSetup.vue'
import choosePlan from '@/components/CompleteSetup/choosePlan.vue'

const emit = defineEmits(['finish'])

const router = useRouter()

let currentView = ref('completeSetup')
const components = {
  completeSetup,
  choosePlan
}

const submit = (value) => {
  console.log(value)
  if(value.nextStep) currentView.value = value.nextStep
  else emit('finish')
}
</script>

<style scoped>
.wrapper{
  min-height: 100vh;
}
.main{
  flex-grow: 1;
  background-color: #F6F9FF;
  padding-top: 80px;
  padding-bottom: 100px;
}
.header-shadow{
  box-shadow: 0px 2px 12px rgba(21, 31, 50, 0.1);
  z-index: 1;
}
.header{
  height: 10vh;
  min-height: 100px;
}
</style>