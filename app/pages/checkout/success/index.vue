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
  import { useHead, useRoute } from 'nuxt/app'
import { onMounted } from 'vue'
import AppFooter from '../../../../components/AppFooter.vue'
import { useApi } from '../../../../composables/useApi'
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

const route = useRoute()

// Call payment redirect API
onMounted(async () => {
  // Get gateway from query params
  const gateway = (route.query.gateway as string) || 'ssl'
  
  // Don't call API or redirect for cash on delivery
  if (gateway === 'cod') {
    return
  }
  
  try {
    const { backendUrl } = useApi()
    
    // Get order number from query params or use test value
    const orderNumber = (route.query.orderNumber as string) || '202511JJC'
    
    // Call payment redirect API
    const response = await $fetch<any>(`${backendUrl}/payment/redirect/${orderNumber}?gateway=${gateway}`, {
      method: 'GET',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
    
    console.log('Payment redirect API response:', response)
    
    // Check if API response is successful and contains a URL
    if (response && (response.success !== false)) {
      // Try to get URL from various possible response structures
      const redirectUrl = response.url || 
                         response.redirect_url || 
                         response.data?.url || 
                         response.data?.redirect_url ||
                         (response.data && typeof response.data === 'string' ? response.data : null)
      
      if (redirectUrl) {
        // Redirect to the URL from the response in a new tab
        window.open(redirectUrl, '_blank')
        return
      }
    }
  } catch (error: any) {
    console.error('Error calling payment redirect API:', error)
    // Don't show error to user as order is already placed successfully
  }
})
</script>

