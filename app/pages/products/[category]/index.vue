<template>
  <main class="men-page-gradient">

    <div class="men-page pb-30! sm:pb-0!" :class="{ 'women-category': isWomenCategory }">
      <AppHeader />

      <!-- Hero Banner Section -->
      <section class="hero-banner">
        <div class="hero-content">
          <div class="hero-text">{{ categoryTitle }}</div>
          <NuxtImg :src="heroImage" :alt="`${categoryTitle} fashion`" class="hero-img" loading="eager" format="webp"
            quality="90" />
        </div>
      </section>

      <!-- Filter Section -->
      <section class="filter-section">
        <div class="filter-container">
          <div class="filter-dropdowns">
            <div class="filter-dropdown">
              <select class="filter-select" v-model="selectedSize">
                <option value="">Size</option>
                <option v-for="size in availableSizes" :key="size" :value="size">{{ size }}</option>
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
            <div class="filter-dropdown">
              <select class="filter-select" v-model="selectedBrand">
                <option value="">Brand</option>
                <option v-for="brand in brands" :key="brand.slug" :value="brand.slug">{{ brand.name }}</option>
              </select>
              <svg class="dropdown-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd" />
              </svg>
            </div>
            <div class="filter-dropdown">
              <select class="filter-select" v-model="selectedCombo">
                <option value="">Combo</option>
                <option value="true">Only combo products</option>
                <option value="false">Except combo products</option>
              </select>
              <svg class="dropdown-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd" />
              </svg>
            </div>
            <div class="filter-dropdown">
              <select class="filter-select" v-model="selectedSort">
                <option value="latest">Latest</option>
                <option value="low-to-high">Low to High</option>
                <option value="high-to-low">High to Low</option>
                <option value="on-sale">On Sale</option>
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
          <!-- Loading Skeleton -->
          <div v-if="isLoading" class="products-grid loading-skeleton">
            <div v-for="i in 12" :key="i" class="product-card-wrapper skeleton-product-card">
              <div class="product-card">
                <div class="product-image-item">
                  <div class="skeleton-box skeleton-product-image"></div>
                </div>
                <div class="product-info">
                  <div class="skeleton-box skeleton-product-name"></div>
                  <div class="skeleton-box skeleton-product-price"></div>
                </div>
              </div>
              <div class="add-to-cart-quick-btn skeleton-cart-btn">
                <div class="skeleton-box skeleton-cart-icon"></div>
              </div>
            </div>
          </div>
          <div v-else-if="error" class="error-state">
            <p>Error loading products: {{ error }}</p>
          </div>
          <div v-else-if="filteredProducts.length === 0" class="empty-state">
            <p>No products found matching your filters.</p>
          </div>
          <div v-else class="products-grid">
            <div v-for="product in filteredProducts" :key="product.id" class="product-card-wrapper">
              <NuxtLink :to="`/products/${categorySlug}/${product.slug}`" class="product-card">
                <div class="product-image-item">
                  <NuxtImg :src="getImageUrl(product.image)" :alt="product.name" class="product-img" loading="lazy"
                    format="webp" quality="85" />
                  <!-- Wishlist Icon (only for logged-in users) -->
                  <button 
                    v-if="isLoggedIn" 
                    class="wishlist-icon-btn" 
                    @click.stop="handleToggleWishlist(product)"
                    :title="isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'"
                  >
                    <svg 
                      v-if="isInWishlist(product.id)" 
                      class="wishlist-icon filled" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <svg 
                      v-else 
                      class="wishlist-icon" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                        opacity="0.3"
                      />
                    </svg>
                  </button>
                </div>
                <div class="product-info">
                  <h3 class="product-name">{{ product.name }}</h3>
                  <p class="product-price">{{ formatPrice(product.price, product.price_usd) }}</p>
                </div>
              </NuxtLink>
              <button class="add-to-cart-quick-btn" @click.stop="handleQuickAddToCart(product)" title="Add to cart">
                <svg class="cart-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Pagination Section -->
      <section v-if="pagination && pagination.last_page > 1" class="pagination-section">
        <div class="pagination-container">
          <div class="pagination">
            <button class="pagination-btn" :disabled="currentPage === 1" @click="goToPage(currentPage - 1)">
              <svg class="pagination-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>

            <div class="pagination-pages">
              <button v-for="page in visiblePages" :key="page" class="pagination-page-btn"
                :class="{ 'active': page === currentPage }" @click="goToPage(page)">
                {{ page }}
              </button>
            </div>

            <button class="pagination-btn" :disabled="currentPage === pagination.last_page"
              @click="goToPage(currentPage + 1)">
              Next
              <svg class="pagination-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div class="pagination-info">
            <p>Showing {{ pagination.from }} to {{ pagination.to }} of {{ pagination.total }} products</p>
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
import { computed, onMounted, ref, watch } from 'vue'
import AppFooter from '~~/components/AppFooter.vue'
import { useApi } from '~~/composables/useApi'
import { useCart } from '~~/composables/useCart'
import { useCurrency } from '~~/composables/useCurrency'
import { useWishlist } from '~~/composables/useWishlist'
import type { Brand, BrandResponse, Category, CategoryResponse, PaginationData, Product, ProductResponse } from '~~/types/homepage'
import './products.css'

