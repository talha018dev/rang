<template>
  <div class="home-page">
    <!-- Loading Skeleton -->
    <div v-if="isLoading" class="homepage-skeleton">
      <!-- Hero Banner Skeleton -->
      <!-- <section class="skeleton-hero-banner">
        <div class="skeleton-box skeleton-hero-image"></div>
        <div class="skeleton-hero-content">
          <div class="skeleton-box skeleton-hero-subtitle"></div>
          <div class="skeleton-box skeleton-hero-title"></div>
          <div class="skeleton-box skeleton-hero-button"></div>
        </div>
      </section> -->

      <!-- Offer Banner Skeleton -->
      <section class="skeleton-offer-banner">
        <div class="skeleton-box skeleton-offer-image"></div>
      </section>

      <!-- New Arrival Skeleton -->
      <section class="skeleton-new-arrival">
        <div class="skeleton-box skeleton-section-title"></div>
        <div class="skeleton-carousel">
          <div v-for="i in 4" :key="i" class="skeleton-carousel-item">
            <div class="skeleton-box skeleton-product-image"></div>
            <div class="skeleton-product-info">
              <div class="skeleton-box skeleton-product-name"></div>
              <div class="skeleton-box skeleton-product-button"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Explore Rang Skeleton -->
      <section class="skeleton-explore-rang">
        <div class="skeleton-box skeleton-section-title"></div>
        <div class="skeleton-box skeleton-explore-content"></div>
      </section>

      <!-- Shop By Category Skeleton -->
      <section class="skeleton-shop-category">
        <div class="skeleton-box skeleton-section-title"></div>
        <div class="skeleton-category-grid">
          <div v-for="i in 6" :key="i" class="skeleton-category-item">
            <div class="skeleton-box skeleton-category-image"></div>
            <div class="skeleton-box skeleton-category-name"></div>
          </div>
        </div>
      </section>

      <!-- Timeless Six Yards Skeleton -->
      <section class="skeleton-timeless">
        <div class="skeleton-box skeleton-section-title"></div>
        <div class="skeleton-box skeleton-timeless-content"></div>
      </section>

      <!-- Shop By Brand Skeleton -->
      <section class="skeleton-shop-brand">
        <div class="skeleton-box skeleton-section-title"></div>
        <div class="skeleton-brand-grid">
          <div v-for="i in 4" :key="i" class="skeleton-box skeleton-brand-image"></div>
        </div>
      </section>

      <!-- Shop By Theme Skeleton -->
      <section class="skeleton-shop-theme">
        <div class="skeleton-box skeleton-section-title"></div>
        <div class="skeleton-theme-grid">
          <div v-for="i in 4" :key="i" class="skeleton-box skeleton-theme-image"></div>
        </div>
      </section>

      <!-- Sale Offer Skeleton -->
      <section class="skeleton-sale-offer">
        <div class="skeleton-box skeleton-section-title"></div>
        <div class="skeleton-sale-content">
          <div class="skeleton-box skeleton-sale-countdown"></div>
          <div class="skeleton-sale-carousel">
            <div v-for="i in 3" :key="i" class="skeleton-box skeleton-sale-product"></div>
          </div>
        </div>
      </section>

      <!-- Why Rang Skeleton -->
      <section class="skeleton-why-rang">
        <div class="skeleton-box skeleton-section-title"></div>
        <div class="skeleton-why-grid">
          <div v-for="i in 3" :key="i" class="skeleton-box skeleton-why-item"></div>
        </div>
      </section>

      <!-- Customer Diaries Skeleton -->
      <section class="skeleton-customer-diaries">
        <div class="skeleton-box skeleton-section-title"></div>
        <div class="skeleton-diaries-grid">
          <div v-for="i in 6" :key="i" class="skeleton-box skeleton-diaries-image"></div>
        </div>
      </section>
    </div>

    <!-- Actual Content -->
    <div v-else class="home-page-content">
      <HeroBanner :banners="homepageData?.banners" :cta="homepageData?.cta" />
      <OfferBanner :marquee_text="homepageData?.cta?.marquee_text" :marquee_url="homepageData?.cta?.marquee_url" />
      <!-- <AllCategories /> -->
      <!-- <ApiCategories :sections="homepageData?.sections || null" /> -->
      <NewArrival :products="newArrivalProducts" />
      <LazyWrapper 
        :loader="() => import('../../components/ExploreRang.vue')"
        :component-props="{ items: homepageData?.dynamic_sections?.explore_rangbd || [] }"
      />
      <LazyWrapper 
        :loader="() => import('../../components/ShopByCategory.vue')"
        :component-props="{ items: homepageData?.dynamic_sections?.shop_by_category || [] }"
      />
      <LazyWrapper 
        :loader="() => import('../../components/TimelessSixYards.vue')"
        :component-props="{ products: timelessSixYardsProducts }"
      />
      <LazyWrapper 
        :loader="() => import('../../components/ShopByBrand.vue')"
      />
      <LazyWrapper 
        :loader="() => import('../../components/ShopByTheme.vue')"
        :component-props="{ items: homepageData?.dynamic_sections?.shop_by_theme || [] }"
      />
      <LazyWrapper 
        :loader="() => import('../../components/SaleOffer.vue')"
        :component-props="{ 
          products: saleOfferProducts,
          sectionTitle: saleOfferSectionTitleForSaleOffer,
          dealsOfTheMonthProducts: dealsOfTheMonthProducts,
          dealsOfTheMonthTitle: saleOfferSectionTitle
        }"
      />
      <LazyWrapper 
        :loader="() => import('../../components/WhyRang.vue')"
        :component-props="{ items: homepageData?.dynamic_sections?.why_rangbd || [] }"
      />
      <LazyWrapper 
        :loader="() => import('../../components/CustomerDiaries.vue')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import LazyWrapper from '../../components/LazyWrapper.vue'
