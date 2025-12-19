<template>
    <main class="category-container">
        <section class="category-header">
            <div class="category-title">
                <div><span class="category-title-light">Shop by</span> <span class="category-title-bold">Category</span>
                </div>
            </div>
        </section>
        <section class="shop-by-category-section">
            <div class="flex gap-2 mb-2!">
                <NuxtLink to="/products/men" class="relative flex-[1] aspect-square">
                    <NuxtImg 
                        src="/shop-by-category/shop-by-category-1.png" 
                        alt="Explore Rang" 
                        class="w-full h-full! object-cover rounded-lg!"
                        format="webp" 
                        quality="85" 
                        loading="lazy" 
                    />
                    <div class="absolute text-xl! md:text-2xl! lg:text-4xl! top-2 left-2 md:top-10 md:left-10 z-20 explore-rang-top-text">Men</div>
                    <div class="explore-rang-bottom-text text-sm! md:text-xl! lg:text-2xl! absolute bottom-2 right-2 md:bottom-10 md:right-10 z-20 cursor-pointer text-white hover:text-[#ea580c]">Shop Now</div>
                </NuxtLink>
                <NuxtLink to="/products/women" class="relative flex-[1.5] aspect-[1.73]">
                    <NuxtImg 
                        src="/shop-by-category/shop-by-category-2.png" 
                        alt="Explore Rang" 
                        class="w-full h-full! object-cover rounded-lg!"
                        format="webp" 
                        quality="85" 
                        loading="lazy" 
                    />
                    <div class="absolute text-xl! md:text-2xl! lg:text-4xl!  top-2 left-2 md:top-10 md:left-10 z-20 explore-rang-top-text">Women</div>
                    <div class="explore-rang-bottom-text text-sm! md:text-xl! lg:text-2xl! absolute bottom-2 right-2 md:bottom-10 md:right-10 z-20 cursor-pointer text-white hover:text-[#ea580c]">Shop Now</div>
                </NuxtLink>
            </div>
            <div class="flex gap-2">
                <NuxtLink to="/products/kids" class="relative flex-[1] aspect-[0.82]">
                    <NuxtImg 
                        src="/explore/explore-1.png" 
                        alt="Explore Rang" 
                        class="w-full h-full! object-cover object-left rounded-lg!"
                        format="webp" 
                        quality="85" 
                        loading="lazy" 
                    />
                    <div class="absolute text-xl! md:text-2xl! lg:text-4xl! top-2 left-2 md:top-10 md:left-10 z-20 explore-rang-top-text">Kids</div>
                    <div class="explore-rang-bottom-text text-sm! md:text-xl! lg:text-2xl! absolute bottom-2 right-2 md:bottom-10 md:right-10 z-20 cursor-pointer text-white hover:text-[#ea580c]">Shop Now</div>
                </NuxtLink>
                <NuxtLink to="/products/home-decor" class="relative flex-[1] aspect-[0.82]">
                    <NuxtImg 
                        src="/shop-by-category/shop-by-category-44.jpg" 
                        alt="Explore Rang" 
                       class="w-full h-full! object-cover rounded-lg!"
                        style="height: 100%;" 
                        format="webp" 
                        quality="85" 
                        loading="lazy" 
                    />
                    <div class="absolute text-xl! md:text-2xl! lg:text-4xl! top-2 left-2 md:top-10 md:left-10 z-20 explore-rang-top-text">Home Decor</div>
                    <div class="explore-rang-bottom-text text-sm! md:text-xl! lg:text-2xl! absolute bottom-2 right-2 md:bottom-10 md:right-10 z-20 cursor-pointer text-white hover:text-[#ea580c]">Shop Now</div>
                </NuxtLink>
                <NuxtLink to="/products/accessories" class="relative flex-[1] aspect-[0.82]">
                    <NuxtImg 
                        src="/shop-by-category/shop-by-category-55.jpg" 
                        alt="Explore Rang" 
                       class="w-full h-full! object-cover rounded-lg!"
                        style="height: 100%;" 
                        format="webp" 
                        quality="85" 
                        loading="lazy" 
                    />
                    <div class="absolute text-xl! md:text-2xl! lg:text-4xl! top-2 left-2 md:top-10 md:left-10 z-20 explore-rang-top-text">Accessories</div>
                    <div class="explore-rang-bottom-text text-sm! md:text-xl! lg:text-2xl! absolute bottom-2 right-2 md:bottom-10 md:right-10 z-20 cursor-pointer text-white hover:text-[#ea580c]">Shop Now</div>
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
