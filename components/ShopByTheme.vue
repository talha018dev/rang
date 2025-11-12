<template>
    <main class="theme-container">
        <section class="theme-header">
            <div class="theme-title">
                <div><span class="theme-title-light">Shop by</span> <span class="theme-title-bold">Theme</span></div>
            </div>
        </section>
        <section>
            <!-- Desktop Grid View -->
            <div class="theme-grid">
                <div v-for="(theme, index) in themeImages" :key="index" class="theme-image-container">
                    <NuxtLink :to="theme.link">
                        <NuxtImg :src="theme.src" :alt="theme.alt" class="theme-image" format="webp" quality="85" loading="lazy" />
                        <div
                            class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-lg">
                            <h3 class="theme-name-light">{{ theme.title }}</h3>
                            <p class="shop-now-blue-button-div">
                                <ShopNowBlue />
                            </p>
                        </div>
                    </NuxtLink>
                </div>
            </div>

            <!-- Mobile Carousel View -->
            <div class="theme-carousel">
                <div class="carousel-container" @mousedown="handleMouseDown" @mousemove="handleMouseMove"
                    @mouseup="handleMouseUp" @mouseleave="handleMouseUp" @touchstart="handleTouchStart"
                    @touchmove="handleTouchMove" @touchend="handleTouchEnd">
                    <div class="carousel-track" :style="{
                        transform: `translateX(${-currentSlide * slideWidth + dragOffset}px)`,
                        transition: isDragging ? 'none' : 'transform 0.3s ease-in-out'
                    }">
                        <div v-for="(theme, index) in themeImages" :key="index" class="carousel-slide">
                            <div class="theme-image-container">
                                <NuxtLink :to="theme.link">
                                    <NuxtImg :src="theme.src" :alt="theme.alt" class="theme-image carousel-image" format="webp" quality="85" loading="lazy" />
                                    <div
                                        class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-lg">
                                        <h3 class="theme-name-light">{{ theme.title }}</h3>
                                        <p class="shop-now-blue-button-div">
                                            <ShopNowBlue />
                                        </p>
                                    </div>
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import ShopNowBlue from './ShopNowBlue.vue'

const themeImages = [
    {
        src: '/theme/theme-1.png',
        alt: 'Theme Rang',
        title: 'Wedding',
        link: '/products/wedding'
    },
    {
        src: '/theme/theme-2.png',
        alt: 'Theme Rang',
        title: 'EID',
        link: '/products/eid'
    },
    {
        src: '/theme/theme-1.png',
        alt: 'Theme Rang',
        title: 'Gaye Holud',
        link: '/products/gaye-holud'
    },
    {
        src: '/theme/theme-2.png',
        alt: 'Theme Rang',
        title: 'Durga Puja',
        link: '/products/durga-puja'
    }
]

// Carousel state
const currentSlide = ref(0)
const slideWidth = ref(0)
const isMobile = ref(false)

// Drag and touch state
const isDragging = ref(false)
const dragOffset = ref(0)
const startX = ref(0)
const startY = ref(0)
const lastX = ref(0)
const isTouch = ref(false)

// Calculate max slide based on showing 2.25 images
const maxSlide = computed(() => {
    if (!isMobile.value) return 0
    return Math.max(0, themeImages.length - 2.25)
})

// Carousel methods
const nextSlide = () => {
    if (currentSlide.value < maxSlide.value) {
        currentSlide.value++
    }
}

const prevSlide = () => {
    if (currentSlide.value > 0) {
        currentSlide.value--
    }
}

// Mouse event handlers
const handleMouseDown = (e: MouseEvent) => {
    if (!isMobile.value) return
    isDragging.value = true
    startX.value = e.clientX
    lastX.value = e.clientX
    dragOffset.value = 0
}

const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.value || !isMobile.value) return
    e.preventDefault()

    const deltaX = e.clientX - startX.value
    dragOffset.value = deltaX
}

const handleMouseUp = () => {
    if (!isDragging.value || !isMobile.value) return
    isDragging.value = false

    const threshold = slideWidth.value * 0.3

    if (Math.abs(dragOffset.value) > threshold) {
        if (dragOffset.value > 0) {
            prevSlide()
        } else {
            nextSlide()
        }
    }

    dragOffset.value = 0
}

// Touch event handlers
const handleTouchStart = (e: TouchEvent) => {
    if (!isMobile.value) return
    isTouch.value = true
    isDragging.value = true
    startX.value = e.touches[0]?.clientX || 0
    startY.value = e.touches[0]?.clientY || 0
    lastX.value = e.touches[0]?.clientX || 0
    dragOffset.value = 0
}

const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.value || !isMobile.value) return

    const touch = e.touches[0]
    const deltaX = (touch?.clientX || 0) - startX.value
    const deltaY = (touch?.clientY || 0) - startY.value

    // Only prevent default if horizontal swipe is more significant than vertical
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        e.preventDefault()
        dragOffset.value = deltaX
    }
}

const handleTouchEnd = () => {
    if (!isDragging.value || !isMobile.value) return
    isDragging.value = false
    isTouch.value = false

    const threshold = slideWidth.value * 0.3

    if (Math.abs(dragOffset.value) > threshold) {
        if (dragOffset.value > 0) {
            prevSlide()
        } else {
            nextSlide()
        }
    }

    dragOffset.value = 0
}

// Handle responsive behavior
const handleResize = () => {
    isMobile.value = window.innerWidth < 600
    if (isMobile.value) {
        // Calculate slide width for mobile (2.25 images visible)
        const containerWidth = window.innerWidth * 0.9 // 90% of screen width
        slideWidth.value = containerWidth / 2.25
    }
}

onMounted(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
@import './ShopByTheme.css';
</style>
