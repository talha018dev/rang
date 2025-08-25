<template>
    <main class="max-w-[90%] mx-auto">
        <section class="my-20">
            <div class="text-6xl text-center">
                <h1><span class="text-[#FAB767] font-light">Sale</span> <span class="text-[#F1592C] font-bold">Offer</span></h1>
            </div>
        </section>
        
        <SaleOfferCountdown />
        
        <section class="mt-8">
            <div class="grid grid-cols-2 gap-4">
                <img src="/brand-6.png" alt="Brand Rang" class="w-full h-full object-cover rounded-none"></img>
                <div class="grid grid-cols-2 gap-4">
                    <img src="/brand-7.png" alt="Brand Rang" class="w-full h-full object-cover rounded-none"></img>
                    <img src="/brand-8.png" alt="Brand Rang" class="w-full h-full object-cover rounded-none"></img>
                    <img src="/brand-9.png" alt="Brand Rang" class="w-full h-full object-cover rounded-none"></img>
                    <img src="/brand-10.png" alt="Brand Rang" class="w-full h-full object-cover rounded-none"></img>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
import SaleOfferCountdown from './SaleOfferCountdown.vue';
</script>
