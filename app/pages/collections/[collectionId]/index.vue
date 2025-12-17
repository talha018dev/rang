<template>
  <div class="collections-page">
    <AppHeader />

    <!-- Breadcrumb Navigation -->
    <div class="breadcrumb-bg">
      <div class="breadcrumb">
        <NuxtLink to="/">Homepage</NuxtLink>
        <span>/</span>
        <NuxtLink to="/collections">Collections</NuxtLink>
        <span>/</span>
        <span>{{ collectionTitle }}</span>
      </div>
    </div>

    <!-- Collection Header -->
    <div class="collection-header">
      <h1 class="collection-title">{{ collectionTitle }}</h1>
      <p class="collection-description">{{ collectionDescription }}</p>
    </div>

    <!-- Matching Series Section -->
    <div class="matching-series-section-container">
      <div class="matching-series-section">
        <h2 class="section-title">Explore Our Matching Series:</h2>

        <div class="matching-series-container" v-if="!isMobile">
          <div class="matching-series-products">
            <div v-for="(item, index) in matchingSeriesItems" :key="index" class="matching-series-item">
              <!-- Checkbox -->
              <div class="item-checkbox">
                <input type="checkbox" :id="`matching-${index}`" v-model="item.checked"
                  class="checkbox-input" />
                <label :for="`matching-${index}`" class="checkbox-label"></label>
              </div>

              <!-- Product Image -->
              <div class="item-image">
                <NuxtLink :to="`/products/${item.categorySlug}/${item.slug}`">
                  <NuxtImg :src="item.image" :alt="item.name" class="product-img" loading="lazy"
                    format="webp" quality="85" />
                </NuxtLink>
              </div>

              <!-- Product Details -->
              <div class="item-details">
                <p class="item-name">{{ item.name }}</p>

                <!-- Size Selector -->
                <div class="size-selector">
                  <select v-model="item.size" class="size-select">
                    <option v-for="size in item.availableSizes" :key="size" :value="size">
                      {{ size }}
                    </option>
                  </select>
                </div>

                <p class="item-price">{{ formatPrice(item.price, item.price_usd) }}</p>
              </div>
            </div>
          </div>
          
          <!-- Matching Series Summary -->
          <div class="matching-series-summary">
            <div class="total-price">
              <span class="total-label">Total price :</span>
              <span class="total-amount">{{ matchingSeriesTotalPrice }}</span>
            </div>
            <button class="add-to-cart-btn" @click="addMatchingSeriesToCart">
              Add to cart
            </button>
          </div>
        </div>

        <!-- Mobile Layout -->
        <section v-if="isMobile">
          <UCarousel ref="matchingSeriesCarousel" v-slot="{ item, index }" :items="matchingSeriesItems"
            :slides-per-view="2" :space-between="15" :ui="{
              item: 'matching-series-item',
              container: 'matching-series-products mobile-layout',
            }" class="matching-series-carousel mobile-layout">
            <div class="matching-series-item matching-series-item-mobile">
              <div class="item-checkbox">
                <input type="checkbox" :id="`mobile-matching-${item.name}`" v-model="item.checked"
                  class="checkbox-input" />
                <label :for="`mobile-matching-${item.name}`" class="checkbox-label"></label>
              </div>

              <div class="item-image">
                <NuxtLink :to="`/products/${item.categorySlug}/${item.slug}`">
                  <NuxtImg :src="item.image" :alt="item.name" class="product-img" loading="lazy"
                    format="webp" quality="85" />
                </NuxtLink>
              </div>

              <div class="item-details">
                <p class="item-name">{{ item.name }}</p>

                <!-- Size Selector -->
                <div class="size-selector">
                  <select v-model="item.size" class="size-select">
                    <option v-for="size in item.availableSizes" :key="size" :value="size">
                      {{ size }}
                    </option>
                  </select>
                </div>

                <p class="item-price">{{ formatPrice(item.price, item.price_usd) }}</p>
              </div>
            </div>
          </UCarousel>

          <!-- Matching Series Summary -->
          <div class="matching-series-summary">
            <div class="total-price">
              <span class="total-label">Total price :</span>
              <span class="total-amount">{{ matchingSeriesTotalPrice }}</span>
            </div>
            <button class="add-to-cart-btn" @click="addMatchingSeriesToCart">
              Add to cart
            </button>
          </div>
        </section>
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import AppFooter from '~~/components/AppFooter.vue'
import { useCart } from '~~/composables/useCart'
import { useCurrency } from '~~/composables/useCurrency'

const route = useRoute()
const { currency, exchangeRate } = useCurrency()
const { addToCart } = useCart()

