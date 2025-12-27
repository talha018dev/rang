<template>
  <main class="profile-page">
    <div class="profile-container">
      <div class="profile-content">
        <div class="profile-card">
          <h1 class="profile-title">My Profile</h1>
          <p class="profile-subtitle">Manage your account information</p>
          
          <div v-if="isLoadingProfile" class="loading-state">
            <p>Loading profile...</p>
          </div>

          <form v-else @submit.prevent="handleUpdateProfile" class="profile-form">
            <div class="form-group">
              <label for="phone" class="form-label">Phone Number</label>
              <input
                id="phone"
                :value="profileData.phone"
                type="tel"
                class="form-input"
                disabled
              />
              <p class="field-hint">Phone number cannot be changed</p>
            </div>

            <div class="form-group">
              <label for="name" class="form-label">Name <span class="required">*</span></label>
              <input
                id="name"
                v-model="formData.name"
                type="text"
                class="form-input"
                placeholder="Enter your name"
                required
                :disabled="isLoading"
              />
            </div>

            <div class="form-group">
              <label for="email" class="form-label">Email</label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                class="form-input"
                placeholder="Enter your email"
                :disabled="isLoading"
              />
            </div>
            
            <button type="submit" class="submit-button" :disabled="isLoading">
              <span v-if="!isLoading">Update Profile</span>
              <span v-else>Updating...</span>
            </button>

            <div v-if="successMessage" class="success-message">
              {{ successMessage }}
            </div>

            <div v-if="errorMessage" class="error-message">
              {{ errorMessage }}
            </div>
          </form>

          <div class="logout-section">
            <button type="button" class="logout-button" @click="handleLogout" :disabled="isLoggingOut">
              <span v-if="!isLoggingOut">Logout</span>
              <span v-else>Logging out...</span>
            </button>
          </div>
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

          <!-- Saved Addresses Table -->
          <div class="addresses-section">
            <h3 class="addresses-title">Saved Addresses</h3>
            
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
    </div>
  </main>
</template>

<script setup lang="ts">
import { useHead, useRouter } from 'nuxt/app'
import { onMounted, ref } from 'vue'
import { useApi } from '~~/composables/useApi'
import './profile.css'

// Type definitions
interface ProfileData {
  name?: string
  email?: string | null
  phone?: string
  address?: string | null
  avatar?: string | null
}

interface ProfileResponse {
  success: boolean
  message?: string
  data?: ProfileData
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
  title: 'My Profile - Rang Bangladesh',
  meta: [
    { name: 'description', content: 'Manage your Rang Bangladesh account profile and information.' }
  ]
})

const router = useRouter()
const { backendUrl } = useApi()

// Profile data
const profileData = ref<ProfileData>({})
const formData = ref({
  name: '',
  email: ''
})

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
const isLoading = ref(false)
const isLoadingProfile = ref(false)
const isLoadingAddress = ref(false)
const isLoadingAddresses = ref(false)
const isLoggingOut = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const addressErrorMessage = ref('')
const addressSuccessMessage = ref('')

// Get token from localStorage
const getToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('auth_token')
}

// Fetch profile data
const fetchProfile = async () => {
  const token = getToken()
  
  if (!token) {
    // No token, redirect to login
    await router.push('/login')
    return
  }

  isLoadingProfile.value = true
  errorMessage.value = ''

  try {
    const response = await $fetch<ProfileResponse>(`${backendUrl}/profile/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.success && response.data) {
      profileData.value = response.data
      formData.value = {
        name: response.data.name || '',
        email: response.data.email || ''
      }
    } else {
      errorMessage.value = response.message || 'Failed to load profile.'
    }
  } catch (error: any) {
    errorMessage.value = error.data?.message || error.message || 'Failed to load profile.'
    console.error('Error fetching profile:', error)
    
    // If unauthorized, redirect to login
    if (error.status === 401 || error.statusCode === 401) {
      await router.push('/login')
    }
  } finally {
    isLoadingProfile.value = false
  }
}

// Update profile
const handleUpdateProfile = async () => {
  if (!formData.value.name.trim()) {
    errorMessage.value = 'Name is required'
    return
  }

  const token = getToken()
  
  if (!token) {
    await router.push('/login')
    return
  }

  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const response = await $fetch<ProfileResponse>(`${backendUrl}/profile/me`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: {
        name: formData.value.name.trim(),
        email: formData.value.email.trim() || null
      }
    })

    if (response.success) {
      successMessage.value = 'Profile updated successfully!'
      // Update profile data
      profileData.value = {
        ...profileData.value,
        name: formData.value.name.trim(),
        email: formData.value.email.trim() || null
      }
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        successMessage.value = ''
      }, 3000)
    } else {
      errorMessage.value = response.message || 'Failed to update profile. Please try again.'
    }
  } catch (error: any) {
    errorMessage.value = error.data?.message || error.message || 'Failed to update profile. Please try again.'
    console.error('Error updating profile:', error)
    
    // If unauthorized, redirect to login
    if (error.status === 401 || error.statusCode === 401) {
      await router.push('/login')
    }
  } finally {
    isLoading.value = false
  }
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

// Handle logout
const handleLogout = async () => {
  isLoggingOut.value = true
  
  try {
    // Clear all localStorage
    if (typeof window !== 'undefined') {
      localStorage.clear()
      console.log('LocalStorage cleared successfully')
    }
    
    // Redirect to login page
    await router.push('/login')
  } catch (error) {
    console.error('Error during logout:', error)
    // Even if there's an error, try to redirect
    await router.push('/login')
  } finally {
    isLoggingOut.value = false
  }
}

// Fetch profile on mount
onMounted(() => {
  fetchProfile()
  fetchAddresses()
})
</script>

<style scoped>
@import './profile.css';
</style>

