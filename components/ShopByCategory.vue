<template>
    <main class="category-container">
        <section class="category-header">
            <div class="category-title">
                <div><span class="category-title-light">Shop by</span> <span class="category-title-bold">Category</span>
                </div>
            </div>
        </section>
        <section>
            <div class="category-grid-main">
                <NuxtLink to="/products/men">
                    <div class="image-div category-grid-main-men">
                        <NuxtImg src="/shop-by-category/shop-by-category-1.png" alt="Category Rang"
                            class="category-image-rounded" format="webp" quality="85" loading="lazy" />
                        <div class="image-div-text top-left">
                            <div>Men</div>
                        </div>
                        <div class="bottom-right absolute">
                            <ShopNowBlue />
                        </div>
                    </div>
                </NuxtLink>
                <NuxtLink to="/products/women">
                    <div class="category-grid-main-women">
                        <NuxtImg src="/shop-by-category/shop-by-category-2.png" alt="Category Rang"
                            class="category-image-rounded" format="webp" quality="85" loading="lazy" />
                        <div class="image-div-text top-left">
                            <div>Women</div>
                        </div>
                        <div class="bottom-right absolute">
                            <ShopNowBlue />
                        </div>
                    </div>
                </NuxtLink>
            </div>
            <div class="category-grid-secondary">
                <NuxtLink to="/products/kids" style="height: 600px;">
                    <div class="image-div">
                        <NuxtImg style="object-position: left;" src="/explore/explore-1.png" alt="Category Rang"
                            class="category-image" format="webp" quality="85" loading="lazy" />
                        <div class="image-div-text top-left">
                            <div>Kids</div>
                        </div>
                        <div class="bottom-right absolute">
                            <ShopNowBlue />
                        </div>
                    </div>
                </NuxtLink>
                <NuxtLink to="/products/home-decor" style="height: 600px;">
                    <div class="image-div">
                        <NuxtImg src="/shop-by-category/shop-by-category-44.jpg" alt="Category Rang"
                            class="category-image" format="webp" quality="85" loading="lazy" />
                        <div class="image-div-text top-left">
                            <div>Home Decor</div>
                        </div>
                        <div class="bottom-right absolute">
                            <ShopNowBlue />
                        </div>
                    </div>
                </NuxtLink>
                <NuxtLink to="/products/accessories" style="height: 600px;">
                    <div class="image-div">
                        <NuxtImg src="/shop-by-category/shop-by-category-55.jpg" alt="Category Rang"
                            class="category-image-rounded" format="webp" quality="85" loading="lazy" />
                        <div class="image-div-text top-left">
                            <div>Accessories</div>
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
@import './ShopByCategory.css';
</style>
