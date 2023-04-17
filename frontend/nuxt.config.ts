// import { resolve, dirname } from 'node:path'
// import { fileURLToPath } from 'url'
// import VueI18nVitePlugin from '@intlify/unplugin-vue-i18n/vite'

export default {
  meta: {
    title: 'The Dev.',
  },

  server: {
    host: 'local.blog.hr13',
    port: 3000,
  },

  modules: [
    ['nuxt-windicss'],
    [
      '@intlify/nuxt3',
      {
        localeDir: 'locales',
        locales: [
          {
            code: 'en',
            iso: 'en-US',
          },
          {
            code: 'ru',
            iso: 'ru-RU',
          },
          {
            code: 'de',
            iso: 'de-DE',
          },
        ],
      },
    ],
    ['nuxt-swiper'],
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
        subsets: ['latin', 'cyrillic'],
        prefetch: true,
        preconnect: false,
        preload: false,
        download: true,
        base64: false,
      },
    ],
    ['nuxt-icon'],
  ],

  plugins: [
    { src: '@/plugins/vee-validate.ts', mode: 'client' },

    '@/plugins/i18n.ts',
  ],

  vite: {
    // TODO: check why loading locales as functions doesn't work
    // plugins: [
    //   VueI18nVitePlugin({
    //     include: [
    //       resolve(dirname(fileURLToPath(import.meta.url)), './locales/*.json'),
    //     ],
    //   }),
    // ],
    test: {
      globals: true,
      environment: 'happy-dom',
    },
  },

  router: {
    base: 'blog.hr13.ru',
  },

  strapi: {
    url: process.env.STRAPI_URL,
    prefix: '/api',
    version: 'v4',
    cookie: {},
    cookieName: 'strapi_jwt',
    entities: ['articles'],
  },

  build: { transpile: ['@vee-validate/rules', 'vue-i18n'] },
}
