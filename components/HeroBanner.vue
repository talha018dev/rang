<template>
  <section class="hero-section">
      <!-- Slider Container -->
      <div class="hero-slider-wrapper">
        <div 
          class="hero-slider-track" 
          :style="{ transform: `translateX(-${currentBannerIndex * 100}%)` }"
        >
          <div 
            v-for="(banner, index) in banners" 
            :key="index"
            class="hero-slide"
          >
            <NuxtImg 
              :src="getImageUrl(banner)" 
              :alt="`Hero Banner ${index + 1}`" 
              class="hero-background" 
              format="webp"
              quality="90" 
              loading="eager" 
              preload 
            />
          </div>
        </div>
      </div>

      <!-- Navigation Arrows (only show if multiple banners) -->
      <div v-if="banners.length > 1" class="hero-slider-controls">
        <button 
          class="hero-slider-arrow hero-slider-arrow-prev" 
          @click="goToPrevious"
          aria-label="Previous slide"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          class="hero-slider-arrow hero-slider-arrow-next" 
          @click="goToNext"
          aria-label="Next slide"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <!-- Indicator Dots (only show if multiple banners) -->
      <div v-if="banners.length > 1" class="hero-slider-indicators">
        <button
          v-for="(banner, index) in banners"
          :key="index"
          class="hero-slider-indicator"
          :class="{ 'active': index === currentBannerIndex }"
          @click="goToSlide(index)"
          :aria-label="`Go to slide ${index + 1}`"
        />
      </div>

      <!-- Hero Content Overlay -->
      <div class="hero-content">
        <div class="hero-overlay">
          <p class="hero-subtitle">{{ ctaData?.subtitle || 'New Collection' }}</p>
          <div class="hero-title dm-serif">
            {{ ctaData?.title  }}
          </div>
          <NuxtLink v-if="ctaData?.button_url && !isExternalUrl(ctaData.button_url)" :to="ctaData.button_url" class="hero-button">
            <div class="hero-button-text">
              {{ctaData?.button_text }}
            </div>
          </NuxtLink>
          <a v-else-if="ctaData?.button_url && isExternalUrl(ctaData.button_url)" :href="ctaData.button_url" class="hero-button" target="_blank" rel="noopener noreferrer">
            <div class="hero-button-text">
              {{ ctaData?.button_text }}
            </div>
          </a>
          <button v-else class="hero-button">
            <div class="hero-button-text">
              {{ctaData?.button_text }}
            </div>
          </button>
        </div>
      </div>
    </section>
  <!-- <section class="hero-banner-container" @mouseenter="pauseRotation" @mouseleave="resumeRotation">
    
  </section> -->
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useApi } from '../composables/useApi';
import type { HomePageCta2, HomePageResponse2 } from '../types/homepage';

// Banners from API
const banners = ref<string[]>([]);
const currentBannerIndex = ref(0);

// CTA data from API
const ctaData = ref<HomePageCta2 | null>(null);

// Helper function to check if URL is external
const isExternalUrl = (url: string): boolean => {
  return url.startsWith('http://') || url.startsWith('https://');
};

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

// Auto-rotate banners every 10 seconds
let rotationInterval: ReturnType<typeof setInterval> | null = null;
const isPaused = ref(false);

const startRotation = () => {
  if (banners.value.length <= 1) return; // No need to rotate if only one banner

  rotationInterval = setInterval(() => {
    if (!isPaused.value) {
      currentBannerIndex.value = (currentBannerIndex.value + 1) % banners.value.length;
    }
  }, 10000); // 10 seconds
};

const stopRotation = () => {
  if (rotationInterval) {
    clearInterval(rotationInterval);
    rotationInterval = null;
  }
};

const pauseRotation = () => {
  isPaused.value = true;
};

const resumeRotation = () => {
  isPaused.value = false;
};

// Navigation functions
const goToNext = () => {
  currentBannerIndex.value = (currentBannerIndex.value + 1) % banners.value.length;
  // Reset rotation timer when manually navigating
  stopRotation();
  startRotation();
};

const goToPrevious = () => {
  currentBannerIndex.value = currentBannerIndex.value === 0 
    ? banners.value.length - 1 
    : currentBannerIndex.value - 1;
  // Reset rotation timer when manually navigating
  stopRotation();
  startRotation();
};

const goToSlide = (index: number) => {
  if (index >= 0 && index < banners.value.length) {
    currentBannerIndex.value = index;
    // Reset rotation timer when manually navigating
    stopRotation();
    startRotation();
  }
};

// Fetch banners and CTA from API
onMounted(async () => {
  try {
    const { backendUrl } = useApi()
    const response = await $fetch<HomePageResponse2>(`${backendUrl}/homepage`);
    if (response.success && response.data) {
      // Set banners
      if (response.data.banners) {
        banners.value = response.data.banners;
        // Start rotation if multiple banners
        if (banners.value.length > 1) {
          startRotation();
        }
      }
      // Set CTA data
      if (response.data.cta) {
        ctaData.value = response.data.cta;
      }
    }
  } catch (err) {
    console.error('Error fetching homepage data:', err);
  }
});

onUnmounted(() => {
  stopRotation();
});
</script>

<style scoped>
@import './HeroBanner.css';
</style>