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
                        <NuxtImg :src="saleOfferProducts[0]?.image" :alt="saleOfferProducts[0]?.name" class="sale-offer-image category-image-rounded" format="webp" quality="85" loading="lazy" />
                        <div class="absolute! text-white! top-4! left-4!">
                            <div class="text-lg! sm:text-6xl! font-bold!">Ultimate</div>
                            <div class="text-lg! sm:text-6xl!">Sale</div>
                        </div>
                        <div class="sale-offer-number-container w-full bottom-4! pl-4!" style="justify-content: space-between; ">
                            <div class="text-lg! sm:text-6xl! font-bold!">50% OFF</div>
                           <div class="text-lg!">
                                <ShopNowCTA text="Shop Now" />
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
        <section v-else class="sale-brands-section-secondary">
            <div class="sale-brands-grid-secondary">
                <div class="image-div category-grid-main-men">
                    <NuxtImg src="/sale-offer/ultimate-sale-2.webp" alt="Category Rang" class="sale-offer-image category-image-rounded" format="webp" quality="85" loading="lazy" />
                    <div class="absolute! text-white! top-4! left-4!">
                        <div class="text-lg! sm:text-6xl! font-bold!">Ultimate</div>
                        <div class="text-lg! sm:text-6xl!">Sale</div>
                    </div>
                    <div class="sale-offer-number-container w-full bottom-4! pl-4!" style="justify-content: space-between; ">
                        <div class="text-lg! sm:text-6xl! font-bold!">50% OFF</div>
                       <div class="text-lg!">
                            <ShopNowCTA text="Shop Now" />
                        </div>
                    </div>
                </div>
                <div class="sale-brands-grid-tertiary">
                    <NuxtImg src="/sale-offer/sale-offer-2.png" alt="Brand Rang" class="sale-brand-image-cover" format="webp" quality="85" loading="lazy" />
                    <NuxtImg src="/sale-offer/sale-offer-3.png" alt="Brand Rang" class="sale-brand-image-cover" format="webp" quality="85" loading="lazy" />
                    <NuxtImg src="/sale-offer/sale-offer-4.png" alt="Brand Rang" class="sale-brand-image-cover" format="webp" quality="85" loading="lazy" />
                    <NuxtImg src="/sale-offer/sale-offer-5.png" alt="Brand Rang" class="sale-brand-image-cover" format="webp" quality="85" loading="lazy" />
                </div>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { HomePageProduct2 } from '../types/homepage';
import SaleOfferCountdown from './SaleOfferCountdown.vue';
import ShopNowCTA from './ShopNowCTA.vue';

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
</script>

<style scoped>
@import './SaleOffer.css';
</style>
