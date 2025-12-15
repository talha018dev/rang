<template>
  <main class="login-page">
    <div class="login-container">
      <div class="login-content">
        <div class="login-card">
          <h1 class="login-title">Login</h1>
          <p class="login-subtitle">Welcome back! Please login to your account.</p>
          
          <!-- Step 1: Phone Number -->
          <form v-if="step === 'phone'" @submit.prevent="handleSendOTP" class="login-form">
            <div class="form-group">
              <label for="phone" class="form-label">Phone Number</label>
              <input
                id="phone"
                v-model="phone"
                type="tel"
                class="form-input"
                placeholder="Enter your phone number"
                required
                :disabled="isLoading"
              />
            </div>
            
            <button type="submit" class="login-button" :disabled="isLoading">
              <span v-if="!isLoading">Send OTP</span>
              <span v-else>Sending OTP...</span>
            </button>

            <div v-if="errorMessage" class="error-message">
              {{ errorMessage }}
            </div>
          </form>

          <!-- Step 2: OTP Verification -->
          <form v-if="step === 'otp'" @submit.prevent="handleVerifyOTP" class="login-form">
            <div class="form-group">
              <label for="otp" class="form-label">Enter OTP</label>
              <input
                id="otp"
                v-model="otp"
                type="text"
                class="form-input"
                placeholder="Enter 6-digit OTP"
                maxlength="6"
                required
                :disabled="isLoading"
              />
              <p class="otp-hint">OTP sent to {{ phone }}</p>
            </div>
            
            <button type="submit" class="login-button" :disabled="isLoading">
              <span v-if="!isLoading">Verify OTP</span>
              <span v-else>Verifying...</span>
            </button>

            <button type="button" class="back-button" @click="goBackToPhone" :disabled="isLoading">
              Change Phone Number
            </button>

            <div v-if="errorMessage" class="error-message">
              {{ errorMessage }}
            </div>
          </form>

          <!-- Step 3: Complete Profile (if name is missing) -->
          <form v-if="step === 'profile'" @submit.prevent="handleUpdateProfile" class="login-form">
            <div class="form-group">
              <label for="name" class="form-label">Your Name <span class="required">*</span></label>
              <input
                id="name"
                v-model="name"
                type="text"
                class="form-input"
                placeholder="Enter your name"
                required
                :disabled="isLoading"
              />
            </div>

            <div class="form-group">
              <label for="email" class="form-label">Email (Optional)</label>
              <input
                id="email"
                v-model="email"
                type="email"
                class="form-input"
                placeholder="Enter your email"
                :disabled="isLoading"
              />
            </div>
            
            <button type="submit" class="login-button" :disabled="isLoading">
              <span v-if="!isLoading">Complete Registration</span>
              <span v-else>Updating Profile...</span>
            </button>

            <div v-if="errorMessage" class="error-message">
              {{ errorMessage }}
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useHead, useRouter } from 'nuxt/app'
import { ref } from 'vue'
import { useApi } from '~~/composables/useApi'
import './login.css'

// Type definitions
interface OTPResponse {
  success: boolean
  message?: string
}

interface LoginResponse {
  success: boolean
  message?: string
  data?: {
    customer?: {
      name?: string
      email?: string | null
      phone?: string
      address?: string | null
      avatar?: string | null
    }
    token?: string
  }
}

interface ProfileResponse {
  success: boolean
  message?: string
}

// Meta
useHead({
  title: 'Login - Rang Bangladesh',
  meta: [
    { name: 'description', content: 'Login to your Rang Bangladesh account to access exclusive deals and manage your orders.' }
  ]
})

const router = useRouter()
const { backendUrl } = useApi()

// Step management
type Step = 'phone' | 'otp' | 'profile'
const step = ref<Step>('phone')

// Form data
const phone = ref('')
const otp = ref('')
const name = ref('')
const email = ref('')
const token = ref('')

// UI state
const isLoading = ref(false)
const errorMessage = ref('')

// Send OTP
const handleSendOTP = async () => {
  if (!phone.value) return

  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await $fetch<OTPResponse>(`${backendUrl}/auth/otp`, {
      method: 'POST',
      body: {
        phone: phone.value
      }
    })

    if (response.success) {
      step.value = 'otp'
    } else {
      errorMessage.value = response.message || 'Failed to send OTP. Please try again.'
    }
  } catch (error: any) {
    errorMessage.value = error.data?.message || error.message || 'Failed to send OTP. Please try again.'
    console.error('Error sending OTP:', error)
  } finally {
    isLoading.value = false
  }
}

// Verify OTP and login
const handleVerifyOTP = async () => {
  if (!otp.value || !phone.value) return

  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await $fetch<LoginResponse>(`${backendUrl}/auth/login`, {
      method: 'POST',
      body: {
        phone: phone.value,
        otp: otp.value
      }
    })

    if (response.success && response.data) {
      token.value = response.data.token || ''
      
      // Store token in localStorage
      if (typeof window !== 'undefined' && token.value) {
        localStorage.setItem('auth_token', token.value)
      }

      // Check if name is missing
      const customerName = response.data.customer?.name
      if (!customerName || customerName.trim() === '') {
        // Name is missing, show profile completion form
        step.value = 'profile'
      } else {
        // Name exists, login successful - redirect to home or dashboard
        await handleLoginSuccess()
      }
    } else {
      errorMessage.value = response.message || 'Invalid OTP. Please try again.'
    }
  } catch (error: any) {
    errorMessage.value = error.data?.message || error.message || 'Invalid OTP. Please try again.'
    console.error('Error verifying OTP:', error)
  } finally {
    isLoading.value = false
  }
}

// Update profile
const handleUpdateProfile = async () => {
  if (!name.value.trim()) {
    errorMessage.value = 'Name is required'
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await $fetch<ProfileResponse>(`${backendUrl}/profile/me`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token.value}`
      },
      body: {
        name: name.value.trim(),
        email: email.value.trim() || null
      }
    })

    if (response.success) {
      // Profile updated successfully, login complete
      await handleLoginSuccess()
    } else {
      errorMessage.value = response.message || 'Failed to update profile. Please try again.'
    }
  } catch (error: any) {
    errorMessage.value = error.data?.message || error.message || 'Failed to update profile. Please try again.'
    console.error('Error updating profile:', error)
  } finally {
    isLoading.value = false
  }
}

// Handle successful login
const handleLoginSuccess = async () => {
  // Redirect to home page
  await router.push('/')
  // Alternative: use navigateTo('/') for Nuxt 3
}

// Go back to phone step
const goBackToPhone = () => {
  step.value = 'phone'
  otp.value = ''
  errorMessage.value = ''
}
</script>

<style scoped>
@import './login.css';
</style>
