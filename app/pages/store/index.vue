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
    const response = await $fetch<CategoryResponse>('https://rangbd.thecell.tech/api/category')
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
.store-page {
  min-height: 100vh;
  padding: 2rem 0;
  background-color: #f9fafb;
}

.store-container {
  width: 90%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.store-header {
  text-align: center;
  margin-bottom: 3rem;
}

.store-title {
  font-family: Poppins, sans-serif;
  font-size: 3rem;
  font-weight: 700;
  color: #000;
  margin: 0 0 0.5rem 0;
}

.store-subtitle {
  font-family: Poppins, sans-serif;
  font-size: 1.125rem;
  font-weight: 400;
  color: #6b7280;
  margin: 0;
}

.categories-section {
  margin-top: 2rem;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

.category-card {
  display: block;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 2rem;
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  cursor: pointer;
}

.category-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border-color: #ea580c;
}

.category-content {
  text-align: center;
}

.category-name {
  font-family: Poppins, sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: #000;
  margin: 0 0 0.75rem 0;
}

.category-count {
  font-family: Poppins, sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  margin: 0 0 0.5rem 0;
}

.category-children {
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid #e5e7eb;
}

.children-count {
  font-family: Poppins, sans-serif;
  font-size: 0.75rem;
  font-weight: 400;
  color: #9ca3af;
}

.loading-state,
.error-state,
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #6b7280;
  font-family: Poppins, sans-serif;
  font-size: 1.125rem;
}

.error-state {
  color: #ef4444;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .store-title {
    font-size: 2.5rem;
  }

  .categories-grid {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .store-page {
    padding: 1.5rem 0;
  }

  .store-container {
    padding: 1.5rem 0.5rem;
  }

  .store-title {
    font-size: 2rem;
  }

  .store-subtitle {
    font-size: 1rem;
  }

  .categories-grid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1.25rem;
  }

  .category-card {
    padding: 1.5rem;
  }

  .category-name {
    font-size: 1.125rem;
  }
}

@media (max-width: 480px) {
  .store-title {
    font-size: 1.75rem;
  }

  .categories-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .category-card {
    padding: 1.25rem;
  }

  .category-name {
    font-size: 1rem;
  }
}
</style>

