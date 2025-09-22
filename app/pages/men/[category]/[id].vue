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
        <div class="main-image-container" @mouseenter="showZoom = true" @mouseleave="showZoom = false" @mousemove="handleMouseMove">
          <div class="main-image-wrapper">
            <NuxtImg 
              :src="product.images[selectedImageIndex]" 
              :alt="product.name"
              class="main-image"
              loading="eager"
              format="webp"
              quality="90"
            />
            <!-- Zoom overlay -->
            <div v-if="showZoom" class="zoom-overlay" :style="zoomStyle">
              <NuxtImg 
                :src="product.images[selectedImageIndex]" 
                :alt="product.name"
                class="zoom-image"
                loading="eager"
                format="webp"
                quality="90"
              />
            </div>
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
const showZoom = ref(false)
const mousePosition = ref({ x: 0, y: 0 })

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

// Computed properties
const zoomStyle = computed(() => {
  const scale = 2
  const offsetX = mousePosition.value.x * scale
  const offsetY = mousePosition.value.y * scale
  
  return {
    transform: `translate(-${offsetX}px, -${offsetY}px) scale(${scale})`,
    transformOrigin: `${mousePosition.value.x}px ${mousePosition.value.y}px`
  }
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

const handleMouseMove = (event: MouseEvent) => {
  const rect = (event.target as HTMLElement).getBoundingClientRect()
  mousePosition.value = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  }
}
</script>

<style scoped>
/* Product Details Page Styles */
.product-page {
  background-color: #f5f5dc; /* Light beige background */
  min-height: 100vh;
}

/* Breadcrumb Navigation */
.breadcrumb {
  padding: 20px 40px;
  font-size: 14px;
  color: #666;
  background-color: white;
  border-bottom: 1px solid #eee;
}

.breadcrumb a {
  color: #666;
  text-decoration: none;
  transition: color 0.3s ease;
}

.breadcrumb a:hover {
  color: #ea580c;
}

.breadcrumb span {
  margin: 0 8px;
  color: #999;
}

/* Product Container */
.product-container {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  gap: 60px;
}

/* Left Side - Product Images */
.product-images {
  display: flex;
  gap: 20px;
  flex: 2;
}

/* Thumbnail Images */
.thumbnail-images {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 80px;
}

.thumbnail {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.thumbnail:hover {
  border-color: #ea580c;
}

.thumbnail.active {
  border-color: #ea580c;
  box-shadow: 0 0 0 1px #ea580c;
}

.thumbnail-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.show-more-btn {
  background: none;
  border: none;
  color: #666;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 0;
  transition: color 0.3s ease;
}

.show-more-btn:hover {
  color: #ea580c;
}

.arrow-icon {
  width: 12px;
  height: 12px;
  transition: transform 0.3s ease;
}

.arrow-icon.rotated {
  transform: rotate(180deg);
}

/* Main Image Container */
.main-image-container {
  flex: 1;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  background: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.main-image-wrapper {
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

/* Zoom Overlay */
.zoom-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
}

.zoom-image {
  width: 200%;
  height: 200%;
  object-fit: cover;
  opacity: 0.9;
}

/* Right Side - Product Details */
.product-details {
  flex: 1;
  padding: 20px 0;
}

.product-title {
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  line-height: 1.2;
}

/* Pricing */
.pricing {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.current-price {
  font-size: 28px;
  font-weight: bold;
  color: #ea580c;
}

.original-price {
  font-size: 20px;
  color: #999;
  text-decoration: line-through;
}

.discount {
  font-size: 16px;
  color: #999;
}

/* Rating Section */
.rating-section {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.stars {
  display: flex;
  gap: 2px;
}

.star {
  width: 18px;
  height: 18px;
  color: #ddd;
}

.star.filled {
  color: #333;
}

.rating-number {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.reviews {
  font-size: 14px;
  color: #666;
}

/* SKU */
.sku {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}

/* Share Button */
.share-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 10px 16px;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 30px;
}

.share-btn:hover {
  background: #e5e5e5;
  border-color: #ccc;
}

.share-icon {
  width: 16px;
  height: 16px;
}

/* Size Selection */
.size-selection {
  margin-bottom: 25px;
}

.selection-label {
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
}

.size-dropdown {
  position: relative;
  display: inline-block;
  margin-bottom: 10px;
}

.size-select {
  appearance: none;
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 12px 40px 12px 16px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  min-width: 120px;
  transition: border-color 0.3s ease;
}

.size-select:focus {
  outline: none;
  border-color: #ea580c;
}

.dropdown-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: #666;
  pointer-events: none;
}

.size-guide-link {
  color: #ea580c;
  text-decoration: none;
  font-size: 14px;
  margin-left: 15px;
  transition: color 0.3s ease;
}

.size-guide-link:hover {
  color: #c2410c;
  text-decoration: underline;
}

/* Color Selection */
.color-selection {
  margin-bottom: 25px;
}

.color-options {
  display: flex;
  gap: 12px;
  margin-top: 10px;
}

.color-option {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  border: 3px solid transparent;
  transition: all 0.3s ease;
  position: relative;
}

.color-option:hover {
  transform: scale(1.1);
}

.color-option.selected {
  border-color: #333;
  box-shadow: 0 0 0 2px #ea580c;
}

/* Quantity Selector */
.quantity-selector {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
}

.quantity-btn {
  width: 40px;
  height: 40px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
}

.quantity-btn:hover:not(:disabled) {
  background: #f5f5f5;
  border-color: #ea580c;
}

.quantity-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-text {
  font-size: 16px;
  color: #333;
  min-width: 100px;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 15px;
}

.buy-now-btn {
  flex: 1;
  background: #ea580c;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 16px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.buy-now-btn:hover {
  background: #c2410c;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(234, 88, 12, 0.3);
}

.add-to-basket-btn {
  flex: 1;
  background: white;
  color: #333;
  border: 2px solid #333;
  border-radius: 8px;
  padding: 14px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-to-basket-btn:hover {
  background: #333;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* Responsive Design */
@media (max-width: 768px) {
  .product-container {
    flex-direction: column;
    gap: 30px;
    padding: 20px 15px;
  }
  
  .product-images {
    flex-direction: column;
  }
  
  .thumbnail-images {
    flex-direction: row;
    width: 100%;
    overflow-x: auto;
    gap: 10px;
  }
  
  .thumbnail {
    flex-shrink: 0;
  }
  
  .main-image-wrapper {
    height: 400px;
  }
  
  .product-title {
    font-size: 24px;
  }
  
  .current-price {
    font-size: 24px;
  }
  
  .action-buttons {
    flex-direction: column;
  }
}
</style>

<style>
/* Override AppHeader navigation colors for product page */
:global(.nav-link) {
  color: black !important;
}

:global(.nav-link:hover) {
  color: #ea580c !important;
}
</style>