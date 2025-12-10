<template>
  <button class="flex items-center mx-auto! justify-center flex-wrap gap-2 px-6  bg-[#4285F4]! text-white! border-none rounded-none md:rounded-lg font-sans text-base font-medium cursor-pointer transition-all duration-200 ease-in-out shadow-[0_2px_4px_rgba(66,133,244,0.2)] min-w-[120px] hover:shadow-[0px_7px_6px_0px_rgb(21_54_109/20%)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_4px_rgba(66,133,244,0.2)] focus:outline-none focus:shadow-[0_0_0_3px_rgba(66,133,244,0.3)] md:px-5!  md:text-sm md:min-w-[100px] h-fit py-1! md:py-2.5! md:h-11">
    <span class="text-xs! md:text-base! font-medium tracking-wide">{{ title }}</span>
    <Icon :name="iconName" class="hidden md:block text-xs md:text-base w-5 h-5 stroke-white! flex-shrink-0 md:w-[18px] md:h-[18px]" />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

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