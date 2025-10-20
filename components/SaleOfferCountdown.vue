<template>
    <!-- Desktop Version -->
    <section class="countdown-section">
        <!-- Countdown Card (Left Side) -->
        <div class="countdown-card">
            <!-- Background Image -->
            <div class="countdown-background" style="background-image: url('/landing-image.png')"></div>
            
            <!-- Content Overlay -->
            <div class="countdown-content">
                <!-- Top Section with Headline -->
                <div class="countdown-top">
                    <div class="countdown-text">
                        <h2 class="countdown-headline">
                            <span class="">Deals of the <span class="countdown-headline-block">Month</span></span>
                        </h2>
                        <p class="countdown-description">
                            Best Rang Deals This Month — Grab Your’s, Before It’s Gone!
                        </p>
                    </div>
                </div>
                
                <!-- Countdown Timer -->
                <div class="countdown-timer">
                    <div class="countdown-timer-container">
                        <div class="countdown-time-unit">
                            <span class="countdown-time-label">Days</span>
                            <div class="countdown-time-digits">
                                <div class="countdown-digit">
                                    <span class="countdown-digit-text">{{ Math.floor(countdown.days / 10) }}</span>
                                </div>
                                <div class="countdown-digit">
                                    <span class="countdown-digit-text">{{ countdown.days % 10 }}</span>
                                </div>
                            </div>
                        </div>
                        <span class="countdown-separator">:</span>
                        <div class="countdown-time-unit">
                            <span class="countdown-time-label">Hours</span>
                            <div class="countdown-time-digits">
                                <div class="countdown-digit">
                                    <span class="countdown-digit-text">{{ Math.floor(countdown.hours / 10) }}</span>
                                </div>
                                <div class="countdown-digit">
                                    <span class="countdown-digit-text">{{ countdown.hours % 10 }}</span>
                                </div>
                            </div>
                        </div>
                        <span class="countdown-separator">:</span>
                        <div class="countdown-time-unit">
                            <span class="countdown-time-label">Minutes</span>
                            <div class="countdown-time-digits">
                                <div class="countdown-digit">
                                    <span class="countdown-digit-text">{{ Math.floor(countdown.minutes / 10) }}</span>
                                </div>
                                <div class="countdown-digit">
                                    <span class="countdown-digit-text">{{ countdown.minutes % 10 }}</span>
                                </div>
                            </div>
                        </div>
                        <span class="countdown-separator">:</span>
                        <div class="countdown-time-unit">
                            <span class="countdown-time-label">Seconds</span>
                            <div class="countdown-time-digits">
                                <div class="countdown-digit">
                                    <span class="countdown-digit-text">{{ Math.floor(countdown.seconds / 10) }}</span>
                                </div>
                                <div class="countdown-digit">
                                    <span class="countdown-digit-text">{{ countdown.seconds % 10 }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Bottom Section with Shop Now Button -->
                 <section class="countdown-bottom-section">
                    <div class="countdown-bottom">
                    <ShopNowBlue />
                </div>
                
                <div class="carousel-navigation">
                    <button @click="goToPrevious" class="carousel-nav-btn carousel-nav-prev">
                        <Icon name="heroicons:chevron-left" size="20" color="black" />
                    </button>
                    <button @click="goToNext" class="carousel-nav-btn carousel-nav-next">
                        <Icon name="heroicons:chevron-right" size="20" color="black" />
                    </button>
                </div>
                 </section>
                
            </div>
        </div>

        <!-- Carousel Cards Section (Right Side) -->
        <div class="carousel-section">
            <!-- Carousel Navigation Buttons -->
            <!-- <div class="carousel-navigation">
                <button @click="goToPrevious" class="carousel-nav-btn carousel-nav-prev">
                    <Icon name="heroicons:chevron-left" size="20" color="black" />
                </button>
                <button @click="goToNext" class="carousel-nav-btn carousel-nav-next">
                    <Icon name="heroicons:chevron-right" size="20" color="black" />
                </button>
            </div> -->
            
            <UCarousel 
                ref="carousel"
                v-slot="{ item }" 
                :items="carouselSlides" 
                class="carousel-nuxt"
                :slides-per-view="3"
                :space-between="16"
                :prev="{ onClick: goToPrevious }"
                :next="{ onClick: goToNext }"
                :ui="{
                    item: 'carousel-slide basis-1/3',
                    container: 'carousel-container gap-4 !mt-1 !ml-4 !mr-4',
                    track: 'carousel-track'
                }"
            >
                <div class="carousel-card">
                    <div class="carousel-image-container">
                        <img 
                            :src="item.image" 
                            :alt="item.title"
                            class="carousel-image"
                        />
                    </div>
                    <div class="carousel-content">
                        <h3 class="carousel-title">{{ item.title }}</h3>
                        <p class="carousel-stock">{{ item.itemCount }} in stock</p>
                    </div>
                    <div class="carousel-price-section">
                        <p class="carousel-old-price">{{ item.itemOldPrice }}<span class="carousel-old-price-currency">৳</span></p>
                        <div class="carousel-price-row">
                            <p class="carousel-current-price">{{ item.itemPrice }}<span class="carousel-current-price-currency">৳</span></p>
                            <button class="carousel-cart-button">
                                <svg class="carousel-cart-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17 18C17.5304 18 18.0391 18.2107 18.4142 18.5858C18.7893 18.9609 19 19.4696 19 20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22C16.4696 22 15.9609 21.7893 15.5858 21.4142C15.2107 21.0391 15 20.5304 15 20C15 18.89 15.89 18 17 18ZM1 2H4.27L5.21 4H20C20.2652 4 20.5196 4.10536 20.7071 4.29289C20.8946 4.48043 21 4.73478 21 5C21 5.17 20.95 5.34 20.88 5.5L17.3 11.97C16.96 12.58 16.3 13 15.55 13H8.1L7.2 14.63L7.17 14.75C7.17 14.8163 7.19634 14.8799 7.24322 14.9268C7.29011 14.9737 7.3537 15 7.42 15H19V17H7C6.46957 17 5.96086 16.7893 5.58579 16.4142C5.21071 16.0391 5 15.5304 5 15C5 14.65 5.09 14.32 5.24 14.04L6.6 11.59L3 4H1V2ZM7 18C7.53043 18 8.03914 18.2107 8.41421 18.5858C8.78929 18.9609 9 19.4696 9 20C9 20.5304 8.78929 21.0391 8.41421 21.4142C8.03914 21.7893 7.53043 22 7 22C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20C5 18.89 5.89 18 7 18ZM16 11L18.78 6H12.46H6.14L8.5 11H16Z" fill="white"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <!-- <button class="carousel-shop-button">
                        Shop Now
                    </button> -->
                </div>
            </UCarousel>
        </div>
    </section>
    
    <!-- Mobile Version -->
    <SaleOfferCountdownMobile />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue'
import ShopNowBlue from './ShopNowBlue.vue'
import SaleOfferCountdownMobile from './SaleOfferCountdownMobile.vue'
// import UCarousel from '@nuxt/ui'

// Countdown state
const countdown = ref({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
})

const carousel = useTemplateRef('carousel')

// Manual navigation functions
const goToNext = () => {
  console.log('Next button clicked, carousel:', carousel.value)
  carousel.value.emblaApi.scrollNext()
}

const goToPrevious = () => {
  console.log('Previous button clicked, carousel:', carousel.value)
  carousel.value.emblaApi.scrollPrev()
}

// Carousel data
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

// Keyboard navigation handler
const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
        event.preventDefault()
        goToPrevious()
    } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        goToNext()
    }
}

// Start countdown timer and add keyboard listeners
onMounted(() => {
    calculateTimeRemaining()
    interval = setInterval(calculateTimeRemaining, 1000)
    
    // Add keyboard event listener
    document.addEventListener('keydown', handleKeydown)
})

// Cleanup interval and event listeners on component unmount
onUnmounted(() => {
    if (interval) {
        clearInterval(interval)
    }
    
    // Remove keyboard event listener
    document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
@import './SaleOfferCountdown.css';
</style>