<template>
  <main class="profile-page pb-30! sm:pb-0!">
    <div class="profile-container">
      <div class="profile-content">
        <!-- Navigation Cards -->
        <div class="flex flex-wrap gap-4 w-full justify-center mb-6 max-w-[600px]">
          <NuxtLink 
            to="/myprofile"
            class="flex flex-col items-center justify-center gap-2 p-6 bg-white rounded-lg border-2 transition-all duration-200 hover:shadow-md min-w-[120px] flex-1 max-w-[200px] h-[100px]"
            :class="$route.path === '/myprofile' ? 'border-orange-600 bg-orange-50' : 'border-gray-200 hover:border-orange-300'">
            <div class="w-8 h-8 text-orange-600">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div class="text-sm font-semibold text-gray-700">Profile</div>
          </NuxtLink>
          
          <NuxtLink 
            to="/address"
            class="flex flex-col items-center justify-center gap-2 p-6 bg-white rounded-lg border-2 transition-all duration-200 hover:shadow-md min-w-[120px] flex-1 max-w-[200px] h-[100px]"
            :class="$route.path === '/address' ? 'border-orange-600 bg-orange-50' : 'border-gray-200 hover:border-orange-300'">
            <div class="w-8 h-8 text-orange-600">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div class="text-sm font-semibold text-gray-700">Address</div>
          </NuxtLink>
          
          <NuxtLink 
            to="/orders"
            class="flex flex-col items-center justify-center gap-2 p-6 bg-white rounded-lg border-2 transition-all duration-200 hover:shadow-md min-w-[120px] flex-1 max-w-[200px] h-[100px]"
            :class="$route.path === '/orders' ? 'border-orange-600 bg-orange-50' : 'border-gray-200 hover:border-orange-300'">
            <div class="w-8 h-8 text-orange-600">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div class="text-sm font-semibold text-gray-700">Orders</div>
          </NuxtLink>
        </div>

        <!-- Address Section -->
        <div class="profile-card address-card">
          <h2 class="section-title">Address Information</h2>
          <p class="section-subtitle">Manage your delivery address</p>
          
          <form @submit.prevent="handleUpdateAddress" class="profile-form">
            <div class="form-group">
              <label for="address-title" class="form-label">Address Title <span class="required">*</span></label>
              <input
                id="address-title"
                v-model="addressFormData.title"
                type="text"
                class="form-input"
                placeholder="e.g., Home, Office, Amar Bashs"
                required
                :disabled="isLoadingAddress"
              />
            </div>

            <div class="form-group">
              <label for="address-name" class="form-label">Name <span class="required">*</span></label>
              <input
                id="address-name"
                v-model="addressFormData.address.name"
                type="text"
                class="form-input"
                placeholder="Enter name"
                required
                :disabled="isLoadingAddress"
              />
            </div>

            <div class="form-group">
              <label for="address-phone" class="form-label">Phone <span class="required">*</span></label>
              <input
                id="address-phone"
                v-model="addressFormData.address.phone"
                type="tel"
                class="form-input"
                placeholder="Enter phone number"
                required
                :disabled="isLoadingAddress"
              />
            </div>

            <div class="form-group">
              <label for="address-email" class="form-label">Email</label>
              <input
                id="address-email"
                v-model="addressFormData.address.email"
                type="email"
                class="form-input"
                placeholder="Enter email"
                :disabled="isLoadingAddress"
              />
            </div>

            <div class="form-group">
              <label for="address-line-1" class="form-label">Address Line 1 <span class="required">*</span></label>
              <input
                id="address-line-1"
                v-model="addressFormData.address.line_1"
                type="text"
                class="form-input"
                placeholder="Enter address line 1"
                required
                :disabled="isLoadingAddress"
              />
            </div>

            <div class="form-group">
              <label for="address-line-2" class="form-label">Address Line 2</label>
              <input
                id="address-line-2"
                v-model="addressFormData.address.line_2"
                type="text"
                class="form-input"
                placeholder="Enter address line 2 (optional)"
                :disabled="isLoadingAddress"
              />
            </div>

            <div class="form-row">
              <div class="form-group form-group-half">
                <label for="address-city" class="form-label">City <span class="required">*</span></label>
                <input
                  id="address-city"
                  v-model="addressFormData.address.city"
                  type="text"
                  class="form-input"
                  placeholder="Enter city"
                  required
                  :disabled="isLoadingAddress"
                />
              </div>

              <div class="form-group form-group-half">
                <label for="address-state" class="form-label">State <span class="required">*</span></label>
                <input
                  id="address-state"
                  v-model="addressFormData.address.state"
                  type="text"
                  class="form-input"
                  placeholder="Enter state"
                  required
                  :disabled="isLoadingAddress"
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group form-group-half">
                <label for="address-country" class="form-label">Country <span class="required">*</span></label>
                <input
                  id="address-country"
                  v-model="addressFormData.address.country"
                  type="text"
                  class="form-input"
                  placeholder="Enter country"
                  required
                  :disabled="isLoadingAddress"
                />
              </div>

              <div class="form-group form-group-half">
                <label for="address-postal-code" class="form-label">Postal Code <span class="required">*</span></label>
                <input
                  id="address-postal-code"
                  v-model="addressFormData.address.postal_code"
                  type="text"
                  class="form-input"
                  placeholder="Enter postal code"
                  required
                  :disabled="isLoadingAddress"
                />
              </div>
            </div>
            
            <button type="submit" class="submit-button" :disabled="isLoadingAddress">
              <span v-if="!isLoadingAddress">Update Address</span>
              <span v-else>Updating...</span>
            </button>

            <div v-if="addressSuccessMessage" class="success-message">
              {{ addressSuccessMessage }}
            </div>

            <div v-if="addressErrorMessage" class="error-message">
              {{ addressErrorMessage }}
            </div>
          </form>
        </div>

        <!-- Saved Addresses Card -->
        <div class="profile-card addresses-card p-4!">
          <h2 class="section-title">Saved Addresses</h2>
          <p class="section-subtitle">View your saved delivery addresses</p>
          
          <div v-if="isLoadingAddresses" class="loading-state">
            <p>Loading addresses...</p>
          </div>

          <div v-else-if="addressesList.length === 0" class="empty-state">
            <p>No saved addresses found.</p>
          </div>

          <div v-else class="addresses-table-container">
            <table class="addresses-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Country</th>
                  <th>Postal Code</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(address, index) in addressesList" :key="index">
                  <td>{{ address.title || '-' }}</td>
                  <td>{{ address.address?.name || '-' }}</td>
                  <td>{{ address.address?.phone || '-' }}</td>
                  <td>{{ address.address?.email || '-' }}</td>
                  <td>
                    {{ address.address?.line_1 || '' }}
                    <span v-if="address.address?.line_2">, {{ address.address.line_2 }}</span>
                  </td>
                  <td>{{ address.address?.city || '-' }}</td>
                  <td>{{ address.address?.state || '-' }}</td>
                  <td>{{ address.address?.country || '-' }}</td>
                  <td>{{ address.address?.postal_code || '-' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <AppFooter />
  </main>
</template>

<script setup lang="ts">
import { useHead, useRoute, useRouter } from 'nuxt/app'
import { onMounted, ref } from 'vue'
import AppFooter from '~~/components/AppFooter.vue'
import { useApi } from '~~/composables/useApi'
import '../profile/profile.css'

// Type definitions
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

interface AddressFormData {
  title: string
  address: AddressData
}

interface AddressResponse {
  success: boolean
  message?: string
  data?: any
}

interface SavedAddress {
  id?: number
  title?: string
  address?: AddressData
}

interface AddressesListResponse {
  success: boolean
  message?: string
  data?: SavedAddress[]
}

// Meta
useHead({
  title: 'Address - Rang Bangladesh',
  meta: [
    { name: 'description', content: 'Manage your delivery addresses on Rang Bangladesh.' }
  ]
})

const route = useRoute()
const router = useRouter()
const { backendUrl } = useApi()

// Address form data
const addressFormData = ref<AddressFormData>({
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

// Saved addresses list
const addressesList = ref<SavedAddress[]>([])

// UI state
const isLoadingAddress = ref(false)
const isLoadingAddresses = ref(false)
const addressErrorMessage = ref('')
const addressSuccessMessage = ref('')

// Get token from localStorage
const getToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('auth_token')
}

// Fetch saved addresses
const fetchAddresses = async () => {
  const token = getToken()
  
  if (!token) {
    return
  }

  isLoadingAddresses.value = true

  try {
    const response = await $fetch<AddressesListResponse>(`${backendUrl}/profile/address`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.success && response.data) {
      addressesList.value = response.data
    } else {
      addressesList.value = []
    }
  } catch (error: any) {
    console.error('Error fetching addresses:', error)
    addressesList.value = []
    
    // If unauthorized, don't redirect here as user might still be viewing profile
    if (error.status === 401 || error.statusCode === 401) {
      // Silent fail for addresses fetch
    }
  } finally {
    isLoadingAddresses.value = false
  }
}

// Update address
const handleUpdateAddress = async () => {
  // Validate required fields
  if (!addressFormData.value.title.trim()) {
    addressErrorMessage.value = 'Address title is required'
    return
  }

  if (!addressFormData.value.address.name.trim()) {
    addressErrorMessage.value = 'Name is required'
    return
  }

  if (!addressFormData.value.address.phone.trim()) {
    addressErrorMessage.value = 'Phone is required'
    return
  }

  if (!addressFormData.value.address.line_1.trim()) {
    addressErrorMessage.value = 'Address line 1 is required'
    return
  }

  if (!addressFormData.value.address.city.trim()) {
    addressErrorMessage.value = 'City is required'
    return
  }

  if (!addressFormData.value.address.state.trim()) {
    addressErrorMessage.value = 'State is required'
    return
  }

  if (!addressFormData.value.address.country.trim()) {
    addressErrorMessage.value = 'Country is required'
    return
  }

  if (!addressFormData.value.address.postal_code.trim()) {
    addressErrorMessage.value = 'Postal code is required'
    return
  }

  const token = getToken()
  
  if (!token) {
    await router.push('/login')
    return
  }

  isLoadingAddress.value = true
  addressErrorMessage.value = ''
  addressSuccessMessage.value = ''

  try {
    const response = await $fetch<AddressResponse>(`${backendUrl}/profile/address`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: {
        title: addressFormData.value.title.trim(),
        address: {
          name: addressFormData.value.address.name.trim(),
          phone: addressFormData.value.address.phone.trim(),
          email: addressFormData.value.address.email.trim() || '',
          line_1: addressFormData.value.address.line_1.trim(),
          line_2: addressFormData.value.address.line_2.trim() || '',
          city: addressFormData.value.address.city.trim(),
          state: addressFormData.value.address.state.trim(),
          country: addressFormData.value.address.country.trim(),
          postal_code: addressFormData.value.address.postal_code.trim()
        }
      }
    })

    if (response.success) {
      addressSuccessMessage.value = 'Address updated successfully!'
      
      // Refresh addresses list after successful update
      await fetchAddresses()
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        addressSuccessMessage.value = ''
      }, 3000)
    } else {
      addressErrorMessage.value = response.message || 'Failed to update address. Please try again.'
    }
  } catch (error: any) {
    addressErrorMessage.value = error.data?.message || error.message || 'Failed to update address. Please try again.'
    console.error('Error updating address:', error)
    
    // If unauthorized, redirect to login
    if (error.status === 401 || error.statusCode === 401) {
      await router.push('/login')
    }
  } finally {
    isLoadingAddress.value = false
  }
}

// Fetch addresses on mount
onMounted(() => {
  fetchAddresses()
})
</script>

<style scoped>
@import '../profile/profile.css';
</style>

