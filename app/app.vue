<template>
  <UApp>
    <AppHeader v-if="!isLoginPage" />
    <NuxtPage />
  </UApp>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'nuxt/app'
import AppHeader from '../components/AppHeader.vue'

const route = useRoute()
const isLoginPage = computed(() => route.path === '/login')
</script>

<style scoped>
@import './app.css';
</style>