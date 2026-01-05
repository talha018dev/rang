<template>
  <main class="order-details-page pb-30! sm:pb-0!">
    <div class="order-details-container">
      <div class="order-details-content">
        <!-- Back Button -->
        <div class="mb-6">
          <button 
            @click="goBack"
            class="back-button">
            <svg class="back-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Orders
          </button>
        </div>

        <!-- Payment Failed Alert -->
        <div v-if="showPaymentFailedAlert" class="payment-failed-alert">
          <div class="alert-content">
            <div class="alert-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="alert-text">
              <h3 class="alert-title">Payment Failed</h3>
              <p class="alert-message">We couldn't redirect you to the payment gateway. Please try again to complete your payment.</p>
            </div>
            <button @click="retryPayment" class="retry-payment-button">
              Try Again
            </button>
            <button @click="dismissAlert" class="dismiss-button">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="loading-state">
          <p class="loading-text">Loading order details...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="error-state">
          <p class="error-text">{{ error }}</p>
          <button 
            @click="fetchOrderDetails" 
            class="retry-button">
            Try Again
          </button>
        </div>

        <!-- Invoice Content -->
        <div v-else-if="order" class="invoice-container">
          <!-- Invoice Header -->
          <div class="invoice-header">
            <div class="invoice-logo">
              <NuxtImg 
                src="/rang-logo-2026-v2.png" 
                alt="Rang Bangladesh Logo" 
                class="invoice-logo-image"
                format="webp"
                quality="90"
                loading="eager"
              />
            </div>
            <div class="invoice-header-content">
              <div class="invoice-header-left">
                <h1 class="invoice-title">Order Invoice</h1>
                <p class="invoice-number">Order #{{ order.number }}</p>
              </div>
              <div class="invoice-header-right">
                <div class="status-badge" :class="getStatusClass(order.status)">
                  {{ order.readable_status || order.status }}
                </div>
              </div>
            </div>
          </div>

          <!-- Invoice Info Section -->
          <div class="invoice-info-section">
            <div class="invoice-info-grid">
              <!-- Order Date -->
              <div class="invoice-info-item">
                <h3 class="info-label">Order Date</h3>
                <p class="info-value">{{ formatDate(order.created_at) }}</p>
              </div>

              <!-- Shipping Method -->
              <div class="invoice-info-item">
                <h3 class="info-label">Shipping Method</h3>
                <p class="info-value">{{ order.shipping_method }}</p>
              </div>

              <!-- Pickup Location (if applicable) -->
              <div v-if="order.pickup_location" class="invoice-info-item">
                <h3 class="info-label">Pickup Location</h3>
                <p class="info-value">{{ order.pickup_location.name || 'N/A' }}</p>
              </div>
            </div>
          </div>

          <!-- Customer & Shipping Address -->
          <div class="address-section">
            <div class="address-grid">
              <!-- Customer Information -->
              <div class="address-card">
                <h2 class="address-title">Customer Information</h2>
                <div class="address-details">
                  <p class="address-name">{{ order.customer.name }}</p>
                  <p class="address-line">{{ order.customer.phone }}</p>
                  <p v-if="order.customer.email" class="address-line">{{ order.customer.email }}</p>
                </div>
              </div>

              <!-- Shipping Address -->
              <div class="address-card">
                <h2 class="address-title">Shipping Address</h2>
                <div class="address-details">
                  <p class="address-name">{{ order.address.name }}</p>
                  <p class="address-line">{{ order.address.line_1 }}</p>
                  <p v-if="order.address.line_2" class="address-line">{{ order.address.line_2 }}</p>
                  <p class="address-line">{{ order.address.city }}, {{ order.address.state }}</p>
                  <p class="address-line">{{ order.address.country }} - {{ order.address.postal_code }}</p>
                  <p class="address-line">Phone: {{ order.address.phone }}</p>
                  <p v-if="order.address.email" class="address-line">Email: {{ order.address.email }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Order Items Table -->
          <div class="items-section">
            <h2 class="section-title">Order Items</h2>
            <div class="items-table-container">
              <table class="items-table">
                <thead>
                  <tr>
                    <th class="table-header">Product</th>
                    <th class="table-header">Variant</th>
                    <th class="table-header text-right">Quantity</th>
                    <th class="table-header text-right">Price</th>
                    <th class="table-header text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in order.items" :key="index" class="table-row">
                    <td class="table-cell table-cell-product" data-label="Product">
                      <div class="product-cell">
                        <NuxtImg 
                          v-if="item.product.image_url"
                          :src="item.product.image_url" 
                          :alt="item.product.name"
                          class="product-image"
                          format="webp"
                          quality="85"
                          loading="lazy"
                        />
                        <div class="product-info">
                          <p class="product-name">{{ item.product.name }}</p>
                          <NuxtLink 
                            :to="`/products/${item.product.slug}`"
                            class="product-link">
                            View Product
                          </NuxtLink>
                        </div>
                      </div>
                    </td>
                    <td class="table-cell" data-label="Variant">
                      <p class="variant-name">{{ item.variant?.name || 'N/A' }}</p>
                    </td>
                    <td class="table-cell text-right" data-label="Quantity">
                      <p class="quantity-text">{{ item.quantity }}</p>
                    </td>
                    <td class="table-cell text-right" data-label="Price">
                      <p class="price-text">{{ formatPrice(item.price) }}</p>
                    </td>
                    <td class="table-cell text-right" data-label="Total">
                      <p class="total-text">{{ formatPrice(item.price * item.quantity) }}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Customer Notes -->
          <div v-if="order.customer_notes" class="notes-section">
            <h2 class="section-title">Customer Notes</h2>
            <p class="notes-text">{{ order.customer_notes }}</p>
          </div>

          <!-- Invoice Summary -->
          <div class="summary-section">
            <div class="summary-card">
              <h2 class="section-title">Order Summary</h2>
              <div class="summary-row">
                <span class="summary-label">Item Total:</span>
                <span class="summary-value">{{ formatPrice(order.item_total) }}</span>
              </div>
              <div v-if="order.coupon_discount > 0" class="summary-row">
                <span class="summary-label">Coupon Discount:</span>
                <span class="summary-value discount">-{{ formatPrice(order.coupon_discount) }}</span>
              </div>
              <div v-if="order.vat > 0" class="summary-row">
                <span class="summary-label">VAT:</span>
                <span class="summary-value">{{ formatPrice(order.vat) }}</span>
              </div>
              <div class="summary-row">
                <span class="summary-label">Shipping:</span>
                <span class="summary-value">{{ formatPrice(order.shipping) }}</span>
              </div>
              <div class="summary-row summary-row-total">
                <span class="summary-label-total">Total:</span>
                <span class="summary-value-total">{{ formatPrice(order.total) }}</span>
              </div>
              <div v-if="order.paid_amount > 0" class="summary-row">
                <span class="summary-label">Paid Amount:</span>
                <span class="summary-value paid">{{ formatPrice(order.paid_amount) }}</span>
              </div>
              <div v-if="order.due > 0" class="summary-row">
                <span class="summary-label">Due:</span>
                <span class="summary-value due">{{ formatPrice(order.due) }}</span>
              </div>
            </div>
          </div>

          <!-- Print Button -->
          <div class="actions-section">
            <button @click="printInvoice" class="print-button">
              <svg class="print-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
    <AppFooter />
  </main>
</template>

<script setup lang="ts">
import { useHead, useRoute, useRouter } from 'nuxt/app'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import AppFooter from '~~/components/AppFooter.vue'
import { useApi } from '~~/composables/useApi'
import { useCurrency } from '~~/composables/useCurrency'
import '../../profile/profile.css'

// Define page meta
definePageMeta({
  layout: false
})

// Type definitions (same as orders page)
interface OrderItem {
  price: number
  quantity: number
  product: {
    name: string
    slug: string
    image_url: string
  }
  variant: {
    image_url: string
    name: string
  } | null
  package: any | null
}

interface OrderAddress {
  name: string
  phone: string
  email: string
  line_1: string
  line_2: string | null
  city: string
  state: string
  country: string
  postal_code: string
}

interface OrderCustomer {
  name: string
  phone: string
  email: string
}

interface Order {
  number: string
  coupon_discount: number
  vat: number
  shipping: number
  item_total: number
  total: number
  paid_amount: number
  customer_notes: string
  status: string
  created_at: string
  readable_status: string
  due: number
  address: OrderAddress
  customer: OrderCustomer
  shipping_method: string
  pickup_location: any | null
  items: OrderItem[]
}

interface OrderResponse {
  success: boolean
  message?: string
  data?: Order
}

// Meta
useHead({
  title: 'Order Details - Rang Bangladesh',
  meta: [
    { name: 'description', content: 'View your order details and invoice.' }
  ]
})

const route = useRoute()
const router = useRouter()
const { backendUrl } = useApi()
const { formatPrice } = useCurrency()

// Get order ID from route
const orderId = computed(() => route.params.orderId as string)

// Order data
const order = ref<Order | null>(null)

// UI state
const isLoading = ref(false)
const error = ref<string | null>(null)
const showPaymentFailedAlert = ref(false)

// Get token from localStorage
const getToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('auth_token')
}

