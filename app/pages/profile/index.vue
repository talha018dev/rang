<template>
  <main class="profile-sidenav-page pb-30! sm:pb-0!">
    <div class="profile-sidenav-layout">
      <aside class="profile-sidenav">
        <div class="sidebar-section">
          <h2 class="sidebar-title">MY ACCOUNT</h2>
          <ul class="sidebar-links">
            <li>
              <button type="button" class="sidebar-link" :class="{ active: activeSection === 'account' }" @click="activeSection = 'account'">
                Account Information
              </button>
            </li>
            <li>
              <button type="button" class="sidebar-link" :class="{ active: activeSection === 'address' }" @click="activateAddressSection">
                Address Book
              </button>
            </li>
            <li>
              <button type="button" class="sidebar-link" :class="{ active: activeSection === 'orders' }" @click="activateOrdersSection">
                Order History
              </button>
            </li>
            <li>
              <span class="sidebar-link">Rewards</span>
            </li>
            <li>
              <span class="sidebar-link">Recommendations</span>
            </li>
            <li>
              <button type="button" class="sidebar-link" :class="{ active: activeSection === 'wishlist' }" @click="activateWishlistSection">
                Wishlist
              </button>
            </li>
            <li>
              <span class="sidebar-link">Credit Note</span>
            </li>
            <li>
              <span class="sidebar-link">Returns</span>
            </li>
            <li>
              <span class="sidebar-link">Remove Account</span>
            </li>
          </ul>
        </div>

        <div class="sidebar-help">
          <h2 class="sidebar-title">NEED HELP?</h2>
          <ul class="sidebar-links">
            <li>
              <NuxtLink to="/contact-us" class="sidebar-link">
                Contact Us
              </NuxtLink>
            </li>
          </ul>

          <button type="button" class="sidebar-logout" @click="handleLogout">
            Logout
          </button>
        </div>
      </aside>

      <section class="profile-main">
        <div v-if="activeSection === 'account'" class="account-card">
          <div class="account-card-header">
            <div>
              <h1 class="account-title">ACCOUNT INFORMATION</h1>
              <!-- <p class="account-subtitle">This section contains your address information</p> -->
            </div>
            <button type="button" class="account-edit-btn">
              EDIT
            </button>
          </div>

          <div class="personal-info-title">Personal Information</div>

          <div class="personal-info-grid">
            <div class="field">
              <div class="field-label">First Name</div>
              <div class="field-value">{{ firstName ?? '-' }}</div>
            </div>
            <div class="field">
              <div class="field-label">Last Name</div>
              <div class="field-value">{{ lastName ?? '-' }}</div>
            </div>
            <div class="field">
              <div class="field-label">Email Address</div>
              <div class="field-value">{{ email ?? '-' }}</div>
            </div>
            <div class="field">
              <div class="field-label">Mobile Number</div>
              <div class="field-value">{{ phone ?? '-' }}</div>
            </div>
            <div class="field">
              <div class="field-label">Gender</div>
              <div class="field-value">{{ gender ?? '-' }}</div>
            </div>
            <div class="field">
              <div class="field-label">Date of Birth</div>
              <div class="field-value">{{ dob ?? '-' }}</div>
            </div>
          </div>

          <!-- <label class="change-password">
            <input type="checkbox" checked="false" disabled />
            <span>Change Password</span>
          </label> -->
        </div>

        <div v-else-if="activeSection === 'address'" class="account-card">
          <div class="account-card-header">
            <div>
              <h1 class="account-title">ADDRESS INFORMATION</h1>
              <p class="account-subtitle">Manage your delivery address</p>
            </div>
          </div>

          <form @submit.prevent="handleUpdateAddress" class="!space-y-3">
            <input v-model="addressFormData.title" class="!w-full !border !border-gray-300 !px-3 !py-2" placeholder="Address Title" :disabled="isLoadingAddress" />
            <input v-model="addressFormData.address.name" class="!w-full !border !border-gray-300 !px-3 !py-2" placeholder="Name" :disabled="isLoadingAddress" />
            <input v-model="addressFormData.address.phone" class="!w-full !border !border-gray-300 !px-3 !py-2" placeholder="Phone" :disabled="isLoadingAddress" />
            <input v-model="addressFormData.address.email" class="!w-full !border !border-gray-300 !px-3 !py-2" placeholder="Email" :disabled="isLoadingAddress" />
            <input v-model="addressFormData.address.line_1" class="!w-full !border !border-gray-300 !px-3 !py-2" placeholder="Address Line 1" :disabled="isLoadingAddress" />
            <input v-model="addressFormData.address.line_2" class="!w-full !border !border-gray-300 !px-3 !py-2" placeholder="Address Line 2" :disabled="isLoadingAddress" />
            <div class="!grid !grid-cols-1 sm:!grid-cols-2 !gap-3">
              <input v-model="addressFormData.address.city" class="!w-full !border !border-gray-300 !px-3 !py-2" placeholder="City" :disabled="isLoadingAddress" />
              <input v-model="addressFormData.address.state" class="!w-full !border !border-gray-300 !px-3 !py-2" placeholder="State" :disabled="isLoadingAddress" />
              <input v-model="addressFormData.address.country" class="!w-full !border !border-gray-300 !px-3 !py-2" placeholder="Country" :disabled="isLoadingAddress" />
              <input v-model="addressFormData.address.postal_code" class="!w-full !border !border-gray-300 !px-3 !py-2" placeholder="Postal Code" :disabled="isLoadingAddress" />
            </div>
            <button type="submit" class="account-edit-btn" :disabled="isLoadingAddress">
              {{ isLoadingAddress ? 'UPDATING...' : 'UPDATE ADDRESS' }}
            </button>
            <p v-if="addressSuccessMessage" class="!text-green-700 !text-sm">{{ addressSuccessMessage }}</p>
            <p v-if="addressErrorMessage" class="!text-red-700 !text-sm">{{ addressErrorMessage }}</p>
          </form>

          <div class="!mt-6">
            <h2 class="personal-info-title">Saved Addresses</h2>
            <div v-if="isLoadingAddresses" class="account-subtitle">Loading addresses...</div>
            <div v-else-if="addressesList.length === 0" class="account-subtitle">No saved addresses found.</div>
            <div v-else class="!overflow-x-auto !border !border-gray-200">
              <table class="!min-w-full !text-sm">
                <thead class="!bg-gray-50">
                  <tr>
                    <th class="!px-3 !py-2 !text-left">Title</th>
                    <th class="!px-3 !py-2 !text-left">Name</th>
                    <th class="!px-3 !py-2 !text-left">Phone</th>
                    <th class="!px-3 !py-2 !text-left">Address</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(address, index) in addressesList" :key="index" class="!border-t !border-gray-100">
                    <td class="!px-3 !py-2">{{ address.title || '' }}</td>
                    <td class="!px-3 !py-2">{{ address.address?.name || '' }}</td>
                    <td class="!px-3 !py-2">{{ address.address?.phone || '' }}</td>
                    <td class="!px-3 !py-2">
                      {{ address.address?.line_1 || '' }}<span v-if="address.address?.line_2">, {{ address.address?.line_2 }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div v-else-if="activeSection === 'orders'" class="account-card">
          <div class="account-card-header">
            <div>
              <h1 class="account-title">ORDER HISTORY</h1>
              <p class="account-subtitle">View your order history</p>
            </div>
          </div>
          <div v-if="isLoadingOrders" class="account-subtitle">Loading orders...</div>
          <div v-else-if="ordersError" class="!text-red-700 !text-sm">{{ ordersError }}</div>
          <div v-else-if="orders.length === 0" class="account-subtitle">No orders found.</div>
          <div v-else>
            <div class="!overflow-x-auto !border !border-gray-200">
              <table class="!min-w-full !text-sm">
                <thead class="!bg-gray-50">
                  <tr>
                    <th class="!px-3 !py-2 !text-left">Order ID</th>
                    <th class="!px-3 !py-2 !text-left">Date</th>
                    <th class="!px-3 !py-2 !text-left">Status</th>
                    <th class="!px-3 !py-2 !text-left">Total</th>
                    <th class="!px-3 !py-2 !text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="order in orders" :key="order.number" class="!border-t !border-gray-100">
                    <td class="!px-3 !py-2">#{{ order.number }}</td>
                    <td class="!px-3 !py-2">{{ formatDate(order.created_at) }}</td>
                    <td class="!px-3 !py-2">{{ order.readable_status || order.status || 'Pending' }}</td>
                    <td class="!px-3 !py-2">{{ formatOrderPrice(order.total || 0, order.currency, order.address?.country) }}</td>
                    <td class="!px-3 !py-2">
                      <button class="!text-orange-700" @click="viewOrderDetails(order)">View Details</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-if="ordersPagination && ordersPagination.last_page > 1" class="!mt-4 !flex !gap-2 !items-center !flex-wrap">
              <button class="!px-3 !py-1 !border !border-gray-300" :disabled="ordersPage <= 1" @click="goToOrdersPage(ordersPage - 1)">Prev</button>
              <button
                v-for="page in getOrderPageNumbers()"
                :key="page"
                class="!px-3 !py-1 !border"
                :class="page === ordersPage ? '!bg-black !text-white !border-black' : '!border-gray-300'"
                @click="goToOrdersPage(page)"
              >
                {{ page }}
              </button>
              <button class="!px-3 !py-1 !border !border-gray-300" :disabled="ordersPagination && ordersPage >= ordersPagination.last_page" @click="goToOrdersPage(ordersPage + 1)">Next</button>
            </div>
          </div>
        </div>

        <div v-else-if="activeSection === 'wishlist'" class="account-card">
          <div class="account-card-header">
            <div>
              <h1 class="account-title">WISHLIST</h1>
              <p class="account-subtitle">Your saved favorite items</p>
            </div>
          </div>
          <div v-if="isLoadingWishlist" class="account-subtitle">Loading wishlist...</div>
          <div v-else-if="wishlistError" class="!text-red-700 !text-sm">{{ wishlistError }}</div>
          <div v-else-if="wishlistItems.length === 0" class="account-subtitle">Your wishlist is empty.</div>
          <div v-else class="!grid !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-3 !gap-4">
            <NuxtLink
              v-for="item in wishlistItems"
              :key="item.id"
              :to="`/products/${item.category_slug || 'all'}/${item.slug}`"
              class="!border !border-gray-200 !p-3 !block"
            >
              <NuxtImg :src="getImageUrl(item.image || '')" :alt="item.name || 'Wishlist Product'" class="!w-full !h-48 !object-cover" />
              <div class="!mt-2 !text-sm !font-medium !text-gray-900">{{ item.name }}</div>
              <div class="!text-sm !text-gray-700">{{ formatPrice(item.price || 0, item.price_usd) }}</div>
            </NuxtLink>
          </div>
        </div>
      </section>
    </div>

    <AppFooter />
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useHead, useRoute, useRouter } from 'nuxt/app'
import AppFooter from '~~/components/AppFooter.vue'
import { useApi } from '~~/composables/useApi'
import { useCurrency } from '~~/composables/useCurrency'
import { setMetaPixelAdvancedMatching } from '~~/composables/useMetaPixelAdvancedMatching'