// Get route params
const route = useRoute()
const categorySlug = computed(() => route.params.category as string)

console.log('qqqqqqqqqq',categorySlug.value);

// Check if current category is women or a child of women
const isWomenCategory = computed(() => {
  if (categorySlug.value === 'women') return true
  
  // Check if it's a child of women by checking the categories
  const womenCategory = categories.value.find(cat => cat.slug === 'women')
  if (!womenCategory || !womenCategory.children) {
    console.log('Women category not found or has no children')
    return false
  }
  
  // Check if current category slug matches any child of women
  const isChild = womenCategory.children.some(child => child.slug === categorySlug.value)
  console.log('Is women category:', isChild, 'for slug:', categorySlug.value)
  return isChild
})

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

// Hero image based on category
const heroImage = computed(() => {
  if (categorySlug.value === 'women') {
    return '/shop-by-category/shop-by-category-2.png'
  }
  if (categorySlug.value === 'accessories') {
    return '/shop-by-category/shop-by-category-55.jpg'
  }
  if (categorySlug.value === 'jewelry') {
    return '/explore/explore-22.png'
  }

  if (categorySlug.value === 'kids') {
    return '/explore/explore-1.png'
  }
  return '/men/men-hero-image.jpg'
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
const selectedBrand = ref('')
const selectedCombo = ref('')
const selectedSort = ref('latest') // Default sort is latest
const currentPage = ref(1)
const products = ref<Product[]>([])
const pagination = ref<PaginationData | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)
const brands = ref<Brand[]>([])
const categories = ref<Category[]>([])

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

// Fetch brands from API
const fetchBrands = async () => {
  try {
    const { backendUrl } = useApi()
    const response = await $fetch<BrandResponse>(`${backendUrl}/brand`)
    console.log('Brands API Response:', response)

    if (response.success && response.data) {
      brands.value = response.data
    }
  } catch (err) {
    console.error('Error fetching brands:', err)
  }
}

// Fetch categories from API
const fetchCategories = async () => {
  try {
    const { backendUrl } = useApi()
    const response = await $fetch<CategoryResponse>(`${backendUrl}/category`)
    console.log('Categories API Response:', response)

    if (response.success && response.data) {
      categories.value = response.data
    }
  } catch (err) {
    console.error('Error fetching categories:', err)
  }
}

// Fetch products from API
const fetchProducts = async () => {
  if (!categorySlug.value) return

  isLoading.value = true
  error.value = null

  try {
    // Clean category slug (remove any &amp; issues)
    const cleanSlug = categorySlug.value.replace(/&amp;/g, '&')
    // Build API URL with sort, page, and brand parameters
    const { backendUrl } = useApi()
    let apiUrl = `${backendUrl}/product?sort=${selectedSort.value}&page=${currentPage.value}`
    
    // Only add category parameter if cleanSlug is not "all"
    if (cleanSlug !== 'all') {
      apiUrl += `&category=${cleanSlug}`
    }
    
    // Add brand parameter if selected
    if (selectedBrand.value) {
      apiUrl += `&brand=${selectedBrand.value}`
    }
    
    // Add combo parameter if selected
    if (selectedCombo.value !== '') {
      apiUrl += `&combo=${selectedCombo.value}`
    }
    
    const response = await $fetch<ProductResponse>(apiUrl)
    console.log('Products API Response:', response)

    if (response.success && response.data) {
      products.value = response.data
      pagination.value = response.pagination
      // Sync current page with API response (only if different to avoid loop)
      if (pagination.value && pagination.value.current_page !== currentPage.value) {
        currentPage.value = pagination.value.current_page
      }
      console.log('Products loaded:', products.value.length)
      console.log('Pagination:', pagination.value)
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
    error.value = errorMessage
    console.error('Error fetching products:', err)
  } finally {
    isLoading.value = false
  }
}

// Initial fetch on mount
onMounted(() => {
  fetchBrands()
  fetchCategories()
  fetchProducts()
  initializeWishlist()
})

// Watch for category slug changes
watch(categorySlug, () => {
  currentPage.value = 1 // Reset to first page when category changes
  fetchProducts()
})

// Watch for sort changes
watch(selectedSort, () => {
  currentPage.value = 1 // Reset to first page when sort changes
  fetchProducts()
})

// Watch for page changes
watch(currentPage, (newPage, oldPage) => {
  // Only fetch if page actually changed (not initial)
  if (oldPage !== undefined && newPage !== oldPage) {
    fetchProducts()
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
})

// Pagination functions
const goToPage = (page: number) => {
  if (pagination.value && page >= 1 && page <= pagination.value.last_page) {
    currentPage.value = page
  }
}

// Computed property for visible page numbers
const visiblePages = computed(() => {
  if (!pagination.value) return []

  const pages: number[] = []
  const totalPages = pagination.value.last_page
  const current = currentPage.value

  // Show up to 5 page numbers
  if (totalPages <= 5) {
    // Show all pages if 5 or fewer
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  } else {
    // Show pages around current page
    if (current <= 3) {
      // Show first 5 pages
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
    } else if (current >= totalPages - 2) {
      // Show last 5 pages
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Show pages around current
      for (let i = current - 2; i <= current + 2; i++) {
        pages.push(i)
      }
    }
  }

  return pages
})

// Get unique sizes from products
const availableSizes = computed(() => {
  const sizes = new Set<string>()
  products.value.forEach(product => {
    product.variants?.forEach(variant => {
      if (variant.attributes?.size) {
        sizes.add(variant.attributes.size)
      }
    })
  })
  return Array.from(sizes).sort()
})

// Computed filtered products (client-side filtering for size and price)
// Note: The API handles pagination, so we filter the current page's products
const filteredProducts = computed(() => {
  return products.value.filter(product => {
    // Size filter - check if any variant matches
    const sizeMatch = !selectedSize.value ||
      product.variants?.some(variant => variant.attributes?.size === selectedSize.value) || false

    // Price filter
    let priceMatch = true
    if (selectedPrice.value) {
      const price = product.price
      switch (selectedPrice.value) {
        case '0-1000':
          priceMatch = price < 1000
          break
        case '1000-2000':
          priceMatch = price >= 1000 && price < 2000
          break
        case '2000-3000':
          priceMatch = price >= 2000 && price < 3000
          break
        case '3000+':
          priceMatch = price >= 3000
          break
      }
    }

    return sizeMatch && priceMatch
  })
})

// Watch for filter changes to reset to page 1
watch([selectedSize, selectedPrice, selectedBrand, selectedCombo], () => {
  currentPage.value = 1
  fetchProducts()
})

// Cart functionality
const { addToCart } = useCart()
const { formatPrice } = useCurrency()

// Wishlist functionality
const { isLoggedIn, isInWishlist, toggleWishlist, initializeWishlist } = useWishlist()

// Handle wishlist toggle
const handleToggleWishlist = async (product: Product) => {
  if (product.id && product.slug) {
    await toggleWishlist(product.id, product.slug)
  }
}

const handleQuickAddToCart = (product: Product) => {
  // Get the first variant or use product defaults
  const firstVariant = product.variants?.[0]
  const size = firstVariant?.attributes?.size
  const color = firstVariant?.attributes?.color
  const variantPrice = firstVariant?.price || product.price
  const variantPriceUsd = firstVariant?.price_usd || product.price_usd

  // Check if product is a combo product
  const isCombo = (product as any).is_combo === true
  const comboProducts = (product as any).combo_products

  const cartItem: any = {
    id: product.id.toString(),
    name: product.name,
    price: variantPrice,
    price_usd: variantPriceUsd,
    priceDisplay: formatPrice(variantPrice, variantPriceUsd),
    image: getImageUrl(product.image),
    size: size,
    color: color,
    sku: product.sku,
    product_id: product.id,
    variant_id: firstVariant?.id
  }

  // Add combo product properties if it's a combo - new format
  if (isCombo && Array.isArray(comboProducts) && comboProducts.length > 0) {
    // Extract product_id and variant_id from each combo product
    const productsArray = comboProducts.map((comboProduct: any) => {
      // Handle both formats: direct product_id/variant_id or full product object
      if (comboProduct.product_id && comboProduct.variant_id) {
        return {
          product_id: comboProduct.product_id,
          variant_id: comboProduct.variant_id
        }
      } else if (comboProduct.id) {
        // Full product object - extract product_id and get first variant
        const productId = comboProduct.id
        const firstVariant = comboProduct.variants?.[0]
        if (firstVariant?.id) {
          return {
            product_id: productId,
            variant_id: firstVariant.id
          }
        }
      }
      return null
    }).filter((p: any) => p !== null)

    if (productsArray.length > 0) {
      cartItem.product_id = product.id
      cartItem.qty = 1
      cartItem.products = productsArray
    }
  }

  addToCart(cartItem)

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