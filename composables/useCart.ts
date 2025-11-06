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
}

const cartItems = ref<CartItem[]>([])

export const useCart = () => {
  // Load cart from localStorage on initialization
  if (process.client) {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        cartItems.value = JSON.parse(savedCart)
      } catch (e) {
        console.error('Error loading cart from localStorage:', e)
      }
    }
  }

  // Save cart to localStorage whenever it changes
  const saveCart = () => {
    if (process.client) {
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

  return {
    cartItems: readonly(cartItems),
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    totalPriceDisplay,
    isEmpty
  }
}

