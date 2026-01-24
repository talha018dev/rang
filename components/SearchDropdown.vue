<template>
  <div v-if="show" :class="dropdownClass">
    <div class="search-container">
      <UInput 
        :model-value="searchText" 
        placeholder="Search products..." 
        class="search-input-menu"
        icon="i-heroicons-magnifying-glass" 
        @update:model-value="$emit('update:searchText', $event)"
        @input="handleInput" 
        @focus="$emit('focus')" 
        autofocus 
      />
      <div v-if="showSearchResults && (searchOptions.length > 0 || searchText.length >= 2)"
        class="search-results-dropdown">
        <div v-if="isSearching" class="search-loading">
          <p>Searching...</p>
        </div>
        <div v-else-if="searchOptions.length > 0" class="search-results-list">
          <NuxtLink 
            v-for="option in searchOptions" 
            :key="option.id"
            :to="`/products/${option.category.slug}/${option.slug}`" 
            class="search-result-item"
            @click="$emit('close')">
            <div class="search-result-image">
              <NuxtImg 
                :src="getImageUrl(option.image)" 
                :alt="option.name" 
                class="result-image" 
                loading="lazy"
                format="webp" 
                quality="85" 
              />
            </div>
            <div class="search-result-details">
              <div class="search-result-name">{{ option.name }}</div>
              <div class="search-result-price">{{ formatPrice(option.price) }}</div>
            </div>
          </NuxtLink>
        </div>
        <div v-else-if="searchText.length >= 2" class="search-empty">
          <p>No products found</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCurrency } from '../composables/useCurrency';
import type { Product } from '../types/homepage';
import './SearchDropdown.css';

interface Props {
  show: boolean
  searchText: string
  searchOptions: Product[]
  isSearching: boolean
  showSearchResults: boolean
  dropdownClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  dropdownClass: 'search-menu-dropdown'
})

const emit = defineEmits<{
  'update:searchText': [value: string]
  'input': [event: Event]
  'focus': []
  'close': []
}>()

const { formatPrice } = useCurrency()

// Helper function to get full image URL
const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return ''
  // If image path already includes http/https, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }
  // Otherwise, prepend the API base URL
  return `https://rangbd.thecell.tech${imagePath.startsWith('/') ? imagePath : '/' + imagePath}`
}

// Handle input event
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:searchText', target.value)
  emit('input', event)
}
</script>

<style>
@import './SearchDropdown.css';
</style>

