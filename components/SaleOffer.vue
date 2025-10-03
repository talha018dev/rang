<template>
    <main class="sale-container">
        <section class="sale-header">
            <div class="sale-title">
                <div><span class="sale-title-light">Sale</span> <span class="sale-title-bold">Offer</span></div>
            </div>
        </section>
        
        <SaleOfferCountdown />
    </main>
</template>

<script setup lang="ts">
import SaleOfferCountdown from './SaleOfferCountdown.vue';
</script>

<style scoped>
@import './SaleOffer.css';
</style>
