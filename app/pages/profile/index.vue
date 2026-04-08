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

        <div v-else-if="activeSection === 'address'" class="account-card address-book-card">
          <div class="address-book-header">
            <h1 class="address-book-title">ADD NEW ADDRESS</h1>
            <p class="address-book-subtitle">Fill up your contact &amp; address details</p>
          </div>

          <form class="address-book-form" @submit.prevent="handleAddressSubmit">
            <h2 class="address-book-section-title">Contact Information</h2>
            <div class="address-book-grid address-book-grid-2">
              <div class="address-book-field">
                <label class="address-book-label" for="addr-first-name">First Name</label>
                <input
                  id="addr-first-name"
                  v-model="addressFormData.firstName"
                  type="text"
                  class="address-book-input"
                  placeholder=""
                  autocomplete="given-name"
                  :disabled="isLoadingAddress"
                >
              </div>
              <div class="address-book-field">
                <label class="address-book-label" for="addr-last-name">Last Name</label>
                <input
                  id="addr-last-name"
                  v-model="addressFormData.lastName"
                  type="text"
                  class="address-book-input"
                  placeholder=""
                  autocomplete="family-name"
                  :disabled="isLoadingAddress"
                >
              </div>
            </div>
            <div class="address-book-field address-book-field-mt">
              <label class="address-book-label" for="addr-mobile">
                Mobile Number <span class="address-book-required">*</span>
              </label>
              <input
                id="addr-mobile"
                v-model="addressFormData.address.phone"
                type="tel"
                class="address-book-input"
                placeholder=""
                autocomplete="tel"
                :disabled="isLoadingAddress"
              >
            </div>

            <h2 class="address-book-section-title address-book-section-spaced">Address</h2>
            <div class="address-book-type-row">
              <div class="address-book-field address-book-field-type">
                <label class="address-book-label" for="addr-type">Address Type</label>
                <select
                  id="addr-type"
                  v-model="addressFormData.title"
                  class="address-book-input address-book-select address-book-select-type"
                  :disabled="isLoadingAddress"
                >
                  <option value="" disabled>Address Type</option>
                  <option v-for="opt in addressTypeOptions" :key="opt" :value="opt">{{ opt }}</option>
                </select>
              </div>
              <p
                v-if="!String(addressFormData.title || '').trim()"
                class="address-book-type-hint"
                role="note"
              >
                <span class="address-book-type-hint-icon" aria-hidden="true">⚠️</span>
                Please select Address Type before filling the address below
              </p>
            </div>

            <div class="address-book-field">
              <label class="address-book-label" for="addr-line1">
                Address Line 1 <span class="address-book-required">*</span>
              </label>
              <input
                id="addr-line1"
                v-model="addressFormData.address.line_1"
                type="text"
                class="address-book-input"
                placeholder=""
                autocomplete="address-line1"
                :disabled="isLoadingAddress || addressFieldsLocked"
              >
            </div>
            <div class="address-book-field address-book-field-mt">
              <label class="address-book-label" for="addr-line2">Address Line 2</label>
              <input
                id="addr-line2"
                v-model="addressFormData.address.line_2"
                type="text"
                class="address-book-input"
                placeholder=""
                autocomplete="address-line2"
                :disabled="isLoadingAddress || addressFieldsLocked"
              >
            </div>

            <div class="address-book-field address-book-field-mt">
              <label class="address-book-label" for="addr-country">
                Country <span class="address-book-required">*</span>
              </label>
              <select
                id="addr-country"
                v-model="addressFormData.address.country"
                class="address-book-input address-book-select"
                :disabled="isLoadingAddress || addressFieldsLocked"
              >
                <option value="" disabled>Select country</option>
                <option v-for="c in addressBookCountries" :key="c" :value="c">{{ c }}</option>
              </select>
            </div>

            <!-- Bangladesh: same searchable city + zone pattern as checkout -->
            <template v-if="profileAddressIsBangladesh">
              <div class="address-book-field address-book-field-mt">
                <label class="address-book-label" for="profile-addr-city">
                  City <span class="address-book-required">*</span>
                </label>
                <div class="searchable-select-wrapper">
                  <input
                    id="profile-addr-city"
                    v-model="profileCitySearchTerm"
                    type="text"
                    class="address-book-input searchable-input"
                    :placeholder="isLoadingProfileCities ? 'Loading cities...' : (addressFormData.address.city || 'Search or select city...')"
                    :disabled="isLoadingProfileCities || isLoadingAddress || addressFieldsLocked"
                    autocomplete="off"
                    @focus="profileShowCityDropdown = true"
                    @input="profileShowCityDropdown = true"
                    @blur="handleProfileCityBlur"
                  >
                  <svg class="select-caret" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <div v-if="profileShowCityDropdown && filteredProfileCities.length > 0" class="searchable-dropdown">
                    <div
                      v-for="city in filteredProfileCities"
                      :key="city"
                      class="searchable-option"
                      @mousedown.prevent="selectProfileCity(city)"
                    >
                      {{ city }}
                    </div>
                  </div>
                  <div
                    v-if="profileShowCityDropdown && filteredProfileCities.length === 0 && profileCitySearchTerm"
                    class="searchable-dropdown"
                  >
                    <div class="searchable-option no-results">No cities found</div>
                  </div>
                </div>
              </div>

              <div class="address-book-field address-book-field-mt">
                <label class="address-book-label" for="profile-addr-zone">
                  Zone <span class="address-book-required">*</span>
                </label>
                <div class="searchable-select-wrapper">
                  <input
                    id="profile-addr-zone"
                    v-model="profileZoneSearchTerm"
                    type="text"
                    class="address-book-input searchable-input"
                    :placeholder="isLoadingProfileZones ? 'Loading zones...' : (profileAreaZones.length === 0 && profileCityId ? 'No zones available' : (getProfileZoneDisplayName() || 'Search or select zone...'))"
                    :disabled="isLoadingProfileZones || isLoadingAddress || addressFieldsLocked || !addressFormData.address.city || !profileCityId"
                    autocomplete="off"
                    :key="`profile-zone-${profileCityId || addressFormData.address.city || 'none'}`"
                    @focus="profileShowZoneDropdown = true"
                    @input="profileShowZoneDropdown = true"
                    @blur="handleProfileZoneBlur"
                  >
                  <svg class="select-caret" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <div v-if="profileShowZoneDropdown && filteredProfileZones.length > 0" class="searchable-dropdown">
                    <div
                      v-for="zone in filteredProfileZones"
                      :key="typeof zone === 'string' ? zone : (zone.zone_id || zone.id || zone)"
                      class="searchable-option"
                      @mousedown.prevent="selectProfileZone(zone)"
                    >
                      {{ typeof zone === 'string' ? zone : (zone.zone_name || zone.name || zone.zone || zone.title || '') }}
                    </div>
                  </div>
                  <div
                    v-if="profileShowZoneDropdown && filteredProfileZones.length === 0 && profileZoneSearchTerm"
                    class="searchable-dropdown"
                  >
                    <div class="searchable-option no-results">No zones found</div>
                  </div>
                </div>
              </div>
            </template>

            <!-- International: free-text city only -->
            <div v-else class="address-book-field address-book-field-mt">
              <label class="address-book-label" for="addr-city-intl">
                City/Area <span class="address-book-required">*</span>
              </label>
              <input
                id="addr-city-intl"
                v-model="addressFormData.address.city"
                type="text"
                class="address-book-input"
                placeholder="Enter City"
                autocomplete="address-level2"
                :disabled="isLoadingAddress || addressFieldsLocked"
              >
            </div>

            <div class="address-book-field address-book-field-mt">
              <label class="address-book-label" for="addr-postal">
                Postal Code <span class="address-book-required">*</span>
              </label>
              <input
                id="addr-postal"
                v-model="addressFormData.address.postal_code"
                type="text"
                class="address-book-input"
                placeholder="Enter Postal Code"
                autocomplete="postal-code"
                :disabled="isLoadingAddress || addressFieldsLocked"
              >
            </div>

            <div class="address-book-actions">
              <button type="submit" class="address-book-btn address-book-btn-primary" :disabled="isLoadingAddress">
                {{ isLoadingAddress ? 'SAVING...' : 'SAVE ADDRESS' }}
              </button>
              <button type="button" class="address-book-btn address-book-btn-secondary" :disabled="isLoadingAddress" @click="resetAddressForm">
                CANCEL
              </button>
            </div>

            <p v-if="addressSuccessMessage" class="address-book-feedback address-book-feedback-success">{{ addressSuccessMessage }}</p>
            <p v-if="addressErrorMessage" class="address-book-feedback address-book-feedback-error">{{ addressErrorMessage }}</p>
          </form>

          <div class="address-book-saved">
            <h2 class="address-book-saved-title">Saved Addresses</h2>
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
                    <td class="!px-3 !py-2 align-middle!">{{ address.title || '' }}</td>
                    <td class="!px-3 !py-2 align-middle!">{{ address.address?.name || '' }}</td>
                    <td class="!px-3 !py-2 align-middle!">{{ address.address?.phone || '' }}</td>
                    <td class="!px-3 !py-2 align-middle! saved-address-detail-cell">
                      {{ formatSavedAddressDetail(address.address) }}
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
import { computed, onMounted, ref, watch } from 'vue'
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

