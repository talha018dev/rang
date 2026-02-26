<template>
  <main class="order-tracking-page">
    <div class="order-tracking-container">
      <section class="tracking-header">
        <h1 class="tracking-title">Track Your Order</h1>
        <p class="tracking-subtitle">Enter your order number to see the current status and delivery details.</p>
      </section>

      <!-- Search form -->
      <section class="tracking-form-section">
        <form @submit.prevent="trackOrder" class="tracking-form">
          <div class="form-row">
            <label for="order-number" class="form-label">Order Number</label>
            <input
              id="order-number"
              v-model="orderNumber"
              type="text"
              class="form-input"
              placeholder="e.g. R24260227-001"
              required
              :disabled="isLoading"
            />
          </div>
          <button type="submit" class="submit-button" :disabled="isLoading">
            {{ isLoading ? 'Tracking...' : 'Track Order' }}
          </button>
        </form>
      </section>

      <!-- Error -->
      <section v-if="error && !isLoading" class="tracking-message tracking-error">
        <Icon name="heroicons:exclamation-circle" class="message-icon" />
        <p>{{ error }}</p>
      </section>

      <!-- Order result -->
      <section v-else-if="order && !isLoading" class="tracking-result">
        <div class="result-card">
          <div class="result-header">
            <h2 class="result-order-number">Order {{ order.number }}</h2>
            <span :class="['status-badge', statusBadgeClass]">{{ order.readable_status || order.status }}</span>
          </div>

          <p class="result-date">Placed on {{ formatDate(order.created_at) }}</p>

          <!-- Status timeline: track (circles + connectors) + labels row on desktop; on mobile one column per step (circle + label + connector) -->
          <div class="status-timeline">
            <div class="timeline-track">
              <template v-for="(step, index) in statusSteps" :key="step.key">
                <div class="timeline-step-group">
                  <div class="timeline-step-row">
                    <div class="timeline-slot">
                      <div
                        :class="['timeline-marker', { active: step.active, completed: step.completed }]"
                      >
                        <Icon v-if="step.completed" name="heroicons:check" class="step-check" />
                        <span v-else class="step-dot"></span>
                      </div>
                    </div>
                    <span :class="['timeline-label-inline', { active: step.active, completed: step.completed }]">{{ step.label }}</span>
                  </div>
                  <div
                    v-if="index < statusSteps.length - 1"
                    :class="['timeline-connector', { completed: step.completed }]"
                  ></div>
                </div>
              </template>
            </div>
            <div class="timeline-labels" aria-hidden="true">
              <div
                v-for="(step, index) in statusSteps"
                :key="step.key"
                :class="['timeline-label', { active: step.active, completed: step.completed }]"
              >
                {{ step.label }}
              </div>
            </div>
          </div>

          <!-- Shipping & summary -->
          <div class="result-details">
            <div class="detail-block">
              <h3 class="detail-title">Shipping method</h3>
              <p class="detail-value">{{ formatShippingMethod(order.shipping_method) }}</p>
            </div>
            <div v-if="order.address" class="detail-block">
              <h3 class="detail-title">Delivery address</h3>
              <p class="detail-value">
                {{ order.address.line_1 }}<br>
                <template v-if="order.address.line_2">{{ order.address.line_2 }}<br></template>
                {{ order.address.city }}<template v-if="order.address.state">, {{ order.address.state }}</template>
                {{ order.address.postal_code }}<br>
                {{ order.address.country }}
              </p>
            </div>
            <div class="detail-block">
              <h3 class="detail-title">Items</h3>
              <p class="detail-value">{{ order.items?.length || 0 }} item(s) · {{ formatPrice(order.total) }}</p>
            </div>
          </div>

          <NuxtLink :to="`/orders/${order.number}`" class="view-order-link">
            View full order & invoice
            <Icon name="heroicons:arrow-right" class="link-icon" />
          </NuxtLink>
        </div>
      </section>
    </div>
    <AppFooter />
  </main>
</template>

<script setup lang="ts">
import { useHead } from 'nuxt/app'
import { computed, ref } from 'vue'
import AppFooter from '~~/components/AppFooter.vue'
import { useApi } from '~~/composables/useApi'
import './order-tracking.css'

useHead({
  title: 'Order Tracking - Rang Bangladesh',
  meta: [
    { name: 'description', content: 'Track your Rang Bangladesh order. Enter your order number to see status and delivery details.' }
  ]
})

const { backendUrl } = useApi()

const orderNumber = ref('')
const order = ref<any | null>(null)
const error = ref<string | null>(null)
const isLoading = ref(false)

const statusBadgeClass = computed(() => {
  if (!order.value) return ''
  const s = (order.value.status || '').toLowerCase()
  if (s.includes('delivered') || s.includes('success')) return 'status-success'
  if (s.includes('ship') || s.includes('dispatch')) return 'status-shipped'
  if (s.includes('confirm') || s.includes('process')) return 'status-confirmed'
  if (s.includes('cancel')) return 'status-cancelled'
  return 'status-pending'
})

// Timeline steps based on status (order flow: placed → confirmed → processing → shipped → delivered)
const statusOrder = ['pending', 'confirmed', 'processing', 'shipped', 'delivered']
const statusLabels: Record<string, string> = {
  pending: 'Order placed',
  confirmed: 'Confirmed',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered'
}

const statusSteps = computed(() => {
  if (!order.value) return []
  const current = (order.value.status || 'pending').toLowerCase()
  let currentIndex = statusOrder.findIndex(s => current.includes(s) || s.includes(current))
  if (currentIndex === -1) currentIndex = 0
  return statusOrder.map((key, index) => ({
    key,
    label: statusLabels[key] || key,
    completed: index < currentIndex,
    active: index === currentIndex
  }))
})

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

const formatShippingMethod = (method?: string): string => {
  if (!method) return 'N/A'
  const m = method.toLowerCase()
  if (m.includes('pathao')) return 'Home delivery (Pathao)'
  if (m.includes('steadfast') || m.includes('stead')) return 'Home delivery (Steadfast)'
  if (m.includes('pickup') || m.includes('store')) return 'Store pickup'
  return method.replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

const formatPrice = (amount: number): string => {
  const currency = order.value?.currency || 'BDT'
  const country = order.value?.address?.country || ''
  const isBDT = currency === 'BDT' || country.toLowerCase() === 'bangladesh'
  if (isBDT) return `Tk ${(amount || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  return `$${(amount || 0).toFixed(2)}`
}

const trackOrder = async () => {
  const number = orderNumber.value?.trim()
  if (!number) return
  order.value = null
  error.value = null
  isLoading.value = true
  try {
    const response = await $fetch<{ success: boolean; message?: string; data?: any }>(`${backendUrl}/order/${encodeURIComponent(number)}`, {
      method: 'GET',
      headers: { Accept: 'application/json' }
    })
    if (response.success && response.data) {
      order.value = response.data
    } else {
      error.value = response.message || 'Order not found.'
    }
  } catch (err: any) {
    error.value = err.data?.message || err.message || 'Order not found. Please check the order number.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
@import './order-tracking.css';
</style>
