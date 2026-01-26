// Google Analytics (gtag.js) TypeScript declaration
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

// @ts-ignore - defineNuxtPlugin is auto-imported by Nuxt
export default defineNuxtPlugin(() => {
  // Google Analytics Code - runs only on client side
  if (typeof window !== 'undefined') {
    // Initialize dataLayer
    window.dataLayer = window.dataLayer || []
    
    // Define gtag function
    function gtag(...args: any[]) {
      window.dataLayer.push(args)
    }
    window.gtag = gtag

    // Load Google Analytics script
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-F9CM619HNK'
    document.head.appendChild(script)

    // Initialize Google Analytics
    gtag('js', new Date())
    gtag('config', 'G-F9CM619HNK')
  }
})

