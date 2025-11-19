<template>
    <main class="explore-container">
        <section class="explore-header">
            <div class="explore-title">
                <div><span class="explore-title-light">Explore</span> <span class="explore-title-bold">Rang
                        Bangladesh</span></div>
            </div>
        </section>
        <section class="explore-grid-container">
            <div class="explore-grid-main">
                <NuxtLink to="/products/family">
                    <div class="image-div explore-grid-main-image">
                        <NuxtImg src="/explore/explore-1.png" alt="Explore Rang" class="category-image-rounded"
                            style="height: 100%;" format="webp" quality="85" loading="lazy" />
                        <div class="image-div-text top-left">
                            <div>Family</div>
                        </div>
                        <div class="bottom-right absolute">
                            <ShopNowBlue />
                        </div>
                    </div>
                </NuxtLink>
                <NuxtLink to="/products/jewelry">
                    <div class="image-div">
                        <NuxtImg src="/explore/explore-22.png" alt="Explore Rang" class="explore-image-rounded"
                            format="webp" quality="85" loading="lazy" />
                        <div class="image-div-text top-left">
                            <div>Jewelry</div>
                        </div>
                        <div class="bottom-right absolute">
                            <ShopNowBlue />
                        </div>
                    </div>
                </NuxtLink>
            </div>
            <div class="explore-grid-secondary">
                <NuxtLink to="/products/matching" style="height: 600px;">
                    <div class="image-div">
                        <NuxtImg src="/explore/explore-33.jpg" alt="Explore Rang" class="explore-image-rounded"
                            format="webp" quality="85" loading="lazy" />
                        <div class="image-div-text top-left">
                            <div>Matching</div>
                        </div>
                        <div class="bottom-right absolute">
                            <ShopNowBlue />
                        </div>
                    </div>
                </NuxtLink>
                <NuxtLink to="/products/couple" style="height: 600px;">
                    <div class="image-div">
                        <NuxtImg src="/explore/explore-44.png" alt="Explore Rang" class="explore-image-rounded"
                            format="webp" quality="85" loading="lazy" />
                        <div class="image-div-text top-left">
                            <div>Couple</div>
                        </div>
                        <div class="bottom-right absolute">
                            <ShopNowBlue />
                        </div>
                    </div>
                </NuxtLink>
                <NuxtLink to="/products/gifts-crafts" style="height: 600px;">
                    <div class="image-div">
                        <NuxtImg src="/explore/explore-55.png" alt="Explore Rang" class="explore-image-rounded"
                            format="webp" quality="85" loading="lazy" />
                        <div class="image-div-text top-left">
                            <div>Gifts & Crafts</div>
                        </div>
                        <div class="bottom-right absolute">
                            <ShopNowBlue />
                        </div>
                    </div>
                </NuxtLink>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
import ShopNowBlue from './ShopNowBlue.vue';
</script>

<style scoped>
@import './ExploreRang.css';
</style>
