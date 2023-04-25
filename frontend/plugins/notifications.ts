import Notifications from '@kyvg/vue3-notification'

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.use(Notifications)
})
