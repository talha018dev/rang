<template>
  <div class="pb-4">
    <AppHeader />
    <HeroBanner />
    <OfferBanner />
    <ExploreRang />
    <ShopByCategory />
    <TimelessSixYards />
    <ShopByBrand />
    <ShopByTheme />
  </div>
</template>




<script setup>
import AppHeader from '../components/AppHeader'
import HeroBanner from '../components/HeroBanner'
import OfferBanner from '../components/OfferBanner'
import ExploreRang from '../components/ExploreRang'
import ShopByCategory from '../components/ShopByCategory'
import TimelessSixYards from '../components/TimelessSixYards'
import ShopByBrand from '../components/ShopByBrand'
import ShopByTheme from '../components/ShopByTheme'
useHead({
  title: 'Rang Bangladesh - Durga Puja 2025 Collection',
  meta: [
    { name: 'description', content: 'Discover the latest Durga Puja 2025 collection from Rang Bangladesh. Traditional and modern fashion for everyone.' }
  ]
})
</script>