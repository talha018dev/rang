<template>
    <main class="sale-container">
        <section class="sale-header">
            <div class="sale-title">
                <div><span class="sale-title-light">Sale</span> <span class="sale-title-bold">Offer</span></div>
            </div>
        </section>

        <SaleOfferCountdown :products="saleOfferProducts" />
        <section class="sale-brands-section-secondary">
            <div class="sale-brands-grid-secondary">
                <div class="image-div category-grid-main-men">
                    <NuxtImg src="/sale-offer/sale-offer-1.jpg" alt="Category Rang" class="sale-offer-image category-image-rounded" format="webp" quality="85" loading="lazy" />
                    <div class="image-div-text ultimate-sale" style="top: 10px; left: 10px;">
                        <span>Ultimate</span>
                        <div>Sale</div>
                    </div>
                    <div class="sale-offer-number-container" style="justify-content: space-between; ">
                        <div class="sale-offer-number" style="line-height: 3rem;">50% OFF</div>
                       <div class="" style="bottom: 10px; right: 40px;">
                            <ShopNowBlue />
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
import type { Product } from '../types/homepage';
import SaleOfferCountdown from './SaleOfferCountdown.vue';
import ShopNowBlue from './ShopNowBlue.vue';

interface Props {
  products?: Product[]
}

const props = withDefaults(defineProps<Props>(), {
  products: () => []
})

// Computed property to ensure products are valid
const saleOfferProducts = computed(() => {
  if (!props.products || !Array.isArray(props.products)) {
    return []
  }
  return props.products.filter(product => product && product.id)
})
</script>

<style scoped>
@import './SaleOffer.css';
</style>
