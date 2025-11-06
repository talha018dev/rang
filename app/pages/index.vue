<template>
  <div>
    <HeroBanner />
    <OfferBanner />
    <NewArrival />
    <ExploreRang />
    <ShopByCategory />
    <TimelessSixYards />
    <ShopByBrand />
    <ShopByTheme />
    <SaleOffer />
    <WhyRang />
    <CustomerDiaries />
  </div>
</template>

<script setup lang="">
import HeroBanner from '../../components/HeroBanner.vue'
import OfferBanner from '../../components/OfferBanner.vue'
import NewArrival from '../../components/NewArrival.vue'
import ExploreRang from '../../components/ExploreRang.vue'
import ShopByCategory from '../../components/ShopByCategory.vue'
import TimelessSixYards from '../../components/TimelessSixYards.vue'
import ShopByBrand from '../../components/ShopByBrand.vue'
import ShopByTheme from '../../components/ShopByTheme.vue'
import WhyRang from '../../components/WhyRang.vue'
import SaleOffer from '../../components/SaleOffer.vue'
import CustomerDiaries from '../../components/CustomerDiaries.vue'

const items = [
  '/sale-carousel-1.png',
  '/sale-carousel-2.png',
  '/sale-carousel-3.png',
  '/sale-carousel-4.png',
  '/brand-1.png',
  '/brand-2.png'
]
</script>

<style>
/* Set global scale to 0.75 for home page */
:root {
  --global-scale: 0.75;
}

html {
  zoom: var(--global-scale);
}

/* Firefox fallback */
@supports not (zoom: 1) {
  body {
    transform: scale(var(--global-scale));
    transform-origin: top left;
    width: calc(100% / var(--global-scale));
  }
}
</style>