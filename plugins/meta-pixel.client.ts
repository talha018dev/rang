// Meta Pixel TypeScript declaration
declare global {
  interface Window {
    fbq: (
      action: string,
      event: string,
      params?: Record<string, any>
    ) => void
    _fbq?: any
  }
}

// @ts-ignore - defineNuxtPlugin is auto-imported by Nuxt
export default defineNuxtPlugin(() => {
  // Meta Pixel Code - runs only on client side
  if (typeof window !== 'undefined') {
    // @ts-ignore - useRuntimeConfig is auto-imported by Nuxt
    const config = useRuntimeConfig()
    const pixelId = config.public.metaPixelId

    // Skip if pixel ID is not configured
    if (!pixelId) {
      console.warn('Meta Pixel ID is not configured')
      return
    }

    function getTestEventCode(): string | null {
      if (typeof window === 'undefined' || !window.location) return null
      const params = new URLSearchParams(window.location.search)
      const fromUrl = params.get('test_event_code')
      if (fromUrl) {
        try {
          sessionStorage.setItem('meta_pixel_test_event_code', fromUrl)
        } catch (_) {}
        return fromUrl
      }
      try {
        return sessionStorage.getItem('meta_pixel_test_event_code')
      } catch (_) {
        return null
      }
    }

    const testEventCode = getTestEventCode()

    // If pixel already initialized (e.g. from app.vue script in head), optionally re-init with test_event_code
    if (window.fbq) {
      if (testEventCode) {
        window.fbq('init', pixelId, { test_event_code: testEventCode })
      }
      return
    }

    // Initialize Meta Pixel
    ;(function(f: any, b: any, e: string, v: string, n?: any, t?: any, s?: any) {
      if (f.fbq) return
      n = f.fbq = function() {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments)
      }
      if (!f._fbq) f._fbq = n
      n.push = n
      n.loaded = !0
      n.version = '2.0'
      n.queue = []
      t = b.createElement(e)
      t.async = !0
      t.src = v
      s = b.getElementsByTagName(e)[0]
      s.parentNode.insertBefore(t, s)
    })(
      window,
      document,
      'script',
      'https://connect.facebook.net/en_US/fbevents.js'
    )

    // Initialize and track PageView (with test_event_code if in URL or sessionStorage)
    window.fbq('init', pixelId, testEventCode ? { test_event_code: testEventCode } : undefined)
    window.fbq('track', 'PageView')
  }
})

