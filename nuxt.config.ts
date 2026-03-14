import { defineNuxtConfig } from "nuxt/config";

// Declare process for TypeScript
declare const process: {
  env: {
    BACKEND_URL?: string;
    META_PIXEL_ID?: string;
  };
};

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/image', '@nuxt/ui', 'vue-sonner/nuxt'],
  css: ['~/assets/css/main.css'],
  appConfig: {
    ui: {
      toast: {
        slots: {
          root: 'nuxt-ui-toast-root relative group overflow-hidden bg-default shadow-lg rounded-lg ring ring-default flex gap-2.5 focus:outline-none',
          icon: 'shrink-0 size-5 text-[#e18719]',
          progress: 'absolute inset-x-0 bottom-0 [&>*]:!bg-[#e18719]'
        },
        variants: {
          color: {
            success: {
              icon: '!text-[#e18719]'
            }
          }
        }
      }
    }
  },
  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://fonts.cdnfonts.com/css/futura-pt' },
        { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'shortcut icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' }
      ],
      script: [
        {
          async: true,
          src: 'https://www.googletagmanager.com/gtag/js?id=G-F9CM619HNK'
        },
        {
          innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-F9CM619HNK');
          `,
          type: 'text/javascript'
        } as any,
        {
          innerHTML: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "vnbvofa9nq");`,
          type: 'text/javascript'
        }
      ]
    }
  },
  runtimeConfig: {
    // Private keys (only available on server-side)
    // Public keys (exposed to client-side)
    public: {
      backendUrl: process.env.BACKEND_URL || 'https://api.rangbd.com/api',
      metaPixelId: process.env.META_PIXEL_ID || '605654101638947'
    }
  }
})