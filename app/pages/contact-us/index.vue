<template>
  <main class="contact-us-page">
    <div class="contact-us-container">
      <section class="contact-us-header">
        <h1 class="contact-us-title">Contact Us</h1>
        <p class="contact-us-subtitle">If you have any questions, please feel free to get in touch with us. We will reply to you as soon as possible. Thank you!</p>
      </section>

      <!-- Google Map Section -->
      <section class="map-section">
        <h2 class="section-title">Find Us on Map</h2>
        <div class="map-container">
          <iframe
            src="https://www.google.com/maps?q=91+West+Masdair,+Narayanganj,+Dhaka,+Bangladesh&hl=en&z=14&output=embed"
            width="100%"
            height="450"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Rang Bangladesh Location"
          ></iframe>
        </div>
        <div class="map-actions">
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=91+West+Masdair,+Narayanganj,+Dhaka,+Bangladesh"
            target="_blank"
            rel="noopener noreferrer"
            class="map-link-button"
          >
            <Icon name="heroicons:map" class="map-link-icon" />
            <span>Get Directions</span>
          </a>
        </div>
      </section>

      <div class="contact-content">
        <!-- Contact Information Section -->
        <section class="contact-info-section">
          <h2 class="section-title">Get in Touch</h2>
          
          <div class="contact-info-card">
            <div class="contact-item">
              <div class="contact-icon-wrapper">
                <Icon name="heroicons:map" class="contact-icon" />
              </div>
              <div class="contact-details">
                <h3 class="contact-label">Address</h3>
                <p class="contact-value">Head Office: 91 West Masdair (Nearby Century Garments), Police line, Narayanganj, Dhaka, Bangladesh.</p>
              </div>
            </div>

            <div class="contact-item">
              <div class="contact-icon-wrapper">
                <Icon name="heroicons:phone" class="contact-icon" />
              </div>
              <div class="contact-details">
                <h3 class="contact-label">Mobile</h3>
                <p class="contact-value">
                  <a href="tel:+8801777744344" class="contact-link">Hotline: (+880)-1777744344</a>
                </p>
                <p class="contact-value">
                  <a href="tel:+8801799998877" class="contact-link">(+880)-1799998877</a>
                </p>
              </div>
            </div>

            <div class="contact-item">
              <div class="contact-icon-wrapper">
                <Icon name="heroicons:envelope" class="contact-icon" />
              </div>
              <div class="contact-details">
                <h3 class="contact-label">Email</h3>
                <p class="contact-value">
                  <a href="mailto:contactrang@gmail.com" class="contact-link">contactrang@gmail.com</a>
                </p>
              </div>
            </div>

            <div class="contact-item social-item">
              <div class="contact-icon-wrapper">
                <Icon name="heroicons:share" class="contact-icon" />
              </div>
              <div class="contact-details">
                <h3 class="contact-label">Social</h3>
                <div class="social-icons">
                  <a href="#" target="_blank" rel="noopener noreferrer" class="social-icon-link" aria-label="Facebook">
                    <Icon name="tabler:brand-facebook" class="social-icon" />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" class="social-icon-link" aria-label="X (Twitter)">
                    <Icon name="simple-icons:x" class="social-icon" />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" class="social-icon-link" aria-label="YouTube">
                    <Icon name="tabler:brand-youtube" class="social-icon" />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" class="social-icon-link" aria-label="Instagram">
                    <Icon name="mdi:instagram" class="social-icon" />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" class="social-icon-link" aria-label="LinkedIn">
                    <Icon name="mdi:linkedin" class="social-icon" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Contact Form Section -->
        <section class="contact-form-section">
          <h2 class="section-title">Drop Us A Line</h2>
          <form @submit.prevent="handleSubmit" class="contact-form">
            <div class="form-group">
              <label for="name" class="form-label">Your Name <span class="required">*</span></label>
              <input
                id="name"
                v-model="formData.name"
                type="text"
                class="form-input"
                placeholder="Enter your name"
                required
              />
            </div>

            <div class="form-group">
              <label for="email" class="form-label">Your Email <span class="required">*</span></label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                class="form-input"
                placeholder="Enter your email"
                required
              />
            </div>

            <div class="form-group">
              <label for="message" class="form-label">Your Message</label>
              <textarea
                id="message"
                v-model="formData.message"
                class="form-textarea"
                rows="6"
                placeholder="Enter your message"
              ></textarea>
            </div>

            <button type="submit" class="submit-button" :disabled="isSubmitting">
              <span v-if="!isSubmitting">Send Message</span>
              <span v-else>Sending...</span>
            </button>

            <div v-if="submitMessage" :class="['submit-message', submitMessageType]">
              {{ submitMessage }}
            </div>
          </form>
        </section>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useHead } from 'nuxt/app'
import './contact-us.css'

// Meta
useHead({
  title: 'Contact Us - Rang Bangladesh',
  meta: [
    { name: 'description', content: 'Get in touch with Rang Bangladesh. Contact us for any questions, inquiries, or support. We are here to help you!' }
  ]
})

// Form data
const formData = ref({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const submitMessage = ref('')
const submitMessageType = ref<'success' | 'error'>('success')

// Handle form submission
const handleSubmit = async () => {
  isSubmitting.value = true
  submitMessage.value = ''

  try {
    // TODO: Implement API call to submit contact form
    console.log('Contact form submitted:', formData.value)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    submitMessage.value = 'Thank you for contacting us! We will get back to you as soon as possible.'
    submitMessageType.value = 'success'
    
    // Reset form
    formData.value = {
      name: '',
      email: '',
      message: ''
    }
  } catch (error) {
    submitMessage.value = 'Sorry, there was an error sending your message. Please try again later.'
    submitMessageType.value = 'error'
    console.error('Error submitting contact form:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
@import './contact-us.css';
</style>

