<template>
  <main class="wishlist-page">
    <AppHeader />
    
    <div class="wishlist-container">
      <!-- Page Header -->
      <section class="wishlist-header">
        <h1 class="wishlist-title">My Wishlist</h1>
        <p class="wishlist-subtitle">Your saved favorite items</p>
      </section>

      <!-- Wishlist Products Section -->
      <section class="wishlist-section">
        <div class="wishlist-content">
          <!-- Loading State -->
          <div v-if="isLoading" class="loading-state">
            <p>Loading your wishlist...</p>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="error-state">
            <p>{{ error }}</p>
            <button @click="fetchWishlist" class="retry-button">Try Again</button>
          </div>

          <!-- Empty State -->
          <div v-else-if="wishlistItems.length === 0" class="empty-state">
            <svg class="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h2>Your wishlist is empty</h2>
            <p>Start adding items you love to your wishlist!</p>
            <NuxtLink to="/products/all" class="shop-button">Start Shopping</NuxtLink>
          </div>

          <!-- Wishlist Items Grid -->
          <div v-else class="wishlist-grid">
            <div v-for="item in wishlistItems" :key="item.id" class="wishlist-item">
              <NuxtLink :to="`/products/${item.category_slug || 'all'}/${item.slug}`" class="product-card">
                <div class="product-image-wrapper">
                  <NuxtImg 
                    :src="getImageUrl(item.image)" 
                    :alt="item.name" 
                    class="product-image" 
                    loading="lazy"
                    format="webp" 
                    quality="85" 
                  />
                </div>
                <div class="product-info">
                  <h3 class="product-name">{{ item.name }}</h3>
                  <p class="product-price">{{ formatPrice(item.price, item.price_usd) }}</p>
                </div>
              </NuxtLink>
              
              <div class="product-actions">
                <button 
                  class="action-btn add-to-cart-btn" 
                  @click.stop="handleAddToCart(item)" 
                  title="Add to cart"
                >
                  <svg class="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Add to Cart</span>
                </button>
                <button 
                  class="action-btn remove-btn" 
                  @click.stop="handleRemoveFromWishlist(item.id)" 
                  title="Remove from wishlist"
                >
                  <svg class="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Remove</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <AppFooter />
  </main>
</template>

<script setup lang="ts">
import { useHead, useRouter } from 'nuxt/app'
import { onMounted, ref } from 'vue'
import { useApi } from '~~/composables/useApi'
import { useCart } from '~~/composables/useCart'
import { useCurrency } from '~~/composables/useCurrency'
import type { Product } from '~~/types/homepage'
import AppHeader from '~~/components/AppHeader.vue'
import AppFooter from '~~/components/AppFooter.vue'
import './wishlist.css'

// Type definitions
interface WishlistItem extends Product {
  category_slug?: string
}

interface WishlistResponse {
  success: boolean
  message?: string
  data?: WishlistItem[]
}

// Meta
useHead({
  title: 'My Wishlist - Rang Bangladesh',
  meta: [
    { name: 'description', content: 'View and manage your wishlist items on Rang Bangladesh.' }
  ]
})

const router = useRouter()
const { backendUrl } = useApi()
const { addToCart } = useCart()
const { formatPrice } = useCurrency()

// Wishlist data
const wishlistItems = ref<WishlistItem[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

// Get token from localStorage
const getToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('auth_token')
}

// Helper function to get full image URL
const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return ''
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }
  return `https://rangbd.thecell.tech${imagePath.startsWith('/') ? imagePath : '/' + imagePath}`
}

// Fetch wishlist items
const fetchWishlist = async () => {
  const token = getToken()
  
  if (!token) {
    await router.push('/login')
    return
  }

  isLoading.value = true
  error.value = null

  try {
    const response = await $fetch<WishlistResponse>(`${backendUrl}/wishlist`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.success && response.data) {
      wishlistItems.value = response.data
    } else {
      error.value = response.message || 'Failed to load wishlist.'
    }
  } catch (err: any) {
    const errorMessage = err.data?.message || err.message || 'Failed to load wishlist.'
    error.value = errorMessage
    console.error('Error fetching wishlist:', err)
    
    // If unauthorized, redirect to login
    if (err.status === 401 || err.statusCode === 401) {
      await router.push('/login')
    }
  } finally {
    isLoading.value = false
  }
}

// Remove item from wishlist
const handleRemoveFromWishlist = async (itemId: number) => {
  const token = getToken()
  
  if (!token) {
    await router.push('/login')
    return
  }

  try {
    const response = await $fetch(`${backendUrl}/wishlist/${itemId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.success) {
      // Remove item from local state
      wishlistItems.value = wishlistItems.value.filter(item => item.id !== itemId)
    }
  } catch (err: any) {
    console.error('Error removing from wishlist:', err)
    error.value = err.data?.message || err.message || 'Failed to remove item from wishlist.'
  }
}

// Add item to cart
const handleAddToCart = (product: WishlistItem) => {
  const firstVariant = product.variants?.[0]
  const size = firstVariant?.attributes?.size
  const color = firstVariant?.attributes?.color
  const variantPrice = firstVariant?.price || product.price
  const variantPriceUsd = firstVariant?.price_usd || product.price_usd

  const cartItem: any = {
    id: product.id.toString(),
    name: product.name,
    price: variantPrice,
    price_usd: variantPriceUsd,
    priceDisplay: formatPrice(variantPrice, variantPriceUsd),
    image: getImageUrl(product.image),
    size: size,
    color: color,
    sku: product.sku,
    product_id: product.id,
    variant_id: firstVariant?.id
  }

  addToCart(cartItem)
}

// Fetch wishlist on mount
onMounted(() => {
  fetchWishlist()
})
</script>

<style scoped>
@import './wishlist.css';
</style>

