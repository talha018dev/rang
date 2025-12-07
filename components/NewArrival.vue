<template>
  <main class="new-arrival-container" v-if="validProducts && validProducts.length > 0">
    <section class="new-arrival-header">
      <div class="new-arrival-title">
        <div><span class="new-arrival-title-light">New</span> <span class="new-arrival-title-bold">Arrivals</span></div>
      </div>
    </section>

    <section>
      <!-- Carousel -->
      <UCarousel ref="carouselRef" v-slot="{ item }" :items="validProducts" :ui="{
        item: 'basis-1/4 flex',
        
        container: 'rounded-lg'
      }" class="rounded-lg new-arrival-carousel" :slides-per-view="4" :slides-per-group="1" :autoplay="false" :infinite="true" tabindex="0"
        @keydown="handleKeydown">
        <div class="carousel-item">
          <NuxtLink :to="`/products/${item?.category?.slug}/${item.slug}`">

            <NuxtImg :src="getImageUrl(item.image)" :alt="item.name"
              class="w-full h-80 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              loading="lazy" format="webp" quality="85" />
            <div
              class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-lg">
              <h3 class="new-arrival-name-light">{{ item.name }}</h3>
              <p class="shop-now-blue-button-div">
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
import type { Product } from '../types/homepage';
import ShopNowBlue from './ShopNowBlue.vue';

interface Props {
  products?: Product[]
}

const props = withDefaults(defineProps<Props>(), {
  products: () => []
})

const carouselRef = ref()

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
    // Navigate to previous slide
    if (carouselRef.value) {
      carouselRef.value.prev()
    }
  } else if (event.key === 'ArrowRight') {
    event.preventDefault()
    // Navigate to next slide
    if (carouselRef.value) {
      carouselRef.value.next()
    }
  }
}
</script>

<style scoped>
@import './NewArrival.css';
</style>