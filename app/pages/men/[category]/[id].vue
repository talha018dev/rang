<template>
  <div class="product-page">
    <AppHeader />
    
    <!-- Breadcrumb Navigation -->
    <div class="breadcrumb">
      <NuxtLink to="/">Homepage</NuxtLink>
      <span>/</span>
      <NuxtLink to="/men">Men</NuxtLink>
      <span>/</span>
      <span>{{ category }}</span>
      <span>/</span>
      <span>{{ product.name }}</span>
    </div>

    <!-- Product Details Section -->
    <div class="product-container">
      <!-- Left Side - Product Images -->
      <div class="product-images">
        <!-- Thumbnail Images -->
        <div class="thumbnail-images">
          <div 
            v-for="(image, index) in product.images" 
            :key="index"
            class="thumbnail"
            :class="{ active: selectedImageIndex === index }"
            @click="selectedImageIndex = index"
          >
            <NuxtImg 
              :src="image" 
              :alt="`${product.name} view ${index + 1}`"
              class="thumbnail-img"
              loading="lazy"
              format="webp"
              quality="85"
            />
          </div>
          <button class="show-more-btn" @click="showMoreImages = !showMoreImages">
            Show More
            <svg class="arrow-icon" :class="{ rotated: showMoreImages }" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>

        <!-- Main Product Image -->
        <div class="main-image-container">
          <div class="main-image-wrapper">
            <NuxtImg 
              :src="product.images[selectedImageIndex]" 
              :alt="product.name"
              class="main-image"
              loading="eager"
              format="webp"
              quality="90"
            />
          </div>
        </div>
      </div>

      <!-- Right Side - Product Details -->
      <div class="product-details">
        <h1 class="product-title">{{ product.name }}</h1>
        
        <!-- Pricing -->
        <div class="pricing">
          <span class="current-price">{{ product.currentPrice }}</span>
          <span class="original-price">{{ product.originalPrice }}</span>
          <span class="discount">{{ product.discount }}</span>
        </div>

        <!-- Rating and Reviews -->
        <div class="rating-section">
          <div class="stars">
            <svg v-for="i in 5" :key="i" class="star" :class="{ filled: i <= product.rating }" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <span class="rating-number">{{ product.rating }}</span>
          <span class="reviews">{{ product.reviews }}</span>
        </div>

        <!-- SKU -->
        <div class="sku">
          SKU: {{ product.sku }}
        </div>

        <!-- Share Button -->
        <button class="share-btn">
          <svg class="share-icon" fill="currentColor" viewBox="0 0 20 20">
            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
          </svg>
          Share
        </button>

        <!-- Size Selection -->
        <div class="size-selection">
          <label class="selection-label">Size</label>
          <div class="size-dropdown">
            <select v-model="selectedSize" class="size-select">
              <option value="">Select</option>
              <option v-for="size in product.sizes" :key="size" :value="size">{{ size }}</option>
            </select>
            <svg class="dropdown-icon" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
          <NuxtLink to="#" class="size-guide-link">See Sizes & Fit Details</NuxtLink>
        </div>

        <!-- Color Selection -->
        <div class="color-selection">
          <label class="selection-label">Color</label>
          <div class="color-options">
            <div 
              v-for="(color, index) in product.colors" 
              :key="index"
              class="color-option"
              :class="{ selected: selectedColorIndex === index }"
              :style="{ backgroundColor: color.value }"
              @click="selectedColorIndex = index"
            ></div>
          </div>
        </div>

        <!-- Quantity Selector -->
        <div class="quantity-selector">
          <button class="quantity-btn" @click="decreaseQuantity" :disabled="quantity <= 1">-</button>
          <span class="quantity-text">Quantity: {{ quantity }}</span>
          <button class="quantity-btn" @click="increaseQuantity">+</button>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <button class="buy-now-btn">Buy Now</button>
          <button class="add-to-basket-btn">Add to Basket</button>
        </div>
      </div>
    </div>
  </div>
  <AppFooter />
</template>

<script setup lang="ts">
// All Vue composables and components are auto-imported in Nuxt 4
import './product-details.css'

// Get route parameters
const route = useRoute()
const category = route.params.category as string
const id = route.params.id as string


// Meta
useHead({
  title: `Men's ${category} - Product Details - Rang`,
  meta: [
    { name: 'description', content: `Discover our exclusive ${category} collection for men. Premium quality traditional wear.` }
  ]
})

// Reactive data
const selectedImageIndex = ref(0)
const selectedColorIndex = ref(2) // Default to mustard yellow
const selectedSize = ref('')
const quantity = ref(1)
const showMoreImages = ref(false)

// Mock product data - in a real app, this would come from an API
const product = ref({
  id: id,
  name: "Men's Punjabi",
  currentPrice: "Tk 2,500",
  originalPrice: "Tk 3,000",
  discount: "-10%",
  rating: 4.4,
  reviews: "5 Reviews | 13 Sold",
  sku: "115088",
  images: [
    '/men/men-1.png',
    '/men/men-2.png',
    '/men/men-1.png',
    '/men/men-2.png'
  ],
  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  colors: [
    { name: 'Dark Brown', value: '#8B4513' },
    { name: 'Navy', value: '#2C3E50' },
    { name: 'Mustard', value: '#DAA520' },
    { name: 'Pink', value: '#FFB6C1' }
  ]
})

// Methods
const increaseQuantity = () => {
  quantity.value++
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}
</script>