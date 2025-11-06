<template>
  <main class="checkout-page">
    <div class="checkout-container">
      
      <div class="checkout-content">
        <h1 class="checkout-title">Checkout</h1>
        
        <div v-if="isEmpty" class="empty-cart-message">
          <p>Your cart is empty. Please add items to your cart before checkout.</p>
          <NuxtLink to="/products/men" class="shop-button">Continue Shopping</NuxtLink>
        </div>

        <div  class="checkout-layout">
          <!-- Left Side - Forms -->
          <div class="checkout-forms">
            <!-- Shipping Information -->
            <section class="checkout-section">
              <h2 class="section-title">Shipping Information</h2>
              <form class="checkout-form" @submit.prevent="handleSubmit">
                <div class="form-row">
                  <div class="form-group">
                    <label for="firstName" class="form-label">First Name *</label>
                    <input
                      id="firstName"
                      v-model="shippingInfo.firstName"
                      type="text"
                      class="form-input"
                      required
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div class="form-group">
                    <label for="lastName" class="form-label">Last Name *</label>
                    <input
                      id="lastName"
                      v-model="shippingInfo.lastName"
                      type="text"
                      class="form-input"
                      required
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div class="form-group">
                  <label for="email" class="form-label">Email Address *</label>
                  <input
                    id="email"
                    v-model="shippingInfo.email"
                    type="email"
                    class="form-input"
                    required
                    placeholder="your.email@example.com"
                  />
                </div>

                <div class="form-group">
                  <label for="phone" class="form-label">Phone Number *</label>
                  <input
                    id="phone"
                    v-model="shippingInfo.phone"
                    type="tel"
                    class="form-input"
                    required
                    placeholder="01XXXXXXXXX"
                  />
                </div>

                <div class="form-group">
                  <label for="address" class="form-label">Address *</label>
                  <input
                    id="address"
                    v-model="shippingInfo.address"
                    type="text"
                    class="form-input"
                    required
                    placeholder="Street address"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label for="city" class="form-label">City *</label>
                    <input
                      id="city"
                      v-model="shippingInfo.city"
                      type="text"
                      class="form-input"
                      required
                      placeholder="City"
                    />
                  </div>
                  <div class="form-group">
                    <label for="postalCode" class="form-label">Postal Code *</label>
                    <input
                      id="postalCode"
                      v-model="shippingInfo.postalCode"
                      type="text"
                      class="form-input"
                      required
                      placeholder="Postal code"
                    />
                  </div>
                </div>

                <div class="form-group">
                  <label for="country" class="form-label">Country *</label>
                  <select
                    id="country"
                    v-model="shippingInfo.country"
                    class="form-input"
                    required
                  >
                    <option value="">Select Country</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="India">India</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <!-- Billing Same as Shipping -->
                <div class="form-group checkbox-group">
                  <label class="checkbox-label">
                    <input
                      type="checkbox"
                      v-model="billingSameAsShipping"
                      class="checkbox-input"
                    />
                    <span>Billing address same as shipping</span>
                  </label>
                </div>

                <!-- Billing Information (if different) -->
                <div v-if="!billingSameAsShipping" class="billing-section">
                  <h3 class="subsection-title">Billing Information</h3>
                  <div class="form-row">
                    <div class="form-group">
                      <label for="billingFirstName" class="form-label">First Name *</label>
                      <input
                        id="billingFirstName"
                        v-model="billingInfo.firstName"
                        type="text"
                        class="form-input"
                        :required="!billingSameAsShipping"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div class="form-group">
                      <label for="billingLastName" class="form-label">Last Name *</label>
                      <input
                        id="billingLastName"
                        v-model="billingInfo.lastName"
                        type="text"
                        class="form-input"
                        :required="!billingSameAsShipping"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="billingAddress" class="form-label">Address *</label>
                    <input
                      id="billingAddress"
                      v-model="billingInfo.address"
                      type="text"
                      class="form-input"
                      :required="!billingSameAsShipping"
                      placeholder="Street address"
                    />
                  </div>

                  <div class="form-row">
                    <div class="form-group">
                      <label for="billingCity" class="form-label">City *</label>
                      <input
                        id="billingCity"
                        v-model="billingInfo.city"
                        type="text"
                        class="form-input"
                        :required="!billingSameAsShipping"
                        placeholder="City"
                      />
                    </div>
                    <div class="form-group">
                      <label for="billingPostalCode" class="form-label">Postal Code *</label>
                      <input
                        id="billingPostalCode"
                        v-model="billingInfo.postalCode"
                        type="text"
                        class="form-input"
                        :required="!billingSameAsShipping"
                        placeholder="Postal code"
                      />
                    </div>
                  </div>
                </div>

                <!-- Payment Method -->
                <div class="payment-section">
                  <h3 class="subsection-title">Payment Method</h3>
                  <div class="payment-options">
                    <label class="payment-option">
                      <input
                        type="radio"
                        v-model="paymentMethod"
                        value="cash-on-delivery"
                        class="radio-input"
                        required
                      />
                      <div class="payment-option-content">
                        <span class="payment-option-name">Cash on Delivery</span>
                        <span class="payment-option-desc">Pay when you receive your order</span>
                      </div>
                    </label>
                    <label class="payment-option">
                      <input
                        type="radio"
                        v-model="paymentMethod"
                        value="bank-transfer"
                        class="radio-input"
                        required
                      />
                      <div class="payment-option-content">
                        <span class="payment-option-name">Bank Transfer</span>
                        <span class="payment-option-desc">Transfer directly to our bank account</span>
                      </div>
                    </label>
                    <label class="payment-option">
                      <input
                        type="radio"
                        v-model="paymentMethod"
                        value="mobile-banking"
                        class="radio-input"
                        required
                      />
                      <div class="payment-option-content">
                        <span class="payment-option-name">Mobile Banking</span>
                        <span class="payment-option-desc">bKash, Nagad, Rocket, etc.</span>
                      </div>
                    </label>
                  </div>
                </div>

                <!-- Order Notes -->
                <div class="form-group">
                  <label for="orderNotes" class="form-label">Order Notes (Optional)</label>
                  <textarea
                    id="orderNotes"
                    v-model="orderNotes"
                    class="form-textarea"
                    rows="4"
                    placeholder="Any special instructions for your order..."
                  ></textarea>
                </div>
              </form>
            </section>
          </div>

          <!-- Right Side - Order Summary -->
          <div class="checkout-summary">
            <div class="summary-card">
              <h2 class="summary-title">Order Summary</h2>
              
              <!-- Order Items -->
              <div class="order-items">
                <div
                  v-for="(item, index) in cartItems"
                  :key="`${item.id}-${item.size}-${item.color}-${index}`"
                  class="order-item"
                >
                  <div class="order-item-image">
                    <NuxtImg
                      :src="item.image"
                      :alt="item.name"
                      class="item-image"
                      loading="lazy"
                      format="webp"
                      quality="85"
                    />
                  </div>
                  <div class="order-item-details">
                    <h4 class="order-item-name">{{ item.name }}</h4>
                    <div class="order-item-attributes">
                      <span v-if="item.size" class="order-item-attr">Size: {{ item.size }}</span>
                      <span v-if="item.color" class="order-item-attr">Color: {{ item.color }}</span>
                      <span class="order-item-attr">Qty: {{ item.quantity }}</span>
                    </div>
                    <p class="order-item-price">{{ formatPrice(item.price * item.quantity) }}</p>
                  </div>
                </div>
              </div>

              <!-- Order Totals -->
              <div class="order-totals">
                <div class="total-row">
                  <span class="total-label">Subtotal</span>
                  <span class="total-value">{{ totalPriceDisplay }}</span>
                </div>
                <div class="total-row">
                  <span class="total-label">Shipping</span>
                  <span class="total-value">{{ shippingCostDisplay }}</span>
                </div>
                <div class="total-row total-row-final">
                  <span class="total-label">Total</span>
                  <span class="total-value">{{ grandTotalDisplay }}</span>
                </div>
              </div>

              <!-- Place Order Button -->
              <button
                class="place-order-button"
                @click="handlePlaceOrder"
                :disabled="isPlacingOrder"
              >
                <span v-if="!isPlacingOrder">Place Order</span>
                <span v-else>Processing...</span>
              </button>

              <NuxtLink to="/cart" class="back-to-cart-link">
                ← Back to Cart
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
import { navigateTo, useHead } from 'nuxt/app'
import { computed, onMounted, ref, watch } from 'vue'
import AppFooter from '../../../components/AppFooter.vue'
import { useCart } from '../../../composables/useCart'
import './checkout.css'

