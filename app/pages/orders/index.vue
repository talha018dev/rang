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
                @click="() => fetchOrders(currentPage)" 
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
            <div v-else>
              <div class="!overflow-x-auto">
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
                    <tr v-for="order in orders" :key="order.number" class="hover:!bg-gray-50">
                      <td class="!px-6 !py-4 !whitespace-nowrap !text-sm !font-medium !text-gray-900">
                        #{{ order.number }}
                      </td>
                      <td class="!px-6 !py-4 !whitespace-nowrap !text-sm !text-gray-500">
                        {{ formatDate(order.created_at) }}
                      </td>
                      <td class="!px-6 !py-4 !whitespace-nowrap">
                        <span 
                          class="!px-2 !inline-flex !text-xs !leading-5 !font-semibold !rounded-full"
                          :class="getStatusClass(order.status)">
                          {{ order.readable_status || order.status || 'Pending' }}
                        </span>
                      </td>
                      <td class="!px-6 !py-4 !whitespace-nowrap !text-sm !font-medium !text-gray-900">
                        {{ formatOrderPrice(order.total || 0, order.currency, order.address?.country) }}
                      </td>
                      <td class="!px-6 !py-4 !whitespace-nowrap !text-sm !text-gray-500">
                        {{ order.items?.length || 0 }} item(s)
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
              
              <!-- Pagination -->
              <div v-if="pagination && pagination.last_page > 1" class="!mt-6 !flex !flex-col !items-center !gap-4 !border-t !border-gray-200 !pt-4">
                <!-- Result Count -->
                <div class="!w-full !text-center">
                  <p class="!text-sm !text-gray-700">
                    Showing
                    <span class="!font-medium">{{ pagination.from }}</span>
                    to
                    <span class="!font-medium">{{ pagination.to }}</span>
                    of
                    <span class="!font-medium">{{ pagination.total }}</span>
                    results
                  </p>
                </div>
                
                <!-- Pagination Controls -->
                <nav class="!flex !items-center !justify-center !gap-1" aria-label="Pagination">
                  <!-- Previous Button -->
                  <button
                    @click="goToPage(pagination.current_page - 1)"
                    :disabled="pagination.current_page === 1"
                    class="!relative !inline-flex !items-center !rounded-md !border !border-gray-300 !bg-white !px-3 !py-2 !text-sm !font-medium !text-gray-700 hover:!bg-gray-50 focus:!z-20 focus:!outline-offset-0 disabled:!opacity-50 disabled:!cursor-not-allowed">
                    <span class="!sr-only">Previous</span>
                    <svg class="!h-5 !w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
                    </svg>
                  </button>
                  
                  <!-- Page Numbers -->
                  <div class="!flex !items-center !gap-1 !flex-wrap !justify-center">
                    <button
                      v-for="page in getPageNumbers()"
                      :key="page"
                      @click="goToPage(page)"
                      :class="[
                        page === pagination.current_page
                          ? '!relative !z-10 !inline-flex !items-center !justify-center !bg-orange-600 !px-4 !py-2 !text-sm !font-semibold !text-white !min-w-[40px] focus:!z-20 focus-visible:!outline focus-visible:!outline-2 focus-visible:!outline-offset-2 focus-visible:!outline-orange-600'
                          : '!relative !inline-flex !items-center !justify-center !px-4 !py-2 !text-sm !font-semibold !text-gray-900 !border !border-gray-300 !bg-white !min-w-[40px] hover:!bg-gray-50 focus:!z-20 focus:!outline-offset-0'
                      ]"
                      :aria-current="page === pagination.current_page ? 'page' : undefined">
                      {{ page }}
                    </button>
                  </div>
                  
                  <!-- Next Button -->
                  <button
                    @click="goToPage(pagination.current_page + 1)"
                    :disabled="pagination.current_page === pagination.last_page"
                    class="!relative !inline-flex !items-center !rounded-md !border !border-gray-300 !bg-white !px-3 !py-2 !text-sm !font-medium !text-gray-700 hover:!bg-gray-50 focus:!z-20 focus:!outline-offset-0 disabled:!opacity-50 disabled:!cursor-not-allowed">
                    <span class="!sr-only">Next</span>
                    <svg class="!h-5 !w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
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
import { computed, onMounted, ref, watch } from 'vue'
import AppFooter from '~~/components/AppFooter.vue'
import { useApi } from '~~/composables/useApi'
import { useCurrency } from '~~/composables/useCurrency'
import '../profile/profile.css'

// Type definitions
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
  currency: string
  due: number
  address: OrderAddress
  customer: OrderCustomer
  shipping_method: string
  pickup_location: any | null
  items: OrderItem[]
}

