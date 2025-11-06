<template>
  <main class="api-categories-container" v-if="sections && sections.length > 0">
    <section v-for="section in sections" :key="section.title" class="category-section">
      <div class="category-header">
        <h2 class="category-title">{{ section.title }}</h2>
      </div>

      <div v-if="section.products && section.products.length > 0" class="carousel-wrapper">
        <UCarousel
          ref="carouselRef"
          v-slot="{ item }"
          :items="section.products"
          :ui="{
            item: 'basis-1/4',
            container: 'rounded-lg'
          }"
          class="rounded-lg"
          :slides-per-view="4"
          :slides-per-group="1"
          :autoplay="false"
          :infinite="true"
        >
          <div class="product-card">
            <NuxtLink :to="`/products/${item.slug}`" class="product-link">
              <NuxtImg
                :src="getImageUrl(item.image)"
                :alt="item.name"
                class="product-image"
                loading="lazy"
                format="webp"
                quality="85"
              />
              <div class="product-info">
                <h3 class="product-name">{{ item.name }}</h3>
                <div class="product-price">
                  <span class="current-price">Tk {{ item.price.toLocaleString() }}</span>
                  <span v-if="item.compare_price > item.price" class="compare-price">
                    Tk {{ item.compare_price.toLocaleString() }}
                  </span>
                </div>
              </div>
            </NuxtLink>
          </div>
        </UCarousel>
      </div>

      <div v-else class="empty-section">
        <p>No products available in this category</p>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { HomepageSection } from '../types/homepage';

interface Props {
  sections: HomepageSection[] | null
}

const props = defineProps<Props>()

const carouselRef = ref()

// Helper function to get full image URL
const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return ''
  // If image path already includes http/https, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }
  // Otherwise, prepend the API base URL
  return `https://rangbd.thecell.tech${imagePath.startsWith('/') ? imagePath : '/' + imagePath}`
}
</script>

<style scoped>
.api-categories-container {
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.category-section {
  margin-bottom: 3rem;
}

.category-header {
  margin-bottom: 1.5rem;
  text-align: center;
}

.category-title {
  font-family: Poppins, sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #000;
  margin: 0;
}

.carousel-wrapper {
  position: relative;
}

.product-card {
  position: relative;
  margin: 0 0.5rem;
  border-radius: 0.5rem;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.product-link {
  display: block;
  text-decoration: none;
  color: inherit;
}

.product-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  display: block;
}

.product-info {
  padding: 1rem;
}

.product-name {
  font-family: Poppins, sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #000;
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-price {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.current-price {
  font-family: Poppins, sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  color: #ea580c;
}

.compare-price {
  font-family: Poppins, sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  text-decoration: line-through;
}

.empty-section {
  text-align: center;
  padding: 2rem;
  color: #6b7280;
  font-family: Poppins, sans-serif;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .category-title {
    font-size: 1.75rem;
  }

  .product-image {
    height: 250px;
  }
}

@media (max-width: 768px) {
  .api-categories-container {
    padding: 1.5rem 0.5rem;
  }

  .category-title {
    font-size: 1.5rem;
  }

  .product-image {
    height: 200px;
  }

  .product-name {
    font-size: 0.875rem;
  }

  .current-price {
    font-size: 1rem;
  }
}
</style>

