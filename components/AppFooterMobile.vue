<template>
  <footer class="app-footer-mobile">
    <div class="mobile-nav-container">
      <div class="nav-item" :class="{ active: activeTab === 'home' }" @click="setActiveTab('home')">
        <div class="nav-icon">
          <Icon name="heroicons:home" class="icon" />
        </div>
        <div class="nav-label">Home</div>
      </div>
      
      <div class="nav-item" :class="{ active: activeTab === 'favourite' }" @click="setActiveTab('favourite')">
        <div class="nav-icon">
          <Icon name="heroicons:heart" class="icon" />
        </div>
        <div class="nav-label">Favourite</div>
      </div>
      
      <div class="nav-item" :class="{ active: activeTab === 'cart' }" @click="setActiveTab('cart')">
        <div class="nav-icon">
          <Icon name="heroicons:shopping-cart" class="icon" />
        </div>
        <div class="nav-label">Cart</div>
      </div>
      
      <div class="nav-item" :class="{ active: activeTab === 'profile' }" @click="setActiveTab('profile')">
        <div class="nav-icon">
          <Icon name="heroicons:user" class="icon" />
        </div>
        <div class="nav-label">Profile</div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('home')

const setActiveTab = (tab: string) => {
  activeTab.value = tab
  // Add navigation logic here
}
</script>

<style scoped>
@import './AppFooterMobile.css';
</style>