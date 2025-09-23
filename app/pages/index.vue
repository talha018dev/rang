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

const items = [
  '/sale-carousel-1.png',
  '/sale-carousel-2.png',
  '/sale-carousel-3.png',
  '/sale-carousel-4.png',
  '/brand-1.png',
  '/brand-2.png'
]
</script>