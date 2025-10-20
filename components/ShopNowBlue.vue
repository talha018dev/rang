<template>
  <button class="shop-now-blue-button">
    <span class="button-text">{{ title }}</span>
    <Icon :name="iconName" class="button-icon" />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import './ShopNowBlue.css';

interface Props {
  icon?: string
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  icon: 'heroicons:shopping-bag',
  title: 'Shop Now'
})

const iconName = computed(() => props.icon)
</script>