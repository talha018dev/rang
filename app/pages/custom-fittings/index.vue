<template>
  <main class="custom-fittings-page">
    <div class="custom-fittings-container">
      <form @submit.prevent="handleSubmit" class="custom-fittings-form">
        <!-- Select Gender Section -->
        <section class="form-section">
          <label class="section-label">Select Gender:</label>
          <div class="radio-group">
            <label class="radio-label">
              <input
                type="radio"
                name="gender"
                value="men"
                v-model="formData.gender"
                class="radio-input"
              />
              <span class="radio-text">Men</span>
            </label>
            <label class="radio-label">
              <input
                type="radio"
                name="gender"
                value="women"
                v-model="formData.gender"
                class="radio-input"
              />
              <span class="radio-text">Women</span>
            </label>
            <label class="radio-label">
              <input
                type="radio"
                name="gender"
                value="boy"
                v-model="formData.gender"
                class="radio-input"
              />
              <span class="radio-text">Boy</span>
            </label>
            <label class="radio-label">
              <input
                type="radio"
                name="gender"
                value="girl"
                v-model="formData.gender"
                class="radio-input"
              />
              <span class="radio-text">Girl</span>
            </label>
          </div>
        </section>

        <!-- Select Item Section -->
        <section class="form-section">
          <label class="section-label">Select Item:</label>
          <div v-if="selectedItem" class="selected-item-tag">
            <span>{{ selectedItem }}</span>
            <button
              type="button"
              @click="clearSelectedItem"
              class="remove-item-btn"
              aria-label="Remove item"
            >
              <Icon name="heroicons:x-mark" class="remove-icon" />
            </button>
          </div>
          <div v-else class="item-selector">
            <div class="select-wrapper">
              <select
                v-model="formData.item"
                @change="updateSelectedItem"
                class="form-select"
              >
                <option value="">Select an item</option>
                <option value="men-shirt">Men Shirt</option>
                <option value="women-shirt">Women Shirt</option>
                <option value="men-pants">Men Pants</option>
                <option value="women-pants">Women Pants</option>
                <option value="kurta">Kurta</option>
                <option value="saree">Saree</option>
              </select>
              <Icon name="heroicons:chevron-down" class="select-caret" />
            </div>
          </div>
        </section>

        <!-- Item Type Section -->
        <section class="form-section">
          <label class="section-label">Item Type:</label>
          <div class="radio-group">
            <label class="radio-label">
              <input
                type="radio"
                name="itemType"
                value="half-sleeve"
                v-model="formData.itemType"
                class="radio-input"
              />
              <span class="radio-text">Half Sleeve</span>
            </label>
            <label class="radio-label">
              <input
                type="radio"
                name="itemType"
                value="full-sleeve"
                v-model="formData.itemType"
                class="radio-input"
              />
              <span class="radio-text">Full Sleeve</span>
            </label>
          </div>
        </section>

        <!-- Input Measurement Section -->
        <section class="form-section measurement-section">
          <label class="section-label">Input Measurement</label>
          <div class="measurement-container">
            <div class="measurement-fields">
              <div class="measurement-column">
                <div class="measurement-field">
                  <label class="measurement-label">Chest:</label>
                  <input
                    type="text"
                    v-model="formData.measurements.chest"
                    class="measurement-input"
                    placeholder="Enter chest measurement"
                  />
                </div>
                <div class="measurement-field">
                  <label class="measurement-label">Hip:</label>
                  <input
                    type="text"
                    v-model="formData.measurements.hip"
                    class="measurement-input"
                    placeholder="Enter hip measurement"
                  />
                </div>
                <div class="measurement-field">
                  <label class="measurement-label">Sleeve:</label>
                  <input
                    type="text"
                    v-model="formData.measurements.sleeve"
                    class="measurement-input"
                    placeholder="Enter sleeve measurement"
                  />
                </div>
                <div class="measurement-field">
                  <label class="measurement-label">Armhole:</label>
                  <input
                    type="text"
                    v-model="formData.measurements.armhole"
                    class="measurement-input"
                    placeholder="Enter armhole measurement"
                  />
                </div>
                <div class="measurement-field">
                  <label class="measurement-label">Length:</label>
                  <input
                    type="text"
                    v-model="formData.measurements.length"
                    class="measurement-input"
                    placeholder="Enter length measurement"
                  />
                </div>
                <div class="measurement-field">
                  <label class="measurement-label">Pocket:</label>
                  <input
                    type="text"
                    v-model="formData.measurements.pocket"
                    class="measurement-input"
                    placeholder="Enter pocket measurement"
                  />
                </div>
              </div>
              <div class="measurement-column">
                <div class="measurement-field">
                  <label class="measurement-label">Waist:</label>
                  <input
                    type="text"
                    v-model="formData.measurements.waist"
                    class="measurement-input"
                    placeholder="Enter waist measurement"
                  />
                </div>
                <div class="measurement-field">
                  <label class="measurement-label">Band Collar:</label>
                  <input
                    type="text"
                    v-model="formData.measurements.bandCollar"
                    class="measurement-input"
                    placeholder="Enter band collar measurement"
                  />
                </div>
                <div class="measurement-field">
                  <label class="measurement-label">Sleeve Opening:</label>
                  <input
                    type="text"
                    v-model="formData.measurements.sleeveOpening"
                    class="measurement-input"
                    placeholder="Enter sleeve opening measurement"
                  />
                </div>
                <div class="measurement-field">
                  <label class="measurement-label">Shoulder:</label>
                  <input
                    type="text"
                    v-model="formData.measurements.shoulder"
                    class="measurement-input"
                    placeholder="Enter shoulder measurement"
                  />
                </div>
                <div class="measurement-field">
                  <label class="measurement-label">Bottom:</label>
                  <input
                    type="text"
                    v-model="formData.measurements.bottom"
                    class="measurement-input"
                    placeholder="Enter bottom measurement"
                  />
                </div>
              </div>
            </div>
            <div class="measurement-diagram">
              <div class="shirt-diagram">
                <svg viewBox="0 0 200 300" class="shirt-svg">
                  <!-- Shirt body -->
                  <path
                    d="M 50 50 L 50 250 L 150 250 L 150 50 L 120 50 L 120 80 L 80 80 L 80 50 Z"
                    fill="#e0f2fe"
                    stroke="#0284c7"
                    stroke-width="2"
                  />
                  <!-- Collar -->
                  <path
                    d="M 80 50 L 100 40 L 120 50"
                    fill="none"
                    stroke="#0284c7"
                    stroke-width="2"
                  />
                  <!-- Chest measurement line -->
                  <line
                    x1="50"
                    y1="120"
                    x2="150"
                    y2="120"
                    stroke="#0284c7"
                    stroke-width="1.5"
                    stroke-dasharray="5,5"
                  />
                  <text x="100" y="115" text-anchor="middle" font-size="12" fill="#0284c7">Chest</text>
                  <!-- Length measurement line -->
                  <line
                    x1="160"
                    y1="50"
                    x2="160"
                    y2="250"
                    stroke="#0284c7"
                    stroke-width="1.5"
                    stroke-dasharray="5,5"
                  />
                  <text x="170" y="150" text-anchor="middle" font-size="12" fill="#0284c7" transform="rotate(90 170 150)">Length</text>
                </svg>
              </div>
            </div>
          </div>
        </section>

        <!-- Note/Instruction's Section -->
        <section class="form-section">
          <label class="section-label">Note/Instruction's:</label>
          <textarea
            v-model="formData.notes"
            class="form-textarea"
            rows="4"
            placeholder="Enter any special instructions or notes for your order"
          ></textarea>
        </section>

        <!-- Submit Design or Sample Photo Section -->
        <section class="form-section">
          <label class="section-label">Submit any design or Sample photo (If Any):</label>
          <div class="file-upload-wrapper">
            <input
              type="file"
              ref="fileInput"
              @change="handleFileChange"
              accept="image/*"
              class="file-input"
              id="design-photo"
            />
            <label for="design-photo" class="file-upload-label">
              <Icon name="heroicons:arrow-up-tray" class="upload-icon" />
              <span class="upload-text">Upload Photo</span>
            </label>
            <div v-if="uploadedFile" class="uploaded-file-info">
              <span>{{ uploadedFile.name }}</span>
              <button
                type="button"
                @click="clearFile"
                class="remove-file-btn"
                aria-label="Remove file"
              >
                <Icon name="heroicons:x-mark" class="remove-icon" />
              </button>
            </div>
          </div>
        </section>

        <!-- Contact Information Section -->
        <section class="form-section contact-section">
          <label class="section-label">Contact information</label>
          <div class="contact-fields">
            <div class="form-row">
              <div class="form-field">
                <label class="form-label">
                  First name <span class="required">*</span>
                </label>
                <input
                  type="text"
                  v-model="formData.contact.firstName"
                  class="form-input"
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div class="form-field">
                <label class="form-label">
                  Last name <span class="required">*</span>
                </label>
                <input
                  type="text"
                  v-model="formData.contact.lastName"
                  class="form-input"
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>
            <div class="form-field">
              <label class="form-label">Company name (optional)</label>
              <input
                type="text"
                v-model="formData.contact.companyName"
                class="form-input"
                placeholder="Enter company name (optional)"
              />
            </div>
            <div class="form-field">
              <label class="form-label">
                Country / Region <span class="required">*</span>
              </label>
              <div class="select-wrapper">
                <select
                  v-model="formData.contact.country"
                  class="form-select"
                  required
                >
                  <option value="bangladesh">Bangladesh</option>
                  <option value="india">India</option>
                  <option value="usa">United States</option>
                  <option value="uk">United Kingdom</option>
                </select>
                <Icon name="heroicons:chevron-down" class="select-caret" />
              </div>
            </div>
            <div class="form-field">
              <label class="form-label">
                House number and street name <span class="required">*</span>
              </label>
              <input
                type="text"
                v-model="formData.contact.street"
                class="form-input"
                placeholder="Enter house number and street name"
                required
              />
            </div>
            <div class="form-field">
              <label class="form-label">Apartment, suite, unit, etc. (optional)</label>
              <input
                type="text"
                v-model="formData.contact.apartment"
                class="form-input"
                placeholder="Enter apartment, suite, unit, etc."
              />
            </div>
            <div class="form-row">
              <div class="form-field">
                <label class="form-label">
                  Town / City <span class="required">*</span>
                </label>
                <input
                  type="text"
                  v-model="formData.contact.city"
                  class="form-input"
                  placeholder="Enter town or city"
                  required
                />
              </div>
              <div class="form-field">
                <label class="form-label">
                  District <span class="required">*</span>
                </label>
                <div class="select-wrapper">
                  <select
                    v-model="formData.contact.district"
                    class="form-select"
                    required
                  >
                    <option value="">Select District</option>
                    <option value="dhaka">Dhaka</option>
                    <option value="chittagong">Chittagong</option>
                    <option value="sylhet">Sylhet</option>
                    <option value="rajshahi">Rajshahi</option>
                    <option value="khulna">Khulna</option>
                    <option value="barisal">Barisal</option>
                  </select>
                  <Icon name="heroicons:chevron-down" class="select-caret" />
                </div>
              </div>
            </div>
            <div class="form-field">
              <label class="form-label">
                Postcode / ZIP <span class="required">*</span>
              </label>
              <input
                type="text"
                v-model="formData.contact.postcode"
                class="form-input"
                placeholder="Enter postcode or ZIP"
                required
              />
            </div>
            <div class="form-field">
              <label class="form-label">
                Phone <span class="required">*</span>
              </label>
              <input
                type="tel"
                v-model="formData.contact.phone"
                class="form-input"
                placeholder="Enter phone number"
                required
              />
            </div>
          </div>
        </section>

        <!-- Submit Button -->
        <div class="form-actions">
          <button type="submit" class="submit-button" :disabled="isSubmitting">
            <span v-if="!isSubmitting">Submit Order</span>
            <span v-else>Submitting...</span>
          </button>
        </div>

        <!-- Submit Message -->
        <div v-if="submitMessage" :class="['submit-message', submitMessageType]">
          {{ submitMessage }}
        </div>
      </form>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useHead } from 'nuxt/app'
