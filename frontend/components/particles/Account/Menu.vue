<template>
  <UiTheCard class="mb-0 p-4">
    <div class="flex items-center">
      <ParticlesAccountUserIcon class="mr-4" :user="user" />
      <div>
        <p>{{ user?.name }}</p>
        <p>{{ user?.surname }}</p>
      </div>
    </div>

    <ul class="mt-6 flex overflow-x-auto sm:block">
      <li v-for="link in links" :key="link.path" class="mr-2 sm:mb-2">
        <NuxtLink :to="link.path">
          <UiTheButton
            class="w-full"
            :class="{ 'text-accent': route.path === link.path }"
            :disabled="link.disabled"
          >
            {{ $t(link.title) }}
          </UiTheButton>
        </NuxtLink>
      </li>
    </ul>
  </UiTheCard>
</template>

<script setup lang="ts">
import { TUser } from '@/utils/types'

interface IAccountMenuProps {
  user: TUser
}

withDefaults(defineProps<IAccountMenuProps>(), {
  user: null,
})

const route = useRoute()

const links = [
  {
    path: '/account',
    title: 'account.myAccountPage.title',
    disabled: false,
  },
  {
    path: '/account/password',
    title: 'account.passwordPage.title',
    disabled: false,
  },
  {
    path: '',
    title: 'account.usersPage.title',
    disabled: true,
  },
]
</script>
