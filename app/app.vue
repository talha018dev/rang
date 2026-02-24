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

// Meta Pixel base script in initial HTML so Meta can detect it in source (per Meta support)
if (metaPixelId) {
  useHead({
    script: [
      {
        innerHTML: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`,
        type: 'text/javascript',
      },
    ],
  })
}
</script>

<style scoped>
@import './app.css';
</style>