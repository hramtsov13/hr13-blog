import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'
import VueI18nVitePlugin from '@intlify/unplugin-vue-i18n/vite'

export default {
  modules: [
    ['nuxt-windicss'],
    [
      '@intlify/nuxt3',
      {
        localeDir: 'locales',
      },
    ],
    ['@pinia/nuxt'],
    ['@nuxtjs/strapi'],
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

  vite: {
    plugins: [
      VueI18nVitePlugin({
        include: [
          resolve(dirname(fileURLToPath(import.meta.url)), './locales/*.json'),
        ],
      }),
    ],
  },

  strapi: {
    url: process.env.STRAPI_URL || 'http://localhost:1337',
    prefix: '/api',
    version: 'v4',
    cookie: {},
    cookieName: 'strapi_jwt',
    entities: ['articles'],
  },

  build: { transpile: ['@vee-validate/rules'] },
}
