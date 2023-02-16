<template>
  <Notifications position="bottom right"/>
  <Alert></Alert>
  <RouterView :key="route.fullPath"></RouterView>
  <!--start back-to-top-->
  <button @click=topFunction class="btn btn-danger btn-icon" ref="mybutton" id="back-to-top">
    <i class="ri-arrow-up-line"></i>
  </button>
</template>

<script setup>
import { ref } from 'vue'
import {RouterView} from 'vue-router'
import Alert from "@/components/Alert.vue";
import { useRoute } from 'vue-router'

const route = useRoute()

const mybutton = ref()
const scrollFunction = () => {
  100 < document.body.scrollTop || 100 < document.documentElement.scrollTop
      ? (mybutton.value.style.display = "block")
      : (mybutton.value.style.display = "none");
}
const topFunction = ()=> {
  (document.body.scrollTop = 0); (document.documentElement.scrollTop = 0);
}

window.onscroll = () => scrollFunction()
</script>

<style scoped>
#back-to-top {
  bottom: 50px;
}
</style>
