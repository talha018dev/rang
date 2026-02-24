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
  import { navigateTo, useHead, useRoute } from 'nuxt/app'
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

// Fire Meta Pixel Purchase event once per order (thank-you page only, per Meta support).
// Only send when value > 0 and currency are valid so Meta can calculate ROAS.
function trackMetaPixelPurchase() {
  const w = window as Window & { fbq?: (a: string, e: string, p?: Record<string, unknown>) => void }
  if (typeof window === 'undefined' || !w.fbq) return
  const orderNumber = (route.query.orderNumber as string) || ''
  if (!orderNumber) return
  const orderTotal = parseFloat((route.query.orderTotal as string) || '')
  const currency = ((route.query.currency as string) || 'BDT').trim()
  // Meta requires valid price and currency for ROAS; skip if value missing or not positive
  if (!(orderTotal > 0) || !currency) return
  const storageKey = `meta_pixel_purchase_${orderNumber}`
  if (sessionStorage.getItem(storageKey)) return
  sessionStorage.setItem(storageKey, '1')
  w.fbq('track', 'Purchase', {
    value: orderTotal,
    currency,
    order_id: orderNumber
  })
}

// Call payment redirect API
onMounted(async () => {
  trackMetaPixelPurchase()

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
    
    // If no redirect URL found, redirect to order page with paymentFailed flag
    await navigateTo(`/orders/${orderNumber}?paymentFailed=true`)
  } catch (error: any) {
    console.error('Error calling payment redirect API:', error)
    // On API failure, redirect to order page with paymentFailed flag
    const orderNumber = (route.query.orderNumber as string) || '202511JJC'
    await navigateTo(`/orders/${orderNumber}?paymentFailed=true`)
  }
})
</script>

