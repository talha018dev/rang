<template>
    <main v-if="exploreItems.length > 0" class="explore-container">
        <section class="explore-header">
            <div class="explore-title">
                <div><span class="explore-title-light">Explore</span> <span class="explore-title-bold">Rang
                        Bangladesh</span></div>
            </div>
        </section>
        <section class="explore-rang2-section">
            <!-- First Row: First 2 items -->
            <div v-if="exploreItems.length >= 2 && exploreItems[0] && exploreItems[1]" class="flex gap-2 mb-2!">
                <NuxtLink 
                    :to="exploreItems[0]?.url || '#'" 
                    class="relative flex-[1.5] aspect-[1.73]"
                >
                    <NuxtImg 
                        :src="getImageUrl(exploreItems[0]?.image?.preview_url || exploreItems[0]?.image?.original_url || '')" 
                        :alt="exploreItems[0]?.title || 'Explore Rang'" 
                        class="w-full h-full! object-cover rounded-lg!"
                        format="webp" 
                        quality="80" 
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 60vw, 800px"
                        width="800"
                        height="462"
                    />
                    <div class="absolute text-xl! md:text-2xl! lg:text-4xl! top-2 left-2 md:top-10 md:left-10 z-20 explore-rang-top-text">{{ exploreItems[0]?.title }}</div>
                    <div class="explore-rang-bottom-text text-sm! md:text-xl! lg:text-2xl! absolute bottom-2 right-2 md:bottom-10 md:right-10 z-20">
                        <ShopNowCTA text="Shop Now" :url="exploreItems[0]?.url" />
                    </div>
                </NuxtLink>
                <NuxtLink 
                    :to="exploreItems[1]?.url || '#'" 
                    class="relative flex-[1] aspect-[1]"
                >
                    <NuxtImg 
                        :src="getImageUrl(exploreItems[1]?.image?.preview_url || exploreItems[1]?.image?.original_url || '')" 
                        :alt="exploreItems[1]?.title || 'Explore Rang'" 
                        class="w-full h-full! object-cover rounded-lg!"
                        format="webp" 
                        quality="80" 
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 40vw, 500px"
                        width="500"
                        height="500"
                    />
                    <div class="absolute text-xl! md:text-2xl! lg:text-4xl! top-2 left-2 md:top-10 md:left-10 z-20 explore-rang-top-text">{{ exploreItems[1]?.title }}</div>
                    <div class="explore-rang-bottom-text text-sm! md:text-xl! lg:text-2xl! absolute bottom-2 right-2 md:bottom-10 md:right-10 z-20">
                        <ShopNowCTA text="Shop Now" :url="exploreItems[1]?.url" />
                    </div>
                </NuxtLink>
            </div>
            <!-- Second Row: Remaining items -->
            <div v-if="exploreItems.length > 2" class="flex gap-2">
                <NuxtLink 
                    v-for="(item, index) in exploreItems.slice(2)" 
                    :key="index"
                    :to="item?.url || '#'" 
                    class="relative flex-[1] aspect-[0.82]"
                >
                    <NuxtImg 
                        :src="getImageUrl(item?.image?.preview_url || item?.image?.original_url || '')" 
                        :alt="item?.title || 'Explore Rang'" 
                        class="w-full h-full! object-cover rounded-lg!"
                        style="height: 100%;" 
                        format="webp" 
                        quality="85" 
                        loading="lazy" 
                    />
                    <div class="absolute text-xl! md:text-2xl! lg:text-4xl! top-2 left-2 md:top-10 md:left-10 z-20 explore-rang-top-text">{{ item?.title }}</div>
                    <div class="explore-rang-bottom-text text-sm! md:text-xl! lg:text-2xl! absolute bottom-2 right-2 md:bottom-10 md:right-10 z-20">
                        <ShopNowCTA text="Shop Now" :url="item?.url" />
                    </div>
                </NuxtLink>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { HomePageExploreRangbd2 } from '../types/homepage';
import ShopNowCTA from './ShopNowCTA.vue';

interface Props {
  items?: HomePageExploreRangbd2[]
}

const props = withDefaults(defineProps<Props>(), {
  items: () => []
})

const exploreItems = computed(() => props.items || [])

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
@import './ExploreRang.css';
</style>
