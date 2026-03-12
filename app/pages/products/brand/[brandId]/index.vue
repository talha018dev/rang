<template>
  <main class="men-page-gradient">
    <div class="men-page">
      <!-- <AppHeader /> -->

      <!-- Hero Banner Section -->
      <section class="hero-banner hero-banner-brand">
        <div class="hero-content">
          <div class="hero-text">{{ brand?.name ?? '' }}</div>
        </div>
      </section>

      <!-- Filter Section (only when brand is loaded) -->
      <section v-if="brand" class="filter-section">
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
                <option value="high-to-low">High to Low</option>
                <option value="low-to-high">Low to High</option>
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
                  <div class="skeleton-box skeleton-product-image" />
                </div>
                <div class="product-info">
                  <div class="skeleton-box skeleton-product-name" />
                  <div class="skeleton-box skeleton-product-price" />
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="error" class="error-state">
            <p>{{ error }}</p>
          </div>
          <div v-else-if="!brand" class="empty-state">
            <p>Brand not found.</p>
            <NuxtLink to="/" class="brand-page-back-link">Back to Home</NuxtLink>
          </div>
          <div v-else-if="filteredProducts.length === 0" class="empty-state">
            <p>{{ hasActiveFilters ? 'No products found matching your filters.' : 'No products in this brand yet.' }}</p>
          </div>
          <div v-else class="products-grid">
            <div v-for="(product, index) in filteredProducts" :key="product.id" class="product-card-wrapper">
              <NuxtLink :to="productLink(product)" class="product-card">
                <div class="product-image-item">
                  <div class="product-image-container">
                    <NuxtImg
                      :src="getImageUrl(getProductImage(product, 0))"
                      :alt="product.name"
                      class="product-img product-img-default"
                      :loading="index < 4 ? 'eager' : 'lazy'"
                      format="webp"
                      quality="80"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      width="400"
                      height="488"
                    />
                    <NuxtImg
                      :src="getImageUrl(getProductImage(product, 1))"
                      :alt="product.name"
                      class="product-img product-img-hover"
                      loading="lazy"
                      format="webp"
                      quality="80"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      width="400"
                      height="488"
                    />
                    <NuxtImg
                      v-if="getProductImage(product, 2) !== ''"
                      :src="getImageUrl(getProductImage(product, 2) || '')"
                      :alt="product.name"
                      class="product-img product-img-hover-delayed"
                      loading="lazy"
                      format="webp"
                      quality="80"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      width="400"
                      height="488"
                    />
                  </div>
                  <button
                    v-if="isLoggedIn"
                    class="wishlist-icon-btn"
                    type="button"
                    :title="isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'"
                    @click.stop.prevent="handleToggleWishlist($event, product)"
                  >
                    <svg
                      v-if="isInWishlist(product.id)"
                      class="wishlist-icon filled"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <svg v-else class="wishlist-icon" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        opacity="0.3"
                      />
                    </svg>
                  </button>
                </div>
                <div class="product-info">
                  <h3 class="product-name">{{ product.name }}</h3>
                  <div class="product-price-container">
                    <span
                      v-if="shouldShowComparePrice(product)"
                      class="product-original-price"
                    >
                      {{ formatPrice(getComparePriceToDisplay(product).price, getComparePriceToDisplay(product).priceUsd) }}
                    </span>
                    <span class="product-price">{{ getCurrentPriceDisplay(product) }}</span>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>

      <!-- Pagination Section -->
      <section v-if="pagination && pagination.last_page > 1" class="pagination-section">
        <div class="pagination-container">
          <div class="pagination">
            <button
              type="button"
              class="pagination-btn"
              :disabled="currentPage === 1"
              @click="goToPage(currentPage - 1)"
            >
              <svg class="pagination-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>
            <div class="pagination-pages">
              <button
                v-for="page in visiblePages"
                :key="page"
                type="button"
                class="pagination-page-btn"
                :class="{ active: page === currentPage }"
                @click="goToPage(page)"
              >
                {{ page }}
              </button>
            </div>
            <button
              type="button"
              class="pagination-btn"
              :disabled="currentPage === pagination.last_page"
              @click="goToPage(currentPage + 1)"
            >
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
import AppFooter from '../../../../../components/AppFooter.vue'
import AppHeader from '../../../../../components/AppHeader.vue'
import { useCart } from '../../../../../composables/useCart'
import { useCurrency } from '../../../../../composables/useCurrency'
import { useWishlist } from '../../../../../composables/useWishlist'
import { useApi } from '../../../../../composables/useApi'
import type { Brand, PaginationData, Product, ProductResponse } from '../../../../../types/homepage'
import '../../[category]/products.css'

