<template>
  <main class="checkout-page">
    <div class="checkout-container">
      
      <div class="checkout-content">
        <h1 class="checkout-title">Checkout</h1>
        
        <!-- Loading Skeleton -->
        <div v-if="isLoadingCart" class="checkout-layout loading-skeleton">
          <!-- Left Side - Forms Skeleton -->
          <div class="checkout-forms">
            <section class="checkout-section">
              <div class="skeleton-box skeleton-section-title"></div>
              <div class="checkout-form">
                <div class="form-row">
                  <div class="form-group">
                    <div class="skeleton-box skeleton-label"></div>
                    <div class="skeleton-box skeleton-input"></div>
                  </div>
                  <div class="form-group">
                    <div class="skeleton-box skeleton-label"></div>
                    <div class="skeleton-box skeleton-input"></div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="skeleton-box skeleton-label"></div>
                  <div class="skeleton-box skeleton-input"></div>
                </div>
                <div class="form-group">
                  <div class="skeleton-box skeleton-label"></div>
                  <div class="skeleton-box skeleton-input"></div>
                </div>
                <div class="form-group">
                  <div class="skeleton-box skeleton-label"></div>
                  <div class="skeleton-box skeleton-input"></div>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <div class="skeleton-box skeleton-label"></div>
                    <div class="skeleton-box skeleton-input"></div>
                  </div>
                  <div class="form-group">
                    <div class="skeleton-box skeleton-label"></div>
                    <div class="skeleton-box skeleton-input"></div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="skeleton-box skeleton-label"></div>
                  <div class="skeleton-box skeleton-input"></div>
                </div>
                <div class="form-group">
                  <div class="skeleton-box skeleton-checkbox"></div>
                </div>
                <div class="form-group">
                  <div class="skeleton-box skeleton-section-title-small"></div>
                  <div class="skeleton-box skeleton-textarea"></div>
                </div>
              </div>
            </section>
          </div>

          <!-- Right Side - Order Summary Skeleton -->
          <div class="checkout-summary">
            <div class="summary-card">
              <div class="skeleton-box skeleton-section-title"></div>
              
              <!-- Order Items Skeleton -->
              <div class="order-items">
                <div v-for="i in 3" :key="i" class="order-item">
                  <div class="order-item-image">
                    <div class="skeleton-box skeleton-order-image"></div>
                  </div>
                  <div class="order-item-details">
                    <div class="skeleton-box skeleton-order-name"></div>
                    <div class="skeleton-box skeleton-order-attr"></div>
                    <div class="skeleton-box skeleton-order-price"></div>
                  </div>
                </div>
              </div>

              <!-- Order Totals Skeleton -->
              <div class="order-totals">
                <div class="total-row">
                  <div class="skeleton-box skeleton-total-label"></div>
                  <div class="skeleton-box skeleton-total-value"></div>
                </div>
                <div class="total-row">
                  <div class="skeleton-box skeleton-total-label"></div>
                  <div class="skeleton-box skeleton-total-value"></div>
                </div>
                <div class="total-row total-row-final">
                  <div class="skeleton-box skeleton-total-label-large"></div>
                  <div class="skeleton-box skeleton-total-value-large"></div>
                </div>
              </div>

              <!-- Place Order Button Skeleton -->
              <div class="skeleton-box skeleton-button"></div>
              <div class="skeleton-box skeleton-link"></div>
            </div>
          </div>
        </div>

        <div v-else-if="isEmpty" class="empty-cart-message">
          <p>Your cart is empty. Please add items to your cart before checkout.</p>
          <NuxtLink to="/products/men" class="shop-button">Continue Shopping</NuxtLink>
        </div>

        <div v-else class="checkout-layout" :class="{ 'processing-order': isPlacingOrder }">
          <!-- Loading Overlay when placing order -->
          <div v-if="isPlacingOrder" class="order-processing-overlay">
            <div class="processing-spinner">
              <div class="spinner"></div>
              <p class="processing-text">Processing your order...</p>
            </div>
          </div>

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
                    <label for="state" class="form-label">State *</label>
                    <input
                      id="state"
                      v-model="shippingInfo.state"
                      type="text"
                      class="form-input"
                      required
                      placeholder="State"
                    />
                  </div>
                </div>

                <div class="form-row">
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
                </div>

                <!-- Shipping Method -->
                <div class="form-group">
                  <label for="shippingMethod" class="form-label">Shipping Method *</label>
                  <select
                    id="shippingMethod"
                    v-model="shippingMethod"
                    class="form-input"
                    required
                  >
                    <option value="">Select Shipping Method</option>
                    <option value="inside_dhaka">Inside Dhaka</option>
                    <option value="outside_dhaka">Outside Dhaka</option>
                  </select>
                </div>

                <!-- Billing Same as Shipping -->
                <div class="form-group checkbox-group flex-row">
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
                      <label for="billingState" class="form-label">State *</label>
                      <input
                        id="billingState"
                        v-model="billingInfo.state"
                        type="text"
                        class="form-input"
                        :required="!billingSameAsShipping"
                        placeholder="State"
                      />
                    </div>
                  </div>

                  <div class="form-row">
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
                <!-- <div class="payment-section">
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
                </div> -->

                <!-- Coupon Code -->
                <div class="form-group">
                  <label for="couponCode" class="form-label">Coupon Code (Optional)</label>
                  <div class="coupon-input-group">
                    <input
                      id="couponCode"
                      v-model="couponCode"
                      type="text"
                      class="form-input coupon-input"
                      placeholder="Enter coupon code"
                      :disabled="isValidatingCoupon || couponValidated"
                    />
                    <button
                      type="button"
                      class="validate-coupon-button"
                      @click="validateCoupon"
                      :disabled="!couponCode || isValidatingCoupon || couponValidated"
                    >
                      <span v-if="isValidatingCoupon">Validating...</span>
                      <span v-else-if="couponValidated">✓ Valid</span>
                      <span v-else>Validate</span>
                    </button>
                  </div>
                  <div v-if="couponError" class="coupon-error">
                    {{ couponError }}
                  </div>
                  <div v-if="couponValidated && couponData" class="coupon-success">
                    Coupon applied! Discount: {{ formatPrice(couponData.discount || 0) }}
                  </div>
                  <button
                    v-if="couponValidated"
                    type="button"
                    class="remove-coupon-button"
                    @click="removeCoupon"
                  >
                    Remove Coupon
                  </button>
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
                    <p class="order-item-price">{{ formatItemTotal(item) }}</p>
                  </div>
                </div>
              </div>

              <!-- Order Totals -->
              <div class="order-totals">
                <div class="total-row">
                  <span class="total-label">Subtotal</span>
                  <span class="total-value">{{ totalPriceDisplay }}</span>
                </div>
                <div v-if="couponValidated && couponData" class="total-row">
                  <span class="total-label">Discount</span>
                  <span class="total-value discount-value">-{{ formatPrice(couponData.discount || 0) }}</span>
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
import { useApi } from '../../../composables/useApi'
import { useCart } from '../../../composables/useCart'
import { useCurrency } from '../../../composables/useCurrency'
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