import './profile-sidenav.css'

interface ProfileMeResponse {
  success: boolean
  message?: string
  data?: Record<string, any>
}

interface AddressData {
  name: string
  phone: string
  email: string
  line_1: string
  line_2: string
  city: string
  state: string
  country: string
  postal_code: string
}

interface SavedAddress {
  id?: number
  title?: string
  address?: AddressData
}

interface AddressResponse {
  success: boolean
  message?: string
  data?: unknown
}

interface OrdersPagination {
  current_page: number
  last_page: number
  total: number
  from: number
  to: number
}

interface Order {
  number: string
  total: number
  status: string
  readable_status?: string
  created_at: string
  currency?: string
  address?: { country?: string }
}

interface OrdersResponse {
  success: boolean
  message?: string
  data?: Order[]
  pagination?: OrdersPagination
}

interface WishlistItem {
  id: number
  name: string
  slug: string
  image: string
  price: number
  price_usd?: number
  category_slug?: string
}

interface WishlistResponse {
  success: boolean
  message?: string
  data?: WishlistItem[]
}

const route = useRoute()
const router = useRouter()
const { backendUrl } = useApi()
const { formatPrice, exchangeRate } = useCurrency()

const profile = ref<Record<string, any>>({})
const isLoading = ref(true)
const activeSection = ref<'account' | 'address' | 'orders' | 'wishlist'>('account')

