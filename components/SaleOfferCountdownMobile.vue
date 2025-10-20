<template>
    <section class="countdown-mobile-section">
        <!-- Mobile Countdown Card -->
        <div class="countdown-mobile-card">
            <!-- Background Image -->
            <div class="countdown-mobile-background" style="background-image: url('/landing-image.png')"></div>
            
            <!-- Content Overlay -->
            <div class="countdown-mobile-content">
                <!-- Top Section with Headline -->
                <div class="countdown-mobile-top">
                    <div class="countdown-mobile-text">
                        <h2 class="countdown-mobile-headline">
                            <span class="">Deals of the <span class="countdown-mobile-headline-block">Month</span></span>
                        </h2>
                    </div>
                </div>
                
                <!-- Countdown Timer -->
                <div class="countdown-mobile-timer">
                    <div class="countdown-mobile-timer-container">
                        <div class="countdown-mobile-time-unit">
                            <span class="countdown-mobile-time-label">Days</span>
                            <div class="countdown-mobile-time-digits">
                                <div class="countdown-mobile-digit">
                                    <span class="countdown-mobile-digit-text">{{ Math.floor(countdown.days / 10) }}</span>
                                </div>
                                <div class="countdown-mobile-digit">
                                    <span class="countdown-mobile-digit-text">{{ countdown.days % 10 }}</span>
                                </div>
                            </div>
                        </div>
                        <span class="countdown-mobile-separator">:</span>
                        <div class="countdown-mobile-time-unit">
                            <span class="countdown-mobile-time-label">Hours</span>
                            <div class="countdown-mobile-time-digits">
                                <div class="countdown-mobile-digit">
                                    <span class="countdown-mobile-digit-text">{{ Math.floor(countdown.hours / 10) }}</span>
                                </div>
                                <div class="countdown-mobile-digit">
                                    <span class="countdown-mobile-digit-text">{{ countdown.hours % 10 }}</span>
                                </div>
                            </div>
                        </div>
                        <span class="countdown-mobile-separator">:</span>
                        <div class="countdown-mobile-time-unit">
                            <span class="countdown-mobile-time-label">Minutes</span>
                            <div class="countdown-mobile-time-digits">
                                <div class="countdown-mobile-digit">
                                    <span class="countdown-mobile-digit-text">{{ Math.floor(countdown.minutes / 10) }}</span>
                                </div>
                                <div class="countdown-mobile-digit">
                                    <span class="countdown-mobile-digit-text">{{ countdown.minutes % 10 }}</span>
                                </div>
                            </div>
                        </div>
                        <span class="countdown-mobile-separator">:</span>
                        <div class="countdown-mobile-time-unit">
                            <span class="countdown-mobile-time-label">Seconds</span>
                            <div class="countdown-mobile-time-digits">
                                <div class="countdown-mobile-digit">
                                    <span class="countdown-mobile-digit-text">{{ Math.floor(countdown.seconds / 10) }}</span>
                                </div>
                                <div class="countdown-mobile-digit">
                                    <span class="countdown-mobile-digit-text">{{ countdown.seconds % 10 }}</span>
                                </div>
                            </div>
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

<style scoped>
@import './SaleOfferCountdownMobile.css';
</style>