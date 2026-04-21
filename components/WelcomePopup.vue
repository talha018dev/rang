<template>
  <Teleport to="body">
    <Transition name="welcome-popup">
      <div
        v-if="isOpen"
        class="welcome-popup-overlay"
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-popup-title"
        @click.self="close"
      >
        <div class="welcome-popup-content">
          <button
            class="welcome-popup-close"
            aria-label="Close"
            @click="close"
          >
            <Icon name="heroicons:x-mark" size="24" />
          </button>

          <div class="welcome-popup-image-wrap">
            <NuxtImg
              v-if="displayImage"
              :src="displayImage"
              :alt="imageAlt"
              class="welcome-popup-image"
              format="webp"
              quality="85"
            />
          </div>

          <div v-if="title" class="welcome-popup-title" id="welcome-popup-title">
            {{ title }}
          </div>

          <NuxtLink
            v-if="ctaUrl && !isExternalUrl(ctaUrl)"
            :to="ctaUrl"
            class="welcome-popup-cta"
            @click="close"
          >
            {{ ctaText }}
          </NuxtLink>
          <a
            v-else-if="ctaUrl && isExternalUrl(ctaUrl)"
            :href="ctaUrl"
            class="welcome-popup-cta"
            target="_blank"
            rel="noopener noreferrer"
            @click="close"
          >
            {{ ctaText }}
          </a>
          <button
            v-else
            class="welcome-popup-cta"
            @click="close"
          >
            {{ ctaText }}
          </button>

          <!-- <label v-if="showDontShowAgain" class="welcome-popup-dismiss">
            <input
              v-model="dontShowAgain"
              type="checkbox"
            />
            Don't show again
          </label> -->
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

const MOBILE_BREAKPOINT = 600

interface Props {
  modelValue?: boolean
  image?: string
  mobileImage?: string | null
  imageAlt?: string
  title?: string
  ctaText?: string
  ctaUrl?: string
  showDontShowAgain?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  image: '/rang-logo-2026-v3.png',
  mobileImage: null,
  imageAlt: 'Welcome',
  title: '',
  ctaText: 'Explore Now',
  ctaUrl: '/products',
  showDontShowAgain: true
})

const isMobile = ref(false)

function updateViewport() {
  if (import.meta.client) {
    isMobile.value = window.innerWidth < MOBILE_BREAKPOINT
  }
}

// // const TEST_MOBILE_IMAGE = '/test-popup.jpg'
// const TEST_MOBILE_IMAGE = '/test-2.png'

// const displayImage = computed(() => {
//   if (isMobile.value) {
//     // For quick testing: use a fixed image under 600px.
//     // If `mobileImage` is explicitly provided, prefer it.
//     return TEST_MOBILE_IMAGE
//   }

//   return props.image
// })

const displayImage = computed(() => {
  if (isMobile.value && props.mobileImage) {
    return props.mobileImage
  }
  return props.image
})

onMounted(() => {
  updateViewport()
  window.addEventListener('resize', updateViewport)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateViewport)
})

function isExternalUrl(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://')
}

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'close'): void
}>()

const STORAGE_KEY = 'welcome_popup_dismissed'
const dontShowAgain = ref(false)

const isOpen = ref(props.modelValue)

function close() {
  if (dontShowAgain.value) {
    try {
      sessionStorage.setItem(STORAGE_KEY, 'true')
    } catch (_) {}
  }
  isOpen.value = false
  emit('update:modelValue', false)
  emit('close')
}

watch(() => props.modelValue, (val) => {
  isOpen.value = val
})

function shouldShow(): boolean {
  if (props.showDontShowAgain) {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === 'true') return false
    } catch (_) {}
  }
  return true
}

defineExpose({
  open: () => { if (shouldShow()) isOpen.value = true },
  close
})
</script>

<style scoped>
.welcome-popup-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  padding: 1rem;
}

.welcome-popup-content {
  position: relative;
  background: white;
  border-radius: 0px;
  width: 50vw;
  height: 50vh;
  overflow: visible;
  padding: 0rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

@media (max-width: 600px) {
  .welcome-popup-content {
    width: 80vw;
    height: 70vh;
    /* overflow: hidden; */
     /* ensure image/click targets don't cause overflow on small screens */
  }
}

.welcome-popup-close {
  position: absolute;
  top: -2rem;
  right: -2rem;
  z-index: 2;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: none;
  background: white;
  cursor: pointer;
  transition: background 0.2s;
}

.welcome-popup-close:hover {
  background: #c2410c;
  color: white
}

.welcome-popup-image-wrap {
  position: absolute;
  inset: 0;
  border-radius: 0px;
  overflow: hidden;
  z-index: 0;
}

.welcome-popup-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}



.welcome-popup-title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.25rem;
  font-weight: 600;
  text-align: center;
  color: #1f2937;
  z-index: 1;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.9);
}

.welcome-popup-cta {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  font-family: 'Futura PT', 'Futura', 'Century Gothic', 'Trebuchet MS', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #e0e0e0;
  padding: 10px 25px;
  text-align: center;
  background-color: #000000;
  border: none;
  border-radius: 0;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.welcome-popup-cta:hover {
  background-color: #1a1a1a;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
  color: #e0e0e0;
}

.welcome-popup-dismiss {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #6b7280;
  cursor: pointer;
}

.welcome-popup-dismiss input {
  cursor: pointer;
}

/* Transitions */
.welcome-popup-enter-active,
.welcome-popup-leave-active {
  transition: opacity 0.2s ease;
}

.welcome-popup-enter-active .welcome-popup-content,
.welcome-popup-leave-active .welcome-popup-content {
  transition: transform 0.2s ease;
}

.welcome-popup-enter-from,
.welcome-popup-leave-to {
  opacity: 0;
}

.welcome-popup-enter-from .welcome-popup-content,
.welcome-popup-leave-to .welcome-popup-content {
  transform: scale(0.95);
}

@media (max-width: 600px) {
  .welcome-popup-image {
    object-fit: cover; /* mobile image should still cover the whole popup */
  }

  .welcome-popup-close {
    /* top: 12px;
    right: 12px; */
    top: -2rem;
    right: -2rem;
  }

  .welcome-popup-title {
    font-size: 1.05rem;
  }

  .welcome-popup-cta {
    bottom: 12px;
    font-size: 0.85rem;
    padding: 9px 20px;
    text-wrap: nowrap;
  }
}
</style>
