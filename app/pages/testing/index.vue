<template>
  <main class="testing-page">
    <div class="testing-container">
      <section class="testing-header">
        <h1 class="testing-title">Product Form</h1>
        <p class="testing-subtitle">Submit a new product to the system</p>
      </section>

      <section class="testing-form-section">
        <form @submit.prevent="handleSubmit" class="testing-form">
          <div class="form-row">
            <div class="form-group">
              <label for="name" class="form-label">Product Name <span class="required">*</span></label>
              <input
                id="name"
                v-model="formData.name"
                type="text"
                class="form-input"
                placeholder="Enter product name"
                required
              />
            </div>

            <div class="form-group">
              <label for="brand" class="form-label">Brand <span class="required">*</span></label>
              <input
                id="brand"
                v-model="formData.brand"
                type="text"
                class="form-input"
                placeholder="Enter brand name"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <label for="description" class="form-label">Description</label>
            <textarea
              id="description"
              v-model="formData.description"
              class="form-textarea"
              rows="4"
              placeholder="Enter product description"
            ></textarea>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="price" class="form-label">Price <span class="required">*</span></label>
              <input
                id="price"
                v-model="formData.price"
                type="number"
                step="0.01"
                min="0"
                class="form-input"
                placeholder="0.00"
                required
              />
            </div>

            <div class="form-group">
              <label for="category" class="form-label">Category <span class="required">*</span></label>
              <input
                id="category"
                v-model="formData.category"
                type="text"
                class="form-input"
                placeholder="Enter category"
                required
              />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="releaseDate" class="form-label">Release Date</label>
              <input
                id="releaseDate"
                v-model="formData.releaseDate"
                type="date"
                class="form-input"
              />
            </div>

            <div class="form-group">
              <label for="quantity" class="form-label">Quantity <span class="required">*</span></label>
              <input
                id="quantity"
                v-model.number="formData.quantity"
                type="number"
                min="0"
                class="form-input"
                placeholder="0"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <label class="checkbox-label">
              <input
                v-model="formData.available"
                type="checkbox"
                class="checkbox-input"
              />
              <span class="checkbox-text">Product is available</span>
            </label>
          </div>

          <div class="form-group">
            <label for="imageData" class="form-label">Product Image</label>
            <input
              id="imageData"
              type="file"
              accept="image/*"
              class="form-file-input"
              @change="handleFileChange"
            />
            <p v-if="selectedFile" class="file-info">Selected: {{ selectedFile.name }}</p>
          </div>

          <button type="submit" class="submit-button" :disabled="isSubmitting">
            <span v-if="!isSubmitting">Submit Product</span>
            <span v-else>Submitting...</span>
          </button>

          <div v-if="submitMessage" :class="['submit-message', submitMessageType]">
            {{ submitMessage }}
          </div>
        </form>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useHead } from 'nuxt/app'
import { ref } from 'vue'
import { useApi } from '~~/composables/useApi'
import './testing.css'

// Meta
useHead({
  title: 'Testing - Product Form - Rang Bangladesh',
  meta: [
    { name: 'description', content: 'Test product submission form' }
  ]
})

// Form data - pre-filled with sample data
const formData = ref({
  name: 'Premium Cotton Saree',
  description: 'Beautiful handwoven cotton saree with intricate designs, perfect for special occasions.',
  brand: 'Rang',
  price: '2999.99',
  category: 'Saree',
  releaseDate: new Date().toISOString().split('T')[0], // Today's date
  available: true,
  quantity: 50
})

const selectedFile = ref<File | null>(null)
const isSubmitting = ref(false)
const submitMessage = ref('')
const submitMessageType = ref<'success' | 'error'>('success')

// Handle file change
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0 && target.files[0]) {
    selectedFile.value = target.files[0]
  }
}

// Handle form submission
const handleSubmit = async () => {
  isSubmitting.value = true
  submitMessage.value = ''

  try {
    const { backendUrl } = useApi()
    
    // Prepare form data
    const productData: any = {
      name: formData.value.name,
      description: formData.value.description || null,
      brand: formData.value.brand,
      price: formData.value.price ? parseFloat(formData.value.price) : null,
      category: formData.value.category,
      releaseDate: formData.value.releaseDate || null,
      available: formData.value.available,
      quantity: formData.value.quantity
    }

    // Handle image file if selected
    if (selectedFile.value) {
      // Auto-extract image name and type from file
      productData.imageName = selectedFile.value.name
      productData.imageType = selectedFile.value.type || null
      
      // Convert file to base64
      const reader = new FileReader()
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          const result = reader.result as string
          // Remove data URL prefix (e.g., "data:image/png;base64,")
          const base64 = result.split(',')[1]
          if (!base64) {
            reject(new Error('Failed to convert file to base64'))
            return
          }
          resolve(base64)
        }
        reader.onerror = reject
      })
      
      reader.readAsDataURL(selectedFile.value)
      const base64Data = await base64Promise
      
      // Convert base64 to byte array (Uint8Array)
      const binaryString = atob(base64Data)
      const bytes = new Uint8Array(binaryString.length)
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i)
      }
      
      // Convert to array for JSON serialization
      productData.imageData = Array.from(bytes)
    }

    console.log('Submitting product data:', productData)

    // Make API call
    const response = await $fetch<any>('http://localhost:8080/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        // 'X-Requested-With': 'XMLHttpRequest'
      },
      body: productData
    })

    console.log('Product API Response:', response)

    submitMessage.value = 'Product submitted successfully!'
    submitMessageType.value = 'success'

    // Reset form to pre-filled values
    formData.value = {
      name: 'Premium Cotton Saree',
      description: 'Beautiful handwoven cotton saree with intricate designs, perfect for special occasions.',
      brand: 'Rang',
      price: '2999.99',
      category: 'Saree',
      releaseDate: new Date().toISOString().split('T')[0],
      available: true,
      quantity: 50
    }
    selectedFile.value = null
    
    // Reset file input
    const fileInput = document.getElementById('imageData') as HTMLInputElement
    if (fileInput) {
      fileInput.value = ''
    }
  } catch (error: any) {
    console.error('Error submitting product:', error)
    const errorMessage = error?.data?.message || error?.message || 'Failed to submit product. Please try again.'
    submitMessage.value = errorMessage
    submitMessageType.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
@import './testing.css';
</style>

