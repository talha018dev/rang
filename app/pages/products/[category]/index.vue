<template>
    <main class="men-page-gradient">

        <div class="men-page">
            <AppHeader />

            <!-- Hero Banner Section -->
            <section class="hero-banner">
                <div class="hero-content">
                    <div class="hero-text">{{ categoryTitle }}</div>
                    <NuxtImg src="/men/men-hero-image.jpg" alt="Men's fashion" class="hero-img" loading="eager"
                        format="webp" quality="90" />
                </div>
            </section>

            <!-- Filter Section -->
            <section class="filter-section">
                <div class="filter-container">
                    <div class="filter-dropdowns">
                        <div class="filter-dropdown">
                            <select class="filter-select" v-model="selectedSize">
                                <option value="">Size</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                                <option value="XXL">XXL</option>
                            </select>
                            <svg class="dropdown-icon" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div class="filter-dropdown">
                            <select class="filter-select" v-model="selectedPrice">
                                <option value="">Price</option>
                                <option value="0-1000">Under Tk 1,000</option>
                                <option value="1000-2000">Tk 1,000 - 2,000</option>
                                <option value="2000-3000">Tk 2,000 - 3,000</option>
                                <option value="3000+">Above Tk 3,000</option>
                            </select>
                            <svg class="dropdown-icon" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clip-rule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Products Grid Section -->
            <section class="products-section">
                <div class="products-container">
                    <div class="products-grid">
                        <div v-for="(product, index) in filteredProducts" :key="index" class="product-card-wrapper">
                            <NuxtLink :to="`/men/matching/${product.id}`" class="product-card">
                                <div class="product-image-item">
                                    <NuxtImg :src="product.image" :alt="product.name" class="product-img" loading="lazy"
                                        format="webp" quality="85" />
                                </div>
                                <div class="product-info">
                                    <h3 class="product-name">{{ product.name }}</h3>
                                    <p class="product-price">{{ product.price }}</p>
                                </div>
                            </NuxtLink>
                            <button class="add-to-cart-quick-btn" @click.stop="handleQuickAddToCart(product)"
                                title="Add to cart">
                                <svg class="cart-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <AppFooter />
    </main>
</template>

<script setup lang="ts">
// All Vue composables and components are auto-imported in Nuxt 4
import { useHead, useRoute } from 'nuxt/app'
import { computed, ref } from 'vue'
import AppFooter from '~~/components/AppFooter.vue'
import { useCart } from '~~/composables/useCart'
import './products.css'

// Get route params
const route = useRoute()
const categorySlug = computed(() => route.params.category as string)

// Format category slug to title
const categoryTitle = computed(() => {
  if (!categorySlug.value) return ''
  // Replace hyphens with spaces and capitalize each word
  return categorySlug.value
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
    .toUpperCase()
})

// Meta
useHead({
    title: `${categoryTitle.value} Collection - Rang`,
    meta: [
        { name: 'description', content: `Discover our exclusive collection of ${categoryTitle.value.toLowerCase()} products.` }
    ]
})

// Reactive data
const selectedSize = ref('')
const selectedPrice = ref('')

// Product data
const products = ref([
    {
        id: 1,
        name: 'Punjabi for men',
        price: 'Tk 2,500',
        image: '/men/men-image-large.png',
        size: 'M',
        priceRange: '2000-3000',
        category: 'punjabi'
    },
    {
        id: 2,
        name: 'Punjabi for men',
        price: 'Tk 2,500',
        image: '/men/men-image-large.png',
        size: 'L',
        priceRange: '2000-3000',
        category: 'punjabi'
    },
    {
        id: 3,
        name: 'Punjabi for men',
        price: 'Tk 2,500',
        image: '/men/men-image-large.png',
        size: 'XL',
        priceRange: '2000-3000',
        category: 'punjabi'
    },
    {
        id: 4,
        name: 'Punjabi for men',
        price: 'Tk 2,500',
        image: '/men/men-image-large.png',
        size: 'M',
        priceRange: '2000-3000',
        category: 'punjabi'
    },
    {
        id: 5,
        name: 'Punjabi for men',
        price: 'Tk 2,500',
        image: '/men/men-image-large.png',
        size: 'L',
        priceRange: '2000-3000',
        category: 'punjabi'
    },
    {
        id: 6,
        name: 'Punjabi for men',
        price: 'Tk 2,500',
        image: '/men/men-image-large.png',
        size: 'XL',
        priceRange: '2000-3000',
        category: 'punjabi'
    },
    {
        id: 7,
        name: 'Punjabi for men',
        price: 'Tk 2,500',
        image: '/men/men-image-large.png',
        size: 'M',
        priceRange: '2000-3000',
        category: 'punjabi'
    },
    {
        id: 8,
        name: 'Punjabi for men',
        price: 'Tk 2,500',
        image: '/men/men-image-large.png',
        size: 'L',
        priceRange: '2000-3000',
        category: 'punjabi'
    }
])

// Computed filtered products
const filteredProducts = computed(() => {
    return products.value.filter(product => {
        const sizeMatch = !selectedSize.value || product.size === selectedSize.value
        const priceMatch = !selectedPrice.value || product.priceRange === selectedPrice.value
        return sizeMatch && priceMatch
    })
})

// Cart functionality
const { addToCart } = useCart()

const handleQuickAddToCart = (product: any) => {
    const priceMatch = product.price.match(/[\d,]+/)
    const price = priceMatch ? parseInt(priceMatch[0].replace(/,/g, '')) : 2500

    addToCart({
        id: product.id.toString(),
        name: product.name,
        price: price,
        priceDisplay: product.price,
        image: product.image,
        size: product.size
    })

    alert('Item added to cart!')
}
</script>

<style scoped>
/* Override AppHeader navigation colors for men page */
:global(.nav-link) {
    color: black !important;
}

:global(.nav-link:hover) {
    color: #ea580c !important;
}

/* Override hamburger icon color for men page */
:global(.mobile-menu-button) {
    color: black !important;
}

:global(.mobile-menu-button:hover) {
    color: #ea580c !important;
}
</style>