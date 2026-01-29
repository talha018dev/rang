<template>
  <!-- Desktop Footer -->
  <footer class="app-footer">
    <div class="footer-main">
      <section class="best-deals-section">
        <div class="best-deals-container">
        <div>
          <NuxtImg src="/best-deals.svg" alt="Best Deals" format="webp" quality="85" loading="lazy" />
          <div>Best Deals</div>
        </div>
        <div>
          <NuxtImg src="/supporting-teams.svg" alt="Supporting Teams" format="webp" quality="85" loading="lazy" />
          <div>Supporting Teams</div>
        </div>
        <div>
          <NuxtImg src="/best-quality.svg" alt="Best Quality" format="webp" quality="85" loading="lazy" />
          <div>Best Quality</div>
        </div>
        <div>
          <NuxtImg src="/flexible-payment.svg" alt="Flexible Payment" format="webp" quality="85" loading="lazy" />
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
              <a href="https://www.facebook.com/rangbangladesh/" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Facebook">
                <Icon name="tabler:brand-facebook" />
              </a>
              <a href="https://x.com/RangBangladesh" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="X (Twitter)">
                <Icon name="simple-icons:x" />
              </a>
              <a href="https://www.instagram.com/rang_bangladesh_official/" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Instagram">
                <Icon name="mdi:instagram" />
              </a>
              <a href="https://www.linkedin.com/company/rang-bangladesh" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="LinkedIn">
                <Icon name="mdi:linkedin" />
              </a>
              <a href="https://www.tiktok.com/@rangbangladesh.ltd" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="TikTok">
                <Icon name="simple-icons:tiktok" />
              </a>
              <a href="https://www.youtube.com/channel/UCL7kihcRo3nU6YcJojOr6ZA" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="YouTube">
                <Icon name="mdi:youtube" />
              </a>
            </div>
          </div>
        </div>

        <!-- Categories Section -->
        <div class="footer-section">
          <h3 class="section-heading">Categories</h3>
          <ul class="footer-links">
            <li><NuxtLink to="/products/all">Shop All Categories</NuxtLink></li>
            <li><a href="/products/women">Women</a></li>
            <li><a href="/products/men">Men</a></li>
            <li><a href="/products/boys">Boys</a></li>
            <li><a href="/products/girls">Girls</a></li>
            <li><a href="/products/accessories">Accessories</a></li>
          </ul>
        </div>

        <!-- Information Section -->
        <div class="footer-section">
          <h3 class="section-heading">Information</h3>
          <ul class="footer-links">
            <li><NuxtLink to="/about-us">About Us</NuxtLink></li>
            <li><NuxtLink to="/terms-conditions">Terms & Conditions</NuxtLink></li>
            <li><NuxtLink to="/returns-exchanges">Returns & Exchanges</NuxtLink></li>
            <li><NuxtLink to="/shipping-delivery">Shipping & Delivery</NuxtLink></li>
            <li><NuxtLink to="/privacy-policy">Privacy Policy</NuxtLink></li>
            <li><NuxtLink to="/fabric-care-guide">Fabric Care Guide</NuxtLink></li>
            <li><NuxtLink to="/blognews">BLOG/NEWS</NuxtLink></li>
          </ul>
        </div>

        <!-- Quick Links Section -->
        <div class="footer-section">
          <h3 class="section-heading">Quick Links</h3>
          <ul class="footer-links">
            <li><NuxtLink to="/contact-us">Contact Us</NuxtLink></li>
            <li><NuxtLink to="/store-location-rang">Store Location</NuxtLink></li>
            <li><NuxtLink :to="accountLink">My account</NuxtLink></li>
            <li><a href="/order-tracking">Order Tracking</a></li>
            <li><NuxtLink to="/size-guide">Size Guide</NuxtLink></li>
            <li><NuxtLink to="/faq">FAQ</NuxtLink></li>
            <li><NuxtLink to="/career">Career</NuxtLink></li>
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
                <NuxtImg src="/play-store-logo.svg" alt="Google Play" format="webp" quality="85" loading="lazy" />

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
                <NuxtImg src="/ssl.png" alt="SSL Commerz" format="webp" quality="85" loading="lazy" />
              </div>
              <div class="payment-logo paypal">
                <NuxtImg src="/paypal.png" alt="PayPal" format="webp" quality="85" loading="lazy" />
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
import { computed, onMounted, onUnmounted, ref } from 'vue'
import AppFooterMobile from './AppFooterMobile.vue'

// Mobile state
const isMobile = ref(false)

// Check if user is authenticated (has token)
const hasToken = computed(() => {
  if (typeof window === 'undefined') return false
  const token = localStorage.getItem('auth_token')
  return !!token
})

// Account link based on authentication status
const accountLink = computed(() => {
  return hasToken.value ? '/profile' : '/login'
})

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