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

      </div>
    </div>
    <AppFooter />
  </main>
</template>

<script setup lang="ts">
import { useHead, useRoute } from 'nuxt/app'
import AppFooter from '~~/components/AppFooter.vue'
import './profile.css'

const route = useRoute()

// Meta
useHead({
  title: 'Profile - Rang Bangladesh',
  meta: [
    { name: 'description', content: 'Manage your Rang Bangladesh account.' }
  ]
})
</script>

<style scoped>
@import './profile.css';
</style>

