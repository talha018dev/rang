<template>
  <UApp>
    <AppHeader v-if="!shouldHideHeader" />
    <NuxtPage />
  </UApp>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'nuxt/app'
import AppHeader from '../components/AppHeader.vue'

const route = useRoute()
const isLoginPage = computed(() => route.path === '/login')
const isRegisterPage = computed(() => route.path === '/register')
const shouldHideHeader = computed(() => isLoginPage.value || isRegisterPage.value)
</script>

<style scoped>
@import './app.css';
</style>