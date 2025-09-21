<template>
  <div>
    <HeroBanner />
    <OfferBanner />
    <ExploreRang />
    <ShopByCategory />
    <TimelessSixYards />
    <ShopByBrand />
    <ShopByTheme />
    <SaleOffer />
    <WhyRang />
    <CustomerDiaries />
    <!-- <AppFooter /> -->

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
  </div>
</template>

<script setup lang="">
import HeroBanner from '../../components/HeroBanner.vue'
import OfferBanner from '../../components/OfferBanner.vue'
import ExploreRang from '../../components/ExploreRang.vue'
import ShopByCategory from '../../components/ShopByCategory.vue'
import TimelessSixYards from '../../components/TimelessSixYards.vue'
import ShopByBrand from '../../components/ShopByBrand.vue'
import ShopByTheme from '../../components/ShopByTheme.vue'
import WhyRang from '../../components/WhyRang.vue'
import SaleOffer from '../../components/SaleOffer.vue'
import CustomerDiaries from '../../components/CustomerDiaries.vue'
import AppFooter from '../../components/AppFooter.vue'

const items = [
  '/sale-carousel-1.png',
  '/sale-carousel-2.png',
  '/sale-carousel-3.png',
  '/sale-carousel-4.png',
  '/brand-1.png',
  '/brand-2.png'
]
</script>