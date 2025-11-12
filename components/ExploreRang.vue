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
                        <div class="image-div-text bottom-left">
                            <div class="small-image-text">See what’s new in our</div>
                            <div>Family</div>
                            <p>Collection</p>
                        </div>
                        <div class="image-shop-now">Shop Now
                            <Icon name="heroicons:chevron-right" />
                        </div>
                    </div>
                </NuxtLink>
                <NuxtLink to="/products/jewelry">
                    <NuxtImg src="/explore-2.png" alt="Explore Rang" class="explore-image-rounded" format="webp" quality="85" loading="lazy" />
                </NuxtLink>
            </div>
            <div class="explore-grid-secondary">
                <NuxtLink to="/products/matching">
                    <NuxtImg src="/explore-3.png" alt="Explore Rang" class="explore-image" format="webp" quality="85" loading="lazy" />
                </NuxtLink>
                <NuxtLink to="/products/couple">
                    <NuxtImg src="/explore-44.png" alt="Explore Rang" class="explore-image" format="webp" quality="85" loading="lazy" />
                </NuxtLink>
                <NuxtLink to="/products/gifts-crafts">
                    <div class="explore-image-container">
                        <NuxtImg src="/explore-55.png" alt="Explore Rang" class="explore-image-rounded" format="webp" quality="85" loading="lazy" />
                    </div>
                </NuxtLink>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">

</script>

<style scoped>
@import './ExploreRang.css';
</style>