/** Matches address-type dropdown (shipping / billing / both). */
const addressTypeOptions = ['Is Shipping Address', 'Is Billing Address', 'Both Address'] as const

const addressBookCountries = [
  'Bangladesh',
  'Afghanistan', 'Algeria', 'Argentina', 'Australia', 'Austria', 'Bahrain', 'Belgium', 'Brazil', 'Brunei', 'Cambodia',
  'Canada', 'China', 'Denmark', 'Egypt', 'Finland', 'France', 'Germany', 'Ghana', 'Greece', 'Hong Kong',
  'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Japan', 'Jordan', 'Kenya',
  'Kuwait', 'Laos', 'Lebanon', 'Malaysia', 'Maldives', 'Mexico', 'Morocco', 'Myanmar', 'Nepal', 'Netherlands',
  'New Zealand', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania',
  'Russia', 'Saudi Arabia', 'Singapore', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'Sweden', 'Switzerland',
  'Taiwan', 'Thailand', 'Turkey', 'United Arab Emirates', 'United Kingdom', 'United States', 'Vietnam', 'Yemen'
]

const createEmptyAddressForm = () => ({
  title: '',
  firstName: '',
  lastName: '',
  defaultBilling: false,
  defaultShipping: false,
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

const addressFormData = ref(createEmptyAddressForm())

const addressFieldsLocked = computed(() => !String(addressFormData.value.title || '').trim())

const getToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('auth_token')
}

const profileAddressIsBangladesh = computed(() => addressFormData.value.address.country === 'Bangladesh')

const profileAreaAllCities = ref<any[]>([])
const profileAreaCities = ref<any[]>([])
const profileAreaZones = ref<any[]>([])
const isLoadingProfileCities = ref(false)
const isLoadingProfileZones = ref(false)
const profileCitySearchTerm = ref('')
const profileShowCityDropdown = ref(false)
const profileZoneSearchTerm = ref('')
const profileShowZoneDropdown = ref(false)
const profileCityId = ref<number | null>(null)
const profileZoneId = ref<number | null>(null)
const profileZoneSelect = ref<string | number | ''>('')

const getProfileAreaHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = { 'X-Requested-With': 'XMLHttpRequest' }
  const token = getToken()
  if (token) headers.Authorization = `Bearer ${token}`
  return headers
}

