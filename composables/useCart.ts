import { ref, computed, readonly } from 'vue'
import { useCurrency } from './useCurrency'

export interface CartItem {
  id: string
  name: string
  price: number
  price_usd?: number
  priceDisplay: string // Kept for backward compatibility, but will be recalculated
  image: string
  quantity: number
  size?: string
  color?: string
  colorValue?: string
  sku?: string
  product_id?: number
  variant_id?: number
  vat?: string | number // VAT percentage (e.g., "10" or 10)
  // Campaign discount (from product active_campaign) – for display in cart/checkout
  compare_price?: number
  compare_price_usd?: number
  campaign_discount_type?: string
  campaign_discount_value?: number
  campaign_name?: string
}

const cartItems = ref<CartItem[]>([])
// Start with loading true only on client side, false on server
const isLoading = ref<boolean>(typeof window !== 'undefined')
let clientInitialized = false

// Initialize cart from localStorage
const initializeCart = () => {
  // Only run on client side
  if (typeof window === 'undefined') {
    isLoading.value = false
    return
  }
  
  // Only initialize once on client side
  if (clientInitialized) {
    isLoading.value = false
    return
  }
  
  isLoading.value = true
  try {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart)
      if (Array.isArray(parsedCart)) {
        cartItems.value = parsedCart
        console.log('✅ Cart loaded from localStorage:', parsedCart.length, 'items')
      } else {
        cartItems.value = []
        console.log('⚠️ Cart data in localStorage is not an array')
      }
    } else {
      cartItems.value = []
      console.log('ℹ️ No cart found in localStorage')
    }
  } catch (e) {
    console.error('❌ Error loading cart from localStorage:', e)
    cartItems.value = []
  } finally {
    clientInitialized = true
    // Minimum delay to ensure loading state is visible
    setTimeout(() => {
      isLoading.value = false
    }, 300)
  }
}

