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
                        <div class="image-div-text" style="top: 10px; left: 10px;">
                            <div>Men</div>
                            <span><span class="by">by</span> Rang Bangladesh</span>
                        </div>
                        <div class="image-shop-now">Shop Now
                            <Icon name="heroicons:chevron-right" />
                        </div>
                    </div>
                </NuxtLink>
                <NuxtLink to="/products/women">
                    <div class="category-grid-main-women">
                        <NuxtImg src="/shop-by-category/shop-by-category-2.png" alt="Category Rang"
                            class="category-image-rounded" format="webp" quality="85" loading="lazy" />
                        <div class="image-div-text bottom-left">
                            <div class="small-image-text">See what’s new in our</div>
                            <div>Women</div>
                            <p>Collection</p>
                        </div>
                        <div class="image-shop-now">Shop Now
                            <Icon name="heroicons:chevron-right" />
                        </div>
                    </div>
                </NuxtLink>
            </div>
            <div class="category-grid-secondary">
                <NuxtLink to="/products/kids">
                    <NuxtImg src="/category-3.png" alt="Category Rang" class="category-image" format="webp" quality="85" loading="lazy" />
                </NuxtLink>
                <NuxtLink to="/products/home-decor">
                    <NuxtImg src="/category-4.png" alt="Category Rang" class="category-image" format="webp" quality="85" loading="lazy" />
                </NuxtLink>
                <NuxtLink to="/products/accessories">
                    <div class="category-image-container">
                        <NuxtImg src="/category-5.png" alt="Category Rang" class="category-image-rounded" format="webp" quality="85" loading="lazy" />
                    </div>
                </NuxtLink>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">

</script>

<style scoped>
@import './ShopByCategory.css';
</style>
