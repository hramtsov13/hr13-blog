<template>
  <div class="grid grid-cols-12 items-start gap-6 font-mono">
    <div class="bg-base-300 col-span-3 rounded-lg p-4 shadow-xl">
      <div>
        <div class="flex items-center">
          <div class="avatar online placeholder mr-4">
            <div
              class="bg-neutral-focus text-neutral-content w-16 rounded-full"
            >
              <span class="text-xl">{{ userInitials }}</span>
            </div>
          </div>
          <div>
            <p>{{ user?.name }}</p>
            <p>{{ user?.surname }}</p>
          </div>
        </div>

        <ul class="mt-6">
          <li class="mb-2">
            <NuxtLink active-class="text-accent" to="/account">
              <UiTheButton class="w-full text-inherit"> My info </UiTheButton>
            </NuxtLink>
          </li>
          <li class="mb-2">
            <NuxtLink active-class="text-accent" to="/account/password">
              <UiTheButton class="w-full"> Password </UiTheButton>
            </NuxtLink>
          </li>
          <li class="mb-2">
            <UiTheButton class="w-full" disabled>
              <NuxtLink>Users</NuxtLink>
            </UiTheButton>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-span-9 grid grid-cols-12">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { TUser } from '@/utils/types'

const user = useStrapiUser<TUser>()

const userInitials = computed(() => {
  if (user.value)
    return `${user.value?.name.slice(0, 1)}${user.value?.surname.slice(0, 1)}`

  return '--'
})

definePageMeta({
  layout: 'main-layout',
})
</script>
