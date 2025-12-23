import { $fetch } from 'ofetch'
import { computed, ref } from 'vue'
import { useApi } from './useApi'

interface WishlistResponse {
  success: boolean
  message?: string
  data?: any[]
}

// Store wishlist product IDs in memory for quick checking
const wishlistProductIds = ref<Set<number>>(new Set())
const isLoadingWishlist = ref(false)

// Get token from localStorage
const getToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('auth_token')
}

// Check if user is logged in
const isLoggedIn = computed(() => {
  if (typeof window === 'undefined') return false
  return !!getToken()
})

export const useWishlist = () => {
  const { backendUrl } = useApi()

  // Fetch wishlist and populate the set
  const fetchWishlist = async (): Promise<void> => {
    const token = getToken()
    if (!token) {
      wishlistProductIds.value.clear()
      return
    }

    isLoadingWishlist.value = true
    try {
      const response = await $fetch<WishlistResponse>(`${backendUrl}/profile/wishlist`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.success && response.data) {
        // Populate the set with product IDs
        wishlistProductIds.value = new Set(
          response.data.map((item: any) => item.id || item.product_id)
        )
      } else {
        wishlistProductIds.value.clear()
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error)
      wishlistProductIds.value.clear()
    } finally {
      isLoadingWishlist.value = false
    }
  }

  // Add or remove item from wishlist
  const toggleWishlist = async (productId: number, slug: string): Promise<boolean> => {
    const token = getToken()
    if (!token) {
      return false
    }

    const isInWishlist = wishlistProductIds.value.has(productId)
    
    try {
      const response = await $fetch<WishlistResponse>(`${backendUrl}/profile/wishlist`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: {
          product: slug
        }
      })

      if (response.success) {
        // Update local state
        if (isInWishlist) {
          wishlistProductIds.value.delete(productId)
        } else {
          wishlistProductIds.value.add(productId)
        }
        return true
      }
      return false
    } catch (error: any) {
      console.error('Error toggling wishlist:', error)
      // If unauthorized, clear wishlist
      if (error.status === 401 || error.statusCode === 401) {
        wishlistProductIds.value.clear()
      }
      return false
    }
  }

  // Check if product is in wishlist
  const isInWishlist = (productId: number): boolean => {
    return wishlistProductIds.value.has(productId)
  }

  // Initialize wishlist on mount (only if logged in)
  const initializeWishlist = async () => {
    if (isLoggedIn.value) {
      await fetchWishlist()
    }
  }

  return {
    isLoggedIn,
    isInWishlist,
    toggleWishlist,
    fetchWishlist,
    initializeWishlist,
    isLoadingWishlist: computed(() => isLoadingWishlist.value)
  }
}

