<template>
    <main class="timeless-container">
        <section class="timeless-header">
            <div class="timeless-title">
                <div><span class="timeless-title-light">Timeless</span> <span class="timeless-title-bold">Six Yards</span></div>
            </div>
        </section>
        <section>
            <div class="timeless-grid">
                <div 
                    v-for="(image, index) in timelessImages" 
                    :key="index"
                    class="timeless-image-container"
                >
                    <img 
                        :src="image.src" 
                        :alt="image.alt" 
                        class="timeless-image"
                    />
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-lg">
                        <h3 class="timeless-name-light">{{ image.title }}</h3>
                        <p class="shop-now-blue-button-div">
                            <ShopNowWhite />
                        </p>
                    </div>
                </div>
            </div>
            
        </section>
    </main>
</template>

<script setup lang="ts">
import ShopNowWhite from './ShopNowWhite.vue'
const timelessImages = [
    {
        src: '/timeless/timeless-1.png',
        alt: 'Timeless Rang',
        title: 'Banarasi Saree'
    },
    {
        src: '/timeless/timeless-2.png',
        alt: 'Timeless Rang',
        title: 'Jamdani Saree'
    },
    {
        src: '/timeless/timeless-1.png',
        alt: 'Timeless Rang',
        title: 'Silk Saree'
    },
    {
        src: '/timeless/timeless-2.png',
        alt: 'Timeless Rang',
        title: 'Cotton Saree'
    }
]
</script>

<style scoped>
@import './TimelessSixYards.css';
</style>