const route = useRoute()
const router = useRouter()
const brandId = computed(() => (route.params.brandId as string) || '')

// Query params for filters (no brand - we're on a brand page)
const sizeFromUrl = computed(() => (route.query.size as string) || '')
const priceFromUrl = computed(() => (route.query.price as string) || '')
const comboFromUrl = computed(() => (route.query.combo as string) || '')
const sortFromUrl = computed(() => (route.query.sort as string) || 'high-to-low')

const brand = ref<Brand | null>(null)
const products = ref<Product[]>([])
const pagination = ref<PaginationData | null>(null)
const currentPage = ref(1)
const isLoading = ref(true)
const error = ref<string | null>(null)

// Filter state (init from URL)
const selectedSize = ref(sizeFromUrl.value)
const selectedPrice = ref(priceFromUrl.value)
const selectedCombo = ref(comboFromUrl.value)
const selectedSort = ref(sortFromUrl.value || 'high-to-low')
const isUpdatingFromUrl = ref(false)

// Product link: use category slug (parent or category) for /products/[category]/[slug]
function productLink(product: Product): string {
  const cat = product.category as { slug?: string; parent?: { slug?: string } } | undefined
  const categorySlug = cat?.parent?.slug || cat?.slug || 'all'
  return `/products/${categorySlug}/${product.slug}`
}

const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return ''
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath
  const { backendUrl } = useApi()
  const base = backendUrl.replace(/\/api\/?$/, '')
  return `${base}${imagePath.startsWith('/') ? imagePath : '/' + imagePath}`
}

const getAllProductImages = (product: Product): string[] => {
  const images: string[] = []
  if (product.image) images.push(product.image)
  const imagesObj = (product as any).images
  if (imagesObj && typeof imagesObj === 'object') {
    Object.values(imagesObj).forEach((url) => {
      if (url && typeof url === 'string' && !images.includes(url)) images.push(url)
    })
  }
  if (product.variants) {
    product.variants.forEach((v) => {
      if (v.image && !images.includes(v.image)) images.push(v.image)
    })
  }
  return images
}

const getProductImage = (product: Product, imageIndex: number): string => {
  const all = getAllProductImages(product)
  if (all.length === 0) return product.image || ''
  if (all.length === 1) return all[0] ?? ''
  if (imageIndex === 0) return all[0] ?? ''
  if (imageIndex === 1) return all.length >= 2 ? (all[1] ?? '') : (all[0] ?? '')
  if (imageIndex === 2) return all.length >= 3 ? (all[2] ?? '') : ''
  return product.image || ''
}

// Pagination from route
const pageFromUrl = computed(() => {
  const page = route.query.page as string
  return page ? Math.max(1, parseInt(page, 10) || 1) : 1
})

// Sizes from current products (for filter dropdown)
const availableSizes = computed(() => {
  const sizes = new Set<string>()
  products.value.forEach((product) => {
    product.variants?.forEach((variant) => {
      if (variant.attributes?.size) sizes.add(variant.attributes.size)
    })
  })
  return Array.from(sizes).sort()
})