export const useCart = () => {
  // Always try to initialize on client side
  initializeCart()

  // Save cart to localStorage whenever it changes
  const saveCart = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cartItems.value))
    }
  }

  // Add item to cart
  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    const existingItemIndex = cartItems.value.findIndex(
      cartItem =>
        cartItem.id === item.id &&
        cartItem.size === item.size &&
        cartItem.color === item.color
    )

    if (existingItemIndex !== -1) {
      // Item already exists, increase quantity
      cartItems.value[existingItemIndex].quantity += 1
    } else {
      // New item, add to cart
      cartItems.value.push({
        ...item,
        quantity: 1
      })
    }
    saveCart()
  }

  // Remove item from cart
  const removeFromCart = (itemId: string, size?: string, color?: string) => {
    const index = cartItems.value.findIndex(
      item =>
        item.id === itemId &&
        (size === undefined || item.size === size) &&
        (color === undefined || item.color === color)
    )
    if (index !== -1) {
      cartItems.value.splice(index, 1)
      saveCart()
    }
  }

  // Update item quantity
  const updateQuantity = (itemId: string, quantity: number, size?: string, color?: string) => {
    const item = cartItems.value.find(
      cartItem =>
        cartItem.id === itemId &&
        (size === undefined || cartItem.size === size) &&
        (color === undefined || cartItem.color === color)
    )
    if (item) {
      if (quantity <= 0) {
        removeFromCart(itemId, size, color)
      } else {
        item.quantity = quantity
        saveCart()
      }
    }
  }

  // Clear cart
  const clearCart = () => {
    cartItems.value = []
    saveCart()
  }

  // Computed properties
  const totalItems = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0)
  })

  const { formatPrice, currency, exchangeRate } = useCurrency()
  
  // Calculate subtotal (price without VAT)
  const subtotal = computed(() => {
    if (currency.value === 'USD') {
      // Sum USD prices if available, otherwise convert BDT prices
      return cartItems.value.reduce((total, item) => {
        const itemPriceUsd = item.price_usd !== undefined && item.price_usd > 0 
          ? item.price_usd 
          : (item.price / exchangeRate.value)
        return total + (itemPriceUsd * item.quantity)
      }, 0)
    } else {
      return cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0)
    }
  })

  // Calculate total VAT amount (rounded)
  const totalVat = computed(() => {
    if (currency.value === 'USD') {
      const vatAmount = cartItems.value.reduce((total, item) => {
        const vatPercent = item.vat ? parseFloat(String(item.vat)) : 0
        if (vatPercent === 0) return total
        
        const itemPriceUsd = item.price_usd !== undefined && item.price_usd > 0 
          ? item.price_usd 
          : (item.price / exchangeRate.value)
        const itemSubtotal = itemPriceUsd * item.quantity
        const itemVat = (itemSubtotal * vatPercent) / 100
        return total + itemVat
      }, 0)
      // Round to 2 decimal places for USD
      return Math.round(vatAmount * 100) / 100
    } else {
      const vatAmount = cartItems.value.reduce((total, item) => {
        const vatPercent = item.vat ? parseFloat(String(item.vat)) : 0
        if (vatPercent === 0) return total
        
        const itemSubtotal = item.price * item.quantity
        const itemVat = (itemSubtotal * vatPercent) / 100
        return total + itemVat
      }, 0)
      // Round to nearest integer for BDT (Taka)
      return Math.round(vatAmount)
    }
  })
  
  // Total price including VAT
  const totalPrice = computed(() => {
    return subtotal.value + totalVat.value
  })
  
  const totalPriceDisplay = computed(() => {
    if (currency.value === 'USD') {
      const totalUsd = totalPrice.value
      if (!isFinite(totalUsd) || isNaN(totalUsd)) {
        return '$0.00'
      }
      return `$${totalUsd.toFixed(2)}`
    } else {
      return `Tk ${totalPrice.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    }
  })

  const subtotalDisplay = computed(() => {
    if (currency.value === 'USD') {
      const subtotalUsd = subtotal.value
      if (!isFinite(subtotalUsd) || isNaN(subtotalUsd)) {
        return '$0.00'
      }
      return `$${subtotalUsd.toFixed(2)}`
    } else {
      return `Tk ${subtotal.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    }
  })

  const totalVatDisplay = computed(() => {
    if (currency.value === 'USD') {
      const vatUsd = totalVat.value
      if (!isFinite(vatUsd) || isNaN(vatUsd)) {
        return '$0.00'
      }
      return `$${vatUsd.toFixed(2)}`
    } else {
      return `Tk ${totalVat.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    }
  })

  // Total campaign discount (from product active_campaign) across all items
  const totalCampaignDiscount = computed(() => {
    if (currency.value === 'USD') {
      return cartItems.value.reduce((sum, item) => {
        const compareUsd = item.compare_price_usd ?? (item.compare_price != null && item.compare_price > 0 && exchangeRate.value > 0 ? item.compare_price / exchangeRate.value : 0)
        const priceUsd = item.price_usd !== undefined && item.price_usd > 0 ? item.price_usd : (item.price / exchangeRate.value)
        if (compareUsd > priceUsd) {
          return sum + (compareUsd - priceUsd) * item.quantity
        }
        return sum
      }, 0)
    } else {
      return cartItems.value.reduce((sum, item) => {
        if (item.compare_price != null && item.compare_price > item.price) {
          return sum + (item.compare_price - item.price) * item.quantity
        }
        return sum
      }, 0)
    }
  })

  // Subtotal before campaign discount (for display when there is campaign discount)
  const subtotalBeforeCampaignDiscount = computed(() => {
    if (currency.value === 'USD') {
      return cartItems.value.reduce((total, item) => {
        const compareUsd = item.compare_price_usd ?? (item.compare_price != null && item.compare_price > 0 && exchangeRate.value > 0 ? item.compare_price / exchangeRate.value : 0)
        const priceUsd = item.price_usd !== undefined && item.price_usd > 0 ? item.price_usd : (item.price / exchangeRate.value)
        const unitPrice = (item.compare_price != null && item.compare_price > item.price ? compareUsd : priceUsd)
        return total + unitPrice * item.quantity
      }, 0)
    } else {
      return cartItems.value.reduce((total, item) => {
        const unitPrice = (item.compare_price != null && item.compare_price > item.price ? item.compare_price : item.price)
        return total + unitPrice * item.quantity
      }, 0)
    }
  })

  const isEmpty = computed(() => cartItems.value.length === 0)

  // Force reload cart from localStorage (useful for debugging/sync issues)
  const reloadCart = () => {
    if (typeof window !== 'undefined') {
      isLoading.value = true
      try {
        const savedCart = localStorage.getItem('cart')
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart)
          if (Array.isArray(parsedCart)) {
            cartItems.value = parsedCart
            console.log('🔄 Cart reloaded from localStorage:', parsedCart.length, 'items')
            setTimeout(() => {
              isLoading.value = false
            }, 100)
            return true
          }
        }
        isLoading.value = false
      } catch (e) {
        console.error('❌ Error reloading cart:', e)
        isLoading.value = false
      }
    }
    return false
  }

  return {
    cartItems: readonly(cartItems),
    isLoading: readonly(isLoading),
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    reloadCart,
    totalItems,
    subtotal,
    subtotalDisplay,
    totalVat,
    totalVatDisplay,
    totalPrice,
    totalPriceDisplay,
    totalCampaignDiscount,
    subtotalBeforeCampaignDiscount,
    isEmpty
  }
}

