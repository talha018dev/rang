<template>
    <section class="relative overflow-hidden rounded-lg mb-8 flex">
        <!-- Countdown Card -->
        <div class="relative h-120 bg-[#ed9a32] min-w-[420px]">
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
                
                <!-- Countdown Timer -->
                <div class="mb-6">
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
                </div>
                <!-- Bottom Section with Shop Now Button and Navigation -->
                <div class="flex items-center justify-between">
                    <button class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors duration-200">
                        <span class="font-medium">Shop Now</span>
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                        </svg>
                    </button>
                    
                    <!-- Navigation Arrows -->
                    <div class="flex space-x-2">
                        <button 
                            @click="previousSlide"
                            class="bg-gray-200 hover:bg-gray-300 text-gray-800 w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200"
                            :disabled="currentSlide === 0"
                            :class="{ 'opacity-50 cursor-not-allowed': currentSlide === 0 }"
                        >
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
                            </svg>
                        </button>
                        <button 
                            @click="nextSlide"
                            class="bg-gray-200 hover:bg-gray-300 text-gray-800 w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200"
                            :disabled="currentSlide >= maxSlides"
                            :class="{ 'opacity-50 cursor-not-allowed': currentSlide >= maxSlides }"
                        >
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Carousel Cards Section -->
        <div class="flex-1 bg-gray-100 relative">
            <!-- Cards Container -->
            <div class="overflow-hidden h-full">
                <div 
                    class="flex transition-transform duration-300 ease-in-out h-full"
                    :style="{ transform: `translateX(-${currentSlide * 300}px)` }"
                >
                    <div 
                        v-for="(slide, index) in carouselSlides" 
                        :key="index"
                        class="w-[300px] flex-shrink-0 m-4"
                    >
                        <div class="bg-white rounded-lg text-gray-800 border border-gray-200 shadow-lg h-full flex flex-col">
                            <div class="">
                                <div class="rounded-lg overflow-hidden">
                                    <img 
                                        :src="slide.image" 
                                        :alt="slide.title"
                                        class="w-full h-full object-cover"
                                    />
                                </div>
                                <div class="w-full ml-3 mt-6">
                                    <h3 class="font-semibold text-2xl text-gray-900">{{ slide.title }}</h3>
                                    <p class="text-base text-gray-500 mt-1">{{ slide.itemCount }} in stock</p>
                                    
                                </div>
                                <div class="mt-8 ml-3">
                                    <div>৳</div>
                                    <p class="text-base text-gray-400 line-through">{{ slide.itemOldPrice }}<span class="font-extrabold text-sm">৳</span></p>
                                    <div class="flex items-center">
                                        <p class="text-xl text-black font-bold">{{ slide.itemPrice }}<span class="font-extrabold">৳</span></p>
                                        <button class="p-2 hover:text-orange-600 transition-colors ml-auto">
                                            <svg class="filter brightness-0 saturate-100" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M17 18C17.5304 18 18.0391 18.2107 18.4142 18.5858C18.7893 18.9609 19 19.4696 19 20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22C16.4696 22 15.9609 21.7893 15.5858 21.4142C15.2107 21.0391 15 20.5304 15 20C15 18.89 15.89 18 17 18ZM1 2H4.27L5.21 4H20C20.2652 4 20.5196 4.10536 20.7071 4.29289C20.8946 4.48043 21 4.73478 21 5C21 5.17 20.95 5.34 20.88 5.5L17.3 11.97C16.96 12.58 16.3 13 15.55 13H8.1L7.2 14.63L7.17 14.75C7.17 14.8163 7.19634 14.8799 7.24322 14.9268C7.29011 14.9737 7.3537 15 7.42 15H19V17H7C6.46957 17 5.96086 16.7893 5.58579 16.4142C5.21071 16.0391 5 15.5304 5 15C5 14.65 5.09 14.32 5.24 14.04L6.6 11.59L3 4H1V2ZM7 18C7.53043 18 8.03914 18.2107 8.41421 18.5858C8.78929 18.9609 9 19.4696 9 20C9 20.5304 8.78929 21.0391 8.41421 21.4142C8.03914 21.7893 7.53043 22 7 22C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20C5 18.89 5.89 18 7 18ZM16 11L18.78 6H12.46H6.14L8.5 11H16Z" fill="white"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <button class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors duration-200 w-full">
                                    Shop Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

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
        image: '/sale-carousel-1.png',
        discount: '50%',
        title: 'Summer Collection',
        itemCount: 4,
        itemPrice: 1000,
        itemOldPrice: 1500,
    },
    {
        image: '/sale-carousel-2.png',
        discount: '30%',
        title: 'New Arrivals',
        itemCount: 4,
        itemPrice: 1000,
        itemOldPrice: 1500,
    },
    {
        image: '/sale-carousel-3.png',
        discount: '25%',
        title: 'Accessories',
        itemCount: 4,
        itemPrice: 1000,
        itemOldPrice: 1500,
    },
    {
        image: '/sale-carousel-4.png',
        discount: '40%',
        title: 'Premium Range',
        itemCount: 4,
        itemPrice: 1000,
        itemOldPrice: 1500,
    },
    {
        image: '/sale-carousel-1.png',
        discount: '35%',
        title: 'Casual Wear',
        itemCount: 4,
        itemPrice: 1000,
        itemOldPrice: 1500,
    },
    {
        image: '/sale-carousel-2.png',
        discount: '45%',
        title: 'Evening Collection',
        itemCount: 4,
        itemPrice: 1000,
        itemOldPrice: 1500,
    }
])

// Calculate visible slides and max slides
const visibleSlides = ref(3) // Adjust based on container width
const maxSlides = computed(() => Math.max(0, carouselSlides.value.length - visibleSlides.value))

// Carousel functions
const nextSlide = () => {
    if (currentSlide.value < maxSlides.value) {
        currentSlide.value++
    }
}

const previousSlide = () => {
    if (currentSlide.value > 0) {
        currentSlide.value--
    }
}

const goToSlide = (index: number) => {
    currentSlide.value = Math.min(index, maxSlides.value)
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