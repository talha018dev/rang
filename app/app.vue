<template>
  <UApp>
    <AppHeader />
    
    <HeroBanner />
    <OfferBanner />
    <ExploreRang />
    <ShopByCategory />
    <TimelessSixYards />
    <ShopByBrand />
    <ShopByTheme />
    <SaleOffer />

      <!-- Carousel -->
      <!-- <UCarousel 
        v-slot="{ item }" 
        :items="items" 
        class="app-carousel"
        arrows
        indicators
      >
        <div class="app-carousel-container">
          <NuxtImg 
            :src="item" 
            :alt="`Carousel image ${items.indexOf(item) + 1}`"
            class="app-carousel-image"
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
import OfferBanner from '../components/OfferBanner.vue'
import ExploreRang from '../components/ExploreRang.vue'
import ShopByCategory from '../components/ShopByCategory.vue'
import TimelessSixYards from '../components/TimelessSixYards.vue'
import ShopByBrand from '../components/ShopByBrand.vue'
import ShopByTheme from '../components/ShopByTheme.vue'
import SaleOffer from '../components/SaleOffer.vue'
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

<style scoped>
@import './app.css';
</style>