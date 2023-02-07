<template>
  <aside
    class="max-w-75 bg-base-300 z-50 h-screen w-full shadow-xl transition-all duration-200"
    :class="{ '!max-w-20': isSidebarExpanded }"
  >
    <NuxtLink
      to="/account"
      class="bg-base-200 flex cursor-pointer items-center justify-center gap-2 p-2 transition duration-200 hover:bg-slate-600"
    >
      <Icon name="ion:ios-contact-outline" size="2.5rem" />
      <p>
        <span
          v-if="user"
          class="block font-mono font-medium capitalize leading-4"
        >
          {{ user.name }} {{ user.surname }}
        </span>
        <span class="text-secondary block text-[0.7rem] underline"
          >Visit my account</span
        >
      </p>
    </NuxtLink>
    <nav class="h-full px-4">
      <ul class="pt-10">
        <li v-for="option in options" :key="option.title">
          <NuxtLink
            :to="option.path"
            class="btn mb-2 flex flex-nowrap items-center justify-start"
            :class="{ 'p-1 justify-center': isSidebarExpanded }"
          >
            <Icon
              :name="option.icon ?? 'material-symbols:article-outline'"
              size="2rem"
              class="mr-2"
              :class="{ 'mr-0': isSidebarExpanded }"
            />
            <span
              class="inline-block transition duration-500"
              :class="{
                'invisible h-0 w-0 opacity-0 absolute': isSidebarExpanded,
              }"
            >
              {{ option.title }}
            </span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { TUser } from '@/utils/types'

interface ISidebarProps {
  label?: string
  user: TUser
  options: Array<ISidebarOption>
  isSidebarExpanded: boolean
}

interface ISidebarOption {
  title: string
  path: string
  icon: string
}

withDefaults(defineProps<ISidebarProps>(), {
  label: '',
  user: null,
  options: () => [],
  isSidebarExpanded: false,
})
</script>
