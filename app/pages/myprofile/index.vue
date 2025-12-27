<template>
  <main class="profile-page pb-30! sm:pb-0!">
    <div class="profile-container">
      <div class="profile-content">
        <!-- Navigation Cards -->
        <div class="flex flex-wrap gap-4 w-full justify-center mb-6">
          <NuxtLink 
            to="/myprofile"
            class="flex flex-col items-center justify-center gap-2 p-6 bg-white rounded-lg border-2 transition-all duration-200 hover:shadow-md min-w-[120px] flex-1 max-w-[200px]"
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
            class="flex flex-col items-center justify-center gap-2 p-6 bg-white rounded-lg border-2 transition-all duration-200 hover:shadow-md min-w-[120px] flex-1 max-w-[200px]"
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
            class="flex flex-col items-center justify-center gap-2 p-6 bg-white rounded-lg border-2 transition-all duration-200 hover:shadow-md min-w-[120px] flex-1 max-w-[200px]"
            :class="$route.path === '/orders' ? 'border-orange-600 bg-orange-50' : 'border-gray-200 hover:border-orange-300'">
            <div class="w-8 h-8 text-orange-600">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div class="text-sm font-semibold text-gray-700">Orders</div>
          </NuxtLink>
        </div>

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

// Meta
useHead({
  title: 'My Profile - Rang Bangladesh',
  meta: [
    { name: 'description', content: 'Manage your Rang Bangladesh account profile and information.' }
  ]
})

const route = useRoute()
const router = useRouter()
const { backendUrl } = useApi()

// Profile data
const profileData = ref<ProfileData>({})
const formData = ref({
  name: '',
  email: ''
})

// UI state
const isLoading = ref(false)
const isLoadingProfile = ref(false)
const isLoggingOut = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

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

// Handle logout
const handleLogout = async () => {
  isLoggingOut.value = true
  
  try {
    // Clear all localStorage
    if (typeof window !== 'undefined') {
      localStorage.clear()
      console.log('LocalStorage cleared successfully')
    }
    
    // Redirect to home page
    const currentPath = route.path
    if (currentPath === '/' || currentPath === '/home') {
      if (typeof window !== 'undefined') {
        window.location.reload()
      }
    } else {
      await router.push('/')
    }
  } catch (error) {
    console.error('Error during logout:', error)
    // Even if there's an error, try to redirect
    const currentPath = route.path
    if (currentPath === '/' || currentPath === '/home') {
      if (typeof window !== 'undefined') {
        window.location.reload()
      }
    } else {
      await router.push('/')
    }
  } finally {
    isLoggingOut.value = false
  }
}

// Fetch profile on mount
onMounted(() => {
  fetchProfile()
})
</script>

<style scoped>
@import '../profile/profile.css';
</style>