const addressFormData = ref({
  title: '',
  address: {
    name: '',
    phone: '',
    email: '',
    line_1: '',
    line_2: '',
    city: '',
    state: '',
    country: '',
    postal_code: ''
  }
})
const addressesList = ref<SavedAddress[]>([])
const isLoadingAddress = ref(false)
const isLoadingAddresses = ref(false)
const addressErrorMessage = ref('')
const addressSuccessMessage = ref('')

const orders = ref<Order[]>([])
const ordersPagination = ref<OrdersPagination | null>(null)
const ordersPage = ref(1)
const isLoadingOrders = ref(false)
const ordersError = ref<string | null>(null)

const wishlistItems = ref<WishlistItem[]>([])
const isLoadingWishlist = ref(false)
const wishlistError = ref<string | null>(null)

const getToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('auth_token')
}

const fetchProfile = async () => {
  const token = getToken()
  if (!token) {
    await router.push('/login')
    return
  }

  isLoading.value = true
  try {
    const response = await $fetch<ProfileMeResponse>(`${backendUrl}/profile/me`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` }
    })

    if (response?.success && response.data) {
      profile.value = response.data

      setMetaPixelAdvancedMatching({
        email: response.data.email ?? null,
        phone: response.data.phone ?? null,
        name: response.data.name ?? null
      })
    }
  } catch (error: any) {
    // If unauthorized, redirect to login
    if (error?.status === 401 || error?.statusCode === 401) {
      await router.push('/login')
    }
  } finally {
    isLoading.value = false
  }
}

const fetchAddresses = async () => {
  const token = getToken()
  if (!token) return

  isLoadingAddresses.value = true
  try {
    const response = await $fetch<{ success: boolean; data?: SavedAddress[] }>(`${backendUrl}/profile/address`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` }
    })
    addressesList.value = response.success && response.data ? response.data : []
  } catch {
    addressesList.value = []
  } finally {
    isLoadingAddresses.value = false
  }
}

