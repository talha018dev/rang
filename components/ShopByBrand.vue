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
                <NuxtLink 
                    v-for="brand in brands" 
                    :key="brand.slug" 
                    :to="`/products?brand=${brand.slug}`"
                    class="brand-item"
                >
                    <NuxtImg 
                        :src="brand.image.url" 
                        :alt="brand.name" 
                        class="brand-image" 
                        format="webp" 
                        quality="85" 
                        loading="lazy" 
                    />
                </NuxtLink>
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
    </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useApi } from '~~/composables/useApi'
import type { Brand, BrandResponse } from '~~/types/homepage'

// Reactive state
const brands = ref<Brand[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

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

// Fetch brands on mount
onMounted(() => {
  fetchBrands()
})
</script>

<style scoped>
@import './ShopByBrand.css';
</style>
