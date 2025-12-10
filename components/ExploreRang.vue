<template>
    <main class="explore-container">
        <section class="explore-header">
            <div class="explore-title">
                <div><span class="explore-title-light">Explore</span> <span class="explore-title-bold">Rang
                        Bangladesh</span></div>
            </div>
        </section>
        <section class="explore-rang2-section ">
            <div class="flex gap-2 mb-2!">
                <NuxtLink to="/products/family" class="relative flex-[1.5] aspect-[1.73]">
                    <NuxtImg 
                        src="/explore/explore-1.png" 
                        alt="Explore Rang" 
                        class="w-full h-full! object-cover rounded-lg!"
                        format="webp" 
                        quality="85" 
                        loading="lazy" 
                    />
                    <div class="absolute text-2xl! md:text-3xl! lg:text-6xl! top-2 left-2 md:top-10 md:left-10 z-20 explore-rang-top-text">Family</div>
                    <div class="explore-rang-bottom-text text-sm! md:text-xl! lg:text-2xl! absolute bottom-2 right-2 md:bottom-10 md:right-10 z-20 cursor-pointer text-white hover:text-[#ea580c]">Shop Now</div>
                </NuxtLink>
                <NuxtLink to="/products/jewelry" class="relative flex-[1] aspect-[1]">
                    <NuxtImg 
                        src="/explore/explore-22.png" 
                        alt="Explore Rang" 
                        class="w-full h-full! object-cover rounded-lg!"
                        format="webp" 
                        quality="85" 
                        loading="lazy" 
                    />
                    <div class="absolute text-2xl! md:text-3xl! lg:text-6xl!  top-2 left-2 md:top-10 md:left-10 z-20 explore-rang-top-text">Jewelry</div>
                    <div class="explore-rang-bottom-text text-sm! md:text-xl! lg:text-2xl! absolute bottom-2 right-2 md:bottom-10 md:right-10 z-20 cursor-pointer text-white hover:text-[#ea580c]">Shop Now</div>
                </NuxtLink>
            </div>
            <div class="flex gap-2">
                <NuxtLink to="/products/couple" class="relative flex-[1]  aspect-[0.82]">
                    <NuxtImg 
                        src="/explore/explore-33.jpg" 
                        alt="Explore Rang" 
                        class="w-full h-full! object-cover rounded-lg!"
                        format="webp" 
                        quality="85" 
                        loading="lazy" 
                    />
                    <div class="absolute text-2xl! md:text-3xl! lg:text-6xl! top-2 left-2 md:top-10 md:left-10 z-20 explore-rang-top-text">Matching</div>
                    <div class="explore-rang-bottom-text text-sm! md:text-xl! lg:text-2xl! absolute bottom-2 right-2 md:bottom-10 md:right-10 z-20 cursor-pointer text-white hover:text-[#ea580c]">Shop Now</div>
                </NuxtLink>
                <NuxtLink to="/products/gifts-crafts" class="relative flex-[1] aspect-[0.82]">
                    <NuxtImg 
                        src="/explore/explore-44.png" 
                        alt="Explore Rang" 
                       class="w-full h-full! object-cover rounded-lg!"
                        style="height: 100%;" 
                        format="webp" 
                        quality="85" 
                        loading="lazy" 
                    />
                    <div class="absolute text-2xl! md:text-3xl! lg:text-6xl! top-2 left-2 md:top-10 md:left-10 z-20 explore-rang-top-text">Couple</div>
                    <div class="explore-rang-bottom-text text-sm! md:text-xl! lg:text-2xl! absolute bottom-2 right-2 md:bottom-10 md:right-10 z-20 cursor-pointer text-white hover:text-[#ea580c]">Shop Now</div>
                </NuxtLink>
                <NuxtLink to="/products/gifts-crafts" class="relative flex-[1] aspect-[0.82]">
                    <NuxtImg 
                        src="/explore/explore-55.png" 
                        alt="Explore Rang" 
                       class="w-full h-full! object-cover rounded-lg!"
                        style="height: 100%;" 
                        format="webp" 
                        quality="85" 
                        loading="lazy" 
                    />
                    <div class="absolute text-2xl! md:text-3xl! lg:text-6xl! top-2 left-2 md:top-10 md:left-10 z-20 explore-rang-top-text">Gifts & Crafts</div>
                    <div class="explore-rang-bottom-text text-sm! md:text-xl! lg:text-2xl! absolute bottom-2 right-2 md:bottom-10 md:right-10 z-20 cursor-pointer text-white hover:text-[#ea580c]">Shop Now</div>
                </NuxtLink>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
import ShopNowWhite from './ShopNowWhite.vue';
</script>

<style scoped>
@import './ExploreRang.css';
</style>
