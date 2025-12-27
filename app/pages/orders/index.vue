<template>
  <main class="profile-page pb-30! sm:pb-0!">
    <div class="profile-container">
      <div class="profile-content">
        <!-- Navigation Cards -->
        <div class="!flex !flex-wrap !gap-4 !w-full !justify-center !mb-6 !max-w-[600px]">
          <NuxtLink 
            to="/myprofile"
            class="!flex !flex-col !items-center !justify-center !gap-2 !p-6 !bg-white !rounded-lg !border-2 !transition-all !duration-200 hover:!shadow-md !min-w-[120px] !flex-1 !max-w-[200px] !h-[100px]"
            :class="$route.path === '/myprofile' ? '!border-orange-600 !bg-orange-50' : '!border-gray-200 hover:!border-orange-300'">
            <div class="!w-8 !h-8 !text-orange-600">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="!w-full !h-full">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div class="!text-sm !font-semibold !text-gray-700">Profile</div>
          </NuxtLink>
          
          <NuxtLink 
            to="/address"
            class="!flex !flex-col !items-center !justify-center !gap-2 !p-6 !bg-white !rounded-lg !border-2 !transition-all !duration-200 hover:!shadow-md !min-w-[120px] !flex-1 !max-w-[200px] !h-[100px]"
            :class="$route.path === '/address' ? '!border-orange-600 !bg-orange-50' : '!border-gray-200 hover:!border-orange-300'">
            <div class="!w-8 !h-8 !text-orange-600">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="!w-full !h-full">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div class="!text-sm !font-semibold !text-gray-700">Address</div>
          </NuxtLink>
          
          <NuxtLink 
            to="/orders"
            class="!flex !flex-col !items-center !justify-center !gap-2 !p-6 !bg-white !rounded-lg !border-2 !transition-all !duration-200 hover:!shadow-md !min-w-[120px] !flex-1 !max-w-[200px] !h-[100px]"
            :class="$route.path === '/orders' ? '!border-orange-600 !bg-orange-50' : '!border-gray-200 hover:!border-orange-300'">
            <div class="!w-8 !h-8 !text-orange-600">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="!w-full !h-full">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div class="!text-sm !font-semibold !text-gray-700">Orders</div>
          </NuxtLink>
        </div>

        <!-- Orders Card -->
        <div class="!w-full !max-w-6xl">
          <div class="!bg-white !rounded-lg !border !border-gray-200 !shadow-sm !p-6">
            <h2 class="!text-2xl !font-bold !text-gray-900 !mb-2 !text-center">My Orders</h2>
            <p class="!text-gray-600 !mb-6 !text-center">View your order history</p>
            
            <!-- Loading State -->
            <div v-if="isLoading" class="!text-center !py-12">
              <p class="!text-gray-500">Loading orders...</p>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="!text-center !py-12">
              <p class="!text-red-600 !mb-4">{{ error }}</p>
              <button 
                @click="fetchOrders" 
                class="!px-4 !py-2 !bg-orange-600 !text-white !rounded-lg hover:!bg-orange-700 !transition-colors">
                Try Again
              </button>
            </div>

            <!-- Empty State -->
            <div v-else-if="orders.length === 0" class="!text-center !pt-12 !pb-12">
              <svg class="!mx-auto !h-8 !text-gray-400 !mb-4 !w-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p class="!text-gray-500 !text-lg">No orders found</p>
            </div>

            <!-- Orders Table -->
            <div v-else class="!overflow-x-auto">
              <table class="!min-w-full !divide-y !divide-gray-200">
                <thead class="!bg-gray-50">
                  <tr>
                    <th class="!px-6 !py-3 !text-left !text-xs !font-medium !text-gray-500 !uppercase !tracking-wider">Order ID</th>
                    <th class="!px-6 !py-3 !text-left !text-xs !font-medium !text-gray-500 !uppercase !tracking-wider">Date</th>
                    <th class="!px-6 !py-3 !text-left !text-xs !font-medium !text-gray-500 !uppercase !tracking-wider">Status</th>
                    <th class="!px-6 !py-3 !text-left !text-xs !font-medium !text-gray-500 !uppercase !tracking-wider">Total</th>
                    <th class="!px-6 !py-3 !text-left !text-xs !font-medium !text-gray-500 !uppercase !tracking-wider">Items</th>
                    <th class="!px-6 !py-3 !text-left !text-xs !font-medium !text-gray-500 !uppercase !tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="!bg-white !divide-y !divide-gray-200">
                  <tr v-for="order in orders" :key="order.id" class="hover:!bg-gray-50">
                    <td class="!px-6 !py-4 !whitespace-nowrap !text-sm !font-medium !text-gray-900">
                      #{{ order.id }}
                    </td>
                    <td class="!px-6 !py-4 !whitespace-nowrap !text-sm !text-gray-500">
                      {{ formatDate(order.created_at || order.date) }}
                    </td>
                    <td class="!px-6 !py-4 !whitespace-nowrap">
                      <span 
                        class="!px-2 !inline-flex !text-xs !leading-5 !font-semibold !rounded-full"
                        :class="getStatusClass(order.status)">
                        {{ order.status || 'Pending' }}
                      </span>
                    </td>
                    <td class="!px-6 !py-4 !whitespace-nowrap !text-sm !font-medium !text-gray-900">
                      {{ formatPrice(order.total || order.amount || 0) }}
                    </td>
                    <td class="!px-6 !py-4 !whitespace-nowrap !text-sm !text-gray-500">
                      {{ order.items_count || order.items?.length || 0 }} item(s)
                    </td>
                    <td class="!px-6 !py-4 !whitespace-nowrap !text-sm !font-medium">
                      <button 
                        @click="viewOrderDetails(order)"
                        class="!text-orange-600 hover:!text-orange-900">
                        View Details
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AppFooter />
  </main>
