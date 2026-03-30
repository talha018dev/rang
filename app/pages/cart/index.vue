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
                    {{ item.campaign_name }} - {{ formatItemCampaignDiscountDisplay(item) }}
                  </div>
                </div>
                
                <div class="cart-item-quantity">
                  <div class="quantity-controls">
                    <button 
                      class="quantity-btn minus" 
                      @click="handleUpdateQuantity(item.id, item.quantity - 1, item.size, item.color)"
                      :disabled="item.quantity <= 1"
                    >
                      -
                    </button>
                    <span class="quantity-value">{{ item.quantity }}</span>
                    <button 
                      class="quantity-btn plus" 
                      @click="handleUpdateQuantity(item.id, item.quantity + 1, item.size, item.color)"
                    >
                      +
                    </button>
                  </div>
                  <button 
                    class="remove-item-btn" 
                    @click="handleRemoveFromCart(item.id, item.size, item.color)"
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
                <div class="summary-row">
                  <span class="summary-label">Subtotal</span>
                  <span class="summary-value">{{ formatSummaryPrice(summarySubtotalBeforeDiscount) }}</span>
                </div>
                <div v-if="summaryItemDiscount > 0" class="summary-row summary-row-discount">
                  <span class="summary-label">(-) Campaign discount</span>
                  <span class="summary-value summary-value-discount">-{{ formatSummaryPrice(summaryItemDiscount) }}</span>
                </div>
                <div class="summary-row summary-row-divider">
                  <span class="summary-label">Total</span>
                  <span class="summary-value">{{ formatSummaryPrice(summarySubtotal) }}</span>
                </div>
                <div v-if="summaryVat > 0" class="summary-row">
                  <span class="summary-label">(+) VAT (10%)</span>
                  <span class="summary-value">{{ formatSummaryPrice(summaryVat) }}</span>
                </div>
                <div class="summary-row summary-row-divider">
                  <span class="summary-label">Grand Total</span>
                  <span class="summary-value">{{ formatSummaryPrice(summaryGrandTotal) }}</span>
                </div>
                <div class="summary-row">
                  <span class="summary-label">(+) Shipping Charge</span>
                  <span class="summary-value">{{ summaryShippingLabel }}</span>
                </div>
                <div class="summary-row total-row">
                  <span class="summary-label">Total Order Amount</span>
                  <span class="summary-value">{{ summaryTotalDisplay }}</span>
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
import { useApi } from '../../../composables/useApi'
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
  totalCampaignDiscount,
  subtotalBeforeCampaignDiscount,
  isEmpty: isEmptyComputed
} = useCart()

const { formatPrice, currency, exchangeRate } = useCurrency()

const { backendUrl } = useApi()

interface PreviewTotals {
  item_total: number
  item_discount_total: number
  coupon_discount: number
  fixed_discount: number
  taxable_subtotal: number
  vat: number
  gift_cost: number
  shipping: number | null
  grand_total_excluding_shipping: number
  grand_total: number | null
  currency: string
}

const orderPreviewData = ref<{ totals: PreviewTotals } | null>(null)

async function fetchOrderPreview () {
  if (cartItems.value.length === 0) {
    orderPreviewData.value = null
    return
  }
  try {
    const productsData = cartItems.value.map((item: any) => {
      const hasProductsArray = item.products && Array.isArray(item.products) && item.products.length > 0
      if (hasProductsArray) {
        return {
          product_id: item.product_id ?? item.id,
          qty: item.qty ?? item.quantity ?? 1,
          products: item.products
        }
      }
      const productData: any = { product_id: item.product_id ?? item.id, qty: item.quantity }
      if (item.variant_id) productData.variant_id = item.variant_id
      return productData
    })
    const body = {
      currency: currency.value === 'USD' ? 'USD' : 'BDT',
      products: productsData
    }
    const response = await $fetch<any>(`${backendUrl}/order/preview`, {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        ...(typeof window !== 'undefined' && localStorage.getItem('auth_token')
          ? { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
          : {})
      },
      body
    })
    console.log('Order preview result:', response)
    if (response?.success && response?.data?.totals) {
      orderPreviewData.value = { totals: response.data.totals }
    } else {
      orderPreviewData.value = null
    }
  } catch (e) {
    console.error('Order preview error:', e)
    orderPreviewData.value = null
  }
}

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

