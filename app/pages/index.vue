<template>
  <div>
    <HeroBanner />
    <OfferBanner />
    <!-- <AllCategories /> -->
    <!-- <ApiCategories :sections="homepageData?.sections || null" /> -->
    <NewArrival :products="newArrivalProducts" />
    <ExploreRang />
    <ShopByCategory />
    <TimelessSixYards />
    <ShopByBrand />
    <ShopByTheme />
    <SaleOffer :products="saleOfferProducts" />
    <WhyRang />
    <CustomerDiaries />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import AllCategories from '../../components/AllCategories.vue'
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
import type { HomepageData, HomepageResponse, Product } from '../../types/homepage'

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

// Find New Arrival section products
const newArrivalProducts = computed<Product[]>(() => {
  if (!homepageData.value?.sections) return []
  
  const newArrivalSection = homepageData.value.sections.find(
    section => section.title === 'New Arrival' || section.title === 'New Arrivals'
  )
  
  return newArrivalSection?.products || []
})

// Find Sale Offer section products
const saleOfferProducts = computed<Product[]>(() => {
  if (!homepageData.value?.sections) return []
  
  const saleOfferSection = homepageData.value.sections.find(
    section => section.title === 'Sale Offer'
  )
  
  return saleOfferSection?.products || []
})

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