const { formatPrice, currency, exchangeRate } = useCurrency()

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
    return `Tk ${total.toLocaleString()}`
  }
}

// Loading state for cart initialization
const isLoadingCart = ref(true)

// Client-side redirect if cart is empty
onMounted(() => {
  // Simulate cart loading time to show skeleton
  setTimeout(() => {
    isLoadingCart.value = false
  }, 300)
  
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
  state: '',
  postalCode: '',
  country: 'Bangladesh'
})

const billingInfo = ref({
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  state: '',
  postalCode: ''
})

const billingSameAsShipping = ref(true)
const shippingMethod = ref('')
const paymentMethod = ref('cash-on-delivery')
const orderNotes = ref('')
const isPlacingOrder = ref(false)

// Coupon functionality
const couponCode = ref('')
const isValidatingCoupon = ref(false)
const couponValidated = ref(false)
const couponError = ref('')
const couponData = ref<any>(null)

// Watch billing same as shipping
watch(billingSameAsShipping, (same) => {
  if (same) {
    billingInfo.value = {
      firstName: shippingInfo.value.firstName,
      lastName: shippingInfo.value.lastName,
      address: shippingInfo.value.address,
      city: shippingInfo.value.city,
      state: shippingInfo.value.state,
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
      state: shippingInfo.value.state,
      postalCode: shippingInfo.value.postalCode
    }
  }
}, { deep: true })

// Shipping cost in BDT (base currency)
const shippingCostBDT = computed(() => {
  if (!shippingMethod.value) {
    return 0
  }
  
  // Set shipping cost based on selected method
  if (shippingMethod.value === 'inside_dhaka') {
    return 100
  } else if (shippingMethod.value === 'outside_dhaka') {
    return 200
  }
  
  return 0
})

// Shipping cost in current currency
const shippingCost = computed(() => {
  if (currency.value === 'USD') {
    // Convert BDT shipping cost to USD
    return shippingCostBDT.value / exchangeRate.value
  }
  return shippingCostBDT.value
})

const shippingCostDisplay = computed(() => {
  if (!shippingMethod.value) {
    return 'Select shipping method'
  }
  if (shippingCostBDT.value === 0) {
    return 'Free'
  }
  if (currency.value === 'USD') {
    const usdShipping = shippingCost.value
    if (!isFinite(usdShipping) || isNaN(usdShipping)) {
      return '$0.00'
    }
    return `$${usdShipping.toFixed(2)}`
  }
  return `Tk ${shippingCostBDT.value.toLocaleString()}`
})