// Campaign discount displayed per cart item in current currency.
// - percentage: campaign_discount_value is percentage (e.g. 16 => 16%)
// - fixed: campaign_discount_value is fixed amount in BDT (convert for USD)
const getItemCampaignDiscountAmount = (item: any): number => {
  const qty = Number(item?.quantity ?? 0)
  if (!Number.isFinite(qty) || qty <= 0) return 0

  const discountType = String(item?.campaign_discount_type ?? '').toLowerCase()
  const discountValue = Number(item?.campaign_discount_value ?? 0)

  const comparePriceBdt = Number(item?.compare_price ?? 0)
  const priceBdt = Number(item?.price ?? 0)

  const comparePriceUsd = item?.compare_price_usd != null && isFinite(Number(item.compare_price_usd))
    ? Number(item.compare_price_usd)
    : (exchangeRate.value > 0 ? comparePriceBdt / exchangeRate.value : 0)

  const priceUsd = item?.price_usd != null && isFinite(Number(item.price_usd))
    ? Number(item.price_usd)
    : (exchangeRate.value > 0 ? priceBdt / exchangeRate.value : 0)

  const perUnitDiscountDiff = currency.value === 'USD'
    ? (comparePriceUsd - priceUsd)
    : (comparePriceBdt - priceBdt)

  const safeDiff = Number.isFinite(perUnitDiscountDiff) && perUnitDiscountDiff > 0 ? perUnitDiscountDiff * qty : 0

  if (discountType === 'percentage') {
    if (Number.isFinite(discountValue) && discountValue > 0) {
      const base = currency.value === 'USD' ? comparePriceUsd : comparePriceBdt
      const amount = base * (discountValue / 100) * qty
      if (Number.isFinite(amount) && amount > 0) return amount
    }
    return safeDiff
  }

  if (discountType === 'fixed') {
    if (Number.isFinite(discountValue) && discountValue > 0) {
      if (currency.value === 'USD') {
        if (!exchangeRate.value || exchangeRate.value <= 0) return 0
        return (discountValue / exchangeRate.value) * qty
      }
      return discountValue * qty
    }
    return safeDiff
  }

  return safeDiff
}

/** Percent: show only e.g. "16%". Fixed: show line discount total in current currency. */
const formatItemCampaignDiscountDisplay = (item: any): string => {
  const discountType = String(item?.campaign_discount_type ?? '').toLowerCase()
  const discountValue = Number(item?.campaign_discount_value ?? 0)

  if (discountType === 'percentage' && Number.isFinite(discountValue) && discountValue > 0) {
    const pct = Number.isInteger(discountValue)
      ? String(discountValue)
      : String(parseFloat(discountValue.toFixed(2)))
    return `${pct}%`
  }

  if (discountType === 'fixed') {
    const amount = getItemCampaignDiscountAmount(item)
    return formatSummaryPrice(amount)
  }

  return formatSummaryPrice(getItemCampaignDiscountAmount(item))
}

// VAT: fixed 10% on subtotal (amount after campaign discount; no coupon on cart)
const VAT_RATE = 0.1
const cartVat = computed(() => {
  const base = subtotal.value
  const vatAmount = base * VAT_RATE
  if (currency.value === 'USD') {
    return Math.round(vatAmount * 100) / 100
  }
  return Math.round(vatAmount)
})

const cartTotal = computed(() => subtotal.value + cartVat.value)

const cartTotalDisplay = computed(() => formatSummaryPrice(cartTotal.value))

// Summary values: use order preview totals when available, else local cart values
const summarySubtotalBeforeDiscount = computed(() => {
  const t = orderPreviewData.value?.totals
  if (t && t.item_discount_total > 0) return t.item_total + t.item_discount_total
  return subtotalBeforeCampaignDiscount.value
})

const summaryItemDiscount = computed(() => {
  const t = orderPreviewData.value?.totals
  if (t) return t.item_discount_total ?? 0
  return totalCampaignDiscount.value
})

const summarySubtotal = computed(() => {
  const t = orderPreviewData.value?.totals
  if (t) return t.item_total
  return subtotal.value
})

const summaryVat = computed(() => {
  const t = orderPreviewData.value?.totals
  if (t) return t.vat ?? 0
  return cartVat.value
})

const summaryShippingLabel = computed(() => {
  const t = orderPreviewData.value?.totals
  if (t?.shipping != null && t.shipping > 0) return formatSummaryPrice(t.shipping)
  return 'Calculated at checkout'
})

const summaryTotalDisplay = computed(() => {
  const t = orderPreviewData.value?.totals
  if (t) {
    const total = t.grand_total_excluding_shipping ?? t.grand_total ?? (t.item_total + (t.vat ?? 0))
    return formatSummaryPrice(total)
  }
  return cartTotalDisplay.value
})

const summaryGrandTotal = computed(() => summarySubtotal.value + summaryVat.value)

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
    if (cartItems.value.length > 0) {
      fetchOrderPreview()
    }
  }, remainingTime)
})


const handleCheckout = () => {
  navigateTo('/checkout')
}

async function handleUpdateQuantity (id: string, qty: number, size?: string, color?: string) {
  updateQuantity(id, qty, size, color)
  await nextTick()
  await fetchOrderPreview()
}

async function handleRemoveFromCart (id: string, size?: string, color?: string) {
  removeFromCart(id, size, color)
  await nextTick()
  await fetchOrderPreview()
}
</script>


