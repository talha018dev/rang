<template>
  <div class="home-page">
    <!-- Loading Skeleton -->
    <template v-if="isLoading">
    <div class="homepage-skeleton">
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
    </template>

    <!-- Actual Content -->
    <template v-else>
    <div class="home-page-content">
      <HeroBanner2 :banners="homepageData?.banners" :cta="homepageData?.cta" />
      <OfferBanner :marquee_text="homepageData?.cta?.marquee_text" :marquee_url="homepageData?.cta?.marquee_url" />
      <!-- <AllCategories /> -->
      <!-- <ApiCategories :sections="homepageData?.sections || null" /> -->
      <NewArrival :products="newArrivalProducts" />
      <ExploreRang :items="homepageData?.dynamic_sections?.explore_rangbd || []" />
      <ShopByCategory :items="homepageData?.dynamic_sections?.shop_by_category || []" />
      <TimelessSixYards :products="timelessSixYardsProducts" />
      <ShopByBrand />
      <ShopByTheme :items="homepageData?.dynamic_sections?.shop_by_theme || []" />
      <SaleOffer
        :products="saleOfferProducts"
        :section-title="saleOfferSectionTitleForSaleOffer"
        :deals-of-the-month-products="dealsOfTheMonthProducts"
        :deals-of-the-month-title="saleOfferSectionTitle"
      />
      <WhyRang :items="homepageData?.dynamic_sections?.why_rangbd || []" />
      <CustomerDiaries />
    </div>
    </template>

    <!-- Welcome Popup (shows on home page load when homepage_popup.enabled or no settings) -->
    <WelcomePopup
      v-if="shouldShowWelcomePopup"
      ref="welcomePopupRef"
      :image="welcomePopupImage"
      :title="welcomePopupTitle"
      :cta-text="welcomePopupCtaText"
      :cta-url="welcomePopupCtaUrl"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import { useApi } from '../../composables/useApi'
import type { HomePageData2, HomePageProduct2, HomePageResponse2, SettingsResponse } from '../../types/homepage'
import './index.css'

import CustomerDiaries from '../../components/CustomerDiaries.vue'
import ExploreRang from '../../components/ExploreRang.vue'
import NewArrival from '../../components/NewArrival.vue'
import OfferBanner from '../../components/OfferBanner.vue'
import SaleOffer from '../../components/SaleOffer.vue'
import ShopByBrand from '../../components/ShopByBrand.vue'
import ShopByCategory from '../../components/ShopByCategory.vue'
import ShopByTheme from '../../components/ShopByTheme.vue'
import TimelessSixYards from '../../components/TimelessSixYards.vue'
import WhyRang from '../../components/WhyRang.vue'
import HeroBanner2 from '../../components/HeroBanner2.vue'
import WelcomePopup from '../../components/WelcomePopup.vue'

const welcomePopupRef = ref<InstanceType<typeof WelcomePopup> | null>(null)
const homepagePopupSettings = ref<{ enabled?: boolean; image?: string | null; description?: string | null; cta_text?: string | null; cta_url?: string | null } | null>(null)

// Welcome popup: prefer settings homepage_popup when available, else homepageData?.cta, else defaults
function getImageUrl(path: string): string {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  return `https://rangbd.thecell.tech${path.startsWith('/') ? path : '/' + path}`
}
const shouldShowWelcomePopup = computed(() => {
  const popup = homepagePopupSettings.value
  if (popup && popup.enabled === false) return false
  return true
})
const welcomePopupImage = computed(() => {
  const img = homepagePopupSettings.value?.image
  if (img) return getImageUrl(img)
  const banner = homepageData.value?.banners?.[0]
  if (banner && typeof banner === 'string') return getImageUrl(banner)
  return '/rang-logo-2026-v2.png'
})
const welcomePopupTitle = computed(() =>
  homepagePopupSettings.value?.description ?? ''
)
const welcomePopupCtaText = computed(() =>
  homepagePopupSettings.value?.cta_text ?? homepageData.value?.cta?.button_text ?? 'Explore Now'
)
const welcomePopupCtaUrl = computed(() =>
  homepagePopupSettings.value?.cta_url ?? homepageData.value?.cta?.button_url ?? '/products'
)

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
const isLoading = ref(true)
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

// Fetch homepage data and settings from API
onMounted(async () => {
  isLoading.value = true
  error.value = null
  const { backendUrl } = useApi()

  try {
    const [homeResponse, settingsResponse] = await Promise.all([
      $fetch<HomePageResponse2>(`${backendUrl}/homepage`),
      $fetch<SettingsResponse>(`${backendUrl}/settings`).catch(() => null)
    ])

    if (homeResponse.success && homeResponse.data) {
      homepageData.value = homeResponse.data
    }
    if (settingsResponse?.success && settingsResponse?.data?.homepage_popup) {
      homepagePopupSettings.value = settingsResponse.data.homepage_popup
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
    error.value = errorMessage
    console.error('Error fetching homepage data:', err)
  } finally {
    isLoading.value = false
  }

  // Show welcome popup on home page load when enabled (or when no settings)
  if (shouldShowWelcomePopup.value) {
    await nextTick()
    welcomePopupRef.value?.open()
  }
})
</script>

<style>
/* Set global scale to 0.75 for home page only */
.home-page {
  --global-scale: 1;
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