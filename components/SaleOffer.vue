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
                    <img src="/sale-offer/sale-offer-1.jpg" alt="Category Rang" class="sale-offer-image category-image-rounded"></img>
                    <div class="image-div-text ultimate-sale" style="top: 10px; left: 10px;">
                        <span>Ultimate</span>
                        <div>Sale</div>
                    </div>
                    <div class="sale-offer-number-container">
                        <div class="sale-offer-number">50% OFF</div>
                        <div class="sale-offer-shop-now">Shop Now
                            <Icon name="heroicons:chevron-right" />
                        </div>
                    </div>
                </div>
                <div class="sale-brands-grid-tertiary">
                    <img src="/sale-offer/sale-offer-2.png" alt="Brand Rang" class="sale-brand-image-cover"></img>
                    <img src="/sale-offer/sale-offer-3.png" alt="Brand Rang" class="sale-brand-image-cover"></img>
                    <img src="/sale-offer/sale-offer-4.png" alt="Brand Rang" class="sale-brand-image-cover"></img>
                    <img src="/sale-offer/sale-offer-5.png" alt="Brand Rang" class="sale-brand-image-cover"></img>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Product } from '../types/homepage';
import SaleOfferCountdown from './SaleOfferCountdown.vue';

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
