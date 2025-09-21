<template>
  <div class="men-page">
    <AppHeader />
    
    <!-- Hero Banner Section -->
    <section class="hero-banner">
      <div class="hero-container">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">MEN</h1>
          </div>
          <div class="hero-images">
            <div class="hero-image-left">
              <NuxtImg 
                src="/men/men-1.png" 
                alt="Men's fashion" 
                class="hero-img"
                loading="eager"
                format="webp"
                quality="90"
              />
            </div>
            <div class="hero-image-right">
              <NuxtImg 
                src="/men/men-2.png" 
                alt="Men's fashion" 
                class="hero-img"
                loading="eager"
                format="webp"
                quality="90"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Filter Section -->
    <section class="filter-section">
      <div class="filter-container">
        <div class="filter-dropdowns">
          <div class="filter-dropdown">
            <select class="filter-select" v-model="selectedSize">
              <option value="">Size</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>
            <svg class="dropdown-icon" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="filter-dropdown">
            <select class="filter-select" v-model="selectedPrice">
              <option value="">Price</option>
              <option value="0-1000">Under Tk 1,000</option>
              <option value="1000-2000">Tk 1,000 - 2,000</option>
              <option value="2000-3000">Tk 2,000 - 3,000</option>
              <option value="3000+">Above Tk 3,000</option>
            </select>
            <svg class="dropdown-icon" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- Products Grid Section -->
    <section class="products-section">
      <div class="products-container">
        <div class="products-grid">
          <div 
            v-for="(product, index) in filteredProducts" 
            :key="index"
            class="product-card"
          >
            <div class="product-image">
              <NuxtImg 
                :src="product.image" 
                :alt="product.name" 
                class="product-img"
                loading="lazy"
                format="webp"
                quality="85"
              />
            </div>
            <div class="product-info">
              <h3 class="product-name">{{ product.name }}</h3>
              <p class="product-price">{{ product.price }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { computed, ref } from 'vue'

// Meta
useHead({
  title: 'Men\'s Collection - Rang',
  meta: [
    { name: 'description', content: 'Discover our exclusive collection of men\'s Punjabi outfits and traditional wear.' }
  ]
})

// Reactive data
const selectedSize = ref('')
const selectedPrice = ref('')

// Product data
const products = ref([
  {
    id: 1,
    name: 'Punjabi for men',
    price: 'Tk 2,500',
    image: '/men/men-1.png',
    size: 'M',
    priceRange: '2000-3000'
  },
  {
    id: 2,
    name: 'Punjabi for men',
    price: 'Tk 2,500',
    image: '/men/men-2.png',
    size: 'L',
    priceRange: '2000-3000'
  },
  {
    id: 3,
    name: 'Punjabi for men',
    price: 'Tk 2,500',
    image: '/men/men-1.png',
    size: 'XL',
    priceRange: '2000-3000'
  },
  {
    id: 4,
    name: 'Punjabi for men',
    price: 'Tk 2,500',
    image: '/men/men-2.png',
    size: 'M',
    priceRange: '2000-3000'
  },
  {
    id: 5,
    name: 'Punjabi for men',
    price: 'Tk 2,500',
    image: '/men/men-1.png',
    size: 'L',
    priceRange: '2000-3000'
  },
  {
    id: 6,
    name: 'Punjabi for men',
    price: 'Tk 2,500',
    image: '/men/men-2.png',
    size: 'XL',
    priceRange: '2000-3000'
  },
  {
    id: 7,
    name: 'Punjabi for men',
    price: 'Tk 2,500',
    image: '/men/men-1.png',
    size: 'M',
    priceRange: '2000-3000'
  },
  {
    id: 8,
    name: 'Punjabi for men',
    price: 'Tk 2,500',
    image: '/men/men-2.png',
    size: 'L',
    priceRange: '2000-3000'
  }
])

// Computed filtered products
const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const sizeMatch = !selectedSize.value || product.size === selectedSize.value
    const priceMatch = !selectedPrice.value || product.priceRange === selectedPrice.value
    return sizeMatch && priceMatch
  })
})
</script>

<style scoped>
/* Men Page Styles */
.men-page {
  min-height: 100vh;
  background-color: #faf9f7;
}

/* Hero Banner Section */
.hero-banner {
  width: 100%;
  background: linear-gradient(135deg, #4a5568 0%, #2d3748 100%);
  position: relative;
  overflow: hidden;
}

.hero-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.hero-content {
  position: relative;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.hero-title {
  font-size: 4rem;
  font-weight: 700;
  color: white;
  text-align: center;
  letter-spacing: 0.1em;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  font-family: 'Poppins', sans-serif;
}

.hero-images {
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
}

.hero-image-left,
.hero-image-right {
  flex: 1;
  position: relative;
  overflow: hidden;
}

.hero-image-left {
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
}

.hero-image-right {
  background: linear-gradient(45deg, #f093fb 0%, #f5576c 100%);
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.3s ease;
}

.hero-img:hover {
  transform: scale(1.05);
}

/* Filter Section */
.filter-section {
  background-color: white;
  padding: 2rem 0;
  border-bottom: 1px solid #e2e8f0;
}

.filter-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.filter-dropdowns {
  display: flex;
  gap: 1rem;
  justify-content: flex-start;
  align-items: center;
}

.filter-dropdown {
  position: relative;
  min-width: 150px;
}

.filter-select {
  width: 100%;
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  background-color: white;
  font-size: 1rem;
  color: #374151;
  appearance: none;
  cursor: pointer;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.filter-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.dropdown-icon {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.25rem;
  height: 1.25rem;
  color: #6b7280;
  pointer-events: none;
}

/* Products Section */
.products-section {
  padding: 3rem 0;
  background-color: #faf9f7;
}

.products-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  justify-items: center;
}

.product-card {
  background-color: white;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
  max-width: 300px;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.product-image {
  width: 100%;
  height: 300px;
  overflow: hidden;
  position: relative;
}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.3s ease;
}

.product-card:hover .product-img {
  transform: scale(1.05);
}

.product-info {
  padding: 1.5rem;
  text-align: center;
}

.product-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
  font-family: 'Poppins', sans-serif;
}

.product-price {
  font-size: 1.25rem;
  font-weight: 700;
  color: #059669;
  margin: 0;
  font-family: 'Poppins', sans-serif;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .hero-title {
    font-size: 3rem;
  }
  
  .products-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .hero-content {
    min-height: 300px;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .filter-dropdowns {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }
  
  .filter-dropdown {
    min-width: auto;
  }
  
  .products-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }
  
  .product-image {
    height: 250px;
  }
  
  .products-section {
    padding: 2rem 0;
  }
}

@media (max-width: 480px) {
  .hero-content {
    min-height: 250px;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-container,
  .filter-container,
  .products-container {
    padding: 0 0.75rem;
  }
  
  .products-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .product-card {
    max-width: none;
  }
  
  .product-image {
    height: 200px;
  }
  
  .product-info {
    padding: 1rem;
  }
  
  .product-name {
    font-size: 1rem;
  }
  
  .product-price {
    font-size: 1.125rem;
  }
}

/* Large screens */
@media (min-width: 1400px) {
  .hero-title {
    font-size: 5rem;
  }
  
  .products-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 2.5rem;
  }
}

/* Extra large screens */
@media (min-width: 1600px) {
  .hero-container,
  .filter-container,
  .products-container {
    max-width: 1400px;
  }
}
</style>