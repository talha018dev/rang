<template>
  <main class="new-arrival-container" v-if="validProducts && validProducts.length > 0">
    <section class="new-arrival-header">
      <div class="new-arrival-title">
        <div><span class="new-arrival-title-light">New</span> <span class="new-arrival-title-bold">Arrivals</span></div>
      </div>
    </section>

    <section>
      <!-- Carousel -->
      <UCarousel 
        ref="carouselRef" 
        v-slot="{ item }" 
        :items="validProducts" 
        class="carousel-nuxt"
        :slides-per-view="4"
        :slides-per-group="1"
        :space-between="16"
        :autoplay="false"
        :infinite="false"
        :prev="{ onClick: goToPrevious }"
        :next="{ onClick: goToNext }"
        :ui="{
          item: 'carousel-slide',
          container: 'carousel-container gap-4 !mt-1 px-0!'
        }"
        tabindex="0" 
        @keydown="handleKeydown">
        <div class="carousel-item">
          <NuxtLink :to="`/products/${item?.category?.slug}/${item.slug}`" class="carousel-link">
            <div class="carousel-image-container">
              <NuxtImg 
                :src="getImageUrl(item.image)" 
                :alt="item.name"
                class="carousel-image"
                loading="lazy" 
                format="webp" 
                quality="85" />
            </div>
            <div class="carousel-content-overlay p-0 md:p-1">
              <h3 class="new-arrival-name-light text-xs! md:text-base! text-center!">{{ item.name }}</h3>
              <p class=" mt-2! mb-2! md:mb-6! text-center!">
                <ShopNowBlue />
              </p>
            </div>
          </NuxtLink>
        </div>
      </UCarousel>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { HomePageProduct2, Product } from '../types/homepage';
import ShopNowBlue from './ShopNowBlue.vue';

interface Props {
  products?: HomePageProduct2[]
}

const props = withDefaults(defineProps<Props>(), {
  products: () => []
})

const carouselRef = ref()

// Manual navigation functions
const goToNext = () => {
  if (carouselRef.value?.emblaApi) {
    carouselRef.value.emblaApi.scrollNext()
  }
}

const goToPrevious = () => {
  if (carouselRef.value?.emblaApi) {
    carouselRef.value.emblaApi.scrollPrev()
  }
}

// Computed property to ensure products are valid
const validProducts = computed(() => {
  if (!props.products || !Array.isArray(props.products)) {
    return []
  }
  return props.products.filter(product => product && product.id)
})

// Helper function to get full image URL
const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return ''
  // If image path already includes http/https, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }
  // Otherwise, prepend the API base URL
  return `https://rangbd.thecell.tech${imagePath.startsWith('/') ? imagePath : '/' + imagePath}`
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    goToPrevious()
  } else if (event.key === 'ArrowRight') {
    event.preventDefault()
    goToNext()
  }
}
</script>

<style scoped>
@import './NewArrival.css';
</style>