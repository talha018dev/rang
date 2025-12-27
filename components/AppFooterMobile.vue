<template>
  <footer class="app-footer-mobile">
    <div class="mobile-nav-container">
      <NuxtLink to="/" class="nav-item" :class="{ active: currentActiveTab === 'home' }" @click="setActiveTab('home')">
        <div class="nav-icon">
          <Icon name="heroicons:home" class="icon" />
        </div>
        <div class="nav-label">Home</div>
      </NuxtLink>

      <NuxtLink v-if="isLoggedIn" to="/wishlist" class="nav-item" :class="{ active: currentActiveTab === 'favourite' }" @click="setActiveTab('favourite')">
        <div class="nav-icon">
          <Icon name="heroicons:heart" class="icon" />
        </div>
        <div class="nav-label">Favourite</div>
      </NuxtLink>

      <NuxtLink to="/cart" class="nav-item" :class="{ active: currentActiveTab === 'cart' }" @click="setActiveTab('cart')">
        <div class="nav-icon">
          <Icon name="heroicons:shopping-cart" class="icon" />
          <span v-if="cartTotalItems > 0" class="cart-badge">{{ cartTotalItems }}</span>
        </div>
        <div class="nav-label">Cart</div>
      </NuxtLink>

      <NuxtLink to="/profile" class="nav-item" :class="{ active: currentActiveTab === 'profile' }" @click="setActiveTab('profile')">
        <div class="nav-icon">
          <Icon name="heroicons:user" class="icon" />
        </div>
        <div class="nav-label">Profile</div>
      </NuxtLink>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCart } from '../composables/useCart'

const route = useRoute()
const { totalItems: cartTotalItems } = useCart()

// Check if user is logged in
const isLoggedIn = computed(() => {
  if (typeof window === 'undefined') return false
  const token = localStorage.getItem('auth_token')
  return !!token
})

const activeTab = ref('home')

// Determine active tab based on current route
const getActiveTab = () => {
  const path = route.path

  if (path === '/' || path.startsWith('/home')) {
    return 'home'
  } else if (path.startsWith('/favourite') || path.startsWith('/wishlist')) {
    return 'favourite'
  } else if (path.startsWith('/cart') || path.startsWith('/checkout')) {
    return 'cart'
  } else if (path.startsWith('/profile') || path.startsWith('/account')) {
    return 'profile'
  }

  return 'home' // Default to home
}

const setActiveTab = (tab: string) => {
  activeTab.value = tab
  // Add navigation logic here
}

// Update active tab when route changes
onMounted(() => {
  activeTab.value = getActiveTab()
})

// Watch for route changes
const currentActiveTab = computed(() => getActiveTab())
</script>

<style scoped>
@import './AppFooterMobile.css';
</style>