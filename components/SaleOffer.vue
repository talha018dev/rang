<template>
    <main class="max-w-[90%] mx-auto">
        <section class="my-20">
            <div class="text-6xl text-center">
                <h1><span class="text-[#FAB767] font-light">Sale</span> <span class="text-[#F1592C] font-bold">Offer</span></h1>
            </div>
        </section>
        
        <!-- Countdown Banner Section -->
        <section class="relative overflow-hidden rounded-lg mb-8  max-w-[400px]">
            <!-- Background Image with Overlay -->
            <div class="relative h-120 bg-[#ea9834]">
                <!-- Background Image -->
                <div class="absolute inset-0 bg-cover bg-center opacity-15" style="background-image: url('/landing-image.png')"></div>
                
                <!-- Content Overlay -->
                <div class="relative z-10 h-full flex flex-col justify-between p-8">
                    <!-- Top Section with Headline -->
                    <div class="flex-1 flex flex-col justify-center">
                        <div class="text-white mb-4">
                            <h2 class="text-4xl font-bold leading-tight">
                                <span class="block">Deals of the</span>
                                <span class="block">Month</span>
                            </h2>
                            <p class="text-white/90 mt-3 text-lg max-w-md">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            </p>
                        </div>
                    </div>
                    
                    <!-- Countdown Timer -->
                    <div class="mb-6">
                        <div class="flex items-center space-x-2">
                            <div>
                                <span class="text-white text-sm font-medium">Days</span>
                                <div class="bg-orange-300/80 rounded-none px-3 py-2">
                                    <span class="text-white text-2xl font-bold">{{ formatNumber(countdown.days) }}</span>
                                </div>
                            </div>
                            <span class="text-white text-2xl font-bold">:</span>
                            <div>
                                <span class="text-white text-sm font-medium">Hours</span>
                                <div class="bg-orange-300/80 rounded-none px-3 py-2">
                                    <span class="text-white text-2xl font-bold">{{ formatNumber(countdown.hours) }}</span>
                                </div>
                            </div>
                            <span class="text-white text-2xl font-bold">:</span>
                            <div>
                                <span class="text-white text-sm font-medium">Minutes</span>
                                <div class="bg-orange-300/80 rounded-none px-3 py-2">
                                    <span class="text-white text-2xl font-bold">{{ formatNumber(countdown.minutes) }}</span>
                                </div>
                            </div>
                            <span class="text-white text-2xl font-bold">:</span>
                            <div>
                                <span class="text-white text-sm font-medium">Seconds</span>
                                <div class="bg-orange-300/80 rounded-none px-3 py-2">
                                    <span class="text-white text-2xl font-bold">{{ formatNumber(countdown.seconds) }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Bottom Section with Buttons -->
                    <div class="flex justify-between items-center">
                        <!-- Shop Now Button -->
                        <button class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors duration-200">
                            <span class="font-medium">Shop Now</span>
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                            </svg>
                        </button>
                        
                        <!-- Navigation Arrows -->
                        <div class="flex space-x-2">
                            <button class="bg-gray-200 hover:bg-gray-300 text-gray-800 w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
                                </svg>
                            </button>
                            <button class="bg-gray-200 hover:bg-gray-300 text-gray-800 w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <section class="mt-8">
            <div class="grid grid-cols-2 gap-4">
                <img src="/brand-6.png" alt="Brand Rang" class="w-full h-full object-cover rounded-none"></img>
                <div class="grid grid-cols-2 gap-4">
                    <img src="/brand-7.png" alt="Brand Rang" class="w-full h-full object-cover rounded-none"></img>
                    <img src="/brand-8.png" alt="Brand Rang" class="w-full h-full object-cover rounded-none"></img>
                    <img src="/brand-9.png" alt="Brand Rang" class="w-full h-full object-cover rounded-none"></img>
                    <img src="/brand-10.png" alt="Brand Rang" class="w-full h-full object-cover rounded-none"></img>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

// Countdown state
const countdown = ref({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
})

// Set target date (30 days from now)
const targetDate = new Date()
targetDate.setDate(targetDate.getDate() + 30)

let interval: NodeJS.Timeout | null = null

// Calculate time remaining
const calculateTimeRemaining = () => {
    const now = new Date().getTime()
    const target = targetDate.getTime()
    const difference = target - now

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        countdown.value = { days, hours, minutes, seconds }
    } else {
        countdown.value = { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }
}

// Format number to always show 2 digits
const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0')
}

// Start countdown timer
onMounted(() => {
    calculateTimeRemaining()
    interval = setInterval(calculateTimeRemaining, 1000)
})

// Cleanup interval on component unmount
onUnmounted(() => {
    if (interval) {
        clearInterval(interval)
    }
})
</script>
