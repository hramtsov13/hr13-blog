export default defineNuxtPlugin(() => {
  return {
    provide: {
      date: (param = new Date()) => new Date(param).toLocaleDateString(),
    },
  }
})
