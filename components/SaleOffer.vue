<template>
    <main class="sale-container">
        <section class="sale-header">
            <div class="sale-title">
                <div><span class="sale-title-light">Sale</span> <span class="sale-title-bold">Offer</span></div>
            </div>
        </section>
        
        <SaleOfferCountdown />
        
        <section class="">
            <div class="sale-grid-main">
                <img src="/brand-6.png" alt="Brand Rang" class="sale-image"></img>
                <div class="sale-grid-secondary">
                    <img src="/brand-7.png" alt="Brand Rang" class="sale-image"></img>
                    <img src="/brand-8.png" alt="Brand Rang" class="sale-image"></img>
                    <img src="/brand-9.png" alt="Brand Rang" class="sale-image"></img>
                    <img src="/brand-10.png" alt="Brand Rang" class="sale-image"></img>
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
