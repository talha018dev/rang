<template>
    <main v-if="categoryItems.length > 0" class="category-container">
        <section class="category-header">
            <div class="category-title">
                <div><span class="category-title-light">Shop by</span> <span class="category-title-bold">Category</span>
                </div>
            </div>
        </section>
        <section class="shop-by-category-section">
            <!-- First Row: First 2 items -->
            <div v-if="categoryItems.length >= 2 && categoryItems[0] && categoryItems[1]" class="flex gap-2 mb-2!">
                <NuxtLink 
                    :to="categoryItems[0]?.url || '#'" 
                    class="relative flex-[1] aspect-square"
                >
                    <NuxtImg 
                        :src="getImageUrl(categoryItems[0]?.image?.preview_url || categoryItems[0]?.image?.original_url || '')" 
                        :alt="categoryItems[0]?.title || 'Shop by Category'" 
                        class="w-full h-full! object-cover rounded-lg!"
                        format="webp" 
                        quality="85" 
                        loading="lazy" 
                    />
                    <div class="absolute text-xl! md:text-2xl! lg:text-4xl! top-2 left-2 md:top-10 md:left-10 z-20 explore-rang-top-text">{{ categoryItems[0]?.title }}</div>
                    <div class="explore-rang-bottom-text text-sm! md:text-xl! lg:text-2xl! absolute bottom-2 right-2 md:bottom-10 md:right-10 z-20 cursor-pointer text-white hover:text-[#ea580c]">Shop Now</div>
                </NuxtLink>
                <NuxtLink 
                    :to="categoryItems[1]?.url || '#'" 
                    class="relative flex-[1.5] aspect-[1.73]"
                >
                    <NuxtImg 
                        :src="getImageUrl(categoryItems[1]?.image?.preview_url || categoryItems[1]?.image?.original_url || '')" 
                        :alt="categoryItems[1]?.title || 'Shop by Category'" 
                        class="w-full h-full! object-cover rounded-lg!"
                        format="webp" 
                        quality="85" 
                        loading="lazy" 
                    />
                    <div class="absolute text-xl! md:text-2xl! lg:text-4xl! top-2 left-2 md:top-10 md:left-10 z-20 explore-rang-top-text">{{ categoryItems[1]?.title }}</div>
                    <div class="explore-rang-bottom-text text-sm! md:text-xl! lg:text-2xl! absolute bottom-2 right-2 md:bottom-10 md:right-10 z-20 cursor-pointer text-white hover:text-[#ea580c]">Shop Now</div>
                </NuxtLink>
            </div>
            <!-- Single item fallback (if only 1 item) -->
            <div v-else-if="categoryItems.length === 1 && categoryItems[0]" class="flex gap-2 mb-2!">
                <NuxtLink 
                    :to="categoryItems[0]?.url || '#'" 
                    class="relative flex-[1] aspect-square"
                >
                    <NuxtImg 
                        :src="getImageUrl(categoryItems[0]?.image?.preview_url || categoryItems[0]?.image?.original_url || '')" 
                        :alt="categoryItems[0]?.title || 'Shop by Category'" 
                        class="w-full h-full! object-cover rounded-lg!"
                        format="webp" 
                        quality="85" 
                        loading="lazy" 
                    />
                    <div class="absolute text-xl! md:text-2xl! lg:text-4xl! top-2 left-2 md:top-10 md:left-10 z-20 explore-rang-top-text">{{ categoryItems[0]?.title }}</div>
                    <div class="explore-rang-bottom-text text-sm! md:text-xl! lg:text-2xl! absolute bottom-2 right-2 md:bottom-10 md:right-10 z-20 cursor-pointer text-white hover:text-[#ea580c]">Shop Now</div>
                </NuxtLink>
            </div>
            <!-- Second Row: Remaining items (3rd item onwards) -->
            <div v-if="categoryItems.length > 2" class="flex gap-2">
                <NuxtLink 
                    v-for="(item, index) in categoryItems.slice(2)" 
                    :key="index"
                    :to="item?.url || '#'" 
                    class="relative flex-[1] aspect-[0.82]"
                >
                    <NuxtImg 
                        :src="getImageUrl(item?.image?.preview_url || item?.image?.original_url || '')" 
                        :alt="item?.title || 'Shop by Category'" 
                        class="w-full h-full! object-cover rounded-lg!"
                        style="height: 100%;" 
                        format="webp" 
                        quality="85" 
                        loading="lazy" 
                    />
                    <div class="absolute text-xl! md:text-2xl! lg:text-4xl! top-2 left-2 md:top-10 md:left-10 z-20 explore-rang-top-text">{{ item?.title }}</div>
                    <div class="explore-rang-bottom-text text-sm! md:text-xl! lg:text-2xl! absolute bottom-2 right-2 md:bottom-10 md:right-10 z-20 cursor-pointer text-white hover:text-[#ea580c]">Shop Now</div>
                </NuxtLink>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { HomePageShopByCategory2 } from '../types/homepage';

interface Props {
  items?: HomePageShopByCategory2[]
}

const props = withDefaults(defineProps<Props>(), {
  items: () => []
})

const categoryItems = computed(() => {
  const items = props.items || []
  console.log('ShopByCategory - Received items:', items)
  console.log('ShopByCategory - Items length:', items.length)
  return items
})

// Helper function to get full image URL
const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return ''
  // If image path already includes http/https, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }
  // Otherwise, prepend the API base URL
  return `https://rangbd.thecell.tech${imagePath.startsWith('/') ? imagePath : '/' + imagePath}`
}
</script>

<style scoped>
@import './ShopByCategory.css';
</style>
