<template>
  <main class="cart-page">
    <div class="cart-container">
      
      <div class="cart-content">
        <h1 class="cart-title">Shopping Cart</h1>
        
        <div v-if="isEmpty" class="empty-cart">
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

        <div v-else class="cart-layout">
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
                    <span class="item-price">{{ item.priceDisplay }}</span>
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
                  <span class="item-total-price">{{ formatPrice(item.price * item.quantity) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Cart Summary -->
          <div class="cart-summary-section">
            <div class="cart-summary-card">
              <h2 class="summary-title">Order Summary</h2>
              
              <div class="summary-details">
                <div class="summary-row">
                  <span class="summary-label">Subtotal</span>
                  <span class="summary-value">{{ totalPriceDisplay }}</span>
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
      </div>
    </div>
    <AppFooter />
  </main>
</template>

<script setup lang="ts">
import { useCart } from '../../../composables/useCart'
import AppHeader from '../../../components/AppHeader.vue'
import AppFooter from '../../../components/AppFooter.vue'
import { useHead } from 'nuxt/app'
import './cart.css'

useHead({
  title: 'Shopping Cart - Rang Bangladesh',
  meta: [
    { name: 'description', content: 'Review your shopping cart and proceed to checkout.' }
  ]
})

const {
  cartItems,
  removeFromCart,
  updateQuantity,
  totalItems,
  totalPriceDisplay,
  isEmpty
} = useCart()

const formatPrice = (price: number) => {
  return `Tk ${price.toLocaleString()}`
}

const handleCheckout = () => {
  // TODO: Navigate to checkout page
  console.log('Proceeding to checkout...')
  // In a real app, navigate to checkout page
  // navigateTo('/checkout')
}
</script>

