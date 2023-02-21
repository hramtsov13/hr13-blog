<template>
  <div class="bg-base-300 col-span-3 rounded-lg p-4 shadow-xl">
    <div>
      <div class="flex items-center">
        <div class="avatar online placeholder mr-4">
          <div class="bg-neutral-focus text-neutral-content w-16 rounded-full">
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
          <NuxtLink to="/account">
            <UiTheButton class="w-full">
              {{ $t('account.myAccountPage.title') }}
            </UiTheButton>
          </NuxtLink>
        </li>
        <li class="mb-2">
          <NuxtLink to="/account/password">
            <UiTheButton class="w-full">
              {{ $t('account.passwordPage.title') }}
            </UiTheButton>
          </NuxtLink>
        </li>
        <li class="mb-2">
          <NuxtLink>
            <UiTheButton class="w-full" disabled>
              {{ $t('account.usersPage.title') }}
            </UiTheButton>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TUser } from '@/utils/types'

interface IAccountMenuProps {
  user: TUser
}

const props = withDefaults(defineProps<IAccountMenuProps>(), {
  user: null,
})

const userInitials = computed(() => {
  if (props.user)
    return `${props.user.name.slice(0, 1)}${props.user.surname.slice(0, 1)}`

  return '--'
})
</script>
