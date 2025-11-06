<template>
  <main class="success-page">
    <div class="success-container">
      
      <div class="success-content">
        <div class="success-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 class="success-title">Order Placed Successfully!</h1>
        <p class="success-message">
          Thank you for your order. We have received your order and will begin processing it shortly.
        </p>
        <p class="success-submessage">
          You will receive an email confirmation with your order details shortly.
        </p>
        
        <div class="success-actions">
          <NuxtLink to="/products/men" class="continue-shopping-btn">
            Continue Shopping
          </NuxtLink>
          <NuxtLink to="/" class="home-btn">
            Go to Homepage
          </NuxtLink>
        </div>
      </div>
    </div>
    <AppFooter />
  </main>
</template>

<script setup lang="ts">
  import { useHead } from 'nuxt/app'
  import AppFooter from '../../../../components/AppFooter.vue'
import './success.css'

// Define page meta to ensure route is recognized
definePageMeta({
  layout: false
})

useHead({
  title: 'Order Success - Rang Bangladesh',
  meta: [
    { name: 'description', content: 'Your order has been placed successfully.' }
  ]
})
</script>