const collectionId = computed(() => route.params.collectionId as string)

// Collection titles mapping
const collectionTitles: Record<string, { title: string; description: string }> = {
  family: {
    title: 'Family Collection',
    description: 'Discover our curated family collection featuring matching outfits for the whole family.'
  },
  matching: {
    title: 'Matching Collection',
    description: 'Explore our matching series with coordinated pieces that complement each other perfectly.'
  },
  event: {
    title: 'Event Collection',
    description: 'Special occasion outfits and elegant pieces for your memorable events.'
  },
  others: {
    title: 'Others',
    description: 'Browse our diverse collection of unique and special items.'
  }
}

const collectionTitle = computed(() => {
  return collectionTitles[collectionId.value]?.title || 'Collection'
})

const collectionDescription = computed(() => {
  return collectionTitles[collectionId.value]?.description || 'Explore our curated collection.'
})

// Mobile detection
const isMobile = ref(false)

const handleResize = () => {
  isMobile.value = window.innerWidth < 600
}

// Dummy matchingSeriesItems data
const matchingSeriesItems = ref<Array<{
  id: number
  checked: boolean
  image: string
  name: string
  size: string
  price: number
  price_usd?: number
  slug: string
  categorySlug: string
  availableSizes: string[]
}>>([
  {
    id: 1,
    checked: false,
    image: '/theme-2.png',
    name: 'Elegant Floral Dress',
    size: 'M',
    price: 2500,
    price_usd: 25,
    slug: 'elegant-floral-dress',
    categorySlug: 'women',
    availableSizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 2,
    checked: false,
    image: '/theme-2.png',
    name: 'Classic White Shirt',
    size: 'L',
    price: 1800,
    price_usd: 18,
    slug: 'classic-white-shirt',
    categorySlug: 'men',
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 3,
    checked: false,
    image: '/theme-2.png',
    name: 'Stylish Denim Jacket',
    size: 'M',
    price: 3200,
    price_usd: 32,
    slug: 'stylish-denim-jacket',
    categorySlug: 'men',
    availableSizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 4,
    checked: false,
    image: '/theme-2.png',
    name: 'Comfortable Cotton Trousers',
    size: 'L',
    price: 2200,
    price_usd: 22,
    slug: 'comfortable-cotton-trousers',
    categorySlug: 'men',
    availableSizes: ['M', 'L', 'XL', 'XXL']
  },
  {
    id: 5,
    checked: false,
    image: '/theme-2.png',
    name: 'Beautiful Silk Scarf',
    size: 'L',
    price: 1200,
    price_usd: 12,
    slug: 'beautiful-silk-scarf',
    categorySlug: 'accessories',
    availableSizes: ['M', 'L', 'XL', 'XXL']
  },
  {
    id: 6,
    checked: false,
    image: '/theme-2.png',
    name: 'Designer Handbag',
    size: 'L',
    price: 4500,
    price_usd: 45,
    slug: 'designer-handbag',
    categorySlug: 'accessories',
    availableSizes: ['M', 'L', 'XL', 'XXL']
  }
])

// Format price based on currency
const formatPrice = (priceBDT: number, priceUSD?: number) => {
  if (currency.value === 'USD') {
    const usdPrice = priceUSD || (priceBDT / exchangeRate.value)
    return `$${usdPrice.toFixed(2)}`
  }
  return `TK ${priceBDT.toLocaleString()}`
}

// Total price for matching series items
const matchingSeriesTotalPrice = computed(() => {
  const selectedItems = matchingSeriesItems.value.filter(item => item.checked)
  
  if (currency.value === 'USD') {
    const totalUsd = selectedItems.reduce((sum, item) => {
      const priceUsd = item.price_usd || (item.price / exchangeRate.value)
      return sum + priceUsd
    }, 0)
    return `$${totalUsd.toFixed(2)}`
  }
  
  const totalBDT = selectedItems.reduce((sum, item) => sum + item.price, 0)
  return `TK ${totalBDT.toLocaleString()}`
})

// Add matching series to cart
const addMatchingSeriesToCart = () => {
  const selectedItems = matchingSeriesItems.value.filter(item => item.checked)
  
  if (selectedItems.length === 0) {
    alert('Please select at least one item to add to cart.')
    return
  }
  
  selectedItems.forEach(item => {
    addToCart({
      id: item.id.toString(),
      name: item.name,
      price: item.price,
      price_usd: item.price_usd,
      priceDisplay: formatPrice(item.price, item.price_usd),
      image: item.image,
      size: item.size
    })
  })
  
  alert(`${selectedItems.length} item(s) added to cart!`)
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
@import './collections.css';
</style>