// Client-side filter by size and price (Combo and Sort are API-side)
const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    const sizeMatch =
      !selectedSize.value ||
      !!product.variants?.some((v) => v.attributes?.size === selectedSize.value)
    let priceMatch = true
    if (selectedPrice.value) {
      const price = Number(product.price ?? 0)
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

const hasActiveFilters = computed(
  () =>
    !!selectedSize.value ||
    !!selectedPrice.value ||
    !!selectedCombo.value ||
    (selectedSort.value && selectedSort.value !== 'high-to-low')
)

// Update URL from current filters (no brand param)
function updateUrlQuery() {
  const query: Record<string, string> = {}
  if (selectedSize.value) query.size = selectedSize.value
  if (selectedPrice.value) query.price = selectedPrice.value
  if (selectedCombo.value !== '') query.combo = selectedCombo.value
  if (selectedSort.value && selectedSort.value !== 'high-to-low') query.sort = selectedSort.value
  if (currentPage.value > 1) query.page = currentPage.value.toString()
  router.replace({ path: route.path, query })
}

const visiblePages = computed(() => {
  if (!pagination.value) return []
  const total = pagination.value.last_page
  const current = currentPage.value
  const pages: number[] = []
  if (total <= 5) {
    for (let i = 1; i <= total; i++) pages.push(i)
  } else if (current <= 3) {
    for (let i = 1; i <= 5; i++) pages.push(i)
  } else if (current >= total - 2) {
    for (let i = total - 4; i <= total; i++) pages.push(i)
  } else {
    for (let i = current - 2; i <= current + 2; i++) pages.push(i)
  }
  return pages
})

const goToPage = (page: number) => {
  if (!pagination.value || page < 1 || page > pagination.value.last_page) return
  currentPage.value = page
  updateUrlQuery()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

async function fetchBrand() {
  if (!brandId.value) {
    isLoading.value = false
    error.value = 'No brand specified'
    return
  }
  isLoading.value = true
  error.value = null
  brand.value = null
  products.value = []
  pagination.value = null
  try {
    const { backendUrl } = useApi()
    const listResponse = await $fetch<{ success: boolean; data: Brand[] }>(`${backendUrl}/brand`)
    if (listResponse?.success && Array.isArray(listResponse.data)) {
      const found = listResponse.data.find((b) => b.slug === brandId.value)
      if (found) {
        brand.value = found
        currentPage.value = pageFromUrl.value
        await fetchProducts()
        return
      }
    }
    brand.value = null
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error'
    console.error('Error fetching brand:', err)
  } finally {
    isLoading.value = false
  }
}

async function fetchProducts() {
  if (!brandId.value) return
  isLoading.value = true
  error.value = null
  try {
    const { backendUrl } = useApi()
    const page = currentPage.value
    let url = `${backendUrl}/product?brand=${encodeURIComponent(brandId.value)}&sort=${selectedSort.value || 'high-to-low'}&page=${page}`
    if (selectedCombo.value !== '') {
      url += `&combo=${selectedCombo.value}`
    }
    const response = await $fetch<ProductResponse>(url)
    if (response?.success && Array.isArray(response.data)) {
      products.value = response.data
      pagination.value = response.pagination ?? null
      if (pagination.value && pagination.value.current_page !== currentPage.value) {
        currentPage.value = pagination.value.current_page
      }
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load products'
    console.error('Error fetching products by brand:', err)
  } finally {
    isLoading.value = false
  }
}

// Currency & price display (same as [category] page)
const { formatPrice, currency, exchangeRate } = useCurrency()

const shouldShowComparePrice = (product: Product): boolean => {
  const comparePrice = product.compare_price || 0
  const currentPrice = product.price || 0
  return comparePrice > 0 && currentPrice > 0 && comparePrice !== currentPrice
}

const getComparePriceToDisplay = (product: Product): { price: number; priceUsd?: number } => {
  const comparePrice = product.compare_price || 0
  if (currency.value === 'USD') {
    if (comparePrice > 0 && exchangeRate.value > 0) {
      return { price: 0, priceUsd: comparePrice / exchangeRate.value }
    }
    return { price: 0, priceUsd: 0 }
  }
  return { price: comparePrice, priceUsd: (product as any).compare_price_usd }
}

const getCurrentPriceDisplay = (product: Product): string => {
  const variants = (product as any).variants as any[] | undefined
  const hasVariants = Array.isArray(variants) && variants.length > 0
  const bdtPrices: number[] = []
  const usdPrices: number[] = []

  if (hasVariants) {
    for (const v of variants) {
      const pBdt = Number(v?.price ?? product.price ?? 0)
      if (Number.isFinite(pBdt)) bdtPrices.push(pBdt)
      const pUsdRaw = v?.price_usd ?? (product as any).price_usd
      const pUsd = pUsdRaw != null ? Number(pUsdRaw) : NaN
      if (Number.isFinite(pUsd) && pUsd > 0) usdPrices.push(pUsd)
    }
  }
  if (bdtPrices.length === 0) {
    const p = Number(product.price ?? 0)
    bdtPrices.push(Number.isFinite(p) ? p : 0)
  }
  const minBdt = Math.min(...bdtPrices)
  const maxBdt = Math.max(...bdtPrices)
  const shouldShowRange = hasVariants && minBdt !== maxBdt

  if (currency.value === 'USD') {
    const minUsd = usdPrices.length > 0 ? Math.min(...usdPrices) : (exchangeRate.value > 0 ? minBdt / exchangeRate.value : 0)
    const maxUsd = usdPrices.length > 0 ? Math.max(...usdPrices) : (exchangeRate.value > 0 ? maxBdt / exchangeRate.value : 0)
    const minText = formatPrice(0, minUsd)
    if (!shouldShowRange || minUsd === maxUsd) return minText
    return `${minText}-${formatPrice(0, maxUsd).replace(/^\$/, '')}`
  }
  const minText = formatPrice(minBdt, (product as any).price_usd)
  if (!shouldShowRange) return minText
  return `${minText}-${formatPrice(maxBdt, (product as any).price_usd).replace(/^Tk\s+/, '')}`
}

const { isLoggedIn, isInWishlist, toggleWishlist, initializeWishlist } = useWishlist()

const handleToggleWishlist = async (event: Event, product: Product) => {
  event.preventDefault()
  event.stopPropagation()
  if (product.id && product.slug) await toggleWishlist(product.id, product.slug)
}

// Sync filters from URL and refetch
watch([sizeFromUrl, priceFromUrl, comboFromUrl, sortFromUrl, pageFromUrl], () => {
  isUpdatingFromUrl.value = true
  if (sizeFromUrl.value !== selectedSize.value) selectedSize.value = sizeFromUrl.value
  if (priceFromUrl.value !== selectedPrice.value) selectedPrice.value = priceFromUrl.value
  if (comboFromUrl.value !== selectedCombo.value) selectedCombo.value = comboFromUrl.value
  if (sortFromUrl.value && sortFromUrl.value !== selectedSort.value) selectedSort.value = sortFromUrl.value || 'high-to-low'
  if (pageFromUrl.value !== currentPage.value) currentPage.value = pageFromUrl.value
  isUpdatingFromUrl.value = false
  if (brand.value) fetchProducts()
})

// When filters change: reset to page 1, update URL, refetch (skip when syncing from URL)
watch([selectedSize, selectedPrice, selectedCombo, selectedSort], () => {
  if (isUpdatingFromUrl.value) return
  currentPage.value = 1
  updateUrlQuery()
  if (brand.value) fetchProducts()
})

watch(brandId, () => {
  currentPage.value = 1
  fetchBrand()
}, { immediate: true })

watch(currentPage, (newPage, oldPage) => {
  if (oldPage !== undefined && newPage !== oldPage && brand.value && !isUpdatingFromUrl.value) {
    updateUrlQuery()
    fetchProducts()
  }
})

watch(pageFromUrl, (page) => {
  if (page !== currentPage.value) {
    currentPage.value = page
    if (brand.value) fetchProducts()
  }
})

onMounted(() => {
  initializeWishlist()
})

useHead({
  title: () => (brand.value ? `${brand.value.name} - Rang Bangladesh` : 'Brand - Rang Bangladesh'),
  meta: [
    {
      name: 'description',
      content: () => (brand.value ? `Shop ${brand.value.name} at Rang Bangladesh` : 'Brand at Rang Bangladesh')
    }
  ]
})
</script>

<style scoped>
.hero-banner-brand {
  background: #9d775c;
}
.hero-banner-brand .hero-content {
  min-height: 200px;
}
@media (min-width: 601px) {
  .hero-banner-brand .hero-content {
    min-height: 250px;
  }
}
@media (min-width: 1201px) {
  .hero-banner-brand .hero-content {
    min-height: 280px;
  }
}
.brand-page-back-link {
  color: #ea580c;
  font-weight: 500;
}
.brand-page-back-link:hover {
  text-decoration: underline;
}
</style>
