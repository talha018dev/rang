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
      <!-- <section class="career-cta">
        <NuxtLink to="/contact-us" class="career-cta-button" aria-label="Explore job opportunities">
          Explore Jobs
          <Icon name="heroicons:arrow-right" class="career-cta-icon" />
        </NuxtLink>
      </section> -->

      <!-- Open Positions -->
      <section class="career-openings">
        <div class="career-openings-header">
          <h2 class="career-openings-title">Open Positions</h2>
          <p class="career-openings-subtitle">Explore available opportunities and apply to the role that matches your profile.</p>
        </div>

        <div v-if="isLoadingCareers" class="career-loading">Loading career options...</div>
        <div v-else-if="careerError" class="career-error">{{ careerError }}</div>
        <div v-else-if="careerOptions.length === 0" class="career-empty">No open positions are available right now.</div>

        <div v-else class="career-cards">
          <article
            v-for="career in careerOptions"
            :key="career.id"
            class="career-card"
          >
            <div class="career-card-header">
              <span v-if="career.department" class="career-card-badge">{{ career.department }}</span>
              <h3 class="career-card-title">{{ career.title }}</h3>
            </div>

            <div class="career-card-meta">
              <span v-if="career.location" class="career-card-meta-item">Location: {{ career.location }}</span>
              <span v-if="career.employmentTypeLabel" class="career-card-meta-item">Employment: {{ career.employmentTypeLabel }}</span>
              <span v-if="career.experienceLevel" class="career-card-meta-item">Experience: {{ career.experienceLevel }}</span>
              <span v-if="career.salaryRange" class="career-card-meta-item">Salary: {{ career.salaryRange }}</span>
              <span v-if="career.deadlineDisplay" class="career-card-meta-item">Apply by: {{ career.deadlineDisplay }}</span>
            </div>

            <!-- API returns trusted HTML from your CMS -->
            <div
              v-if="career.descriptionHtml"
              class="career-card-html career-card-html-desc"
              v-html="career.descriptionHtml"
            />
            <p v-else class="career-card-desc career-card-desc-fallback">Join our team and help shape the future of fashion at Rang Bangladesh.</p>

            <div v-if="career.requirementsHtml" class="career-card-section">
              <h4 class="career-card-section-title">Requirements</h4>
              <div class="career-card-html" v-html="career.requirementsHtml" />
            </div>

            <div v-if="career.benefitsHtml" class="career-card-section">
              <h4 class="career-card-section-title">Benefits</h4>
              <div class="career-card-html" v-html="career.benefitsHtml" />
            </div>

            <a
              v-if="career.applyUrl"
              :href="career.applyUrl"
              class="career-card-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Apply Now
              <Icon name="heroicons:arrow-top-right-on-square" class="career-card-link-icon" />
            </a>
            <NuxtLink v-else to="/contact-us" class="career-card-link">
              Contact HR
              <Icon name="heroicons:arrow-right" class="career-card-link-icon" />
            </NuxtLink>
          </article>
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
import { onMounted, ref } from 'vue'
import AppFooter from '~~/components/AppFooter.vue'
import { useApi } from '~~/composables/useApi'
import './career.css'

interface CareerApiItem {
  id?: string | number
  title?: string
  name?: string
  position?: string
  job_title?: string
  department?: string
  team?: string
  location?: string
  city?: string
  workplace?: string
  employment_type?: string
  type?: string
  job_type?: string
  deadline?: string
  closing_date?: string
  expires_at?: string
  application_deadline?: string
  description?: string
  requirements?: string
  benefits?: string
  short_description?: string
  summary?: string
  salary_min?: string | number
  salary_max?: string | number
  formatted_salary_range?: string
  experience_level?: string
  is_active?: boolean
  apply_url?: string
  apply_link?: string
  application_url?: string
  [key: string]: unknown
}

interface CareerOption {
  id: string | number
  title: string
  department: string
  location: string
  employmentTypeLabel: string
  deadlineDisplay: string
  experienceLevel: string
  salaryRange: string
  descriptionHtml: string
  requirementsHtml: string
  benefitsHtml: string
  applyUrl: string
}

/** Laravel-style list response for `GET /careers` */
interface CareersListResponse {
  success?: boolean
  message?: string
  data?: CareerApiItem[] | null
  pagination?: {
    current_page?: number
    last_page?: number
    per_page?: number
    total?: number
    from?: number | null
    to?: number | null
  }
}

