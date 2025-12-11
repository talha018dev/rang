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
  modules: ['@nuxt/image', '@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    // Private keys (only available on server-side)
    // Public keys (exposed to client-side)
    public: {
      backendUrl: process.env.BACKEND_URL || 'https://rangbd.thecell.tech/api',
      metaPixelId: process.env.META_PIXEL_ID || '605654101638947'
    }
  }
})