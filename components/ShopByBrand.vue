<template>
  <main class="brand-container">
    <section class="brand-header">
      <div class="brand-title">
        <div><span class="brand-title-light">Shop by</span> <span class="brand-title-bold">Brand</span></div>
      </div>
    </section>
    <section>
      <!-- Loading State -->
      <div v-if="isLoading" class="brand-grid-main">
        <div v-for="i in 5" :key="i" class="brand-skeleton">
          <div class="skeleton-box"></div>
        </div>
      </div>
      <!-- Brands Grid -->
      <div v-else-if="brands.length > 0" class="brand-grid-main">
        <div 
          v-for="brand in brands" 
          :key="brand.slug" 
          class="brand-item"
          :class="{ 'brand-item-selected': selectedBrand === brand.slug }"
          @click="selectBrand(brand.slug)"
        >
          <NuxtImg 
            :src="brand.image.url" 
            :alt="brand.name" 
            class="brand-image image-fade" 
            format="webp" 
            quality="80"
            loading="lazy"
            sizes="(max-width: 768px) 20vw, (max-width: 1024px) 15vw, 12vw"
            width="200"
            height="200"
            @load="(e) => (e.target as HTMLImageElement)?.classList.add('loaded')"
          />
        </div>
      </div>
      <!-- Error State -->
      <div v-else-if="error" class="error-state">
        <p>Error loading brands: {{ error }}</p>
      </div>
      <!-- Empty State -->
      <div v-else class="empty-state">
        <p>No brands available</p>
      </div>
    </section>
    <section class="sale-brands-section-secondary" style="margin-top: 4rem;">
      <div class="sale-brands-grid-secondary" :style="products.length === 0 ? { gridTemplateColumns: '1fr' } : {}">
        <div class="image-div category-grid-main-men" v-if="products.length > 0 || isLoadingProducts">
          <!-- First product image -->
          <div class="product-image-wrapper">
            <Transition name="fade-slide" mode="out-in">
              <NuxtLink 
                v-if="products.length > 0 && !isLoadingProducts" 
                :key="products[0]?.id"
                :to="`/products/${products[0]?.category?.slug || 'all'}/${products[0]?.slug}`"
                class="product-image-link"
              >
                <div class="product-image-container">
                  <NuxtImg 
                    :src="getImageUrl(products[0]?.image || '')" 
                    :alt="products[0]?.name || ''"
                    class="sale-offer-image category-image-rounded image-fade" 
                    format="webp" 
                    quality="80" 
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                    width="600"
                    height="732"
                    @load="(e) => (e.target as HTMLImageElement)?.classList.add('loaded')"
                  />
                </div>
              </NuxtLink>
              <!-- Loading placeholder for first product -->
              <div v-else-if="isLoadingProducts" key="loading" class="product-image-container flip-animation">
                <div class="image-placeholder"></div>
              </div>
            </Transition>
          </div>

          <div class="absolute" style="bottom: 40px; right: 40px;" v-if="products.length > 0 || isLoadingProducts">
            <NuxtLink :to="`/products/all?brand=${selectedBrand}`">
              <button class="shop-now-white-button">
                <span class="button-text">See All</span>
                <Icon name="heroicons:arrow-right" class="button-icon" />
              </button>
            </NuxtLink>
          </div>
        </div>
        <TransitionGroup name="fade-slide" tag="div" class="sale-brands-grid-tertiary" v-if="products.length > 1 || isLoadingProducts">
          <!-- Next 4 products from API (products[1] to products[4]) -->
          <NuxtLink 
            v-for="product in products.slice(1, 5)" 
            v-if="!isLoadingProducts && products.length > 1"
            :key="product.id"
            :to="`/products/${product.category?.slug || 'all'}/${product.slug}`"
            class="brand-product-link"
          >
            <div class="product-image-container">
              <NuxtImg 
                :src="getImageUrl(product.image)" 
                :alt="product.name" 
                class="sale-brand-image-cover image-fade" 
                format="webp"
                quality="80" 
                loading="lazy"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 300px"
                width="300"
                height="366"
                @load="(e) => (e.target as HTMLImageElement)?.classList.add('loaded')"
              />
            </div>
          </NuxtLink>
          <!-- Loading State for Products - show placeholders with flip animation -->
          <div 
            v-for="i in 4" 
            v-if="isLoadingProducts"
            :key="`loading-${i}`" 
            class="brand-product-link"
          >
            <div class="product-image-container flip-animation">
              <div class="image-placeholder"></div>
            </div>
          </div>
        </TransitionGroup>
        <!-- Empty State - only show when API returns no products -->
        <Transition name="fade-slide">
          <div 
            v-if="products.length === 0 && !isLoadingProducts" 
            key="empty" 
            class="empty-products-compact"
          >
            <p>No products available for this brand</p>
          </div>
        </Transition>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app'
