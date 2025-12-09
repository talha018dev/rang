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
          <NuxtImg :src="brand.image.url" :alt="brand.name" class="brand-image" format="webp" quality="85"
            loading="lazy" />
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
        <div class="image-div category-grid-main-men">
          <!-- First product image -->
          <NuxtLink 
            v-if="products.length > 0" 
            :to="`/products/${products[0].category?.slug || 'all'}/${products[0].slug}`"
          >
            <NuxtImg 
              :src="getImageUrl(products[0].image)" 
              :alt="products[0].name"
              class="sale-offer-image category-image-rounded" 
              format="webp" 
              quality="85" 
              loading="lazy" 
            />
          </NuxtLink>

          <div class="absolute" style="bottom: 40px; right: 40px;">
            <NuxtLink :to="`/products?brand=${selectedBrand}`">
              <button class="shop-now-white-button">
                <span class="button-text">See All</span>
                <Icon name="heroicons:arrow-right" class="button-icon" />
              </button>
            </NuxtLink>
          </div>
        </div>
        <div class="sale-brands-grid-tertiary">
          <!-- Loading State for Products -->
          <template v-if="isLoadingProducts">
            <div v-for="i in 4" :key="i" class="product-skeleton">
              <div class="skeleton-box"></div>
            </div>
          </template>
          <!-- Next 4 products from API (products[1] to products[4]) -->
          <template v-else-if="products.length > 1">
            <NuxtLink 
              v-for="product in products.slice(1, 5)" 
              :key="product.id"
              :to="`/products/${product.category?.slug || 'all'}/${product.slug}`"
              class="brand-product-link"
            >
              <NuxtImg 
                :src="getImageUrl(product.image)" 
                :alt="product.name" 
                class="sale-brand-image-cover" 
                format="webp"
                quality="85" 
                loading="lazy" 
              />
            </NuxtLink>
          </template>
          <!-- Empty State - only show when API returns no products -->
          <template v-else-if="products.length === 0">
            <div class="empty-products" style="grid-column: 1 / -1; display: flex; justify-content: center; align-items: center; height: 100%; width: 100%;">
              <p style="text-align: center;">No products available for this brand</p>
            </div>
          </template>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useApi } from '../composables/useApi'
import type { Brand, BrandResponse, Product, ProductResponse } from '../types/homepage'

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
      // Set first brand as selected by default and fetch its products
      if (brands.value.length > 0 && brands.value[0]) {
        selectedBrand.value = brands.value[0].slug
        // Fetch products for the first brand
        await fetchProductsByBrand(brands.value[0].slug)
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
</script>

<style scoped>
@import './ShopByBrand.css';
@import './SaleOffer.css';
</style>
