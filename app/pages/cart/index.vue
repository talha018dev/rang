<template>
  <main class="cart-page">
    <div class="cart-container">
      
      <div class="cart-content" :key="`cart-${cartItems.length}`">
        <h1 class="cart-title">Shopping Cart</h1>
        
        <!-- Loading State -->
        <div v-if="isLoading" class="cart-loading">
          <div class="loading-spinner">
            <svg class="spinner" viewBox="0 0 50 50">
              <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
            </svg>
          </div>
          <p class="loading-text">Loading your cart...</p>
        </div>

        <!-- Empty Cart -->
        <template v-else-if="cartItems.length === 0">
          <div class="empty-cart" :key="'empty'">
            <div class="empty-cart-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 10-8 0v4" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14l-1 12H6L5 8z" />
              </svg>
            </div>
            <h2 class="empty-cart-title">Your cart is empty</h2>
            <p class="empty-cart-text">Start shopping to add items to your cart</p>
            <NuxtLink to="/products/men" class="shop-button">Continue Shopping</NuxtLink>
          </div>
        </template>

        <!-- Cart with Items -->
        <template v-else>
          <div class="cart-layout" :key="'cart'">
          <!-- Cart Items -->
          <div class="cart-items-section">
            <div class="cart-items-header">
              <h2 class="section-title">Cart Items ({{ totalItems }})</h2>
            </div>
            
            <div class="cart-items-list">
              <div v-for="(item, index) in cartItems" :key="`${item.id}-${item.size}-${item.color}-${index}`" class="cart-item">
                <div class="cart-item-image">
                  <NuxtImg 
                    :src="item.image" 
                    :alt="item.name"
                    class="item-image"
                    loading="lazy"
                    format="webp"
                    quality="85"
                  />
                </div>
                
                <div class="cart-item-details">
                  <h3 class="item-name">{{ item.name }}</h3>
                  <div class="item-attributes">
                    <span v-if="item.size" class="item-attribute">Size: {{ item.size }}</span>
                    <span v-if="item.color" class="item-attribute">Color: {{ item.color }}</span>
                    <span v-if="item.sku" class="item-attribute">SKU: {{ item.sku }}</span>
                  </div>
                  <div class="item-price-row">
                    <span v-if="item.compare_price != null && item.compare_price > item.price" class="item-price">
                      <span class="item-compare-price">{{ formatPrice(item.compare_price, item.compare_price_usd) }}</span>
                      <span class="item-final-price">{{ formatPrice(item.price, item.price_usd) }}</span>
                    </span>
                    <span v-else class="item-price">{{ formatPrice(item.price, item.price_usd) }}</span>
                  </div>
                  <div v-if="item.compare_price != null && item.compare_price > item.price && item.campaign_name" class="item-discount-label">
                    {{ item.campaign_name }} -{{ formatSummaryPrice(currency === 'USD' ? (item.campaign_discount_value != null ? (item.campaign_discount_value / exchangeRate) * item.quantity : ((item.compare_price - item.price) / exchangeRate) * item.quantity) : (item.campaign_discount_value != null ? item.campaign_discount_value * item.quantity : (item.compare_price - item.price) * item.quantity)) }}
                  </div>
                </div>
                
                <div class="cart-item-quantity">
                  <div class="quantity-controls">
                    <button 
                      class="quantity-btn minus" 
                      @click="updateQuantity(item.id, item.quantity - 1, item.size, item.color)"
                      :disabled="item.quantity <= 1"
                    >
                      -
                    </button>
                    <span class="quantity-value">{{ item.quantity }}</span>
                    <button 
                      class="quantity-btn plus" 
                      @click="updateQuantity(item.id, item.quantity + 1, item.size, item.color)"
                    >
                      +
                    </button>
                  </div>
                  <button 
                    class="remove-item-btn" 
                    @click="removeFromCart(item.id, item.size, item.color)"
                  >
                    Remove
                  </button>
                </div>
                
                <div class="cart-item-total">
                  <template v-if="item.compare_price != null && item.compare_price > item.price">
                    <span class="item-total-compare">{{ formatSummaryPrice(currency === 'USD' ? (item.compare_price_usd ?? item.compare_price / exchangeRate) * item.quantity : item.compare_price * item.quantity) }}</span>
                    <span class="item-total-price">{{ formatItemTotal(item) }}</span>
                  </template>
                  <span v-else class="item-total-price">{{ formatItemTotal(item) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Cart Summary -->
          <div class="cart-summary-section">
            <div class="cart-summary-card">
              <h2 class="summary-title">Order Summary</h2>
              
              <div class="summary-details">
                <div v-if="totalCampaignDiscount > 0" class="summary-row">
                  <span class="summary-label">Subtotal (before campaign discount)</span>
                  <span class="summary-value">{{ formatSummaryPrice(subtotalBeforeCampaignDiscount) }}</span>
                </div>
                <div v-if="totalCampaignDiscount > 0" class="summary-row summary-row-discount">
                  <span class="summary-label">(-) Campaign discount</span>
                  <span class="summary-value summary-value-discount">-{{ formatSummaryPrice(totalCampaignDiscount) }}</span>
                </div>
                <div class="summary-row">
                  <span class="summary-label">Subtotal</span>
                  <span class="summary-value">{{ subtotalDisplay }}</span>
                </div>
                <div v-if="totalVat > 0" class="summary-row">
                  <span class="summary-label">VAT</span>
                  <span class="summary-value">{{ totalVatDisplay }}</span>
                </div>
                <div class="summary-row">
                  <span class="summary-label">Shipping</span>
                  <span class="summary-value">Calculated at checkout</span>
                </div>
                <div class="summary-row total-row">
                  <span class="summary-label">Total</span>
                  <span class="summary-value">{{ totalPriceDisplay }}</span>
                </div>
              </div>
              
              <button class="checkout-button" @click="handleCheckout">
                Proceed to Checkout
              </button>
              
              <NuxtLink to="/products/men" class="continue-shopping-link">
                Continue Shopping
              </NuxtLink>
            </div>
          </div>
          </div>
        </template>
      </div>
    </div>
    <AppFooter />
  </main>
</template>

<script setup lang="ts">
import { navigateTo, useHead } from 'nuxt/app'
import { computed, nextTick, onMounted, ref } from 'vue'
import AppFooter from '../../../components/AppFooter.vue'
import { useCart } from '../../../composables/useCart'
import { useCurrency } from '../../../composables/useCurrency'
import './cart.css'

useHead({
  title: 'Shopping Cart - Rang Bangladesh',
  meta: [
    { name: 'description', content: 'Review your shopping cart and proceed to checkout.' }
  ]
})

const {
  cartItems,
  isLoading: isLoadingComputed,
  removeFromCart,
  updateQuantity,
  reloadCart,
  totalItems,
  subtotal,
  subtotalDisplay,
  totalVat,
  totalVatDisplay,
  totalPriceDisplay,
  totalCampaignDiscount,
  subtotalBeforeCampaignDiscount,
  isEmpty: isEmptyComputed
} = useCart()

const { formatPrice, currency, exchangeRate } = useCurrency()

// Format price for summary (same as checkout)
const formatSummaryPrice = (price: number): string => {
  if (price === null || price === undefined || !isFinite(price) || isNaN(price)) {
    return currency.value === 'USD' ? '$0.00' : 'Tk 0'
  }
  if (currency.value === 'USD') {
    return `$${Number(price).toFixed(2)}`
  }
  return `Tk ${Number(price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

// Format item total price based on current currency
const formatItemTotal = (item: any) => {
  if (currency.value === 'USD') {
    const itemPriceUsd = item.price_usd !== undefined && item.price_usd > 0 
      ? item.price_usd 
      : (item.price / exchangeRate.value)
    const totalUsd = itemPriceUsd * item.quantity
    if (!isFinite(totalUsd) || isNaN(totalUsd)) {
      return '$0.00'
    }
    return `$${totalUsd.toFixed(2)}`
  } else {
    const total = item.price * item.quantity
    return `Tk ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }
}

// Create a local loading state that ensures minimum display time
const isLoading = ref(true)

// Create a local computed to ensure reactivity
const isEmpty = computed(() => {
  return cartItems.value.length === 0
})

// Force cart reload on mount to ensure it's loaded
onMounted(async () => {
  // Show loader for minimum duration to ensure it's visible
  const startTime = Date.now()
  const minLoadTime = 600 // Minimum 600ms
  
  // Wait a bit to ensure cart has been initialized
  await nextTick()
  
  if (typeof window !== 'undefined') {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        
        // If cart is empty but localStorage has items, there's a sync issue
        if (cartItems.value.length === 0 && parsedCart.length > 0) {
          console.warn('⚠️ Cart sync issue detected! localStorage has items but cartItems is empty')
          console.log('  - Attempting to reload cart...')
          const reloaded = reloadCart()
          if (reloaded) {
            console.log('  - ✅ Cart reloaded successfully')
            await nextTick()
          } else {
            console.error('  - ❌ Failed to reload cart')
          }
        }
      } catch (e) {
        console.error('  - Error parsing localStorage cart:', e)
      }
    }
  }
  
  // Wait for minimum load time, then hide loader
  const elapsed = Date.now() - startTime
  const remainingTime = Math.max(0, minLoadTime - elapsed)
  
  setTimeout(() => {
    isLoading.value = false
  }, remainingTime)
})


const handleCheckout = () => {
  navigateTo('/checkout')
}
</script>


