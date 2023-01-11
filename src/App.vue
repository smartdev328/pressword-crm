<template>
  <Alert></Alert>
  <RouterView></RouterView>
</template>

<script setup>
import {RouterView} from 'vue-router'
import { useAuthStore } from '@/stores/auth.store';
import Alert from "@/components/Alert.vue";

const authStore = useAuthStore();
</script>

<style scoped>
</style>
