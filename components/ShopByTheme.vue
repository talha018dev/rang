<template>
    <main v-if="themeImages.length > 0" class="theme-container">
        <section class="theme-header">
            <div class="theme-title">
                <div><span class="theme-title-light">Shop by</span> <span class="theme-title-bold">Theme</span></div>
            </div>
        </section>
        <section>
            <!-- Desktop Grid View -->
            <div class="theme-grid">
                <div v-for="(theme, index) in themeImages" :key="index" class="theme-image-container">
                    <NuxtLink :to="theme.link">
                        <NuxtImg 
                            :src="theme.src" 
                            :alt="theme.alt" 
                            class="theme-image" 
                            format="webp" 
                            quality="80" 
                            loading="lazy"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            width="600"
                            height="600"
                        />
                        <div
                            class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-lg">
                            <h3 class="theme-name-light">{{ theme.title }}</h3>
                            <p class="shop-now-blue-button-div">
                                <ShopNowBlue />
                            </p>
                        </div>
                    </NuxtLink>
                </div>
            </div>

            <!-- Mobile Carousel View (matches NewArrival carousel) -->
            <div class="theme-carousel">
                <section class="carousel-section">
                    <button
                        v-if="themeImages.length > 1"
                        @click="goToPrevious"
                        class="carousel-nav-arrow carousel-nav-prev"
                        aria-label="Previous"
                    >
                        <Icon name="heroicons:chevron-left" size="24" />
                    </button>
                    <button
                        v-if="themeImages.length > 1"
                        @click="goToNext"
                        class="carousel-nav-arrow carousel-nav-next"
                        aria-label="Next"
                    >
                        <Icon name="heroicons:chevron-right" size="24" />
                    </button>
                    <UCarousel
                        ref="carouselRef"
                        v-slot="{ item }"
                        :items="themeImages"
                        class="carousel-nuxt"
                        :slides-per-view="2"
                        :slides-per-group="1"
                        :space-between="8"
                        :autoplay="false"
                        :infinite="false"
                        :ui="{
                            item: 'carousel-slide shrink-0 basis-[calc((100%-8px)/2)] min-w-[calc((100%-8px)/2)] max-w-[calc((100%-8px)/2)]',
                            container: 'carousel-container gap-2 !mt-1 px-0! flex-row'
                        }"
                    >
                        <div class="carousel-item">
                            <NuxtLink :to="item.link" class="carousel-link">
                                <div class="carousel-image-container">
                                    <NuxtImg
                                        :src="item.src"
                                        :alt="item.alt"
                                        class="carousel-image"
                                        format="webp"
                                        quality="80"
                                        loading="lazy"
                                        sizes="50vw"
                                        width="400"
                                        height="488"
                                    />
                                </div>
                                <div class="carousel-content-overlay p-0 md:p-1">
                                    <h3 class="theme-name-light text-xs! md:text-base! text-center!">{{ item.title }}</h3>
                                    <p class="mt-2! mb-2! md:mb-6! text-center!">
                                        <ShopNowBlue />
                                    </p>
                                </div>
                            </NuxtLink>
                        </div>
                    </UCarousel>
                </section>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { HomePageShopByTheme2 } from '../types/homepage';
import ShopNowBlue from './ShopNowBlue.vue';

interface Props {
  items?: HomePageShopByTheme2[]
}

const props = withDefaults(defineProps<Props>(), {
  items: () => []
})

// Transform API data to component format
const themeImages = computed(() => {
  return (props.items || []).map(item => ({
    src: getImageUrl(item?.image?.preview_url || item?.image?.original_url || ''),
    alt: item?.title || 'Theme Rang',
    title: item?.title || '',
    link: item?.url || '#'
  }))
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

// Carousel ref and navigation (matches NewArrival)
const carouselRef = ref()

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
</script>

<style scoped>
@import './ShopByTheme.css';
</style>
