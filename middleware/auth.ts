export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/auth') {
    return abortNavigation()
  }
  return navigateTo(to.path)
})