import { onMounted, ref, watch } from 'vue'
import { useApi } from '../composables/useApi'
import type { Brand, BrandResponse, Product, ProductResponse } from '../types/homepage'

// Get route to access query parameters
const route = useRoute()

// Reactive state
const brands = ref<Brand[]>([])
const products = ref<Product[]>([])
const isLoading = ref(false)
const isLoadingProducts = ref(false)
const error = ref<string | null>(null)
const selectedBrand = ref<string>('')

// Helper function to get full image URL
const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return ''
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }
  return `https://rangbd.thecell.tech${imagePath.startsWith('/') ? imagePath : '/' + imagePath}`
}

// Fetch products by brand from API
const fetchProductsByBrand = async (brandSlug: string) => {
  if (!brandSlug) return

  isLoadingProducts.value = true
  
  try {
    const { backendUrl } = useApi()
    const apiUrl = `${backendUrl}/product?brand=${brandSlug}&sort=latest&page=1`
    const response = await $fetch<ProductResponse>(apiUrl)
    console.log(`Products API Response for brand "${brandSlug}":`, response)

    if (response.success && response.data) {
      products.value = response.data
      console.log('Products loaded:', products.value.length)
    }
  } catch (err) {
    console.error('Error fetching products by brand:', err)
  } finally {
    isLoadingProducts.value = false
  }
}

// Fetch brands from API
const fetchBrands = async () => {
  isLoading.value = true
  error.value = null

  try {
    const { backendUrl } = useApi()
    const response = await $fetch<BrandResponse>(`${backendUrl}/brand`)
    console.log('Brands API Response:', response)

    if (response.success && response.data) {
      brands.value = response.data
      
      // Check if brand filter is available in URL query parameters
      const brandFromUrl = route.query.brand as string | undefined
      
      if (brandFromUrl) {
        // Check if the brand from URL exists in the brands list
        const brandExists = brands.value.some(brand => brand.slug === brandFromUrl)
        if (brandExists) {
          selectedBrand.value = brandFromUrl
          // Fetch products for the brand from URL
          await fetchProductsByBrand(brandFromUrl)
        } else {
          // Brand from URL doesn't exist, fallback to first brand
          if (brands.value.length > 0 && brands.value[0]) {
            selectedBrand.value = brands.value[0].slug
            await fetchProductsByBrand(brands.value[0].slug)
          }
        }
      } else {
        // No brand in URL, set first brand as selected by default and fetch its products
        if (brands.value.length > 0 && brands.value[0]) {
          selectedBrand.value = brands.value[0].slug
          // Fetch products for the first brand
          await fetchProductsByBrand(brands.value[0].slug)
        }
      }
    } else {
      error.value = 'Failed to load brands'
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
    error.value = errorMessage
    console.error('Error fetching brands:', err)
  } finally {
    isLoading.value = false
  }
}

// Select brand function - calls API with new brand query param
const selectBrand = async (brandSlug: string) => {
  if (brandSlug === selectedBrand.value) return // Skip if already selected
  
  selectedBrand.value = brandSlug
  await fetchProductsByBrand(brandSlug)
}

// Fetch brands on mount
onMounted(() => {
  fetchBrands()
})

// Watch for route query changes (when brand filter changes in URL)
watch(() => route.query.brand, async (newBrand) => {
  if (newBrand && typeof newBrand === 'string') {
    // Check if the brand exists in the brands list
    const brandExists = brands.value.some(brand => brand.slug === newBrand)
    if (brandExists && selectedBrand.value !== newBrand) {
      selectedBrand.value = newBrand
      await fetchProductsByBrand(newBrand)
    }
  }
})
</script>

<style scoped>
@import './ShopByBrand.css';
@import './SaleOffer.css';
</style>
