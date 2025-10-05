<template>
    <main class="sale-container">
        <section class="sale-header">
            <div class="sale-title">
                <div><span class="sale-title-light">Sale</span> <span class="sale-title-bold">Offer</span></div>
            </div>
        </section>
        
        <SaleOfferCountdown />
        <section class="sale-brands-section-secondary">
            <div class="sale-brands-grid-secondary">
                <div class="image-div">
                    <!-- <div class="sale-offer-text">50% OFF</div>
                    <div class="image-shop-now">
                        <span>Shop Now <Icon name="heroicons:chevron-right" /></span>
                    </div> -->
                    <img src="/sale-offer/sale-offer-1.png" alt="Brand Rang" class="sale-brand-image-cover"></img>
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
import SaleOfferCountdown from './SaleOfferCountdown.vue';
</script>

<style scoped>
@import './SaleOffer.css';
</style>