const initializeProfileAreaCities = () => {
  if (profileAreaAllCities.value.length > 0) {
    profileAreaCities.value = profileAreaAllCities.value
  }
}

const fetchProfileAreaCities = async () => {
  if (profileAreaAllCities.value.length > 0) return

  isLoadingProfileCities.value = true
  try {
    const response = await $fetch<any>(`${backendUrl}/area/cities`, {
      method: 'GET',
      headers: getProfileAreaHeaders()
    })
    if (response.success && response.data && Array.isArray(response.data)) {
      profileAreaAllCities.value = response.data
      initializeProfileAreaCities()
    } else {
      profileAreaAllCities.value = []
    }
  } catch {
    profileAreaAllCities.value = []
  } finally {
    isLoadingProfileCities.value = false
  }
}

const fetchProfileAreaZones = async (cityId: number | null) => {
  if (!cityId) {
    profileAreaZones.value = []
    profileZoneSelect.value = ''
    profileZoneId.value = null
    return
  }
  isLoadingProfileZones.value = true
  try {
    const response = await $fetch<any>(`${backendUrl}/area/zones?city=${cityId}`, {
      method: 'GET',
      headers: getProfileAreaHeaders()
    })
    if (response.success && response.data && Array.isArray(response.data)) {
      profileAreaZones.value = response.data
    } else {
      profileAreaZones.value = []
    }
  } catch {
    profileAreaZones.value = []
  } finally {
    isLoadingProfileZones.value = false
  }
}

