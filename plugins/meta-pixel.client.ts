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

    // Initialize and track PageView
    window.fbq('init', pixelId)
    window.fbq('track', 'PageView')
  }
})

