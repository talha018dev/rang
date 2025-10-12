<template>
  <main class="new-arrival-container">
    <section class="new-arrival-header">
      <div class="new-arrival-title">
        <div><span class="new-arrival-title-light">New</span> <span class="new-arrival-title-bold">Arrivals</span></div>
      </div>
    </section>

    <section>
      <!-- Carousel -->
      <UCarousel
        ref="carouselRef"
        v-slot="{ item }"
        :items="newArrivalImages"
        :ui="{
          item: 'basis-1/4',
          container: 'rounded-lg'
        }"
        class="rounded-lg"
        :slides-per-view="4"
        :slides-per-group="1"
        :autoplay="false"
        :infinite="true"
        tabindex="0"
        @keydown="handleKeydown"
      >
        <div class="carousel-item">
          <NuxtImg
            :src="item.src"
            :alt="item.alt"
            class="w-full h-80 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            loading="lazy"
          />
          <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-lg">
            <h3 class="new-arrival-name-light">{{ item.title }}</h3>
            <p class="shop-now-blue-button-div">
              <ShopNowBlue />
            </p>
          </div>
        </div>
      </UCarousel>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ShopNowBlue from './ShopNowBlue.vue'

interface NewArrivalItem {
  src: string
  alt: string
  title: string
  description: string
}

const carouselRef = ref()

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    // Navigate to previous slide
    if (carouselRef.value) {
      carouselRef.value.prev()
    }
  } else if (event.key === 'ArrowRight') {
    event.preventDefault()
    // Navigate to next slide
    if (carouselRef.value) {
      carouselRef.value.next()
    }
  }
}

const newArrivalImages: NewArrivalItem[] = [
  {
    src: '/new-arrival/new-arrival-1.png',
    alt: 'New Arrival Collection 1',
    title: 'Premium Cotton',
    description: 'Soft and breathable fabric'
  },
  {
    src: '/new-arrival/new-arrival-2.png',
    alt: 'New Arrival Collection 2',
    title: 'Silk Elegance',
    description: 'Luxurious silk collection'
  },
  {
    src: '/new-arrival/new-arrival-1.png',
    alt: 'New Arrival Collection 3',
    title: 'Linen Comfort',
    description: 'Natural and sustainable'
  },
  {
    src: '/new-arrival/new-arrival-2.png',
    alt: 'New Arrival Collection 4',
    title: 'Designer Prints',
    description: 'Exclusive patterns'
  },
  {
    src: '/new-arrival/new-arrival-1.png',
    alt: 'New Arrival Collection 5',
    title: 'Cotton Blend',
    description: 'Comfortable everyday wear'
  },
  {
    src: '/new-arrival/new-arrival-2.png',
    alt: 'New Arrival Collection 6',
    title: 'Silk Premium',
    description: 'Elegant formal wear'
  },
  {
    src: '/new-arrival/new-arrival-1.png',
    alt: 'New Arrival Collection 7',
    title: 'Linen Classic',
    description: 'Timeless style'
  },
  {
    src: '/new-arrival/new-arrival-2.png',
    alt: 'New Arrival Collection 8',
    title: 'Artistic Prints',
    description: 'Unique designs'
  }
]
</script>

<style scoped>
@import './NewArrival.css';
</style>