const availableProfileCities = computed(() => {
  if (addressFormData.value.address.country !== 'Bangladesh') return []
  if (profileAreaCities.value.length > 0) {
    return profileAreaCities.value
      .map((city: any) => {
        if (typeof city === 'string') return city
        return city.city_name || city.name || city.city || city.title || ''
      })
      .filter((name: string) => name !== '' && name.trim() !== '')
  }
  if (profileAreaAllCities.value.length > 0 && profileAreaCities.value.length === 0) {
    initializeProfileAreaCities()
    return profileAreaCities.value
      .map((city: any) => {
        if (typeof city === 'string') return city
        return city.city_name || city.name || city.city || city.title || ''
      })
      .filter((name: string) => name !== '' && name.trim() !== '')
  }
  return []
})

const filteredProfileCities = computed(() => {
  if (!profileCitySearchTerm.value) return availableProfileCities.value
  const q = profileCitySearchTerm.value.toLowerCase()
  return availableProfileCities.value.filter((city: string) => city.toLowerCase().includes(q))
})

const filteredProfileZones = computed(() => {
  if (!profileZoneSearchTerm.value) return profileAreaZones.value
  const q = profileZoneSearchTerm.value.toLowerCase()
  return profileAreaZones.value.filter((zone: any) => {
    const zoneName = typeof zone === 'string'
      ? zone
      : (zone.zone_name || zone.name || zone.zone || zone.title || '')
    return zoneName.toLowerCase().includes(q)
  })
})

const getProfileZoneDisplayName = (): string => {
  if (!profileZoneSelect.value || profileAreaZones.value.length === 0) return ''
  const zoneObj = profileAreaZones.value.find((zone: any) => {
    const zid = typeof zone === 'string'
      ? zone
      : (zone.zone_id || zone.id || zone.zoneId || zone.ID)
    return zid === profileZoneSelect.value || zid?.toString() === String(profileZoneSelect.value)
  })
  if (zoneObj) {
    return typeof zoneObj === 'string'
      ? zoneObj
      : (zoneObj.zone_name || zoneObj.name || zoneObj.zone || zoneObj.title || '')
  }
  return ''
}

const selectProfileCity = (cityName: string) => {
  addressFormData.value.address.city = cityName
  profileCitySearchTerm.value = cityName
  profileShowCityDropdown.value = false
}

const selectProfileZone = (zone: any) => {
  const zoneId = typeof zone === 'string'
    ? zone
    : (zone.zone_id || zone.id || zone.zoneId || zone.ID)
  profileZoneSelect.value = zoneId
  const zoneName = typeof zone === 'string'
    ? zone
    : (zone.zone_name || zone.name || zone.zone || zone.title || '')
  profileZoneSearchTerm.value = zoneName
  addressFormData.value.address.state = zoneName
  profileShowZoneDropdown.value = false
  if (zone && typeof zone === 'object') {
    const id = zone.zone_id || zone.id || zone.zoneId || zone.ID
    profileZoneId.value = typeof id === 'number' ? id : (Number(id) || null)
  } else if (typeof zoneId === 'number' || !Number.isNaN(Number(zoneId))) {
    profileZoneId.value = typeof zoneId === 'number' ? zoneId : Number(zoneId)
  }
}

const handleProfileCityBlur = () => {
  if (typeof window === 'undefined') return
  window.setTimeout(() => {
    profileShowCityDropdown.value = false
  }, 200)
}

