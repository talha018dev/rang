<template>
  <section class="complex-grid-section">
    <div class="complex-grid-container">
      <!-- Text Block: "from Threads" -->
      <div class="grid-item text-block from-threads">
        <div class="text-content">
          <span class="text-line-1">from</span>
          <span class="text-line-2">Threads</span>
        </div>
      </div>

      <!-- Image: Woman in yellow -->
      <div class="grid-item image-block woman-yellow">
        <NuxtImg src="/model-1.jpg" alt="Woman in yellow traditional attire" format="webp" quality="85" loading="lazy" />
      </div>

      <!-- Image: Man in yellow -->
      <div class="grid-item image-block man-yellow">
        <NuxtImg src="/model-2.jpg" alt="Man in yellow traditional attire" format="webp" quality="85" loading="lazy" />
      </div>

      <!-- Text Block: "Customers Diaries" -->
      <div class="grid-item text-block customers-diaries">
        <div class="text-content">
          <span class="text-large">Customers</span>
          <span class="text-small">Diaries</span>
        </div>
      </div>

      <!-- Image: Group with rickshaw -->
      <div class="grid-item image-block group-rickshaw">
        <NuxtImg src="/group-1.jpg" alt="Group celebrating with decorated rickshaw" format="webp" quality="85" loading="lazy" />
      </div>

      <!-- Image: Dancing women -->
      <div class="grid-item image-block dancing-women-1">
        <NuxtImg src="/dancing-1.jpg" alt="Women dancing in traditional attire" format="webp" quality="85" loading="lazy" />
      </div>

      <!-- Image: Woman in white saree -->
      <div class="grid-item image-block woman-saree">
        <NuxtImg src="/saree-woman.jpg" alt="Woman in white saree with flowers" format="webp" quality="85" loading="lazy" />
      </div>

      <!-- Image: Woman on floor -->
      <div class="grid-item image-block woman-floor">
        <NuxtImg src="/woman-floor.jpg" alt="Woman lying on floor with Bengali script" format="webp" quality="85" loading="lazy" />
      </div>

      <!-- Image: Family outdoors -->
      <div class="grid-item image-block family-outdoors">
        <NuxtImg src="/family-outdoors.jpg" alt="Family in traditional attire outdoors" format="webp" quality="85" loading="lazy" />
      </div>

      <!-- Text Block: "to Tones" -->
      <div class="grid-item text-block to-tones">
        <div class="text-content">
          <span class="text-line-1">to</span>
          <span class="text-line-2">Tones</span>
        </div>
      </div>

      <!-- Text Block: "we bring you RANG Bangladesh" -->
      <div class="grid-item text-block rang-bangladesh">
        <div class="text-content">
          <span class="text-line-1">we bring you</span>
          <span class="text-line-2">RANG</span>
          <span class="text-line-3">Bangladesh</span>
        </div>
      </div>

      <!-- Image: Dancing women with temple -->
      <div class="grid-item image-block dancing-women-2">
        <NuxtImg src="/dancing-2.jpg" alt="Women dancing with temple backdrop" format="webp" quality="85" loading="lazy" />
      </div>

      <!-- Image: Couple under roof -->
      <div class="grid-item image-block couple-roof">
        <NuxtImg src="/couple-roof.jpg" alt="Couple sitting under thatched roof" format="webp" quality="85" loading="lazy" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Component logic here
</script>

<style scoped>
@import './ComplexGrid.css';
</style>