import { useApi } from '../../composables/useApi'
import type { HomePageData2, HomePageProduct2, HomePageResponse2 } from '../../types/homepage'
import './index.css'

// Load above-the-fold components immediately
import HeroBanner from '../../components/HeroBanner.vue'
import NewArrival from '../../components/NewArrival.vue'
import OfferBanner from '../../components/OfferBanner.vue'

// Components loaded lazily via LazyWrapper - no need to define them here
// They will be imported only when they come into viewport

const items = [
  '/sale-carousel-1.png',
  '/sale-carousel-2.png',
  '/sale-carousel-3.png',
  '/sale-carousel-4.png',
  '/brand-1.png',
  '/brand-2.png'
]

// Reactive state for homepage data
const homepageData = ref<HomePageData2 | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)

// Find New Arrival section products
const newArrivalProducts = computed<HomePageProduct2[]>(() => {
  if (!homepageData.value?.sections) return []
  
  const newArrivalSection = homepageData.value.sections.find(
    section => section.title === 'New Arrival' || section.title === 'New Arrivals'
  )
  
  return newArrivalSection?.products || []
})

// Find Sale Offer section products
const saleOfferProducts = computed<HomePageProduct2[]>(() => {
  if (!homepageData.value?.sections) return []
  
  const saleOfferSection = homepageData.value.sections.find(
    section => section.title === 'Sale Offer'
  )
  
  return saleOfferSection?.products || []
})

// Find Deals of the Month section products
const dealsOfTheMonthProducts = computed<HomePageProduct2[]>(() => {
  if (!homepageData.value?.sections) return []
  
  const dealsSection = homepageData.value.sections.find(
    section => section.title === 'Deals of the Month'
  )
  
  return dealsSection?.products || []
})

// Get the section title for SaleOfferCountdown (should be "Deals of the Month")
const saleOfferSectionTitle = computed(() => {
  if (!homepageData.value?.sections) return ''
  
  const dealsSection = homepageData.value.sections.find(
    section => section.title === 'Deals of the Month'
  )
  
  return dealsSection?.title || ''
})

// Get Sale Offer section title for the SaleOffer component
const saleOfferSectionTitleForSaleOffer = computed(() => {
  if (!homepageData.value?.sections) return ''
  
  const saleOfferSection = homepageData.value.sections.find(
    section => section.title === 'Sale Offer'
  )
  
  return saleOfferSection?.title || ''
})

// Find Timeless Six Yards section products
const timelessSixYardsProducts = computed(() => {
  if (!homepageData.value?.sections) return []
  
  const timelessSection = homepageData.value.sections.find(
    section => section.title === 'Timeless Six Yards'
  )
  
  if (!timelessSection?.products) return []
  
  // Map products to TimelessImage format
  return timelessSection.products.map((product: HomePageProduct2) => ({
    src: product.image,
    alt: product.name,
    title: product.name,
    link: `/products/${product.category?.slug || 'all'}/${product.slug}`
  }))
})

// Fetch homepage data from API
onMounted(async () => {
  isLoading.value = true
  error.value = null
  
  try {
    const { backendUrl } = useApi()
    const response = await $fetch<HomePageResponse2>(`${backendUrl}/homepage`)
    console.log('Homepage API Response:', response)
    
    if (response.success && response.data) {
      homepageData.value = response.data
      console.log('Banners:', response.data.banners)
      console.log('Sections:', response.data.sections)
      console.log('Dynamic Sections:', response.data.dynamic_sections)
      console.log('Shop by Category:', response.data.dynamic_sections?.shop_by_category)
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
/* Set global scale to 0.75 for home page only */
.home-page {
  --global-scale: 0.75;
  zoom: var(--global-scale);
}

/* Firefox fallback */
@supports not (zoom: 1) {
  .home-page {
    transform: scale(var(--global-scale));
    transform-origin: top left;
    width: calc(100% / var(--global-scale));
  }
}
</style>