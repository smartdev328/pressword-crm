<template>
  <Alert></Alert>
  <RouterView></RouterView>
</template>

<script setup>
import {RouterView} from 'vue-router'
import Alert from "@/components/Alert.vue";
import { useUsersStore } from "@/stores";

const userStore = useUsersStore();
</script>

<style scoped>
</style>
