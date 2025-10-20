<template>
  <!-- Desktop Footer -->
  <footer v-if="!isMobile" class="app-footer">
    <div class="footer-main">
      <section class="best-deals-section">
        <div class="best-deals-container">
        <div>
          <img src="/best-deals.svg" />
          <div>Best Deals</div>
        </div>
        <div>
          <img src="/supporting-teams.svg" />
          <div>Supporting Teams</div>
        </div>
        <div>
          <img src="/best-quality.svg" />
          <div>Best Quality</div>
        </div>
        <div>
          <img src="/flexible-payment.svg" />
          <div>Flexible Payment</div>
        </div>
      </div>
      <div class="best-deals-button-container">
        <button>Find Out More <Icon name="heroicons:chevron-right" /></button>
      </div>
      </section>
      <div class="footer-separator"></div>
      <div class="footer-content">
      <div class="footer-container">
        <!-- Contact Us Section -->
        <div class="footer-section contact-section">
          <h3 class="section-heading">Contact Us</h3>
          <div class="contact-info">
            <div class="contact-item">
              <span class="contact-icon"><Icon name="heroicons:map" /></span>
              <span>91 West Masdair, Narayanganj, 1400, Bangladesh</span>
            </div>
            <div class="contact-item">
              <span class="contact-icon"><Icon name="heroicons:envelope" /></span>
              <span>contactrang@gmail.com</span>
            </div>
            <div class="contact-item">
              <span class="contact-icon"><Icon name="heroicons:phone" /></span>
              <span>+8801777 744 344</span>
            </div>
          </div>
          <div class="social-media">
            <h4 class="social-heading">Social Media For Rang Bangladesh</h4>
            <div class="social-icons">
              <a href="#" class="social-icon"><Icon name="tabler:brand-facebook" /></a>
                <a href="#" class="social-icon"><Icon name="simple-icons:x" /></a>
                <a href="#" class="social-icon"><Icon name="tabler:brand-youtube" /></a>
              <a href="#" class="social-icon"><Icon name="mdi:instagram" /></a>
            </div>
          </div>
        </div>

        <!-- Categories Section -->
        <div class="footer-section">
          <h3 class="section-heading">Categories</h3>
          <ul class="footer-links">
            <li><a href="#">Shop All Categories</a></li>
            <li><a href="#">Women</a></li>
            <li><a href="#">Men</a></li>
            <li><a href="#">Boys</a></li>
            <li><a href="#">Girls</a></li>
            <li><a href="#">Accessories</a></li>
          </ul>
        </div>

        <!-- Information Section -->
        <div class="footer-section">
          <h3 class="section-heading">Information</h3>
          <ul class="footer-links">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Returns & Exchanges</a></li>
            <li><a href="#">Shipping & Delivery</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Fabric Care Guide</a></li>
            <li><a href="#">BLOG/NEWS</a></li>
          </ul>
        </div>

        <!-- Quick Links Section -->
        <div class="footer-section">
          <h3 class="section-heading">Quick Links</h3>
          <ul class="footer-links">
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Store Location</a></li>
            <li><a href="#">My account</a></li>
            <li><a href="#">Order Tracking</a></li>
            <li><a href="#">Size Guide</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Career</a></li>
          </ul>
        </div>

        <!-- Download App & Payment Section -->
        <div class="footer-section download-payment-section">
          <!-- Download App -->
          <div class="download-section">
            <h3 class="section-heading">Download App</h3>
            <div class="app-buttons">
              <a href="#" class="app-button app-store">
                <Icon name="simple-icons:apple" />
                <div class="app-text">
                  <span class="app-subtitle">Download on the</span>
                  <span class="app-title">App Store</span>
                </div>
              </a>
              <a href="#" class="app-button google-play">
                <img src="/play-store-logo.svg"  />

                <div class="app-text">
                  <span class="app-subtitle">GET IT ON</span>
                  <span class="app-title">Google Play</span>
                </div>
              </a>
            </div>
          </div>

          <!-- Payment Gateway Partner -->
          <div class="payment-section">
            <h3 class="section-heading">Payment Gateway Partner</h3>
            <div class="payment-logos">
              <div class="payment-logo sslcommerz">
                <img src="/ssl.png" />
              </div>
              <div class="payment-logo paypal">
                <img src="/paypal.png" />
              </div>
            </div>
          </div>
        </div>
        
      </div>
      <div class="copyright">
      <p>© Rang Bangladesh Ltd. — All Rights reserved.</p>
    </div>
    </div>
    </div>
  </footer>
  
  <!-- Mobile Footer -->
  <AppFooterMobile v-if="isMobile" />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import AppFooterMobile from './AppFooterMobile.vue'

// Mobile state
const isMobile = ref(false)

// Handle responsive behavior
const handleResize = () => {
  isMobile.value = window.innerWidth < 600
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
@import './AppFooter.css';
</style>