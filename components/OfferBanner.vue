<template>
  <div class="relative overflow-hidden bg-[#F7941C] text-white py-5">
    <!-- Sliding content container -->
    <div 
      class="flex whitespace-nowrap animate-slide"
      :style="{ animationDuration: `${animationDuration}s` }"
    >
      <!-- First set of content -->
      <div class="flex items-center space-x-8 px-4 text-5xl font-bold">
        50% OFF • Get Yours Now !!! •
      </div>
      
      <!-- Duplicate content for seamless loop -->
      <div class="flex items-center space-x-8 px-4 text-5xl font-bold">
        50% OFF • Get Yours Now !!! •
      </div>
      
      <!-- Third set for smooth transition -->
      <div class="flex items-center space-x-8 px-4 text-5xl font-bold">
        50% OFF • Get Yours Now !!! •
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  speed?: number // Animation speed in seconds
  message?: string
  offerCode?: string
  discount?: string
}

const props = withDefaults(defineProps<Props>(), {
  speed: 20,
  message: 'Get 20% off on all Durga Puja collections',
  offerCode: 'DURGA20',
  discount: '20%'
})

const animationDuration = computed(() => props.speed)
</script>

<style scoped>
@keyframes slide {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-33.333%);
  }
}

.animate-slide {
  animation: slide linear infinite;
}
</style> 