// Fetch order details
const fetchOrderDetails = async () => {
  const token = getToken()

  if (!orderId.value) {
    error.value = 'Order ID is missing'
    return
  }

  isLoading.value = true
  error.value = null

  try {
    // Build headers - include Authorization only if token exists
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response = await $fetch<OrderResponse>(`${backendUrl}/order/${orderId.value}`, {
      method: 'GET',
      headers
    })

    if (response.success && response.data) {
      order.value = response.data
      // Check for print query after order is loaded
      await nextTick()
      checkPrintQuery()
    } else {
      error.value = response.message || 'Failed to load order details.'
    }
  } catch (err: any) {
    console.error('Error fetching order details:', err)
    error.value = err.data?.message || err.message || 'Failed to load order details.'
    
    // Don't redirect to login - just show error message
    // The page is now public, so users can view orders without authentication
  } finally {
    isLoading.value = false
  }
}

// Format date
const formatDate = (dateString?: string): string => {
  if (!dateString) return '-'
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return dateString
  }
}

// Get status class for styling
const getStatusClass = (status?: string): string => {
  if (!status) return 'status-badge-gray'
  
  const statusLower = status.toLowerCase()
  if (statusLower.includes('completed') || statusLower.includes('delivered') || statusLower.includes('paid')) {
    return 'status-badge-green'
  } else if (statusLower.includes('pending') || statusLower.includes('processing')) {
    return 'status-badge-yellow'
  } else if (statusLower.includes('cancelled') || statusLower.includes('failed') || statusLower.includes('payment_incomplete')) {
    return 'status-badge-red'
  } else if (statusLower.includes('shipped')) {
    return 'status-badge-blue'
  }
  return 'status-badge-gray'
}

