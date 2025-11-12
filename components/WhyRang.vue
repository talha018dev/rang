<template>
  <section class="why-rang-section">
    <div class="why-rang-container">
        <section class="sale-header">
            <div class="sale-title">
                <div><span class="sale-title-light">Why</span> <span class="sale-title-bold">Rang Bangladesh?</span></div>
            </div>
            <div class="see-all-button mobile-only">
                <ShopNowBlue icon="heroicons:arrow-right" title="See All" />
            </div>
        </section>
        <div class="why-rang-grid">
            <div class="grid-item grid-item-1">
                <div class="card-image">
                    <NuxtImg style="object-position: right;" src="/why-rang-1.png" alt="Festive celebration with people in traditional attire" format="webp" quality="85" loading="lazy" />
                    <!-- <div class="card-overlay">
                        <h3>Because it's Festive</h3>
                    </div> -->
                </div>
            </div>
            <div class="grid-item grid-item-2">
                <div class="card-image">
                    <NuxtImg style="object-position: left;" src="/why-rang-2.png" alt="Colorful traditional celebration" format="webp" quality="85" loading="lazy" />
                    <!-- <div class="card-overlay">
                        <h3>Because it's Colorful</h3>
                    </div> -->
                </div>
            </div>
            <div class="grid-item grid-item-3">
                <div class="card-image">
                    <NuxtImg style="object-position: bottom;" src="/why-rang-3.png" alt="Bangladeshi cultural celebration" format="webp" quality="85" loading="lazy" />
                    <!-- <div class="card-overlay">
                        <h3>Because it's Bangladesh</h3>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ShopNowBlue from './ShopNowBlue.vue'
</script>

<style scoped>
@import './WhyRang.css';
</style>