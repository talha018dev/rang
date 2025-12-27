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
})
</script>

<style scoped>
@import './profile.css';
</style>