interface PaginationLink {
  url: string | null
  label: string
  active: boolean
}

interface Pagination {
  current_page: number
  from: number
  last_page: number
  links: PaginationLink[]
  path: string
  per_page: number
  to: number
  total: number
}

interface OrdersResponse {
  success: boolean
  message?: string
  data?: Order[]
  pagination?: Pagination
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
const { formatPrice, currency, exchangeRate } = useCurrency()

// Orders data
const orders = ref<Order[]>([])
const pagination = ref<Pagination | null>(null)

// UI state
const isLoading = ref(false)
const error = ref<string | null>(null)
const lastFetchedPage = ref<number>(0)

// Get current page from route query
const currentPage = computed(() => {
  const page = route.query.page
  return page ? parseInt(page as string, 10) : 1
})

// Get token from localStorage
const getToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('auth_token')
}

// Fetch orders
const fetchOrders = async (page: number = 1) => {
  const token = getToken()
  
  if (!token) {
    await router.push('/login')
    return
  }

  isLoading.value = true
  error.value = null

  try {
    const response = await $fetch<OrdersResponse>(`${backendUrl}/order?page=${page}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })

    if (response.success && response.data) {
      orders.value = response.data
      if (response.pagination) {
        pagination.value = response.pagination
      }
      lastFetchedPage.value = page
    } else {
      orders.value = []
      pagination.value = null
      error.value = response.message || 'Failed to load orders.'
    }
  } catch (err: any) {
    console.error('Error fetching orders:', err)
    error.value = err.data?.message || err.message || 'Failed to load orders.'
    orders.value = []
    pagination.value = null
    
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

// Format price based on country: Bangladesh shows BDT, all others show USD
const formatOrderPrice = (price: number, orderCurrency?: string, country?: string): string => {
  if (!price && price !== 0) return '-'
  
  const orderCurr = orderCurrency || 'BDT'
  const countryName = country || ''
  const isBangladesh = countryName.toLowerCase() === 'bangladesh'
  
  // Convert price based on country requirement
  let displayPrice = price
  
  // If country is Bangladesh, show in BDT
  if (isBangladesh) {
    // If order is in USD, convert to BDT
    if (orderCurr === 'USD') {
      displayPrice = price * exchangeRate.value
    }
    // Format as BDT (Taka)
    if (!isFinite(displayPrice) || isNaN(displayPrice)) {
      return 'Tk 0'
    }
    return `Tk ${displayPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  } else {
    // For all other countries, show in USD
    // If order is in BDT, convert to USD
    if (orderCurr === 'BDT') {
      displayPrice = price / exchangeRate.value
    }
    // Format as USD
    if (!isFinite(displayPrice) || isNaN(displayPrice)) {
      return '$0.00'
    }
    return `$${displayPrice.toFixed(2)}`
  }
}

// Get status class for styling
const getStatusClass = (status?: string): string => {
  if (!status) return '!bg-gray-100 !text-gray-800'
  
  const statusLower = status.toLowerCase()
  if (statusLower.includes('completed') || statusLower.includes('delivered') || statusLower.includes('paid')) {
    return '!bg-green-100 !text-green-800'
  } else if (statusLower.includes('pending') || statusLower.includes('processing')) {
    return '!bg-yellow-100 !text-yellow-800'
  } else if (statusLower.includes('cancelled') || statusLower.includes('failed') || statusLower.includes('payment_incomplete')) {
    return '!bg-red-100 !text-red-800'
  } else if (statusLower.includes('shipped')) {
    return '!bg-blue-100 !text-blue-800'
  }
  return '!bg-gray-100 !text-gray-800'
}

// View order details
const viewOrderDetails = (order: Order) => {
  router.push(`/orders/${order.number}`)
}

// Go to specific page
const goToPage = (page: number) => {
  if (page < 1 || (pagination.value && page > pagination.value.last_page)) {
    return
  }
  router.push({ query: { ...route.query, page } })
}

// Get page numbers for pagination display - show all pages from 1 to last page
const getPageNumbers = (): number[] => {
  if (!pagination.value) return []
  
  const last = pagination.value.last_page
  const pages: number[] = []
  
  // Show all page numbers from 1 to last page
  for (let i = 1; i <= last; i++) {
    pages.push(i)
  }
  
  return pages
}

// Watch for route query changes to update page
watch(() => route.query.page, (newPage) => {
  const page = newPage ? parseInt(newPage as string, 10) : 1
  if (page !== lastFetchedPage.value && !isLoading.value) {
    fetchOrders(page)
  }
}, { immediate: false })

// Fetch orders on mount
onMounted(() => {
  fetchOrders(currentPage.value)
})
</script>

<style>
@import '../profile/profile.css';
</style>

