<template>
  <NuxtLink v-if="url && !isExternalUrl(url)" :to="url" :class="['hero-button', customClass]">
    <div class="hero-button-text">
      {{ text }}
    </div>
  </NuxtLink>
  <a v-else-if="url && isExternalUrl(url)" :href="url" :class="['hero-button', customClass]" target="_blank" rel="noopener noreferrer">
    <div class="hero-button-text">
      {{ text }}
    </div>
  </a>
  <button v-else :class="['hero-button', customClass]">
    <div class="hero-button-text">
      {{ text }}
    </div>
  </button>
</template>

<script setup lang="ts">
interface Props {
  text?: string;
  url?: string | null;
  customClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  text: '',
  url: null,
  customClass: ''
});

// Helper function to check if URL is external
const isExternalUrl = (url: string): boolean => {
  return url.startsWith('http://') || url.startsWith('https://');
};
</script>

<style scoped>
@import './HeroBanner.css';
</style>

