<template>
  <section class="why-rang-section pb-5!">
    <div class="why-rang-container">
        <section class="sale-header">
            <div class="sale-title">
                <div><span class="sale-title-light">Why</span> <span class="sale-title-bold">Rang Bangladesh?</span></div>
            </div>
            <!-- <div class="see-all-button mobile-only">
                <ShopNowCTA text="See All" />
            </div> -->
        </section>
        <div class="why-rang-grid">
            <div class="grid-item grid-item-1">
                <div class="card-video aspect-[2.22]!">
                    <video 
                        v-if="getVideoUrl(props.items?.[0])"
                        :src="getVideoUrl(props.items?.[0]) || undefined" 
                        autoplay 
                        loop 
                        muted 
                        playsinline
                        class="why-rang-video"
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
            <div class="grid-item grid-item-2">
                <div class="card-video aspect-[2.22]!">
                    <video 
                        v-if="getVideoUrl(props.items?.[1])"
                        :src="getVideoUrl(props.items?.[1]) || undefined" 
                        autoplay 
                        loop 
                        muted 
                        playsinline
                        class="why-rang-video"
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
            <div class="grid-item grid-item-3">
                <div class="card-video aspect-[0.77]!">
                    <video 
                        v-if="getVideoUrl(props.items?.[2])"
                        :src="getVideoUrl(props.items?.[2]) || undefined" 
                        autoplay 
                        loop 
                        muted 
                        playsinline
                        class="why-rang-video"
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { HomePageWhyRangbd2 } from '../types/homepage';
import ShopNowCTA from './ShopNowCTA.vue';

interface Props {
  items?: HomePageWhyRangbd2[]
}

const props = withDefaults(defineProps<Props>(), {
  items: () => []
})

// Get video URL from the image object
const getVideoUrl = (item?: HomePageWhyRangbd2): string | null => {
  if (!item?.image) return null
  // Use original_url or preview_url, both should work for video
  return item.image.original_url || item.image.preview_url || null
}
</script>

<style scoped>
@import './WhyRang.css';
</style>