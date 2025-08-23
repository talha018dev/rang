<template>
  <AppHeader />
  <section class="h-screen overflow-hidden">
    <!-- Background Image -->
      <div 
        class="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
        style="background-image: url('/landing-image.png'); background-repeat: no-repeat; background-size: contain; background-position: top;"
      ></div>

    <!-- Content Overlay -->
    <div class="relative z-10 h-full flex items-center">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Text Content -->
          <div class="text-white space-y-6">
            <div class="bg-black bg-opacity-40 backdrop-blur-sm rounded-lg p-8 max-w-md">
              <p class="text-lg font-medium text-orange-300 mb-2">New Collection</p>
              <h1 class="text-5xl lg:text-6xl font-serif font-bold mb-4 leading-tight">
                Durga Puja - 2025
              </h1>
              <button class="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors">
                Shop Now
              </button>
            </div>
          </div>

          <!-- Model Image Placeholder -->
          <div class="relative flex justify-center lg:justify-end">
            <div class="relative w-80 h-96 lg:w-96 lg:h-[500px]">
              <!-- Model silhouette placeholder -->
              <div class="absolute inset-0 bg-gradient-to-b from-blue-400/20 to-purple-400/20 rounded-full transform rotate-12"></div>
              <div class="absolute inset-4 bg-gradient-to-b from-pink-300/30 to-blue-300/30 rounded-full transform -rotate-6"></div>
              
              <!-- Decorative elements -->
              <div class="absolute -top-4 -right-4 w-8 h-8 bg-red-500 rounded-full animate-pulse"></div>
              <div class="absolute -bottom-4 -left-4 w-6 h-6 bg-yellow-400 rounded-full animate-pulse delay-300"></div>
              
              <!-- Flowing fabric effect -->
              <div class="absolute -left-8 top-1/4 w-16 h-32 bg-blue-400/40 rounded-full transform rotate-45 animate-pulse delay-500"></div>
              <div class="absolute -right-12 top-1/3 w-20 h-40 bg-pink-300/30 rounded-full transform -rotate-30 animate-pulse delay-700"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Decorative overlay -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
  </section>
</template>

<script setup lang="ts">
import AppHeader from './AppHeader.vue';
// import HeroBanner from '../components/HeroBanner.vue';

useHead({
  title: 'Rang Bangladesh - Durga Puja 2025 Collection',
  meta: [
    { name: 'description', content: 'Discover the latest Durga Puja 2025 collection from Rang Bangladesh. Traditional and modern fashion for everyone.' }
  ]
})
</script>