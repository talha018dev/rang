<template>
  <main class="all-categories-container" v-if="categories && categories.length > 0">
    <section class="categories-header">
      <h2 class="categories-title">All Categories</h2>
    </section>

    <section class="categories-grid">
      <NuxtLink
        v-for="category in categories"
        :key="category.slug"
        :to="`/products/${category.slug}`"
        class="category-card"
      >
        <div class="category-content">
          <h3 class="category-name">{{ category.name }}</h3>
          <p class="category-count">{{ category.products_count }} products</p>
        </div>
      </NuxtLink>
    </section>

    <div v-if="isLoading" class="loading-state">
      <p>Loading categories...</p>
    </div>

    <div v-if="error" class="error-state">
      <p>Error loading categories: {{ error }}</p>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Category, CategoryResponse } from '../types/homepage';

// Reactive state
const categories = ref<Category[] | null>(null);
const isLoading = ref(false);
const error = ref<string | null>(null);

// Fetch categories from API
onMounted(async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const response = await $fetch<CategoryResponse>('https://rangbd.thecell.tech/api/category');
    console.log('Categories API Response:', response);

    if (response.success && response.data) {
      // Filter out categories with 0 products
      categories.value = response.data.filter(category => category.products_count > 0);
      console.log('Categories:', categories.value);
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
    error.value = errorMessage;
    console.error('Error fetching categories:', err);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
.all-categories-container {
  width: 90%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.categories-header {
  margin: 2rem 0 1rem 0;
  text-align: center;
}

.categories-title {
  font-family: Poppins, sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #000;
  margin: 0;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.category-card {
  display: block;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1.5rem;
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  cursor: pointer;
}

.category-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-color: #ea580c;
}

.category-content {
  text-align: center;
}

.category-name {
  font-family: Poppins, sans-serif;
  font-size: 1.125rem;
  font-weight: 600;
  color: #000;
  margin: 0 0 0.5rem 0;
}

.category-count {
  font-family: Poppins, sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  margin: 0;
}

.loading-state,
.error-state {
  text-align: center;
  padding: 2rem;
  color: #6b7280;
  font-family: Poppins, sans-serif;
}

.error-state {
  color: #ef4444;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .categories-title {
    font-size: 1.75rem;
  }

  .categories-grid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1.25rem;
  }
}

@media (max-width: 768px) {
  .all-categories-container {
    padding: 1.5rem 0.5rem;
  }

  .categories-title {
    font-size: 1.5rem;
  }

  .categories-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }

  .category-card {
    padding: 1.25rem;
  }

  .category-name {
    font-size: 1rem;
  }

  .category-count {
    font-size: 0.75rem;
  }
}

@media (max-width: 480px) {
  .categories-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }

  .category-card {
    padding: 1rem;
  }
}
</style>

