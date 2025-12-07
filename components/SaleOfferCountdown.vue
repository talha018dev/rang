<template>
    <!-- Desktop Version -->
    <section  class="countdown-section">
        <!-- Countdown Card (Left Side) -->
        <div v-if="!isMobile" class="countdown-card">
            <!-- Background Image -->
            <NuxtImg src="/landing-image.png" alt="Deals of the Month" class="countdown-background" format="webp" quality="85" loading="eager" />
            
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
        <SaleOfferCountdownMobile v-if="isMobile" />
        <!-- Carousel Cards Section (Right Side) -->
        <div v-if="carouselItems.length > 0" class="carousel-section">
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
                :items="carouselItems" 
                class="carousel-nuxt"
                :slides-per-view="3"
                :space-between="16"
                :prev="{ onClick: goToPrevious }"
                :next="{ onClick: goToNext }"
                :ui="{
                    item: 'carousel-slide basis-1/3 w-24',
                    container: 'carousel-container gap-4 !mt-1 !ml-4 !mr-4'
                }"
            >
                <div class="carousel-card">
                    <NuxtLink :to="`/products/${item.slug}`" class="carousel-link">
                        <div class="carousel-image-container">
                            <NuxtImg 
                                :src="getImageUrl(item.image)" 
                                :alt="item.name"
                                class="carousel-image"
                                loading="lazy"
                                format="webp"
                                quality="85"
                            />
                        </div>
                        <div class="carousel-content">
                            <h3 class="carousel-title">{{ item.name }}</h3>
                            <p class="carousel-stock">{{ item.variants?.length || 0 }} in stock</p>
                        </div>
                        <div class="carousel-price-section">
                            <p v-if="item.compare_price > item.price" class="carousel-old-price">{{ formatPrice(item.compare_price) }}</p>
                            <div class="carousel-price-row">
                                <p class="carousel-current-price">{{ formatPrice(item.price) }}</p>
                                <button class="carousel-cart-button" @click.stop="handleAddToCart(item)">
                                    <svg class="carousel-cart-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17 18C17.5304 18 18.0391 18.2107 18.4142 18.5858C18.7893 18.9609 19 19.4696 19 20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22C16.4696 22 15.9609 21.7893 15.5858 21.4142C15.2107 21.0391 15 20.5304 15 20C15 18.89 15.89 18 17 18ZM1 2H4.27L5.21 4H20C20.2652 4 20.5196 4.10536 20.7071 4.29289C20.8946 4.48043 21 4.73478 21 5C21 5.17 20.95 5.34 20.88 5.5L17.3 11.97C16.96 12.58 16.3 13 15.55 13H8.1L7.2 14.63L7.17 14.75C7.17 14.8163 7.19634 14.8799 7.24322 14.9268C7.29011 14.9737 7.3537 15 7.42 15H19V17H7C6.46957 17 5.96086 16.7893 5.58579 16.4142C5.21071 16.0391 5 15.5304 5 15C5 14.65 5.09 14.32 5.24 14.04L6.6 11.59L3 4H1V2ZM7 18C7.53043 18 8.03914 18.2107 8.41421 18.5858C8.78929 18.9609 9 19.4696 9 20C9 20.5304 8.78929 21.0391 8.41421 21.4142C8.03914 21.7893 7.53043 22 7 22C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20C5 18.89 5.89 18 7 18ZM16 11L18.78 6H12.46H6.14L8.5 11H16Z" fill="white"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </NuxtLink>
                </div>
            </UCarousel>
        </div>
    </section>
    
    <!-- Mobile Version -->
    
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, useTemplateRef } from 'vue'
import { useCart } from '../composables/useCart'
import { useCurrency } from '../composables/useCurrency'
import type { Product } from '../types/homepage'
import SaleOfferCountdownMobile from './SaleOfferCountdownMobile.vue'
import ShopNowBlue from './ShopNowBlue.vue'

interface Props {
  products?: Product[]
}

const props = withDefaults(defineProps<Props>(), {
  products: () => []
})

// Countdown state
const countdown = ref({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
})

// Mobile state
const isMobile = ref(false)

const carousel = useTemplateRef('carousel')

// Manual navigation functions
const goToNext = () => {
  console.log('Next button clicked, carousel:', carousel.value)
  if (carousel.value?.emblaApi) {
    carousel.value.emblaApi.scrollNext()
  }
}

const goToPrevious = () => {
  console.log('Previous button clicked, carousel:', carousel.value)
  if (carousel.value?.emblaApi) {
    carousel.value.emblaApi.scrollPrev()
  }
}

// Computed property to transform API products into carousel items
const carouselItems = computed<Product[]>(() => {
  if (!props.products || !Array.isArray(props.products) || props.products.length === 0) {
    // Return empty array if no products - carousel will handle empty state
    console.log('No products found for carousel')
    return []
  }
  
  const filtered = props.products.filter(product => product && product.id)
  console.log('Carousel items:', filtered)
  console.log('First product image:', filtered[0]?.image)
  return filtered
})

// Helper function to get full image URL
const getImageUrl = (imagePath: string): string => {
  if (!imagePath) {
    console.warn('Image path is empty')
    return ''
  }
  // If image path already includes http/https, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }
  // Otherwise, prepend the API base URL
  const fullUrl = `https://rangbd.thecell.tech${imagePath.startsWith('/') ? imagePath : '/' + imagePath}`
  console.log('Image URL:', fullUrl)
  return fullUrl
}

// Cart functionality
const { addToCart } = useCart()
const { formatPrice } = useCurrency()

const handleAddToCart = (product: Product) => {
  const firstVariant = product.variants?.[0]
  const size = firstVariant?.attributes?.size
  const color = firstVariant?.attributes?.color
  const variantPrice = firstVariant?.price || product.price
  const variantPriceUsd = firstVariant?.price_usd || product.price_usd

  addToCart({
    id: product.id.toString(),
    name: product.name,
    price: variantPrice,
    price_usd: variantPriceUsd,
    priceDisplay: formatPrice(variantPrice, variantPriceUsd),
    image: getImageUrl(product.image),
    size: size,
    color: color,
    sku: product.sku
  })
  
}

// Set target date (30 days from now)
const targetDate = new Date()
targetDate.setDate(targetDate.getDate() + 30)

let interval: ReturnType<typeof setInterval> | null = null

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

// Handle responsive behavior
const handleResize = () => {
    isMobile.value = window.innerWidth < 600
}

// Start countdown timer and add keyboard listeners
onMounted(() => {
    calculateTimeRemaining()
    interval = setInterval(calculateTimeRemaining, 1000)
    
    // Add keyboard event listener
    document.addEventListener('keydown', handleKeydown)
    
    // Add resize listener
    handleResize()
    window.addEventListener('resize', handleResize)
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