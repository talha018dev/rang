<template>
  <main class="page-content">
    <!-- Loading State -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner">
        <div class="spinner"></div>
      </div>
      <p class="loading-text">Loading page...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-container">
      <div class="error-icon">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h2 class="error-title">Page Not Found</h2>
      <p class="error-message">{{ error }}</p>
      <NuxtLink to="/" class="error-button">
        <span>Go Back Home</span>
      </NuxtLink>
    </div>

    <!-- Content -->
    <div v-else-if="pageData" class="page-container">
      <div class="page-header">
        <h1 class="page-title">{{ pageData.title }}</h1>
      </div>

      <div class="page-body">
        <div class="page-content-wrapper" v-html="pageData.content"></div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useHead, useRoute } from 'nuxt/app'
import { computed, onMounted, ref, watch } from 'vue'
import { useApi } from '~~/composables/useApi'

// Types
interface PageData {
  title: string
  content: string
}

interface PageResponse {
  success: boolean
  message: string
  data: PageData
}

// Route
const route = useRoute()
const pageSlug = computed(() => route.params.pageSlug as string)

// Reactive state
const pageData = ref<PageData | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)

// Meta tags
useHead({
  title: computed(() => pageData.value ? `${pageData.value.title} - Rang Bangladesh` : 'Page - Rang Bangladesh'),
  meta: [
    {
      name: 'description',
      content: computed(() => pageData.value 
        ? `Read ${pageData.value.title} on Rang Bangladesh` 
        : 'Rang Bangladesh'
      )
    }
  ]
})

// Fetch page data
const fetchPageData = async () => {
  if (!pageSlug.value) {
    error.value = 'Page slug is required'
    isLoading.value = false
    return
  }

  isLoading.value = true
  error.value = null

  try {
    const { backendUrl } = useApi()
    const apiUrl = `${backendUrl}/page/${pageSlug.value}`
    
    const response = await $fetch<PageResponse>(apiUrl)
    console.log('Page API Response:', response)

    if (response.success && response.data) {
      pageData.value = response.data
    } else {
      error.value = response.message || 'Page not found'
    }
  } catch (err: any) {
    const errorMessage = err.data?.message || err.message || 'Failed to load page'
    error.value = errorMessage
    console.error('Error fetching page:', err)
  } finally {
    isLoading.value = false
  }
}

// Fetch on mount
onMounted(() => {
  fetchPageData()
})

// Watch for route changes
watch(() => route.params.pageSlug, () => {
  fetchPageData()
})
</script>

<style scoped>
@import './[pageSlug].css';
</style>

