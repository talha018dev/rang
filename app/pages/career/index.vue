<template>
  <main class="career-page">
    <div class="career-container">
      <!-- Hero -->
      <section class="career-hero">
        <h1 class="career-title">Career</h1>
        <p class="career-tagline">Go Beyond Traditional Careers and Build Your Dreams with Us</p>
      </section>

      <!-- Intro -->
      <section class="career-intro">
        <p class="career-intro-text">
          At Rang Bangladesh, we believe in working hard, learning every day, and crafting quality that lasts. We are constantly exploring ways to make our customers’ lives more stylish and confident through timeless fashion.
        </p>
        <p class="career-intro-text">
          We are a family of youthful, diverse creators and innovators who are shaping the future of apparel in Bangladesh and beyond. We are what our teams and customers are—committed to excellence; and the greatest way we reward them is through the opportunity to <strong>Go Beyond</strong> in building a brand that celebrates tradition and modernity.
        </p>
      </section>

      <!-- CTA -->
      <section class="career-cta">
        <NuxtLink to="/contact-us" class="career-cta-button" aria-label="Explore job opportunities">
          Explore Jobs
          <Icon name="heroicons:arrow-right" class="career-cta-icon" />
        </NuxtLink>
      </section>

      <!-- Feature Cards (similar to GP: Flagship Programs, Why Join Us, Career Advice) -->
      <section class="career-cards">
        <div class="career-card">
          <div class="career-card-header">
            <span class="career-card-badge">FLAGSHIP PROGRAMS</span>
            <h2 class="career-card-title">Graduate & Campus</h2>
          </div>
          <p class="career-card-desc">Kick-start your career with structured programs designed for fresh talent.</p>
          <NuxtLink to="/contact-us" class="career-card-link">
            Learn More
            <Icon name="heroicons:arrow-right" class="career-card-link-icon" />
          </NuxtLink>
        </div>
        <div class="career-card">
          <div class="career-card-header">
            <span class="career-card-badge">WHY JOIN US</span>
            <h2 class="career-card-title">How We Define & Help the Future</h2>
          </div>
          <p class="career-card-desc">Culture, growth, and impact—see how we invest in our people.</p>
          <NuxtLink to="/about-us" class="career-card-link">
            Learn More
            <Icon name="heroicons:arrow-right" class="career-card-link-icon" />
          </NuxtLink>
        </div>
        <div class="career-card">
          <div class="career-card-header">
            <span class="career-card-badge">CAREER ADVICE</span>
            <h2 class="career-card-title">Hear From Our People</h2>
          </div>
          <p class="career-card-desc">Stories and tips from the team behind Rang Bangladesh.</p>
          <NuxtLink to="/blognews" class="career-card-link">
            Learn More
            <Icon name="heroicons:arrow-right" class="career-card-link-icon" />
          </NuxtLink>
        </div>
      </section>

      <!-- Share -->
      <section class="career-share">
        <p class="career-share-text">Share this page with your friends & family</p>
        <div class="career-share-buttons">
          <a
            href="https://www.facebook.com/sharer/sharer.php?u=https://www.rang-bd.com/career"
            target="_blank"
            rel="noopener noreferrer"
            class="career-share-btn"
            aria-label="Share on Facebook"
          >
            <Icon name="tabler:brand-facebook" class="career-share-icon" />
          </a>
          <a
            href="https://twitter.com/intent/tweet?url=https://www.rang-bd.com/career&text=Careers%20at%20Rang%20Bangladesh"
            target="_blank"
            rel="noopener noreferrer"
            class="career-share-btn"
            aria-label="Share on X (Twitter)"
          >
            <Icon name="simple-icons:x" class="career-share-icon" />
          </a>
          <a
            href="https://www.linkedin.com/sharing/share-offsite/?url=https://www.rang-bd.com/career"
            target="_blank"
            rel="noopener noreferrer"
            class="career-share-btn"
            aria-label="Share on LinkedIn"
          >
            <Icon name="mdi:linkedin" class="career-share-icon" />
          </a>
        </div>
      </section>

      <!-- Follow Us -->
      <section class="career-follow">
        <h3 class="career-follow-title">Follow Us</h3>
        <p class="career-follow-desc">Stay connected for updates and opportunities.</p>
        <div class="career-follow-links">
          <a href="https://www.facebook.com/rangbangladesh/" target="_blank" rel="noopener noreferrer" class="career-follow-link" aria-label="Facebook">Facebook</a>
          <a href="https://www.instagram.com/rang_bangladesh_official/" target="_blank" rel="noopener noreferrer" class="career-follow-link" aria-label="Instagram">Instagram</a>
          <a href="https://www.linkedin.com/company/rang-bangladesh" target="_blank" rel="noopener noreferrer" class="career-follow-link" aria-label="LinkedIn">LinkedIn</a>
        </div>
      </section>
    </div>
    <AppFooter />
  </main>
</template>

<script setup lang="ts">
import { useHead } from 'nuxt/app'
import AppFooter from '~~/components/AppFooter.vue'
import './career.css'

useHead({
  title: 'Career - Rang Bangladesh',
  meta: [
    { name: 'description', content: 'Go beyond traditional careers and build your dreams with Rang Bangladesh. Explore jobs, flagship programs, and hear from our people.' }
  ]
})
</script>

<style scoped>
@import './career.css';
</style>
