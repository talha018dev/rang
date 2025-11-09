<template>
  <!-- <section class="hero-section-alt"> -->
  <section class="hero-banner-container">
    <section class="hero-section">
      <NuxtImg v-if="currentBannerUrl" :src="currentBannerUrl" alt="Hero Banner" class="hero-background" format="webp"
        quality="90" loading="eager" preload />
      <div class="hero-content">
        <div class="hero-overlay">
          <p class="hero-subtitle">New Collection</p>
          <div class="hero-title dm-serif">
            Durga Puja - 2025
          </div>
          <button class="hero-button">
            <div class="hero-button-text">
              Shop Now
            </div>
          </button>
        </div>
      </div>

    </section>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useApi } from '../composables/useApi';
import type { HomepageResponse } from '../types/homepage';

// Banners from API
const banners = ref<string[]>([]);
const currentBannerIndex = ref(0);

// Helper function to get full image URL
const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return '/landing-image.png';
  // If image path already includes http/https, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  // Otherwise, prepend the API base URL
  return `https://rangbd.thecell.tech${imagePath.startsWith('/') ? imagePath : '/' + imagePath}`;
};

// Current banner URL
const currentBannerUrl = computed(() => {
  if (banners.value.length > 0) {
    const banner = banners.value[currentBannerIndex.value];
    if (banner) {
      return getImageUrl(banner);
    }
  }
  // return '/landing-image.png'; // Fallback
});

// Auto-rotate banners every 10 seconds
let rotationInterval: ReturnType<typeof setInterval> | null = null;

const startRotation = () => {
  if (banners.value.length <= 1) return; // No need to rotate if only one banner

  rotationInterval = setInterval(() => {
    currentBannerIndex.value = (currentBannerIndex.value + 1) % banners.value.length;
  }, 10000); // 10 seconds
};

const stopRotation = () => {
  if (rotationInterval) {
    clearInterval(rotationInterval);
    rotationInterval = null;
  }
};

// Fetch banners from API
onMounted(async () => {
  try {
    const { backendUrl } = useApi()
    const response = await $fetch<HomepageResponse>(`${backendUrl}/homepage`);
    if (response.success && response.data && response.data.banners) {
      banners.value = response.data.banners;
      // Start rotation if multiple banners
      if (banners.value.length > 1) {
        startRotation();
      }
    }
  } catch (err) {
    console.error('Error fetching banners:', err);
  }
});

onUnmounted(() => {
  stopRotation();
});
</script>

<style scoped>
@import './HeroBanner.css';
</style>