// Define page meta to ensure route is recognized
definePageMeta({
  layout: false
})

useHead({
  title: 'Checkout - Rang Bangladesh',
  meta: [
    { name: 'description', content: 'Complete your purchase and place your order.' }
  ]
})

const {
  cartItems,
  totalPrice,
  totalPriceDisplay,
  isEmpty,
  clearCart
} = useCart()

// Client-side redirect if cart is empty
onMounted(() => {
  if (isEmpty.value) {
    // Optionally redirect to cart page
    // navigateTo('/cart')
  }
})

// Form data
const shippingInfo = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
  country: 'Bangladesh'
})

const billingInfo = ref({
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  postalCode: ''
})

const billingSameAsShipping = ref(true)
const paymentMethod = ref('cash-on-delivery')
const orderNotes = ref('')
const isPlacingOrder = ref(false)

// Watch billing same as shipping
watch(billingSameAsShipping, (same) => {
  if (same) {
    billingInfo.value = {
      firstName: shippingInfo.value.firstName,
      lastName: shippingInfo.value.lastName,
      address: shippingInfo.value.address,
      city: shippingInfo.value.city,
      postalCode: shippingInfo.value.postalCode
    }
  }
})

// Watch shipping info changes to update billing if same
watch(shippingInfo, () => {
  if (billingSameAsShipping.value) {
    billingInfo.value = {
      firstName: shippingInfo.value.firstName,
      lastName: shippingInfo.value.lastName,
      address: shippingInfo.value.address,
      city: shippingInfo.value.city,
      postalCode: shippingInfo.value.postalCode
    }
  }
}, { deep: true })

