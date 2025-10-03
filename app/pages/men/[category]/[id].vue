<template>
  <div class="product-page">
    <AppHeader />
    
    <!-- Breadcrumb Navigation -->
    <div class="breadcrumb-bg">
      <div class="breadcrumb">
        <NuxtLink to="/">Homepage</NuxtLink>
        <span>/</span>
        <NuxtLink to="/men">Men</NuxtLink>
        <span>/</span>
        <span>{{ category }}</span>
        <span>/</span>
        <span>{{ product.name }}</span>
      </div>
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
            
            <!-- Show More Overlay for last thumbnail -->
            <div v-if="index === product.images.length - 1" class="thumbnail-show-more-overlay" @click.stop="showMoreImages = !showMoreImages">
              <div class="thumbnail-show-more-content">
                <span class="thumbnail-show-more-text">Show More</span>
                <svg class="thumbnail-show-more-arrow" :class="{ rotated: showMoreImages }" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Product Image -->
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

      <!-- Right Side - Product Details -->
      <div class="product-details">
        <div class="product-title">{{ product.name }}</div>
        
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
          <img src="/product-details/ios_share.svg" alt="Share" />
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
          <button class="quantity-btn minus" @click="decreaseQuantity" :disabled="quantity <= 1">-</button>
          <span class="quantity-text">Quantity: {{ quantity }}</span>
          <button class="quantity-btn plus" @click="increaseQuantity">+</button>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <button class="buy-now-btn">Buy Now</button>
          <button class="add-to-basket-btn">Add to Basket</button>
        </div>
      </div>
    </div>

    <!-- Matching Series Section -->
    <div class="matching-series-section">
      <h2 class="section-title">Explore Our Matching Series:</h2>
      
      <div class="matching-series-container">
        <div class="matching-series-products">
          <div 
            v-for="(item, index) in matchingSeriesItems" 
            :key="index"
            class="matching-series-item"
          >
            <!-- Checkbox -->
            <div class="item-checkbox">
              <input 
                type="checkbox" 
                :id="`matching-${index}`"
                v-model="item.checked"
                class="checkbox-input"
              />
              <label :for="`matching-${index}`" class="checkbox-label"></label>
            </div>
            
            <!-- Product Image -->
            <div class="item-image">
              <NuxtImg 
                :src="item.image" 
                :alt="item.name"
                class="product-img"
                loading="lazy"
                format="webp"
                quality="85"
              />
            </div>
            
            <!-- Product Details -->
            <div class="item-details">
              <p class="item-name">{{ item.name }}</p>
              
              <!-- Size Selector -->
              <div class="size-selector">
                <select v-model="item.size" class="size-select">
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </select>
              </div>
              
              <p class="item-price">TK {{ item.price.toLocaleString() }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Frequently Bought Together Section -->
    <div class="frequently-bought-section">
      <h2 class="section-title">Frequently bought together</h2>
      
      <div class="frequently-bought-container">
        <!-- Product Cards -->
        <div class="frequently-bought-products">
          <div 
            v-for="(item, index) in frequentlyBoughtItems" 
            :key="index"
            class="frequently-bought-item"
          >
            <!-- Checkbox -->
            
            
            <!-- Product Image -->
            <div class="item-image">
              <NuxtImg 
                :src="item.image" 
                :alt="item.name"
                class="product-img"
                loading="lazy"
                format="webp"
                quality="85"
              />
              <div class="item-checkbox">
              <input 
                type="checkbox" 
                :id="`item-${index}`"
                v-model="item.selected"
                class="checkbox-input"
              />
              <label :for="`item-${index}`" class="checkbox-label"></label>
            </div>
            </div>
            
            <!-- Product Details -->
            <div class="item-details">
              <p class="item-description">{{ item.description }}</p>
              <p class="item-price">{{ item.price }}</p>
            </div>
            
            <!-- Plus Sign (except for last item) -->
            
          </div>
          <div class="frequently-bought-summary">
          <div class="total-price">
            <span class="total-label">Total price :</span>
            <span class="total-amount">{{ totalPrice }}</span>
          </div>
          <button class="add-to-cart-btn" @click="addFrequentlyBoughtToCart">
            Add to cart
          </button>
        </div>
        </div>
        
        <!-- Total and Add to Cart -->
        <!-- <div class="frequently-bought-summary">
          <div class="total-price">
            <span class="total-label">Total price :</span>
            <span class="total-amount">{{ totalPrice }}</span>
          </div>
          <button class="add-to-cart-btn" @click="addFrequentlyBoughtToCart">
            Add to cart
          </button>
        </div> -->
      </div>
    </div>

    <!-- Product Information Section -->
    <div class="product-info-section">
      <div class="product-info-container">
        <!-- Left Column - Product Description -->
        <div class="product-description">
          <h2 class="info-section-title">Product Description</h2>
          
          <div class="description-content">
            <div class="description-item">
              <h3 class="description-subtitle">Details</h3>
              <ul class="description-list">
                <li>Long sleeve overshirt with curved hem</li>
                <li>Patch pockets</li>
                <li>100% cotton</li>
                <li>Machine washable</li>
              </ul>
            </div>

            <div class="description-item">
              <h3 class="description-subtitle">Size & Fit</h3>
              <ul class="description-list">
                <li>Oversized</li>
                <li>Sleeve Type - Long Sleeve</li>
                <li>Fit or Cut - Oversized</li>
              </ul>
            </div>

            <div class="description-item">
              <h3 class="description-subtitle">Stylist's Notes</h3>
              <p class="description-text">
                Curate a soft-utility aesthetic by teaming with loose fit shirts and denim.
              </p>
            </div>

            <div class="description-item">
              <h3 class="description-subtitle">Better Cotton</h3>
              <p class="description-text">
                By choosing our cotton products, you're supporting our investment in Better Cotton's mission to help cotton communities survive and thrive while protecting and restoring the environment. Better Cotton Farmers are farmers who care for the environment and respect workers' rights and wellbeing. This product is sourced via a system of mass balance and therefore may not contain Better Cotton.
              </p>
              <a href="https://bettercotton.org/massbalance" class="better-cotton-link" target="_blank" rel="noopener noreferrer">
                bettercotton.org/massbalance
              </a>
            </div>
          </div>
        </div>

        <!-- Right Column - Product Specification -->
        <div class="product-specification">
          <h2 class="info-section-title">Product Specification</h2>
          
          <div class="specification-content">
            <ul class="specification-list">
              <li><span class="spec-label">Product Code</span> - 21491001</li>
              <li><span class="spec-label">Iron</span> - Cool iron, Iron Inside Out</li>
              <li><span class="spec-label">Washing Instructions</span> - Machine washable</li>
              <li><span class="spec-label">Country of Origin</span> - India</li>
              <li><span class="spec-label">Neckline</span> - Collar</li>
              <li><span class="spec-label">Brand</span> - John Lewis ANYDAY</li>
              <li><span class="spec-label">Fastening</span> - Button</li>
              <li><span class="spec-label">Drying Instructions</span> - Do not tumble dry</li>
              <li><span class="spec-label">Pattern Details</span> - Plain</li>
              <li><span class="spec-label">Composition</span> - 100% cotton</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Customer Reviews Section -->
    <div class="reviews-section">
      <h2 class="reviews-title">Customer Reviews</h2>
      
      <!-- Overall Rating Summary -->
      <div class="reviews-summary">
        
<div>
  <div class="overall-rating">
          <div class="rating-display">
            <div class="stars-display">
              <svg v-for="i in 5" :key="i" class="star" :class="{ filled: i <= Math.floor(overallRating), partial: i === Math.ceil(overallRating) && overallRating % 1 !== 0 }" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <span class="rating-number">{{ overallRating }}</span>
            <p class="reviews-count">{{ totalReviews }} Reviews {{ totalSold }} Sold</p>
          </div>
        </div>
        <div class="star-distribution">
          <div v-for="(count, index) in starDistribution" :key="index" class="star-bar">
            <span class="star-label">{{ 5 - index }} Stars ({{ count }})</span>
            <div class="bar-container">
              <div class="bar-fill" :style="{ width: `${(count / Math.max(...starDistribution)) * 100}%` }"></div>
            </div>
          </div>
        </div>
</div>
        <!-- Star Distribution -->
        

        <!-- Attribute Ratings -->
        <div class="attribute-ratings">
          <div class="attribute-item">
            <span class="attribute-label">Quality: Excellent</span>
            <div class="attribute-slider">
              <div class="slider-track">
                <div class="quality-bar"></div>
                <div class="quality-bar"></div>
                <div class="quality-bar"></div>
                <div class="quality-bar"></div>
                <div class="quality-bar"></div>
              </div>
            </div>
            <div class="quality-slider-labels">
              <div>Poor</div>
              <div class="ml-auto">Excellent</div>
            </div>
          </div>
          <div class="attribute-item">
            <span class="attribute-label">Value: Excellent</span>
            <div class="attribute-slider">
              <div class="slider-track">
                <div class="quality-bar"></div>
                <div class="quality-bar"></div>
                <div class="quality-bar"></div>
                <div class="quality-bar"></div>
                <div class="quality-bar"></div>
              </div>
            </div>
            <div class="quality-slider-labels">
              <div>Poor</div>
              <div class="ml-auto">Excellent</div>
            </div>
          </div>
          <div class="attribute-item">
            <span class="attribute-label">Fit: Big</span>
            <div class="attribute-slider">
              <div class="slider-track">
                <div class="quality-bar"></div>
                <div class="quality-bar"></div>
                <div class="quality-bar"></div>
                <div class="quality-bar"></div>
                <div class="quality-bar"></div>
              </div>
            </div>
            <div class="quality-slider-labels">
              <div>Very Small</div>
              <div class="ml-auto">Very Big</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Search and Sort -->
      <div class="reviews-controls">
        <div class="search-box">
          <input 
            type="text" 
            v-model="searchQuery"
            placeholder="Try searching for a keyword"
            class="search-input"
          />
          <svg class="search-icon" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="sort-dropdown">
          <select v-model="sortBy" class="sort-select">
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
            <option value="most-helpful">Most Helpful</option>
          </select>
          <svg class="dropdown-icon" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>

      <!-- Individual Reviews -->
      <div class="reviews-list">
        <div 
          v-for="review in filteredAndSortedReviews" 
          :key="review.id"
          class="review-item"
        >
          <div class="review-header">
            <div class="review-rating">
              <div class="review-stars">
                <svg v-for="i in 5" :key="i" class="star" :class="{ filled: i <= review.rating }" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span class="rating-text">{{ review.rating }}/5</span>
            </div>
            <div class="review-meta">
              <span class="reviewer-name">{{ review.reviewerName }}</span>
              <span v-if="review.verified" class="verified-badge">
                <svg class="check-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                Verified Buyer
              </span>
              <span class="review-date">{{ review.date }}</span>
            </div>
          </div>
          
          <div class="review-content">
            <h3 class="review-title">{{ review.title }}</h3>
            <p class="review-text">{{ review.text }}</p>
          </div>

          <div class="review-footer">
            <div class="helpfulness">
              <span class="helpfulness-text">Is this review helpful?</span>
              <div class="helpfulness-buttons">
                <button 
                  class="helpfulness-btn yes-btn"
                  @click="voteHelpful(review.id, true)"
                  :class="{ active: review.userVote === 'yes' }"
                >
                  <svg class="thumbs-icon" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.834a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                  Yes ({{ review.helpfulYes }})
                </button>
                <button 
                  class="helpfulness-btn no-btn"
                  @click="voteHelpful(review.id, false)"
                  :class="{ active: review.userVote === 'no' }"
                >
                  <svg class="thumbs-icon" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.834a2 2 0 00-1.106-1.79l-.05-.025A4 4 0 0011.057 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
                  </svg>
                  No ({{ review.helpfulNo }})
                </button>
              </div>
            </div>
            <button class="report-btn">Report</button>
          </div>

          <div class="review-attributes">
            <div class="attribute-rating">
              <span class="attr-label">Quality :</span>
              <span class="attr-value">{{ review.attributes.quality }}</span>
            </div>
            <div class="attribute-rating">
              <span class="attr-label">Value :</span>
              <span class="attr-value">{{ review.attributes.value }}</span>
            </div>
            <div class="attribute-rating">
              <span class="attr-label">Fit :</span>
              <span class="attr-value">{{ review.attributes.fit }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Related Products Section -->
    <div class="related-products-section">
      <h2 class="related-products-title">
        <span class="title-part-1">Related</span>
        <span class="title-part-2">Products</span>
      </h2>
      
      <div class="related-products-grid">
        <div 
          v-for="product in relatedProducts" 
          :key="product.id"
          class="related-product-card"
        >
          <div class="product-image-container">
            <NuxtImg 
              :src="product.image" 
              :alt="product.name"
              class="product-image"
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
  </div>
  <AppFooter />
</template>

<script setup lang="ts">
// All Vue composables and components are auto-imported in Nuxt 4
// CSS is imported globally via nuxt.config.ts
import { useHead, useRoute } from 'nuxt/app'
import { computed, ref } from 'vue'
import AppFooter from '../../../../components/AppFooter.vue'
// Get route parameters
import './product-details.css'
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

// Matching series data
const matchingSeriesItems = ref([
  {
    checked: true,
    image: '/men/men-1.png',
    name: 'Premium Cotton Kurta',
    size: 'M',
    price: 1500
  },
  {
    checked: false,
    image: '/men/men-2.png',
    name: 'Designer Punjabi Set',
    size: 'L',
    price: 2200
  },
  {
    checked: true,
    image: '/men/men-1.png',
    name: 'Traditional Sherwani',
    size: 'XL',
    price: 3500
  },
  {
    checked: false,
    image: '/men/men-2.png',
    name: 'Casual Pathani Suit',
    size: 'M',
    price: 1800
  },
  {
    checked: true,
    image: '/men/men-1.png',
    name: 'Festive Kurta Pajama',
    size: 'L',
    price: 2800
  },
  {
    checked: false,
    image: '/men/men-2.png',
    name: 'Wedding Collection',
    size: 'XL',
    price: 4500
  }
])

// Frequently bought together data
const frequentlyBoughtItems = ref([
  {
    id: 1,
    name: "Men's Punjabi",
    description: "This Item : Men's Punjabi for eid occasion and festive",
    price: "TK : 2,500",
    image: '/product-details/frequently-1.png',
    selected: true
  },
  // {
  //   id: 'plus-1',
  //   type: 'plus',
  // },
  {
    id: 2,
    name: "Men's Punjabi",
    description: "This Item : Men's Punjabi for eid occasion and festive",
    price: "TK : 2,500",
    image: '/product-details/frequently-1.png',
    selected: false
  },
  {
    id: 3,
    name: "Men's Punjabi",
    description: "This Item : Men's Punjabi for eid occasion and festive",
    price: "TK : 2,500",
    image: '/product-details/frequently-1.png',
    selected: false
  }
])

// Reviews data
const overallRating = ref(4.4)
const totalReviews = ref(5)
const totalSold = ref(13)
const starDistribution = ref([1, 4, 0, 0, 0]) // [5-star, 4-star, 3-star, 2-star, 1-star]
const searchQuery = ref('')
const sortBy = ref('newest')

const attributeRatings = ref({
  quality: 4.8,
  qualityLabel: 'Excellent',
  value: 4.2,
  valueLabel: 'Great',
  fit: 4.6,
  fitLabel: 'Big'
})

const reviews = ref([
  {
    id: 1,
    rating: 4.4,
    reviewerName: 'MandyG',
    verified: true,
    date: '12 April, 2024',
    title: 'Great Quality',
    text: 'Lovely jacket, really good quality and colour! It is a very oversized fit so would recommend sizing down if you can.',
    helpfulYes: 2,
    helpfulNo: 0,
    userVote: null as 'yes' | 'no' | null,
    attributes: {
      quality: 'Excellent',
      value: 'Great',
      fit: 'Big'
    }
  },
  {
    id: 2,
    rating: 4.4,
    reviewerName: 'Jillgingercat',
    verified: false,
    date: '12 April, 2024',
    title: 'Great Spring Jacket/Over Shirt',
    text: 'Great valve and excellent quality for the price I am a standard size 16 in everything but this item is huge so I bought size 14. And, this has still room to spare.',
    helpfulYes: 2,
    helpfulNo: 0,
    userVote: null as 'yes' | 'no' | null,
    attributes: {
      quality: 'Excellent',
      value: 'Excellent',
      fit: 'Big'
    }
  },
  {
    id: 3,
    rating: 4.4,
    reviewerName: 'WenD17',
    verified: false,
    date: '9 February, 2024',
    title: 'Good Basic Jacket',
    text: 'Nice cotton and colour, yes its baggy but that is part of the style, nice e length',
    helpfulYes: 2,
    helpfulNo: 0,
    userVote: null as 'yes' | 'no' | null,
    attributes: {
      quality: 'Excellent',
      value: 'Great',
      fit: 'True to size'
    }
  }
])

// Related products data
const relatedProducts = ref([
  {
    id: 1,
    name: "Punjabi for men",
    price: "Tk 2,500",
    image: '/men/men-1.png'
  },
  {
    id: 2,
    name: "Punjabi for men",
    price: "Tk 2,500",
    image: '/men/men-2.png'
  },
  {
    id: 3,
    name: "Punjabi for men",
    price: "Tk 2,500",
    image: '/men/men-1.png'
  },
  {
    id: 4,
    name: "Punjabi for men",
    price: "Tk 2,500",
    image: '/men/men-2.png'
  }
])

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
const totalPrice = computed(() => {
  const selectedItems = frequentlyBoughtItems.value.filter(item => item.selected)
  const total = selectedItems.length * 2500 // Each item costs 2500
  return `Tk ${total.toLocaleString()}`
})

const filteredAndSortedReviews = computed(() => {
  let filtered = reviews.value

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(review => 
      review.title.toLowerCase().includes(query) ||
      review.text.toLowerCase().includes(query) ||
      review.reviewerName.toLowerCase().includes(query)
    )
  }

  // Sort reviews
  switch (sortBy.value) {
    case 'newest':
      return filtered.sort((a, b) => b.id - a.id)
    case 'oldest':
      return filtered.sort((a, b) => a.id - b.id)
    case 'highest':
      return filtered.sort((a, b) => b.rating - a.rating)
    case 'lowest':
      return filtered.sort((a, b) => a.rating - b.rating)
    case 'most-helpful':
      return filtered.sort((a, b) => (b.helpfulYes - b.helpfulNo) - (a.helpfulYes - a.helpfulNo))
    default:
      return filtered
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

const addFrequentlyBoughtToCart = () => {
  const selectedItems = frequentlyBoughtItems.value.filter(item => item.selected)
  console.log('Adding to cart:', selectedItems)
  // In a real app, this would add the selected items to the cart
  alert(`Added ${selectedItems.length} item(s) to cart!`)
}


const voteHelpful = (reviewId: number, isHelpful: boolean) => {
  const review = reviews.value.find(r => r.id === reviewId)
  if (!review) return

  // If user already voted the same way, remove the vote
  if (review.userVote === (isHelpful ? 'yes' : 'no')) {
    review.userVote = null
    if (isHelpful) {
      review.helpfulYes--
    } else {
      review.helpfulNo--
    }
  } else {
    // If user voted differently, update the vote
    if (review.userVote === 'yes') {
      review.helpfulYes--
    } else if (review.userVote === 'no') {
      review.helpfulNo--
    }

    review.userVote = isHelpful ? 'yes' : 'no'
    if (isHelpful) {
      review.helpfulYes++
    } else {
      review.helpfulNo++
    }
  }
}
</script>