const handleUpdateAddress = async () => {
  const token = getToken()
  if (!token) return

  isLoadingAddress.value = true
  addressErrorMessage.value = ''
  addressSuccessMessage.value = ''

  try {
    const response = await $fetch<AddressResponse>(`${backendUrl}/profile/address`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: {
        title: addressFormData.value.title.trim(),
        address: {
          name: addressFormData.value.address.name.trim(),
          phone: addressFormData.value.address.phone.trim(),
          email: addressFormData.value.address.email.trim(),
          line_1: addressFormData.value.address.line_1.trim(),
          line_2: addressFormData.value.address.line_2.trim(),
          city: addressFormData.value.address.city.trim(),
          state: addressFormData.value.address.state.trim(),
          country: addressFormData.value.address.country.trim(),
          postal_code: addressFormData.value.address.postal_code.trim()
        }
      }
    })
    if (response.success) {
      addressSuccessMessage.value = 'Address updated successfully!'
      await fetchAddresses()
    } else {
      addressErrorMessage.value = response.message || 'Failed to update address.'
    }
  } catch (error: any) {
    addressErrorMessage.value = error?.data?.message || error?.message || 'Failed to update address.'
  } finally {
    isLoadingAddress.value = false
  }
}

const fetchOrders = async (page = 1) => {
  const token = getToken()
  if (!token) return

  isLoadingOrders.value = true
  ordersError.value = null
  try {
    const response = await $fetch<OrdersResponse>(`${backendUrl}/order?page=${page}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
    if (response.success && response.data) {
      orders.value = response.data
      ordersPagination.value = response.pagination || null
      ordersPage.value = page
    } else {
      orders.value = []
      ordersPagination.value = null
      ordersError.value = response.message || 'Failed to load orders.'
    }
  } catch (error: any) {
    orders.value = []
    ordersPagination.value = null
    ordersError.value = error?.data?.message || error?.message || 'Failed to load orders.'
  } finally {
    isLoadingOrders.value = false
  }
}

const fetchWishlist = async () => {
  const token = getToken()
  if (!token) return

  isLoadingWishlist.value = true
  wishlistError.value = null
  try {
    const response = await $fetch<WishlistResponse>(`${backendUrl}/profile/wishlist`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` }
    })
    if (response.success && response.data) {
      wishlistItems.value = response.data
    } else {
      wishlistItems.value = []
      wishlistError.value = response.message || 'Failed to load wishlist.'
    }
  } catch (error: any) {
    wishlistItems.value = []
    wishlistError.value = error?.data?.message || error?.message || 'Failed to load wishlist.'
  } finally {
    isLoadingWishlist.value = false
  }
}

