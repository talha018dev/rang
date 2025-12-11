<template>
  <UApp>
    <AppHeader v-if="!shouldHideHeader" />
    <NuxtPage />
    <!-- Meta Pixel noscript fallback -->
    <noscript>
      <img 
        height="1" 
        width="1" 
        style="display:none" 
        :src="`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`" 
        alt="" 
      />
    </noscript>
  </UApp>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app'
import { computed } from 'vue'
import AppHeader from '../components/AppHeader.vue'

const route = useRoute()
const config = useRuntimeConfig()
const metaPixelId = config.public.metaPixelId

const isLoginPage = computed(() => route.path === '/login')
const isRegisterPage = computed(() => route.path === '/register')
const shouldHideHeader = computed(() => isLoginPage.value || isRegisterPage.value)
</script>

<style scoped>
@import './app.css';
</style>