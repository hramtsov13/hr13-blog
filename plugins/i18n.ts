import { createI18n } from 'vue-i18n'
import en from '../locales/en.json'
import ru from '../locales/ru.json'
import de from '../locales/de.json'
import { DEFAULT_LOCALE } from '@/utils/constants'

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: DEFAULT_LOCALE,
    messages: {
      en,
      ru,
      de,
    },
  })

  vueApp.use(i18n)
})