import './custom-fittings.css'

// Meta
useHead({
  title: 'Custom Fittings - Rang Bangladesh',
  meta: [
    { name: 'description', content: 'Order custom-fitted clothing from Rang Bangladesh. Provide your measurements and get perfectly tailored garments.' }
  ]
})

// Form data
const formData = ref({
  gender: 'men',
  item: '',
  itemType: 'half-sleeve',
  measurements: {
    chest: '',
    hip: '',
    sleeve: '',
    armhole: '',
    length: '',
    pocket: '',
    waist: '',
    bandCollar: '',
    sleeveOpening: '',
    shoulder: '',
    bottom: ''
  },
  notes: '',
  contact: {
    firstName: '',
    lastName: '',
    companyName: '',
    country: 'bangladesh',
    street: '',
    apartment: '',
    city: '',
    district: '',
    postcode: '',
    phone: ''
  }
})

const fileInput = ref<HTMLInputElement | null>(null)
const uploadedFile = ref<File | null>(null)
const isSubmitting = ref(false)
const submitMessage = ref('')
const submitMessageType = ref<'success' | 'error'>('success')

// Computed property for selected item display
const selectedItem = computed(() => {
  if (!formData.value.item) return null
  const itemMap: Record<string, string> = {
    'men-shirt': 'Men Shirt',
    'women-shirt': 'Women Shirt',
    'men-pants': 'Men Pants',
    'women-pants': 'Women Pants',
    'kurta': 'Kurta',
    'saree': 'Saree'
  }
  return itemMap[formData.value.item] || null
})

