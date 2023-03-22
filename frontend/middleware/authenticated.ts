export default defineNuxtRouteMiddleware((to) => {
  const user = useStrapiUser()
  if (!user.value) {
    useCookie('redirect', { path: '/' }).value = to.fullPath
    return navigateTo('/')
  }
})