const careerOptions = ref<CareerOption[]>([])
const isLoadingCareers = ref(false)
const careerError = ref('')

const readFirstString = (value: unknown): string => {
  if (typeof value === 'string') return value.trim()
  if (Array.isArray(value)) {
    const firstString = value.find((item) => typeof item === 'string')
    return typeof firstString === 'string' ? firstString.trim() : ''
  }
  return ''
}

const readHtml = (value: unknown): string => {
  if (typeof value !== 'string') return ''
  return value.trim()
}

const formatEmploymentType = (raw: string): string => {
  if (!raw) return ''
  const key = raw.toLowerCase().replace(/\s+/g, '_')
  const map: Record<string, string> = {
    full_time: 'Full time',
    part_time: 'Part time',
    contract: 'Contract',
    internship: 'Internship',
    freelance: 'Freelance'
  }
  if (map[key]) return map[key]
  return raw.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

const formatApplicationDeadline = (raw: string): string => {
  if (!raw) return ''
  const d = new Date(raw)
  if (Number.isNaN(d.getTime())) return raw
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

const toCareerOption = (item: CareerApiItem, index: number): CareerOption => {
  const employmentRaw =
    readFirstString(item.employment_type) || readFirstString(item.type) || readFirstString(item.job_type)
  const deadlineRaw =
    readFirstString(item.application_deadline) ||
    readFirstString(item.deadline) ||
    readFirstString(item.closing_date) ||
    readFirstString(item.expires_at)
  const salaryRange = readFirstString(item.formatted_salary_range).trim()
    || (item.salary_min != null && item.salary_max != null
      ? `${String(item.salary_min).trim()} – ${String(item.salary_max).trim()}`
      : '')

  return {
    id: item.id ?? `career-${index}`,
    title: readFirstString(item.title) || readFirstString(item.position) || readFirstString(item.job_title) || readFirstString(item.name) || 'Untitled position',
    department: readFirstString(item.department) || readFirstString(item.team),
    location: readFirstString(item.location) || readFirstString(item.city) || readFirstString(item.workplace),
    employmentTypeLabel: formatEmploymentType(employmentRaw),
    deadlineDisplay: formatApplicationDeadline(deadlineRaw),
    experienceLevel: readFirstString(item.experience_level),
    salaryRange,
    descriptionHtml: readHtml(item.description) || readHtml(item.short_description) || readHtml(item.summary),
    requirementsHtml: readHtml(item.requirements),
    benefitsHtml: readHtml(item.benefits),
    applyUrl: readFirstString(item.apply_url) || readFirstString(item.apply_link) || readFirstString(item.application_url)
  }
}

const fetchCareerOptions = async () => {
  isLoadingCareers.value = true
  careerError.value = ''
  const { backendUrl } = useApi()

  try {
    const first = await $fetch<CareersListResponse>(`${backendUrl}/careers`, {
      query: { page: 1 }
    })

    if (first?.success === false) {
      careerError.value = first.message || 'Failed to load career options.'
      careerOptions.value = []
      return
    }

    let list: CareerApiItem[] = Array.isArray(first?.data) ? first.data : []

    const lastPage = first?.pagination?.last_page ?? 1
    if (lastPage > 1) {
      for (let page = 2; page <= lastPage; page++) {
        const next = await $fetch<CareersListResponse>(`${backendUrl}/careers`, {
          query: { page }
        })
        if (next?.success === false) break
        if (Array.isArray(next?.data)) list = list.concat(next.data)
      }
    }

    const activeOnly = list.filter((item) => item.is_active !== false)
    careerOptions.value = activeOnly.map((item: CareerApiItem, index: number) => toCareerOption(item, index))
  } catch (error) {
    console.error('Failed to load career options:', error)
    careerError.value = 'Unable to load career options right now. Please try again later.'
    careerOptions.value = []
  } finally {
    isLoadingCareers.value = false
  }
}

useHead({
  title: 'Career - Rang Bangladesh',
  meta: [
    { name: 'description', content: 'Go beyond traditional careers and build your dreams with Rang Bangladesh. Explore jobs, flagship programs, and hear from our people.' }
  ]
})

onMounted(() => {
  fetchCareerOptions()
})
</script>

<style scoped>
@import './career.css';
</style>
