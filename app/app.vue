<template>
  <div class="min-h-screen bg-black">
    <AppHeader />
    <HeroBanner />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue';
import HeroBanner from '../components/HeroBanner.vue';

useHead({
  title: 'Rang Bangladesh - Durga Puja 2025 Collection',
  meta: [
    { name: 'description', content: 'Discover the latest Durga Puja 2025 collection from Rang Bangladesh. Traditional and modern fashion for everyone.' }
  ]
})
</script>