// Shipping cost (can be calculated based on location, weight, etc.)
const shippingCost = computed(() => {
  // For now, fixed shipping cost
  // In a real app, this would be calculated based on address, weight, etc.
  return totalPrice.value > 5000 ? 0 : 100 // Free shipping over 5000, otherwise 100
})

const shippingCostDisplay = computed(() => {
  if (shippingCost.value === 0) {
    return 'Free'
  }
  return `Tk ${shippingCost.value.toLocaleString()}`
})

const grandTotal = computed(() => {
  return totalPrice.value + shippingCost.value
})

const grandTotalDisplay = computed(() => {
  return `Tk ${grandTotal.value.toLocaleString()}`
})

const formatPrice = (price: number) => {
  return `Tk ${price.toLocaleString()}`
}

const handleSubmit = () => {
  // Form validation is handled by HTML5 required attributes
  handlePlaceOrder()
}

const handlePlaceOrder = async () => {
  if (isEmpty.value) {
    alert('Your cart is empty!')
    return
  }

  // Validate required fields
  if (!shippingInfo.value.firstName || !shippingInfo.value.lastName || 
      !shippingInfo.value.email || !shippingInfo.value.phone ||
      !shippingInfo.value.address || !shippingInfo.value.city ||
      !shippingInfo.value.postalCode || !shippingInfo.value.country) {
    alert('Please fill in all required shipping information.')
    return
  }

  if (!paymentMethod.value) {
    alert('Please select a payment method.')
    return
  }

  isPlacingOrder.value = true

  try {
    // Prepare order data
    const orderData = {
      shipping: shippingInfo.value,
      billing: billingSameAsShipping.value ? shippingInfo.value : billingInfo.value,
      paymentMethod: paymentMethod.value,
      items: cartItems.value,
      subtotal: totalPrice.value,
      shippingCost: shippingCost.value,
      total: grandTotal.value,
      notes: orderNotes.value,
      orderDate: new Date().toISOString()
    }

    // In a real app, you would send this to your backend API
    console.log('Order Data:', orderData)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Clear cart after successful order
    clearCart()

    // Navigate to order confirmation page
    navigateTo('/checkout/success')
  } catch (error) {
    console.error('Error placing order:', error)
    alert('There was an error placing your order. Please try again.')
  } finally {
    isPlacingOrder.value = false
  }
}
</script>