</template>

<script setup lang="ts">
import { useHead, useRoute, useRouter } from 'nuxt/app'
import { $fetch } from 'ofetch'
import { onMounted, ref } from 'vue'
import AppFooter from '~~/components/AppFooter.vue'
import { useApi } from '~~/composables/useApi'
import { useCurrency } from '~~/composables/useCurrency'
import '../profile/profile.css'

// Type definitions
interface Order {
  id: number
  order_number?: string
  status?: string
  total?: number
  amount?: number
  items_count?: number
  items?: any[]
  created_at?: string
  date?: string
  [key: string]: any
}

interface OrdersResponse {
  success: boolean
  message?: string
  data?: Order[]
}

// Meta
useHead({
  title: 'Orders - Rang Bangladesh',
  meta: [
    { name: 'description', content: 'View your order history on Rang Bangladesh.' }
  ]
})

const route = useRoute()
const router = useRouter()
const { backendUrl } = useApi()
const { formatPrice } = useCurrency()

// Orders data
const orders = ref<Order[]>([])

// UI state
const isLoading = ref(false)
const error = ref<string | null>(null)

// Get token from localStorage
const getToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('auth_token')
}

// Fetch orders
const fetchOrders = async () => {
  const token = getToken()
  
  if (!token) {
    await router.push('/login')
    return
  }

  isLoading.value = true
  error.value = null

  try {
    const response = await $fetch<OrdersResponse>(`${backendUrl}/order`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.success && response.data) {
      orders.value = response.data
    } else {
      orders.value = []
      error.value = response.message || 'Failed to load orders.'
    }
  } catch (err: any) {
    console.error('Error fetching orders:', err)
    error.value = err.data?.message || err.message || 'Failed to load orders.'
    orders.value = []
    
    // If unauthorized, redirect to login
    if (err.status === 401 || err.statusCode === 401) {
      await router.push('/login')
    }
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
      month: 'short', 
      day: 'numeric' 
    })
  } catch {
    return dateString
  }
}

// Get status class for styling
const getStatusClass = (status?: string): string => {
  if (!status) return '!bg-gray-100 !text-gray-800'
  
  const statusLower = status.toLowerCase()
  if (statusLower.includes('completed') || statusLower.includes('delivered')) {
    return '!bg-green-100 !text-green-800'
  } else if (statusLower.includes('pending') || statusLower.includes('processing')) {
    return '!bg-yellow-100 !text-yellow-800'
  } else if (statusLower.includes('cancelled') || statusLower.includes('failed')) {
    return '!bg-red-100 !text-red-800'
  } else if (statusLower.includes('shipped')) {
    return '!bg-blue-100 !text-blue-800'
  }
  return '!bg-gray-100 !text-gray-800'
}

// View order details
const viewOrderDetails = (order: Order) => {
  // TODO: Implement order details view
  console.log('View order details:', order)
}

// Fetch orders on mount
onMounted(() => {
  fetchOrders()
})
</script>

<style>
@import '../profile/profile.css';
</style>