const handleProfileZoneBlur = () => {
  if (typeof window === 'undefined') return
  window.setTimeout(() => {
    profileShowZoneDropdown.value = false
  }, 200)
}

const resetProfileAreaUi = () => {
  profileCityId.value = null
  profileZoneId.value = null
  profileZoneSelect.value = ''
  profileAreaZones.value = []
  profileCitySearchTerm.value = ''
  profileZoneSearchTerm.value = ''
}

watch(
  () => addressFormData.value.address.country,
  (country) => {
    if (country !== 'Bangladesh') {
      resetProfileAreaUi()
      addressFormData.value.address.city = ''
      addressFormData.value.address.state = ''
    } else {
      profileCitySearchTerm.value = addressFormData.value.address.city || ''
      void fetchProfileAreaCities()
    }
  }
)

watch(
  () => addressFormData.value.address.city,
  (newCity, oldCity) => {
    if (addressFormData.value.address.country !== 'Bangladesh') return

    if (newCity !== oldCity) {
      profileZoneSelect.value = ''
      profileZoneId.value = null
      profileAreaZones.value = []
      profileZoneSearchTerm.value = ''
      addressFormData.value.address.state = ''
    }

    const selectedCity = String(newCity || '').trim()
    if (!selectedCity) {
      profileCitySearchTerm.value = ''
      profileCityId.value = null
      return
    }
    profileCitySearchTerm.value = selectedCity

    let cityObj = profileAreaCities.value.find((city: any) => {
      if (typeof city === 'string') {
        return city === selectedCity || city.toLowerCase() === selectedCity.toLowerCase()
      }
      const cityName = city.city_name || city.name || city.city || city.title || ''
      return cityName === selectedCity || cityName.trim().toLowerCase() === selectedCity.trim().toLowerCase()
    })

    if (!cityObj && profileAreaAllCities.value.length > 0) {
      cityObj = profileAreaAllCities.value.find((city: any) => {
        if (typeof city === 'string') {
          return city === selectedCity || city.toLowerCase() === selectedCity.toLowerCase()
        }
        const cityName = city.city_name || city.name || city.city || city.title || ''
        return cityName === selectedCity || cityName.trim().toLowerCase() === selectedCity.trim().toLowerCase()
      })
    }

    if (cityObj && typeof cityObj === 'object') {
      const cityId = cityObj.city_id || cityObj.id || cityObj.cityId || cityObj.ID || null
      profileCityId.value = cityId
      if (cityId) void fetchProfileAreaZones(cityId)
      else {
        profileZoneSelect.value = ''
        profileZoneId.value = null
        profileAreaZones.value = []
      }
    } else {
      profileCityId.value = null
      profileZoneSelect.value = ''
      profileZoneId.value = null
      profileAreaZones.value = []
    }
  }
)

watch(
  () => profileZoneSelect.value,
  (newZone) => {
    if (!newZone || profileAreaZones.value.length === 0) return
    const zoneObj = profileAreaZones.value.find((zone: any) => {
      const zid = typeof zone === 'string'
        ? zone
        : (zone.zone_id || zone.id || zone.zoneId || zone.ID)
      return zid === newZone || zid?.toString() === String(newZone)
    })
    if (zoneObj) {
      const zoneName = typeof zoneObj === 'string'
        ? zoneObj
        : (zoneObj.zone_name || zoneObj.name || zoneObj.zone || zoneObj.title || '')
      profileZoneSearchTerm.value = zoneName
    }
  }
)

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

const resetAddressForm = () => {
  addressFormData.value = createEmptyAddressForm()
  resetProfileAreaUi()
  addressErrorMessage.value = ''
  addressSuccessMessage.value = ''
}

const prefillAddressContactFromProfile = () => {
  const p = profile.value
  if (!p || typeof p !== 'object') return
  if (!addressFormData.value.firstName.trim() && !addressFormData.value.lastName.trim()) {
    const fn = p.first_name ?? p.firstName
    const ln = p.last_name ?? p.lastName
    if (fn || ln) {
      addressFormData.value.firstName = String(fn || '')
      addressFormData.value.lastName = String(ln || '')
    } else if (p.name) {
      const parts = String(p.name).trim().split(/\s+/).filter(Boolean)
      addressFormData.value.firstName = parts[0] || ''
      addressFormData.value.lastName = parts.slice(1).join(' ') || ''
    }
  }
  if (!addressFormData.value.address.phone.trim() && (p.phone || p.mobile)) {
    addressFormData.value.address.phone = String(p.phone ?? p.mobile ?? '')
  }
}

