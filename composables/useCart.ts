import { ref, computed, readonly } from 'vue'

export interface CartItem {
  id: string
  name: string
  price: number
  priceDisplay: string
  image: string
  quantity: number
  size?: string
  color?: string
  colorValue?: string
  sku?: string
  product_id?: number
  variant_id?: number
}

const cartItems = ref<CartItem[]>([])
let clientInitialized = false

// Initialize cart from localStorage
const initializeCart = () => {
  // Only run on client side
  if (typeof window === 'undefined') {
    return
  }
  
  // Only initialize once on client side
  if (clientInitialized) {
    return
  }
  
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

  const totalPrice = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0)
  })

  const totalPriceDisplay = computed(() => {
    return `Tk ${totalPrice.value.toLocaleString()}`
  })

  const isEmpty = computed(() => cartItems.value.length === 0)

  // Force reload cart from localStorage (useful for debugging/sync issues)
  const reloadCart = () => {
    if (typeof window !== 'undefined') {
      try {
        const savedCart = localStorage.getItem('cart')
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart)
          if (Array.isArray(parsedCart)) {
            cartItems.value = parsedCart
            console.log('🔄 Cart reloaded from localStorage:', parsedCart.length, 'items')
            return true
          }
        }
      } catch (e) {
        console.error('❌ Error reloading cart:', e)
      }
    }
    return false
  }

  return {
    cartItems: readonly(cartItems),
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    reloadCart,
    totalItems,
    totalPrice,
    totalPriceDisplay,
    isEmpty
  }
}

