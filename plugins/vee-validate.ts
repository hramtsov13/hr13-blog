import { defineRule, configure } from 'vee-validate'
import * as rules from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import { DEFAULT_LOCALE } from '@/utils/constants'

// TODO: async locale imports based on existing locales
import en from '@vee-validate/i18n/dist/locale/en.json'
import ru from '@vee-validate/i18n/dist/locale/en.json'
import de from '@vee-validate/i18n/dist/locale/en.json'

export default defineNuxtPlugin(() => {
  Object.keys(rules)
    .filter((k) => k !== 'default')
    .forEach((rule) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      defineRule(rule, rules[rule])
    })
  ;(async function init() {
    configure({
      generateMessage: localize({
        en,
        ru,
        de,
      }),
    })
    setLocale(DEFAULT_LOCALE)
  })()
})
