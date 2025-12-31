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
      <div v-if="showHeroOverlay" class="hero-content">
        <div class="hero-overlay">
          <p v-if="ctaData?.subtitle" class="hero-subtitle">{{ ctaData.subtitle }}</p>
          <div v-if="ctaData?.title" class="hero-title dm-serif">
            {{ ctaData.title }}
          </div>
          <ShopNowCTA :text="ctaData?.button_text" :url="ctaData?.button_url" />
        </div>
      </div>
    </section>
  <!-- <section class="hero-banner-container" @mouseenter="pauseRotation" @mouseleave="resumeRotation">
    
  </section> -->
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import type { HomePageCta2 } from '../types/homepage';
import ShopNowCTA from './ShopNowCTA.vue';

interface Props {
  banners?: string[];
  cta?: HomePageCta2 | null;
}

const props = withDefaults(defineProps<Props>(), {
  banners: () => [],
  cta: null
});

// Use props values
const banners = computed(() => props.banners || []);
const ctaData = computed(() => props.cta || null);
const currentBannerIndex = ref(0);

// Check if hero overlay should be shown
const showHeroOverlay = computed(() => {
  return ctaData.value?.title || ctaData.value?.subtitle;
});

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

const stopRotation = () => {
  if (rotationInterval) {
    clearInterval(rotationInterval);
    rotationInterval = null;
  }
};

const startRotation = () => {
  if (banners.value.length <= 1) return; // No need to rotate if only one banner

  rotationInterval = setInterval(() => {
    if (!isPaused.value) {
      currentBannerIndex.value = (currentBannerIndex.value + 1) % banners.value.length;
    }
  }, 10000); // 10 seconds
};

// Watch for banners changes to start rotation
watch(banners, (newBanners) => {
  if (newBanners && newBanners.length > 1) {
    stopRotation();
    startRotation();
  } else {
    stopRotation();
  }
}, { immediate: true });

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

// Start rotation when component is mounted if banners are available
onMounted(() => {
  if (banners.value.length > 1) {
    startRotation();
  }
});

onUnmounted(() => {
  stopRotation();
});
</script>

<style scoped>
@import './HeroBanner.css';
</style>