// Methods
const updateSelectedItem = () => {
  // Item is already updated via v-model
}

const clearSelectedItem = () => {
  formData.value.item = ''
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    uploadedFile.value = target.files[0]
  }
}

const clearFile = () => {
  uploadedFile.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const handleSubmit = async () => {
  isSubmitting.value = true
  submitMessage.value = ''

  try {
    // TODO: Implement API call to submit custom fitting order
    console.log('Custom fitting form submitted:', formData.value)
    console.log('Uploaded file:', uploadedFile.value)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    submitMessage.value = 'Thank you for your order! We will process your custom fitting request and contact you soon.'
    submitMessageType.value = 'success'
    
    // Reset form after successful submission
    setTimeout(() => {
      formData.value = {
        gender: 'men',
        item: '',
        itemType: 'half-sleeve',
        measurements: {
          chest: '',
          hip: '',
          sleeve: '',
          armhole: '',
          length: '',
          pocket: '',
          waist: '',
          bandCollar: '',
          sleeveOpening: '',
          shoulder: '',
          bottom: ''
        },
        notes: '',
        contact: {
          firstName: '',
          lastName: '',
          companyName: '',
          country: 'bangladesh',
          street: '',
          apartment: '',
          city: '',
          district: '',
          postcode: '',
          phone: ''
        }
      }
      clearFile()
      submitMessage.value = ''
    }, 3000)
  } catch (error) {
    submitMessage.value = 'Sorry, there was an error submitting your order. Please try again later.'
    submitMessageType.value = 'error'
    console.error('Error submitting custom fitting form:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
@import './custom-fittings.css';
</style>

