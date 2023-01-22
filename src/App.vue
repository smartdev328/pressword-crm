<template>
  <Notifications position="bottom right"/>
  <Alert></Alert>
  <RouterView></RouterView>
</template>

<script setup>
import {RouterView} from 'vue-router'
import Alert from "@/components/Alert.vue";
</script>

<style scoped>
</style>
