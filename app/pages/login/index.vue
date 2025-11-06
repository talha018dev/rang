<template>
  <main class="login-page">
    <div class="login-container">
      <div class="login-content">
        <div class="login-card">
          <h1 class="login-title">Login</h1>
          <p class="login-subtitle">Welcome back! Please login to your account.</p>
          
          <form @submit.prevent="handleLogin" class="login-form">
            <div class="form-group">
              <label for="email" class="form-label">Email</label>
              <input
                id="email"
                v-model="email"
                type="email"
                class="form-input"
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div class="form-group">
              <label for="password" class="form-label">Password</label>
              <div class="password-input-wrapper">
                <input
                  id="password"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  class="form-input"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  class="password-toggle"
                  @click="showPassword = !showPassword"
                >
                  <svg
                    v-if="showPassword"
                    class="password-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                  <svg
                    v-else
                    class="password-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            
            <div class="form-options">
              <label class="checkbox-label">
                <input
                  v-model="rememberMe"
                  type="checkbox"
                  class="checkbox-input"
                />
                <span class="checkbox-text">Remember me</span>
              </label>
              <NuxtLink to="/forgot-password" class="forgot-password-link">
                Forgot password?
              </NuxtLink>
            </div>
            
            <button type="submit" class="login-button">
              Login
            </button>
            
            <div class="divider">
              <span class="divider-text">or</span>
            </div>
            
            <div class="social-login">
              <button type="button" class="social-button google-button">
                <svg class="social-icon" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>
            
            <p class="signup-text">
              Don't have an account?
              <NuxtLink to="/register" class="signup-link">Sign up</NuxtLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useHead } from 'nuxt/app'
import './login.css'

// Meta
useHead({
  title: 'Login - Rang Bangladesh',
  meta: [
    { name: 'description', content: 'Login to your Rang Bangladesh account to access exclusive deals and manage your orders.' }
  ]
})

// Reactive form data
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)

// Handle login
const handleLogin = () => {
  // TODO: Implement login logic
  console.log('Login attempt:', { email: email.value, password: password.value, rememberMe: rememberMe.value })
}
</script>


