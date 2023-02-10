<template>
  <aside
    class="max-w-75 bg-base-300 relative w-full pb-10 shadow-xl transition-all duration-200"
    :class="{ '!max-w-20': !isSidebarExpanded }"
  >
    <div
      v-if="user"
      class="bg-base-200 hover:bg-neutral p-2 px-4 transition duration-200"
    >
      <NuxtLink
        to="/account"
        class="flex cursor-pointer items-center gap-3"
        :class="{ 'justify-center': !isSidebarExpanded }"
      >
        <Icon name="mdi:account-edit" size="2.5rem" />
        <p
          class="transition duration-500"
          :class="{
            'invisible h-0 w-0 opacity-0 absolute': !isSidebarExpanded,
          }"
        >
          <span class="block font-mono font-medium capitalize leading-4">
            {{ user.name }} {{ user.surname }}
          </span>
          <span class="text-accent block font-mono text-[0.7rem] underline">
            {{ $t('sidebar.visitAccount') }}
          </span>
        </p>
      </NuxtLink>
    </div>

    <nav class="h-full overflow-y-scroll px-4 py-8">
      <ul>
        <li v-for="(option, index) in options" :key="option.title">
          <NuxtLink
            :to="option.path"
            class="btn mb-2 flex flex-nowrap items-center justify-start"
            :class="{ 'px-2 justify-center': !isSidebarExpanded }"
            :tabindex="index"
          >
            <Icon
              :name="option.icon ?? 'material-symbols:article-outline'"
              size="2rem"
              class="mr-2"
              :class="{ 'mr-0': !isSidebarExpanded }"
            />
            <span
              class="inline-block transition duration-500"
              :class="{
                'invisible h-0 w-0 opacity-0 absolute': !isSidebarExpanded,
              }"
            >
              {{ $t(option.title) }}
            </span>
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <div
      class="bg-base-200 absolute bottom-0 left-0 flex w-full justify-end py-2 shadow-lg"
    >
      <UiTheButton class="text-accent mx-2 p-1" @click="logout">
        <Icon name="ion:log-out-outline" size="1.5rem" />
      </UiTheButton>
    </div>
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

const { logout } = useStrapiAuth()
</script>
