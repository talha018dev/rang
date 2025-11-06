<template>
  <div>
    <HeroBanner />
    <OfferBanner />
    <ApiCategories :sections="homepageData?.sections || null" />
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

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ApiCategories from '../../components/ApiCategories.vue'
import CustomerDiaries from '../../components/CustomerDiaries.vue'
import ExploreRang from '../../components/ExploreRang.vue'
import HeroBanner from '../../components/HeroBanner.vue'
import NewArrival from '../../components/NewArrival.vue'
import OfferBanner from '../../components/OfferBanner.vue'
import SaleOffer from '../../components/SaleOffer.vue'
import ShopByBrand from '../../components/ShopByBrand.vue'
import ShopByCategory from '../../components/ShopByCategory.vue'
import ShopByTheme from '../../components/ShopByTheme.vue'
import TimelessSixYards from '../../components/TimelessSixYards.vue'
import WhyRang from '../../components/WhyRang.vue'
import type { HomepageData, HomepageResponse } from '../../types/homepage'

const items = [
  '/sale-carousel-1.png',
  '/sale-carousel-2.png',
  '/sale-carousel-3.png',
  '/sale-carousel-4.png',
  '/brand-1.png',
  '/brand-2.png'
]

// Reactive state for homepage data
const homepageData = ref<HomepageData | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)

// Fetch homepage data from API
onMounted(async () => {
  isLoading.value = true
  error.value = null
  
  try {
    const response = await $fetch<HomepageResponse>('https://rangbd.thecell.tech/api/homepage')
    console.log('Homepage API Response:', response)
    
    if (response.success && response.data) {
      homepageData.value = response.data
      console.log('Banners:', response.data.banners)
      console.log('Sections:', response.data.sections)
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
    error.value = errorMessage
    console.error('Error fetching homepage data:', err)
  } finally {
    isLoading.value = false
  }
})
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