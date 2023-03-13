import { createI18n, IntlDateTimeFormats } from 'vue-i18n'
import en from '../locales/en.json'
import ru from '../locales/ru.json'
import de from '../locales/de.json'
import { DEFAULT_LOCALE } from '@/utils/constants'

export default defineNuxtPlugin(({ vueApp }) => {
  const datetimeFormats: IntlDateTimeFormats = {
    en: {
      short: {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      },
      long: {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      },
    },
    ru: {
      short: {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      },
      long: {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
      },
    },
    de: {
      short: {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      },
      long: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
      },
    },
  }

  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: DEFAULT_LOCALE,
    messages: {
      en,
      ru,
      de,
    },
    datetimeFormats,
  })

  vueApp.use(i18n)
})
