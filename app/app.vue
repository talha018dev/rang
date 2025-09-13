<template>
  <UApp>
    <AppHeader />
    
    <!-- <HeroBanner /> -->
    <!-- <HeroBanner />
    <OfferBanner />
    <ExploreRang />
    <ShopByCategory />
    <TimelessSixYards />
    <ShopByBrand />
    <ShopByTheme />
    <SaleOffer /> -->

      <!-- Carousel -->
      <!-- <UCarousel 
        v-slot="{ item }" 
        :items="items" 
        class="w-full max-w-4xl mx-auto"
        arrows
        indicators
      >
        <div class="flex justify-center">
          <NuxtImg 
            :src="item" 
            :alt="`Carousel image ${items.indexOf(item) + 1}`"
            class="w-full max-w-lg h-80 object-cover rounded-lg shadow-md"
            loading="eager"
            format="webp"
            quality="90"
            sizes="sm:100vw md:50vw lg:800px"
          />
        </div>
      </UCarousel> -->
  </UApp>
</template>

<script setup lang="">
import AppHeader from '../components/AppHeader.vue'
import HeroBanner from '../components/HeroBanner.vue'
import '../app/assets/css/main.css'

const items = [
  '/sale-carousel-1.png',
  '/sale-carousel-2.png',
  '/sale-carousel-3.png',
  '/sale-carousel-4.png',
  '/brand-1.png',
  '/brand-2.png'
]

</script>