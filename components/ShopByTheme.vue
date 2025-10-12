<template>
    <main class="theme-container">
        <section class="theme-header">
            <div class="theme-title">
                <div><span class="theme-title-light">Shop by</span> <span class="theme-title-bold">Theme</span></div>
            </div>
        </section>
        <section>
            <div class="theme-grid">
                <div 
                    v-for="(theme, index) in themeImages" 
                    :key="index"
                    class="theme-image-container"
                >
                    <img 
                        :src="theme.src" 
                        :alt="theme.alt" 
                        class="theme-image"
                    />
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-lg">
                        <h3 class="theme-name-light">{{ theme.title }}</h3>
                        <p class="shop-now-blue-button-div">
                            <ShopNowBlue />
                        </p>
                    </div>
                </div>
            </div>
            
        </section>
    </main>
</template>

<script setup lang="ts">
import ShopNowBlue from './ShopNowBlue.vue'

const themeImages = [
    {
        src: '/theme/theme-1.png',
        alt: 'Theme Rang',
        title: 'Wedding'
    },
    {
        src: '/theme/theme-2.png',
        alt: 'Theme Rang',
        title: 'EID'
    },
    {
        src: '/theme/theme-1.png',
        alt: 'Theme Rang',
        title: 'Gaye Holud'
    },
    {
        src: '/theme/theme-2.png',
        alt: 'Theme Rang',
        title: 'Durga Puja'
    }
]
</script>

<style scoped>
@import './ShopByTheme.css';
</style>
