<template>
    <main class="sale-container">
        <section class="sale-header">
            <div class="sale-title">
                <div><span class="sale-title-light">Sale</span> <span class="sale-title-bold">Offer</span></div>
            </div>
        </section>

        <SaleOfferCountdown :products="dealsProducts" :section-title="dealsOfTheMonthTitle" />
        <section v-if="sectionTitle === 'Sale Offer' && saleOfferProducts.length > 0" class="sale-brands-section-secondary">
            <div class="sale-brands-grid-secondary">
                <div class="image-div category-grid-main-men">
                    <NuxtLink :to="`/products/${saleOfferProducts[0]?.category?.slug}/${saleOfferProducts[0]?.slug}`">
                        <img 
                            :src="saleOfferProducts[0]?.image" 
                            :alt="saleOfferProducts[0]?.name" 
                            class="sale-offer-image category-image-rounded" 
                            @load="onImageLoad"
                            ref="productImage"
                        />
                        <div class="absolute! top-4! left-4! sale-offer-text-overlay" :class="{ 'text-dark': !isDarkBackground, 'text-light': isDarkBackground, 'text-very-dark': isVeryDarkBackground }">
                            <div class="text-lg! sm:text-6xl! font-bold!">{{ categoryWords[0] }}</div>
                            <div class="text-lg! sm:text-6xl!">{{ categoryWords[1] }}</div>
                        </div>
                        <div class="sale-offer-number-container w-full bottom-4! pl-4!" style="justify-content: space-between; " :class="{ 'text-dark': !isDarkBackground, 'text-light': isDarkBackground, 'text-very-dark': isVeryDarkBackground }">
                            <div class="text-lg! sm:text-6xl! font-bold!">{{ discountText }}</div>
                            <div class="absolute" style="bottom: 27px; right: 40px;">
                                <NuxtLink :to="`/products?brand=`">
                                <button class="shop-now-white-button flex! items-center! gap-2! hover:text-[#ea580c]!">
                                    <span class="button-text ">See All</span>
                                    <Icon name="heroicons:arrow-right" class="button-icon" />
                                </button>
                                </NuxtLink>
                            </div>
                        </div>
                    </NuxtLink>
                </div>
                <div class="sale-brands-grid-tertiary">
                    <NuxtLink v-for="(product, index) in saleOfferProducts.slice(1, 5)" :key="product.id" :to="`/products/${product?.category?.slug}/${product?.slug}`">
                        <NuxtImg :src="product?.image" :alt="product?.name" class="sale-brand-image-cover" format="webp" quality="85" loading="lazy" />
                    </NuxtLink>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import type { HomePageProduct2 } from '../types/homepage';
import SaleOfferCountdown from './SaleOfferCountdown.vue';
import ShopNowCTA from './ShopNowCTA.vue';
import ShopNowBlue from '~~/components/ShopNowBlue.vue';

interface Props {
  products?: HomePageProduct2[]
  sectionTitle?: string
  dealsOfTheMonthProducts?: HomePageProduct2[]
  dealsOfTheMonthTitle?: string
}

const props = withDefaults(defineProps<Props>(), {
  products: () => [],
  sectionTitle: '',
  dealsOfTheMonthProducts: () => [],
  dealsOfTheMonthTitle: ''
})

// Computed property to ensure products are valid
const saleOfferProducts = computed(() => {
  if (!props.products || !Array.isArray(props.products)) {
    return []
  }
  return props.products.filter(product => product && product.id)
})

// Computed property for Deals of the Month products
const dealsProducts = computed(() => {
  if (!props.dealsOfTheMonthProducts || !Array.isArray(props.dealsOfTheMonthProducts)) {
    return []
  }
  return props.dealsOfTheMonthProducts.filter(product => product && product.id)
})

// Get category name from first product
const categoryName = computed(() => {
  if (saleOfferProducts.value.length === 0 || !saleOfferProducts.value[0]?.category?.name) {
    return ''
  }
  return saleOfferProducts.value[0].category.name
})

// Extract percentage from category name (e.g., "Sale Offer 70%" -> "70%")
const categoryPercentage = computed(() => {
  if (!categoryName.value) return null
  const percentageMatch = categoryName.value.match(/(\d+%)/i)
  return percentageMatch ? percentageMatch[1] : null
})

// Get category name without percentage
const categoryNameWithoutPercentage = computed(() => {
  if (!categoryName.value) return ''
  return categoryName.value.replace(/\s*\d+%\s*/gi, '').trim()
})

// Split category name into two words
const categoryWords = computed(() => {
  if (!categoryNameWithoutPercentage.value) return ['Ultimate', 'Sale']
  const words = categoryNameWithoutPercentage.value.split(/\s+/).filter(w => w.length > 0)
  if (words.length === 0) return ['Ultimate', 'Sale']
  if (words.length === 1) return [words[0], '']
  return [words[0], words.slice(1).join(' ')]
})

// Get discount text (percentage from category or default "50% OFF")
const discountText = computed(() => {
  return categoryPercentage.value ? `${categoryPercentage.value} OFF` : '50% OFF'
})

// Image brightness detection
const isDarkBackground = ref(false)
const imageBrightness = ref<number>(128) // Store actual brightness value (0-255)
const productImage = ref<HTMLImageElement | null>(null)

// Function to calculate image brightness
const calculateImageBrightness = (image: HTMLImageElement): Promise<number> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    if (!ctx) {
      resolve(128) // Default to medium brightness
      return
    }
    
    canvas.width = Math.min(image.width, 100) // Sample smaller area for performance
    canvas.height = Math.min(image.height, 100)
    
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
    
    try {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data
      let brightness = 0
      
      // Calculate average brightness
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i] || 0
        const g = data[i + 1] || 0
        const b = data[i + 2] || 0
        // Calculate luminance using relative luminance formula
        brightness += (0.299 * r + 0.587 * g + 0.114 * b)
      }
      
      brightness = brightness / (data.length / 4)
      resolve(brightness)
    } catch (error) {
      console.error('Error calculating image brightness:', error)
      resolve(128) // Default to medium brightness on error
    }
  })
}

// Handle image load
const onImageLoad = async (event: Event) => {
  const img = event.target as HTMLImageElement
  if (img) {
    const brightness = await calculateImageBrightness(img)
    imageBrightness.value = brightness
    isDarkBackground.value = brightness < 128
  }
}

// Watch for product changes and recalculate
watch(() => saleOfferProducts.value[0]?.image, async (newImage) => {
  if (newImage && productImage.value) {
    await nextTick()
    if (productImage.value.complete) {
      const brightness = await calculateImageBrightness(productImage.value)
      imageBrightness.value = brightness
      isDarkBackground.value = brightness < 128
    }
  }
})

// Recalculate when product changes
onMounted(async () => {
  await nextTick()
  if (productImage.value && productImage.value.complete) {
    const brightness = await calculateImageBrightness(productImage.value)
    imageBrightness.value = brightness
    isDarkBackground.value = brightness < 128
  }
})

// Computed for very dark backgrounds (like black) - brightness < 50
const isVeryDarkBackground = computed(() => imageBrightness.value < 50)
</script>

<style scoped>
@import './SaleOffer.css';
</style>
