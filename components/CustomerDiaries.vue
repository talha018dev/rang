<template>
  <section class="customer-diaries-section-2">
    <section class="customer-diaries-image-section">
      <NuxtImg src="/customer-diaries-image.png" alt="Customer Diaries" format="webp" quality="85" loading="lazy" />
    </section>
    <AppFooter />
  </section>
</template>

<script setup lang="ts">
import AppFooter from './AppFooter.vue';
</script>

<style scoped>
@import './CustomerDiaries.css';
</style>