<template>
    <section class="relative overflow-hidden rounded-lg mb-8 flex">
        <!-- Background Image with Overlay -->
        <div class="relative h-120 bg-[#ed9a32]">
            <!-- Background Image -->
            <div class="absolute inset-0 bg-cover bg-center opacity-15" style="background-image: url('/landing-image.png')"></div>
            
            <!-- Content Overlay -->
            <div class="relative z-10 h-full flex flex-col justify-between p-4">
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
                
                <!-- Main Content Section: Countdown + Carousel -->
                <div class="mb-6">
                    <!-- Countdown Timer -->
                    <div class="flex items-center justify-around">
                            <div>
                                <span class="text-white text-sm font-medium">Days</span>
                                <div class="flex space-x-1">
                                    <div class="bg-orange-300/80 rounded-none w-10 h-10 flex items-center justify-center">
                                        <span class="text-white text-2xl font-bold">{{ Math.floor(countdown.days / 10) }}</span>
                                    </div>
                                    <div class="bg-orange-300/80 rounded-none w-10 h-10 flex items-center justify-center">
                                        <span class="text-white text-2xl font-bold">{{ countdown.days % 10 }}</span>
                                    </div>
                                </div>
                            </div>
                            <span class="text-white text-2xl font-bold relative top-2">:</span>
                            <div>
                                <span class="text-white text-sm font-medium">Hours</span>
                                <div class="flex space-x-1">
                                    <div class="bg-orange-300/80 rounded-none w-10 h-10 flex items-center justify-center">
                                        <span class="text-white text-2xl font-bold">{{ Math.floor(countdown.hours / 10) }}</span>
                                    </div>
                                    <div class="bg-orange-300/80 rounded-none w-10 h-10 flex items-center justify-center">
                                        <span class="text-white text-2xl font-bold">{{ countdown.hours % 10 }}</span>
                                    </div>
                                </div>
                            </div>
                            <span class="text-white text-2xl font-bold relative top-2">:</span>
                            <div>
                                <span class="text-white text-sm font-medium">Minutes</span>
                                <div class="flex space-x-1">
                                    <div class="bg-orange-300/80 rounded-none w-10 h-10 flex items-center justify-center">
                                        <span class="text-white text-2xl font-bold">{{ Math.floor(countdown.minutes / 10) }}</span>
                                    </div>
                                    <div class="bg-orange-300/80 rounded-none w-10 h-10 flex items-center justify-center">
                                        <span class="text-white text-2xl font-bold">{{ countdown.minutes % 10 }}</span>
                                    </div>
                                </div>
                            </div>
                            <span class="text-white text-2xl font-bold relative top-2">:</span>
                            <div>
                                <span class="text-white text-sm font-medium">Seconds</span>
                                <div class="flex space-x-1">
                                    <div class="bg-orange-300/80 rounded-none w-10 h-10 flex items-center justify-center">
                                        <span class="text-white text-2xl font-bold">{{ Math.floor(countdown.seconds / 10) }}</span>
                                    </div>
                                    <div class="bg-orange-300/80 rounded-none w-10 h-10 flex items-center justify-center">
                                        <span class="text-white text-2xl font-bold">{{ countdown.seconds % 10 }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    <!-- Carousel Cards Section -->
                    <div class="flex-1 ml-8">
                        <div class="relative">
                            <!-- Cards Container -->
                            

                            <!-- Navigation Arrows -->
                            
                        </div>
                    </div>
                </div>
                
                <!-- Bottom Section with Shop Now Button -->
                <div class="flex items-center">
                    <button class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors duration-200">
                        <span class="font-medium">Shop Now</span>
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                        </svg>
                    </button>
                    <div class="flex items-center gap-2 justify-center ml-auto">
                        <button 
                            @click="previousSlide"
                            class="bg-gray-200 ml-auto hover:bg-gray-300 text-gray-800 w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200"
                            :disabled="currentSlide === 0"
                        >
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
                            </svg>
                        </button>
                        <button 
                            @click="nextSlide"
                            class="bg-gray-200 hover:bg-gray-300 text-gray-800 w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200"
                            :disabled="currentSlide === carouselSlides.length - 1"
                        >
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="overflow-hidden rounded-lg bg-black">
            <div 
                class="flex transition-transform duration-300 ease-in-out"
                :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
            >
                <div 
                    v-for="(slide, index) in carouselSlides" 
                    :key="index"
                    class="w-full flex-shrink-0 px-2"
                >
                    <div class="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-white border border-white/20 shadow-lg">
                        <div class="flex flex-col items-center text-center space-y-3">
                            <div class="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center">
                                <span class="text-2xl font-bold">{{ slide.discount }}</span>
                            </div>
                            <div>
                                <h3 class="font-semibold text-lg">{{ slide.title }}</h3>
                                <p class="text-sm opacity-90 mt-1">{{ slide.description }}</p>
                            </div>
                            <button class="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                                Shop Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
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

// Carousel state
const currentSlide = ref(0)
const carouselSlides = ref([
    {
        discount: '50%',
        title: 'Summer Collection',
        description: 'Get up to 50% off on selected items'
    },
    {
        discount: '30%',
        title: 'New Arrivals',
        description: 'Fresh styles with 30% discount'
    },
    {
        discount: '25%',
        title: 'Accessories',
        description: 'Complete your look with 25% off'
    },
    {
        discount: '40%',
        title: 'Premium Range',
        description: 'Luxury items at 40% discount'
    }
])

// Carousel functions
const nextSlide = () => {
    if (currentSlide.value < carouselSlides.value.length - 1) {
        currentSlide.value++
    }
}

const previousSlide = () => {
    if (currentSlide.value > 0) {
        currentSlide.value--
    }
}

const goToSlide = (index: number) => {
    currentSlide.value = index
}

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