// Calculate grand total with coupon discount
const grandTotal = computed(() => {
  const subtotal = totalPrice.value
  const discount = couponValidated.value && couponData.value ? (couponData.value.discount || 0) : 0
  
  // Convert discount to current currency if needed
  let discountInCurrentCurrency = discount
  if (currency.value === 'USD' && discount > 0) {
    discountInCurrentCurrency = discount / exchangeRate.value
  }
  
  const shipping = shippingCost.value
  const total = subtotal - discountInCurrentCurrency + shipping
  
  // Check for invalid values
  if (!isFinite(total) || isNaN(total)) {
    return 0
  }
  
  return total
})

const grandTotalDisplay = computed(() => {
  if (!shippingMethod.value) {
    // Show subtotal only when no shipping method is selected
    return totalPriceDisplay.value
  }
  
  // Format grandTotal directly (it's already in the correct currency)
  if (currency.value === 'USD') {
    const totalUsd = grandTotal.value
    if (!isFinite(totalUsd) || isNaN(totalUsd)) {
      return '$0.00'
    }
    return `$${totalUsd.toFixed(2)}`
  } else {
    return `Tk ${grandTotal.value.toLocaleString()}`
  }
})

// Validate coupon function
const validateCoupon = async () => {
  if (!couponCode.value || couponCode.value.trim() === '') {
    couponError.value = 'Please enter a coupon code'
    return
  }

  isValidatingCoupon.value = true
  couponError.value = ''
  couponValidated.value = false
  couponData.value = null

  try {
    const { backendUrl } = useApi()
    const response = await $fetch<any>(`${backendUrl}/order/validate-coupon`, {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: {
        coupon_code: couponCode.value.trim(),
        item_total: totalPrice.value
      }
    })

    if (response && response.success) {
      couponValidated.value = true
      couponData.value = response.data || response
      couponError.value = ''
    } else {
      couponError.value = response?.message || 'Invalid coupon code'
      couponValidated.value = false
      couponData.value = null
    }
  } catch (error: any) {
    console.error('Error validating coupon:', error)
    couponError.value = error?.data?.message || error?.message || 'Failed to validate coupon. Please try again.'
    couponValidated.value = false
    couponData.value = null
  } finally {
    isValidatingCoupon.value = false
  }
}

// Remove coupon function
const removeCoupon = () => {
  couponCode.value = ''
  couponValidated.value = false
  couponData.value = null
  couponError.value = ''
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
      !shippingInfo.value.state || !shippingInfo.value.postalCode || 
      !shippingInfo.value.country) {
    alert('Please fill in all required shipping information.')
    return
  }

  if (!shippingMethod.value) {
    alert('Please select a shipping method.')
    return
  }

  if (!paymentMethod.value) {
    alert('Please select a payment method.')
    return
  }

  // Validate that cart items have product_id and variant_id
  const itemsWithoutIds = cartItems.value.filter(
    item => !item.product_id || !item.variant_id
  )
  if (itemsWithoutIds.length > 0) {
    alert('Some items in your cart are missing required information. Please remove them and add them again.')
    return
  }

  isPlacingOrder.value = true

  try {
    // Prepare order data according to API structure
    const orderData = {
      coupon_code: couponValidated.value && couponCode.value ? couponCode.value.trim() : null,
      customer_notes: orderNotes.value || null,
      shipping_method: shippingMethod.value,
      address: {
        name: `${shippingInfo.value.firstName} ${shippingInfo.value.lastName}`,
        phone: shippingInfo.value.phone,
        email: shippingInfo.value.email,
        line_1: shippingInfo.value.address,
        line_2: '',
        city: shippingInfo.value.city,
        state: shippingInfo.value.state,
        country: shippingInfo.value.country,
        postal_code: shippingInfo.value.postalCode
      },
      products: cartItems.value.map(item => ({
        product_id: item.product_id!,
        variant_id: item.variant_id!,
        qty: item.quantity
      }))
    }

    console.log('Order Data:', orderData)
    
    // Make API call to create order
    const { backendUrl } = useApi()
    const response = await $fetch<any>(`${backendUrl}/order`, {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: orderData
    })

    console.log('Order API Response:', response)

    // Check if order was successful
    if (response && (response.success !== false)) {
      // Clear cart after successful order
      clearCart()

      // Navigate to order confirmation page
      navigateTo('/checkout/success')
    } else {
      throw new Error((response as any)?.message || 'Failed to create order')
    }
  } catch (error: any) {
    console.error('Error placing order:', error)
    const errorMessage = error?.data?.message || error?.message || 'There was an error placing your order. Please try again.'
    alert(errorMessage)
  } finally {
    isPlacingOrder.value = false
  }
}
</script>