const fullName = computed(() => String(profile.value?.name || '').trim())

const firstName = computed(() => {
  const fromApi = profile.value?.first_name ?? profile.value?.firstName
  if (fromApi) return String(fromApi)
  const parts = fullName.value.split(/\s+/).filter(Boolean)
  return parts.length ? parts[0] : ''
})

const lastName = computed(() => {
  const fromApi = profile.value?.last_name ?? profile.value?.lastName
  if (fromApi) return String(fromApi)
  const parts = fullName.value.split(/\s+/).filter(Boolean)
  return parts.length > 1 ? parts.slice(1).join(' ') : ''
})

const email = computed(() => String(profile.value?.email ?? ''))
const phone = computed(() => String(profile.value?.phone ?? profile.value?.mobile ?? ''))
const gender = computed(() => String(profile.value?.gender ?? ''))
const dob = computed(() => {
  // Keep empty when missing.
  return String(
    profile.value?.date_of_birth ?? profile.value?.dob ?? profile.value?.birth_date ?? ''
  )
})

const formatDate = (dateString?: string): string => {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  } catch {
    return dateString
  }
}

const formatOrderPrice = (price: number, orderCurrency?: string, country?: string): string => {
  const orderCurr = orderCurrency || 'BDT'
  const isBangladesh = String(country || '').toLowerCase() === 'bangladesh'
  let displayPrice = price || 0

  if (isBangladesh) {
    if (orderCurr === 'USD') displayPrice = displayPrice * exchangeRate.value
    return `Tk ${displayPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }
  if (orderCurr === 'BDT') displayPrice = displayPrice / exchangeRate.value
  return `$${displayPrice.toFixed(2)}`
}

const getOrderPageNumbers = (): number[] => {
  if (!ordersPagination.value) return []
  const pages: number[] = []
  for (let i = 1; i <= ordersPagination.value.last_page; i++) pages.push(i)
  return pages
}

const goToOrdersPage = (page: number) => {
  if (!ordersPagination.value) return
  if (page < 1 || page > ordersPagination.value.last_page) return
  fetchOrders(page)
}

const viewOrderDetails = (order: Order) => {
  router.push(`/orders/${order.number}`)
}

const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return ''
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath
  return `https://rangbd.thecell.tech${imagePath.startsWith('/') ? imagePath : '/' + imagePath}`
}

const activateAddressSection = async () => {
  activeSection.value = 'address'
  if (addressesList.value.length === 0 && !isLoadingAddresses.value) {
    await fetchAddresses()
  }
}

const activateOrdersSection = async () => {
  activeSection.value = 'orders'
  if (orders.value.length === 0 && !isLoadingOrders.value) {
    await fetchOrders(1)
  }
}

const activateWishlistSection = async () => {
  activeSection.value = 'wishlist'
  if (wishlistItems.value.length === 0 && !isLoadingWishlist.value) {
    await fetchWishlist()
  }
}

const handleLogout = async () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token')
  }
  await router.push('/login')
}

useHead({
  title: 'Profile - Rang Bangladesh',
  meta: [{ name: 'description', content: 'Account information - Rang Bangladesh' }]
})

onMounted(async () => {
  await fetchProfile()
  if (route.query.tab === 'wishlist') {
    await activateWishlistSection()
  }
})
</script>