// Go back to orders page
const goBack = () => {
  router.push('/orders')
}

// Print invoice
const printInvoice = () => {
  // Get the invoice container element
  const invoiceElement = document.querySelector('.invoice-container')
  if (!invoiceElement) {
    console.error('Invoice container not found')
    return
  }

  // Create a new window for printing
  const printWindow = window.open('', '_blank')
  if (!printWindow) {
    console.error('Failed to open print window')
    return
  }

  // Clone the element to avoid modifying the original
  const clonedElement = invoiceElement.cloneNode(true) as HTMLElement
  
  // Remove the actions section (print button) from the cloned element
  const actionsSection = clonedElement.querySelector('.actions-section')
  if (actionsSection) {
    actionsSection.remove()
  }

  // Get order data for restructuring
  const orderData = order.value
  if (!orderData) return

  // Convert all images to absolute URLs
  const images = clonedElement.querySelectorAll('img')
  images.forEach((img) => {
    const src = img.getAttribute('src')
    if (src) {
      // Convert relative URLs to absolute
      if (src.startsWith('http://') || src.startsWith('https://')) {
        img.src = src
      } else if (src.startsWith('//')) {
        img.src = window.location.protocol + src
      } else if (src.startsWith('/')) {
        img.src = window.location.origin + src
      } else {
        img.src = window.location.origin + '/' + src
      }
    }
  })

  // Remove NuxtLink components and convert to plain text or remove
  const links = clonedElement.querySelectorAll('a')
  links.forEach((link) => {
    // Remove the link but keep the text content
    const parent = link.parentNode
    if (parent) {
      const textNode = document.createTextNode(link.textContent || '')
      parent.replaceChild(textNode, link)
    }
  })

  // Format date short
  const formatDateShort = (dateString?: string): string => {
    if (!dateString) return '-'
    try {
      const date = new Date(dateString)
      const day = date.getDate().toString().padStart(2, '0')
      const month = date.toLocaleDateString('en-US', { month: 'short' })
      const year = date.getFullYear()
      return `${day} ${month}, ${year}`
    } catch {
      return dateString
    }
  }

  // Get payment method
  const getPaymentMethod = (): string => {
    if (orderData.paid_amount > 0 && orderData.paid_amount >= orderData.total) {
      return 'Paid'
    }
    return 'Cash on delivery'
  }

  // Get logo image URL
  const logoImg = clonedElement.querySelector('.invoice-logo-image') as HTMLImageElement
  const logoUrl = logoImg ? logoImg.src : ''

  // Build restructured HTML for print
  const printHTML = `
    <div class="invoice-container">
      <!-- Top Header: Logo, QR Code, Company Info -->
      <div class="invoice-top-header">
        <div class="invoice-logo">
          <img src="${logoUrl}" alt="Rang Bangladesh Logo" class="invoice-logo-image" />
        </div>
        <div class="invoice-qr-code">
          <div class="qr-placeholder">QR Code</div>
        </div>
        <div class="invoice-company-info">
          <p class="company-address">রঙ বাংলাদেশ, 91 West Masdair, Narayanganj, 1400 Bangladesh</p>
          <p class="company-bin">BIN: 005358452-0204</p>
          <p class="company-mushak">Mushak: 6.3</p>
        </div>
      </div>

      <!-- Billing and Invoice Details -->
      <div class="invoice-details-section">
        <div class="billing-section">
          <h3 class="section-label">Billing</h3>
          <div class="billing-details">
            <p class="billing-name">${orderData.address?.name || orderData.customer?.name || ''}</p>
            <p class="billing-address">${orderData.address?.line_1 || ''}</p>
            ${orderData.address?.line_2 ? `<p class="billing-address">${orderData.address.line_2}</p>` : ''}
            <p class="billing-address">${orderData.address?.city || ''}, ${orderData.address?.state || ''}, ${orderData.address?.postal_code || ''}</p>
            <p class="billing-address">${orderData.address?.country || ''}</p>
            <p class="billing-phone">Phone: ${orderData.address?.phone || orderData.customer?.phone || ''}</p>
            ${(orderData.address?.email || orderData.customer?.email) ? `<p class="billing-email">Email: ${orderData.address?.email || orderData.customer?.email}</p>` : ''}
          </div>
        </div>
        <div class="invoice-details-right">
          <div class="invoice-detail-row">
            <span class="invoice-detail-label">Invoice Number:</span>
            <span class="invoice-detail-value invoice-number-bold">#${orderData.number}</span>
          </div>
          <div class="invoice-detail-row">
            <span class="invoice-detail-label">Order Number:</span>
            <span class="invoice-detail-value">${orderData.number}</span>
          </div>
          <div class="invoice-detail-row">
            <span class="invoice-detail-label">Order Date:</span>
            <span class="invoice-detail-value">${formatDateShort(orderData.created_at)}</span>
          </div>
          <div class="invoice-detail-row">
            <span class="invoice-detail-label">Payment Method:</span>
            <span class="invoice-detail-value">${getPaymentMethod()}</span>
          </div>
          <div class="invoice-detail-row">
            <span class="invoice-detail-label">Shipping Method:</span>
            <span class="invoice-detail-value">${orderData.shipping_method || 'Home Delivery'}</span>
          </div>
        </div>
      </div>

      <!-- Items Table -->
      <div class="items-section">
        <table class="items-table">
          <thead>
            <tr>
              <th class="table-header">Item</th>
              <th class="table-header text-right">Cost</th>
              <th class="table-header text-center">Qty</th>
              <th class="table-header text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            ${orderData.items?.map((item: any) => {
              const itemImage = item.product?.image_url || ''
              const itemImageUrl = itemImage.startsWith('http') ? itemImage : (itemImage.startsWith('/') ? window.location.origin + itemImage : window.location.origin + '/' + itemImage)
              const variantName = item.variant?.name || 'N/A'
              // Extract variant details
              const getVariantColor = (name: string) => {
                const match = name.match(/(?:color|colour):\s*([^,]+)/i) || name.match(/(red|blue|green|yellow|violet|purple|black|white|pink|orange|brown|gray|grey)/i)
                return match && match[1] ? match[1].trim() : name.split(',')[0] || 'N/A'
              }
              const getVariantFabric = (name: string) => {
                const match = name.match(/(?:fabric|material):\s*([^,]+)/i) || name.match(/(cotton|silk|polyester|linen|wool|chiffon|georgette)/i)
                return match && match[1] ? match[1].trim() : 'Cotton'
              }
              const getVariantSize = (name: string) => {
                const match = name.match(/(?:size):\s*([^,]+)/i) || name.match(/\b(XXS|XS|S|M|L|XL|XXL|\d{2,3})\b/i)
                return match && match[1] ? match[1].trim() : 'N/A'
              }
              return `
                <tr class="table-row">
                  <td class="table-cell table-cell-item">
                    <div class="item-details">
                      <img src="${itemImageUrl}" alt="${item.product?.name || ''}" class="item-image" />
                      <div class="item-info">
                        <p class="item-name">${item.product?.name || ''}</p>
                        <p class="item-sku">SKU: ${variantName}</p>
                        <p class="item-variant">Color: ${getVariantColor(variantName)}</p>
                        <p class="item-variant">Fabric: ${getVariantFabric(variantName)}</p>
                        <p class="item-variant">Size: ${getVariantSize(variantName)}</p>
                      </div>
                    </div>
                  </td>
                  <td class="table-cell text-right">
                    <p class="cost-text">${formatPrice(item.price)}</p>
                  </td>
                  <td class="table-cell text-center">
                    <p class="quantity-text">x ${item.quantity}</p>
                  </td>
                  <td class="table-cell text-right">
                    <p class="total-text">${formatPrice(item.price * item.quantity)}</p>
                  </td>
                </tr>
              `
            }).join('') || ''}
          </tbody>
        </table>
      </div>

      <!-- Summary Section -->
      <div class="summary-section">
        <div class="summary-rows">
          <div class="summary-row">
            <span class="summary-label">Items Subtotal:</span>
            <span class="summary-value">${formatPrice(orderData.item_total)}</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Shipping (ex. tax):</span>
            <span class="summary-value">${formatPrice(orderData.shipping)}</span>
          </div>
          ${orderData.vat > 0 ? `
          <div class="summary-row">
            <span class="summary-label">VAT:</span>
            <span class="summary-value">${formatPrice(orderData.vat)}</span>
          </div>
          ` : ''}
          <div class="summary-row summary-row-total">
            <span class="summary-label-total">Order Total:</span>
            <span class="summary-value-total">${formatPrice(orderData.total)}</span>
          </div>
        </div>
      </div>

      <!-- Footer: Claim Policy and Contact -->
      <div class="invoice-footer">
        <div class="claim-policy">
          <h4 class="claim-policy-title">== Claim Policy ==</h4>
          <p class="claim-policy-text">All claims must be made within 7 days of delivery. Items must be in original condition with tags attached. Exchange is available for size/color issues within 14 days. Returns are accepted for defective or damaged items only. Customized or personalized items are non-refundable. Shipping charges are non-refundable unless item is defective. Please contact customer service for any claims or returns.</p>
        </div>
        <div class="invoice-thankyou">
          <p class="thankyou-message">Thank you for shopping with Rang Bangladesh Ltd.</p>
        </div>
        <div class="invoice-contact">
          <p class="contact-info">Website: www.rang-bd.com</p>
          <p class="contact-info">Helpline: +880 1777744344, +880 1799998877</p>
          <p class="contact-info">Email: contactrang@gmail.com</p>
        </div>
      </div>
    </div>
  `

  const invoiceHTML = printHTML

  // Create the print document
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Invoice - Order #${order.value?.number || ''}</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            padding: 15px;
            color: #000;
            background: white;
            font-size: 11px;
          }
          .invoice-container {
            max-width: 100%;
            margin: 0 auto;
          }
          /* Top Header: Logo, QR Code, Company Info */
          .invoice-top-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 1rem;
            padding-bottom: 0.75rem;
            border-bottom: 2px solid #000;
            page-break-inside: avoid;
            break-inside: avoid;
          }
          .invoice-logo {
            flex: 0 0 auto;
          }
          .invoice-logo-image {
            height: 90px;
            width: auto;
            object-fit: contain;
          }
          .invoice-qr-code {
            flex: 0 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .qr-placeholder {
            width: 80px;
            height: 80px;
            border: 1px solid #ccc;
            background: #f9fafb;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.6rem;
            color: #666;
          }
          .invoice-company-info {
            flex: 0 0 auto;
            text-align: right;
            font-size: 0.7rem;
            line-height: 1.4;
          }
          .company-address {
            margin-bottom: 0.25rem;
          }
          .company-bin, .company-mushak {
            margin-bottom: 0.15rem;
          }
          /* Billing and Invoice Details */
          .invoice-details-section {
            display: flex;
            justify-content: space-between;
            gap: 2rem;
            margin-bottom: 1rem;
            page-break-inside: avoid;
            break-inside: avoid;
          }
          .billing-section {
            flex: 1;
          }
          .section-label {
            font-size: 0.85rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: #374151;
          }
          .billing-details p {
            font-size: 0.7rem;
            line-height: 1.4;
            margin-bottom: 0.2rem;
          }
          .billing-name {
            font-weight: 600;
          }
          .invoice-details-right {
            flex: 1;
            text-align: right;
          }
          .invoice-detail-row {
            display: flex;
            justify-content: flex-end;
            gap: 0.5rem;
            margin-bottom: 0.35rem;
            font-size: 0.7rem;
          }
          .invoice-detail-label {
            font-weight: 500;
            color: #666;
          }
          .invoice-detail-value {
            font-weight: 600;
            color: #000;
          }
          .invoice-number-bold {
            font-weight: 700;
            font-size: 0.75rem;
          }
          /* Items Table */
          .items-section {
            margin-bottom: 1rem;
          }
          .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 0.5rem;
            page-break-inside: avoid;
            break-inside: avoid;
          }
          .items-table thead {
            display: table-header-group;
          }
          .items-table tbody {
            display: table-row-group;
          }
          .items-table tr {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          .items-table th {
            background-color: #4b5563;
            color: white;
            font-weight: 600;
            font-size: 0.75rem;
            padding: 0.5rem;
            text-align: left;
          }
          .items-table th.text-right {
            text-align: right;
          }
          .items-table th.text-center {
            text-align: center;
          }
          .items-table td {
            padding: 0.5rem;
            text-align: left;
            border-bottom: 1px solid #e5e7eb;
            font-size: 0.7rem;
            vertical-align: top;
          }
          .items-table td.text-right {
            text-align: right;
          }
          .items-table td.text-center {
            text-align: center;
          }
          .item-details {
            display: flex;
            align-items: flex-start;
            gap: 0.5rem;
          }
          .item-image {
            width: 45px;
            height: 45px;
            object-fit: cover;
            border-radius: 0.25rem;
            flex-shrink: 0;
          }
          .item-info {
            flex: 1;
          }
          .item-name {
            font-weight: 600;
            font-size: 0.75rem;
            margin-bottom: 0.2rem;
          }
          .item-sku,
          .item-variant {
            font-size: 0.65rem;
            color: #666;
            margin-bottom: 0.1rem;
            line-height: 1.3;
          }
          .cost-text,
          .quantity-text,
          .total-text {
            font-size: 0.7rem;
            font-weight: 500;
          }
          /* Summary Section */
          .summary-section {
            margin-bottom: 1rem;
          }
          .summary-rows {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 0.25rem;
          }
          .summary-row {
            display: flex;
            justify-content: space-between;
            gap: 2rem;
            width: 100%;
            max-width: 300px;
            padding: 0.3rem 0;
            font-size: 0.7rem;
          }
          .summary-row-total {
            border-top: 1px solid #000;
            padding-top: 0.5rem;
            margin-top: 0.25rem;
          }
          .summary-label {
            font-size: 0.7rem;
            color: #374151;
          }
          .summary-label-total {
            font-size: 0.8rem;
            font-weight: 600;
          }
          .summary-value {
            font-size: 0.7rem;
            font-weight: 600;
            color: #374151;
          }
          .summary-value-total {
            font-size: 0.9rem;
            font-weight: 700;
            color: #000;
          }
          /* Footer */
          .invoice-footer {
            margin-top: 1.5rem;
            padding-top: 1rem;
            border-top: 1px solid #e5e7eb;
            font-size: 0.65rem;
            page-break-inside: avoid;
            break-inside: avoid;
          }
          .claim-policy {
            margin-bottom: 0.75rem;
            width: 100%;
          }
          .claim-policy-title {
            font-size: 0.7rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            text-align: center;
          }
          .claim-policy-text {
            width: 100%;
            font-size: 0.65rem;
            line-height: 1.5;
            margin: 0;
            text-align: center;
            text-wrap: balance;
          }
          .invoice-thankyou {
            margin-bottom: 0.5rem;
            text-align: center;
          }
          .thankyou-message {
            font-weight: 600;
            font-size: 0.7rem;
            text-align: center;
          }
          .invoice-contact {
            font-size: 0.65rem;
            line-height: 1.5;
            text-align: center;
          }
          .contact-info {
            margin-bottom: 0.15rem;
          }
          .actions-section {
            display: none;
          }
          .back-button {
            display: none;
          }
          @media print {
            body {
              padding: 10px;
            }
            .invoice-container {
              box-shadow: none;
            }
            .actions-section {
              display: none;
            }
            .back-button {
              display: none;
            }
            /* Remove all page breaks for compact layout */
            * {
              page-break-before: auto !important;
              page-break-after: auto !important;
              page-break-inside: auto !important;
              break-before: auto !important;
              break-after: auto !important;
              break-inside: auto !important;
            }
          }
        </style>
      </head>
      <body>
        <div class="invoice-container">
          ${invoiceHTML}
        </div>
        <` + 'script' + `>
          function waitForImages() {
            const images = document.querySelectorAll('img');
            let loadedCount = 0;
            const totalImages = images.length;
            
            if (totalImages === 0) {
              window.print();
              window.onafterprint = function() {
                window.close();
              };
              return;
            }
            
            images.forEach(function(img) {
              if (img.complete) {
                loadedCount++;
                if (loadedCount === totalImages) {
                  window.print();
                  window.onafterprint = function() {
                    window.close();
                  };
                }
              } else {
                img.onload = function() {
                  loadedCount++;
                  if (loadedCount === totalImages) {
                    window.print();
                    window.onafterprint = function() {
                      window.close();
                    };
                  }
                };
                img.onerror = function() {
                  loadedCount++;
                  if (loadedCount === totalImages) {
                    window.print();
                    window.onafterprint = function() {
                      window.close();
                    };
                  }
                };
              }
            });
          }
          
          window.onload = function() {
            waitForImages();
          };
        </` + 'script' + `>
      </body>
    </html>
  `)

  printWindow.document.close()
}

// Check for payment failed query parameter
const checkPaymentFailed = () => {
  const paymentFailed = route.query.paymentFailed
  if (paymentFailed === 'true') {
    showPaymentFailedAlert.value = true
    // Remove query parameter from URL without reload
    router.replace({ query: { ...route.query, paymentFailed: undefined } })
  }
}

// Check for print query parameter and trigger print
const checkPrintQuery = async () => {
  const shouldPrint = route.query.print
  if (shouldPrint === 'true' && order.value && !isLoading.value) {
    // Wait for DOM to be ready
    await nextTick()
    // Small delay to ensure all images are rendered
    setTimeout(() => {
      printInvoice()
      // Remove query parameter from URL without reload
      router.replace({ query: { ...route.query, print: undefined } })
    }, 500)
  }
}

// Watch for order to be loaded and check print query
watch([order, isLoading], () => {
  if (order.value && !isLoading.value) {
    checkPrintQuery()
  }
})

// Retry payment
const retryPayment = async () => {
  if (!order.value) return
  
  try {
    const { backendUrl } = useApi()
    const gateway = 'ssl' // Default gateway, can be made dynamic if needed
    
    const response = await $fetch<any>(`${backendUrl}/payment/redirect/${order.value.number}?gateway=${gateway}`, {
      method: 'GET',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        ...(getToken() ? { 'Authorization': `Bearer ${getToken()}` } : {})
      }
    })
    
    // Check if API response is successful and contains a URL
    if (response && (response.success !== false)) {
      const redirectUrl = response.url || 
                         response.redirect_url || 
                         response.data?.url || 
                         response.data?.redirect_url ||
                         (response.data && typeof response.data === 'string' ? response.data : null)
      
      if (redirectUrl) {
        // Redirect to the URL from the response in a new tab
        window.open(redirectUrl, '_blank')
        showPaymentFailedAlert.value = false
        return
      }
    }
    
    // If no redirect URL, show error
    error.value = 'Failed to get payment URL. Please contact support.'
  } catch (err: any) {
    console.error('Error retrying payment:', err)
    error.value = err.data?.message || err.message || 'Failed to initiate payment. Please try again later.'
  }
}

// Dismiss alert
const dismissAlert = () => {
  showPaymentFailedAlert.value = false
}

// Fetch order details on mount
onMounted(() => {
  fetchOrderDetails()
  checkPaymentFailed()
  // Check print query after order loads
  if (order.value && !isLoading.value) {
    checkPrintQuery()
  }
})
</script>

<style scoped>
.order-details-page {
  min-height: 100vh;
  background-color: #f9fafb;
}

.order-details-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.order-details-content {
  width: 100%;
}

/* Back Button */
.back-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  color: #374151;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.back-button:hover {
  background: #f9fafb;
  border-color: #d1d5db;
  color: #ea580c;
}

.back-icon {
  width: 1rem;
  height: 1rem;
}

/* Payment Failed Alert */
.payment-failed-alert {
  margin-bottom: 1.5rem;
  background: #fef2f2;
  border: 2px solid #fecaca;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.alert-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.alert-icon {
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  color: #dc2626;
}

.alert-text {
  flex: 1;
}

.alert-title {
  font-size: 1rem;
  font-weight: 600;
  color: #991b1b;
  margin: 0 0 0.25rem 0;
}

.alert-message {
  font-size: 0.875rem;
  color: #7f1d1d;
  margin: 0;
}

.retry-payment-button {
  padding: 0.5rem 1rem;
  background: #dc2626;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  white-space: nowrap;
}

.retry-payment-button:hover {
  background: #b91c1c;
}

.dismiss-button {
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: #991b1b;
  cursor: pointer;
  border-radius: 0.25rem;
  transition: background 0.2s;
}

.dismiss-button:hover {
  background: rgba(220, 38, 38, 0.1);
}

.dismiss-button svg {
  width: 1.25rem;
  height: 1.25rem;
}

/* Loading & Error States */
.loading-state,
.error-state {
  text-align: center;
  padding: 3rem 1rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.loading-text {
  color: #6b7280;
  font-size: 1rem;
}

.error-text {
  color: #dc2626;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.retry-button {
  padding: 0.5rem 1.5rem;
  background: #ea580c;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.retry-button:hover {
  background: #c2410c;
}

/* Invoice Container */
.invoice-container {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
}

/* Invoice Header */
.invoice-header {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #e5e7eb;
}

.invoice-logo {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.invoice-logo-image {
  height: 80px;
  width: auto;
  object-fit: contain;
}

.invoice-header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.invoice-title {
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.5rem 0;
}

.invoice-number {
  font-size: 1.125rem;
  color: #6b7280;
  margin: 0;
}

.status-badge {
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
}

.status-badge-green {
  background: #d1fae5;
  color: #065f46;
}

.status-badge-yellow {
  background: #fef3c7;
  color: #92400e;
}

.status-badge-red {
  background: #fee2e2;
  color: #991b1b;
}

.status-badge-blue {
  background: #dbeafe;
  color: #1e40af;
}

.status-badge-gray {
  background: #f3f4f6;
  color: #374151;
}

/* Invoice Info Section */
.invoice-info-section {
  margin-bottom: 2rem;
}

.invoice-info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.invoice-info-item {
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.5rem;
}

.info-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 0.5rem 0;
}

.info-value {
  font-size: 1rem;
  font-weight: 500;
  color: #111827;
  margin: 0;
}

/* Address Section */
.address-section {
  margin-bottom: 2rem;
}

.address-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.address-card {
  padding: 1.5rem;
  background: #f9fafb;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}

.address-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 1rem 0;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
}

.address-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.address-name {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.address-line {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

/* Items Section */
.items-section {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 1.5rem 0;
}

.items-table-container {
  overflow-x: auto;
}

.items-table {
  width: 100%;
  border-collapse: collapse;
}

.table-header {
  padding: 1rem;
  text-align: left;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  background: #f9fafb;
  border-bottom: 2px solid #e5e7eb;
}

.table-header.text-right {
  text-align: right;
}

.table-row {
  border-bottom: 1px solid #e5e7eb;
}

.table-row:hover {
  background: #f9fafb;
}

.table-cell {
  padding: 1rem;
  vertical-align: middle;
}

.table-cell.text-right {
  text-align: right;
}

.product-cell {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.product-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 0.375rem;
  border: 1px solid #e5e7eb;
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.product-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #111827;
  margin: 0;
}

.product-link {
  font-size: 0.75rem;
  color: #ea580c;
  text-decoration: none;
}

.product-link:hover {
  text-decoration: underline;
}

.variant-name {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

.quantity-text,
.price-text,
.total-text {
  font-size: 0.875rem;
  color: #111827;
  margin: 0;
  font-weight: 500;
}

/* Notes Section */
.notes-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f9fafb;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}

.notes-text {
  font-size: 0.875rem;
  color: #374151;
  margin: 0;
  line-height: 1.6;
}

/* Summary Section */
.summary-section {
  margin-bottom: 2rem;
}

.summary-card {
  padding: 1.5rem;
  background: #f9fafb;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.summary-row:last-child {
  border-bottom: none;
}

.summary-row-total {
  border-top: 2px solid #111827;
  border-bottom: 2px solid #111827;
  margin-top: 0.5rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.summary-label {
  font-size: 0.875rem;
  color: #6b7280;
}

.summary-value {
  font-size: 0.875rem;
  font-weight: 500;
  color: #111827;
}

.summary-value.discount {
  color: #dc2626;
}

.summary-value.paid {
  color: #059669;
}

.summary-value.due {
  color: #ea580c;
  font-weight: 600;
}

.summary-label-total {
  font-size: 1.125rem;
  font-weight: 700;
  color: #111827;
}

.summary-value-total {
  font-size: 1.125rem;
  font-weight: 700;
  color: #111827;
}

/* Actions Section */
.actions-section {
  display: flex;
  justify-content: center;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.print-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #ea580c;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.print-button:hover {
  background: #c2410c;
}

.print-icon {
  width: 1.25rem;
  height: 1.25rem;
}

/* Print Styles */
@media print {
  .order-details-page {
    background: white;
  }

  .back-button,
  .actions-section {
    display: none;
  }

  .invoice-container {
    box-shadow: none;
    padding: 0;
  }

  .invoice-header {
    border-bottom: 2px solid #000;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .order-details-container {
    padding: 1rem;
  }

  .invoice-container {
    padding: 1rem;
  }

  .invoice-header {
    flex-direction: column;
    gap: 1rem;
  }

  .invoice-logo-image {
    height: 60px;
  }

  .invoice-header-content {
    flex-direction: column;
    gap: 1rem;
  }

  .address-grid {
    grid-template-columns: 1fr;
  }

  /* Convert table to card layout on mobile */
  .items-table-container {
    overflow-x: visible;
  }

  .items-table thead {
    display: none;
  }

  .items-table,
  .items-table tbody,
  .items-table tr {
    display: block;
    width: 100%;
  }

  .table-row {
    display: block;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    padding: 1rem;
    margin-bottom: 1rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }

  .table-cell {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 0;
    border: none;
    border-bottom: 1px solid #f3f4f6;
    text-align: left !important;
  }

  .table-cell:last-child {
    border-bottom: none;
  }

  .table-cell::before {
    content: attr(data-label);
    font-weight: 600;
    font-size: 0.75rem;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-right: 1rem;
    flex-shrink: 0;
  }

  .table-cell.text-right {
    justify-content: space-between;
  }

  .table-cell-product {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .table-cell-product::before {
    margin-bottom: 0.5rem;
  }

  .product-cell {
    flex-direction: row;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
  }

  .product-image {
    width: 50px;
    height: 50px;
    flex-shrink: 0;
  }

  .product-info {
    flex: 1;
    min-width: 0;
  }

  .product-name {
    font-size: 0.875rem;
    word-wrap: break-word;
  }

  .variant-name,
  .quantity-text,
  .price-text,
  .total-text {
    font-size: 0.875rem;
    font-weight: 500;
  }

  .payment-failed-alert {
    padding: 0.75rem;
  }

  .alert-content {
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .alert-text {
    flex-basis: 100%;
  }

  .retry-payment-button {
    flex: 1;
    min-width: 120px;
  }
}
</style>

