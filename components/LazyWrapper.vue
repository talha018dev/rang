<template>
  <div ref="target" :style="{ minHeight: !isVisible ? '200px' : 'auto' }">
    <component v-if="isVisible && component" :is="component" v-bind="componentProps" />
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue';
import { onMounted, onUnmounted, ref } from 'vue';

interface Props {
  loader: () => Promise<{ default: Component }>
  componentProps?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  componentProps: () => ({})
})

const target = ref<HTMLElement | null>(null)
const isVisible = ref(false)
const component = ref<Component | null>(null)
const isLoading = ref(false)

let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!target.value) return

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isVisible.value && !isLoading.value) {
          isLoading.value = true
          const componentName = props.loader.toString().match(/components\/([^/]+)\.vue/)?.[1] || 'Unknown'
          console.log(`🔄 Lazy loading component: ${componentName}`)
          // Load component when about to be visible
          props.loader().then((module) => {
            component.value = module.default
            isVisible.value = true
            console.log(`✅ Component loaded: ${componentName}`)
            // Disconnect observer once component is loaded
            if (observer && target.value) {
              observer.unobserve(target.value)
            }
          }).catch((error) => {
            console.error(`❌ Error loading lazy component ${componentName}:`, error)
            isLoading.value = false
          })
        }
      })
    },
    {
      rootMargin: '50px' // Start loading 50px before component enters viewport
    }
  )

  observer.observe(target.value)
})

onUnmounted(() => {
  if (observer && target.value) {
    observer.unobserve(target.value)
    observer.disconnect()
  }
})
</script>

