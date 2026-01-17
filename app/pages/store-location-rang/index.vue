<template>
  <div class="store-location-page">
    <div class="store-location-container">
      <section class="store-location-header">
        <h1 class="store-location-title">Store Location</h1>
        <p class="store-location-subtitle">Find our stores near you</p>
      </section>

      <div v-if="isLoading" class="loading-state">
        <p>Loading locations...</p>
      </div>

      <div v-else-if="error" class="error-state">
        <p>Error loading locations: {{ error }}</p>
      </div>

      <section v-else-if="locations && locations.length > 0" class="districts-section">
        <h2 class="districts-title">Browse by District</h2>
        <div class="districts-buttons">
          <button
            v-for="district in districts"
            :key="district"
            @click="scrollToDistrict(district)"
            class="district-button"
          >
            {{ district }}
          </button>
        </div>
      </section>

      <section v-if="locations && locations.length > 0" class="locations-section">
        <div class="locations-grid">
          <div
            v-for="location in locations"
            :key="location.name"
            :id="getLocationId(location)"
            class="location-card"
          >
            <div v-if="location.image" class="location-image-wrapper">
              <img
                :src="getImageUrl(location.image)"
                :alt="location.name"
                class="location-image"
                @error="handleImageError"
              />
            </div>
            <div class="location-content">
              <h2 class="location-name">{{ location.name }}</h2>
              <div class="location-details">
                <div class="location-address">
                  <strong>Address:</strong>
                  <p>{{ location.address }}</p>
                </div>
                <div v-if="location.phone" class="location-phone">
                  <strong>Phone:</strong>
                  <a :href="`tel:${location.phone}`" class="phone-link">{{ location.phone }}</a>
                </div>
                <div v-if="location.working_hours" class="location-hours">
                  <strong>Working Hours:</strong>
                  <div class="hours-content">
                    <div
                      v-for="(time, day) in location.working_hours"
                      :key="day"
                      class="hours-item"
                    >
                      <span class="hours-day">{{ day }}:</span>
                      <span class="hours-time">{{ time }}</span>
                    </div>
                  </div>
                </div>
                <div v-if="location.off_day" class="location-off-day">
                  <strong>Off Day:</strong>
                  <span>{{ location.off_day }}</span>
                </div>
                <div v-if="location.email" class="location-email">
                  <strong>Email:</strong>
                  <a :href="`mailto:${location.email}`" class="email-link">{{ location.email }}</a>
                </div>
                <div class="location-links">
                  <a
                    v-if="location.fb_page_link"
                    :href="location.fb_page_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="social-link fb-link"
                  >
                    Facebook Page
                  </a>
                  <a
                    v-if="location.google_map_url"
                    :href="location.google_map_url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="social-link map-link"
                  >
                    Google Map
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div v-else class="empty-state">
        <p>No locations available</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useApi } from '~~/composables/useApi'
import type { Location, LocationResponse } from '~~/types/locations'
import './store-location-rang.css'

// Reactive state
const locations = ref<Location[] | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)

// Extract districts from locations
const districts = computed(() => {
  if (!locations.value || locations.value.length === 0) return []
  
  const districtSet = new Set<string>()
  locations.value.forEach(location => {
    // Extract district from location name (assuming format like "Rang - District Name" or just "District Name")
    // You can adjust this logic based on your actual data format
    const district = extractDistrict(location.name, location.address)
    if (district) {
      districtSet.add(district)
    }
  })
  
  return Array.from(districtSet).sort()
})

// Extract district from name or address
const extractDistrict = (name: string, address: string): string => {
  // Try to extract from name first (common patterns: "Rang - District", "District Branch", etc.)
  const nameParts = name.split(/[-–—]/).map(part => part.trim())
  if (nameParts.length > 1) {
    const lastPart = nameParts[nameParts.length - 1]
    if (lastPart) {
      return lastPart
    }
  }
  
  // Try to extract from address (look for common district patterns)
  const addressLower = address.toLowerCase()
  const commonDistricts = ['dhaka', 'chittagong', 'sylhet', 'rajshahi', 'khulna', 'barisal', 'rangpur', 'mymensingh']
  for (const district of commonDistricts) {
    if (addressLower.includes(district)) {
      return district.charAt(0).toUpperCase() + district.slice(1)
    }
  }
  
  // If no pattern matches, use the location name as district
  return name
}

// Generate a unique ID for each location card
const getLocationId = (location: Location): string => {
  const district = extractDistrict(location.name, location.address)
  return `location-${district.toLowerCase().replace(/\s+/g, '-')}-${location.name.toLowerCase().replace(/\s+/g, '-')}`
}

// Scroll to a specific district
const scrollToDistrict = (district: string) => {
  if (!locations.value) return
  
  // Find the first location in this district
  const location = locations.value.find(loc => {
    const locDistrict = extractDistrict(loc.name, loc.address)
    return locDistrict === district
  })
  
  if (location) {
    const locationId = getLocationId(location)
    const element = document.getElementById(locationId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}

// Get image URL
const getImageUrl = (imagePath: string) => {
  if (!imagePath) return ''
  if (imagePath.startsWith('http')) return imagePath
  const { baseUrl } = useApi()
  return `${baseUrl}${imagePath}`
}

// Handle image error
const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.style.display = 'none'
}

// Fetch locations from API
onMounted(async () => {
  isLoading.value = true
  error.value = null

  try {
    const { backendUrl } = useApi()
    const response = await $fetch<LocationResponse>(`${backendUrl}/locations`)
    console.log('Locations API Response:', response)

    if (response.success && response.data) {
      locations.value = response.data
      console.log('Locations:', locations.value)
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
    error.value = errorMessage
    console.error('Error fetching locations:', err)
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped>
@import './store-location-rang.css';
</style>

