import { defineRule, configure } from 'vee-validate'
import * as rules from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import { DEFAULT_LOCALE } from '@/constants'

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
        [DEFAULT_LOCALE]: await import(
          `@vee-validate/i18n/dist/locale/en.json`
        ),
      }),
    })
    setLocale(DEFAULT_LOCALE)
  })()
})
