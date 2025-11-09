<template>
  <div class="store-page">
    <div class="store-container">
      <section class="store-header">
        <h1 class="store-title">Store</h1>
        <p class="store-subtitle">Browse all our categories</p>
      </section>

      <div v-if="isLoading" class="loading-state">
        <p>Loading categories...</p>
      </div>

      <div v-else-if="error" class="error-state">
        <p>Error loading categories: {{ error }}</p>
      </div>

      <section v-else-if="categories && categories.length > 0" class="categories-section">
        <div class="categories-grid">
          <NuxtLink
            v-for="category in categories"
            :key="category.slug"
            :to="`/products/${category.slug?.replace(/&amp;/g, '&')}`"
            class="category-card"
          >
            <div class="category-content">
              <h3 class="category-name">{{ category.name?.replace(/&amp;/g, '&') }}</h3>
              <p class="category-count">{{ category.products_count }} products</p>
              <div v-if="category.children && category.children.length > 0" class="category-children">
                <span class="children-count">{{ category.children.length }} subcategories</span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </section>

      <div v-else class="empty-state">
        <p>No categories available</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useApi } from '~~/composables/useApi'
import type { Category, CategoryResponse } from '~~/types/homepage'

// Reactive state
const categories = ref<Category[] | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)

// Fetch categories from API
onMounted(async () => {
  isLoading.value = true
  error.value = null

  try {
    const { backendUrl } = useApi()
    const response = await $fetch<CategoryResponse>(`${backendUrl}/category`)
    console.log('Categories API Response:', response)

    if (response.success && response.data) {
      // Filter out categories with 0 products
      categories.value = response.data.filter(category => category.products_count > 0)
      console.log('Categories:', categories.value)
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
    error.value = errorMessage
    console.error('Error fetching categories:', err)
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped>
@import './store.css';
</style>

