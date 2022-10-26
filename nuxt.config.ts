import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  buildModules: [
    ['nuxt-windicss'],
    [
      '@intlify/nuxt3',
      {
        localeDir: 'locales',
      },
    ],
    ['@pinia/nuxt'],
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          'Source Code Pro': {
            wght: [300, 400, 500],
          },
        },
        display: 'swap',
        subsets: ['latin'],
        prefetch: true,
        preconnect: false,
        preload: false,
        download: true,
        base64: false,
      },
    ],
  ],
})
