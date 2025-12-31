<template>
  <NuxtLink :to="marquee_url" class="offer-banner-link">

    <div class="offer-banner">
      <!-- Sliding content container -->
      <div 
        class="offer-content"
        :style="{ animationDuration: `${animationDuration}s` }"
      >
        <!-- First set of content -->
        <div class="offer-item">
          {{ marquee_text }}
        </div>
        
        <!-- Duplicate content for seamless loop -->
        <div class="offer-item">
          {{ marquee_text }}
        </div>
        
        <!-- Third set for smooth transition -->
        <div class="offer-item">
          {{ marquee_text }}
        </div>
        <div class="offer-item">
          {{ marquee_text }}
        </div>
        <div class="offer-item">
          {{ marquee_text }}
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  speed?: number // Animation speed in seconds
  message?: string
  offerCode?: string
  discount?: string
  marquee_text?: string
  marquee_url?: string
}

const props = withDefaults(defineProps<Props>(), {
  speed: 20,
  message: 'Get 20% off on all Durga Puja collections',
  offerCode: 'DURGA20',
  discount: '20%'
})

const animationDuration = computed(() => props.speed)
</script>

<style scoped>
@import './OfferBanner.css';
</style>

<style scoped>
@keyframes slide {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-33.333%);
  }
}

.animate-slide {
  animation: slide linear infinite;
}
</style> 