const handleAddressSubmit = async () => {
  addressErrorMessage.value = ''
  addressSuccessMessage.value = ''

  if (!String(addressFormData.value.title || '').trim()) {
    addressErrorMessage.value = 'Please select an address type.'
    return
  }
  if (!String(addressFormData.value.address.phone || '').trim()) {
    addressErrorMessage.value = 'Mobile number is required.'
    return
  }
  const fullName = [addressFormData.value.firstName, addressFormData.value.lastName]
    .map((s) => String(s || '').trim())
    .filter(Boolean)
    .join(' ')
  if (!fullName) {
    addressErrorMessage.value = 'Please enter your first or last name.'
    return
  }
  if (!String(addressFormData.value.address.line_1 || '').trim()) {
    addressErrorMessage.value = 'Address line 1 is required.'
    return
  }
  if (!String(addressFormData.value.address.country || '').trim()) {
    addressErrorMessage.value = 'Country is required.'
    return
  }
  if (profileAddressIsBangladesh.value) {
    if (!String(addressFormData.value.address.city || '').trim()) {
      addressErrorMessage.value = 'City is required.'
      return
    }
    if (!String(addressFormData.value.address.state || '').trim()) {
      addressErrorMessage.value = 'Zone is required.'
      return
    }
  } else if (!String(addressFormData.value.address.city || '').trim()) {
    addressErrorMessage.value = 'City or area is required.'
    return
  }
  if (!String(addressFormData.value.address.postal_code || '').trim()) {
    addressErrorMessage.value = 'Postal code is required.'
    return
  }

  addressFormData.value.address.name = fullName
  const profileEmail = String(profile.value?.email ?? '').trim()
  if (!String(addressFormData.value.address.email || '').trim() && profileEmail) {
    addressFormData.value.address.email = profileEmail
  }

  const typeTitle = String(addressFormData.value.title || '').trim()
  addressFormData.value.defaultShipping =
    typeTitle === 'Is Shipping Address' || typeTitle === 'Both Address'
  addressFormData.value.defaultBilling =
    typeTitle === 'Is Billing Address' || typeTitle === 'Both Address'

  await handleUpdateAddress()
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
        is_default_billing: addressFormData.value.defaultBilling,
        is_default_shipping: addressFormData.value.defaultShipping,
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
      addressSuccessMessage.value = 'Address saved successfully!'
      await fetchAddresses()
      addressFormData.value = createEmptyAddressForm()
      resetProfileAreaUi()
      prefillAddressContactFromProfile()
    } else {
      addressErrorMessage.value = response.message || 'Failed to save address.'
    }
  } catch (error: any) {
    addressErrorMessage.value = error?.data?.message || error?.message || 'Failed to save address.'
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

const formatSavedAddressDetail = (a?: AddressData | null): string => {
  if (!a) return '—'
  const lines: string[] = []
  const street = [a.line_1, a.line_2]
    .map((s) => String(s ?? '').trim())
    .filter(Boolean)
    .join(', ')
  if (street) lines.push(street)
  const cityPart = String(a.city ?? '').trim()
  const statePart = String(a.state ?? '').trim()
  const locality = [cityPart, statePart].filter(Boolean).join(', ')
  if (locality) lines.push(locality)
  const country = String(a.country ?? '').trim()
  const postal = String(a.postal_code ?? '').trim()
  const tail: string[] = []
  if (country) tail.push(country)
  if (postal) tail.push(`Postal code: ${postal}`)
  if (tail.length) lines.push(tail.join(' · '))
  return lines.length ? lines.join('\n') : '—'
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
  prefillAddressContactFromProfile()
  if (addressFormData.value.address.country === 'Bangladesh') {
    void fetchProfileAreaCities()
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

