<template>
  <aside
    class="max-w-50 lg:max-w-75 bg-base-300 relative hidden w-full pb-10 shadow-xl transition-all duration-200 md:block"
    :class="{ '!max-w-20': !isSidebarExpanded }"
  >
    <nav class="h-full overflow-y-scroll px-2 py-4 sm:px-4 sm:py-8">
      <div
        class="flex justify-end"
        :class="{ '!justify-center': !isSidebarExpanded }"
      >
        <UiTheButton
          class="rounded-md !p-1.5"
          @click="isSidebarExpanded = !isSidebarExpanded"
        >
          <Icon
            class="text-accent"
            :name="
              isSidebarExpanded ? 'mdi:window-close' : 'quill:hamburger-sidebar'
            "
            size="1.8rem"
          />
        </UiTheButton>
      </div>
      <ul class="mt-6">
        <li v-for="(option, index) in options" :key="option.title">
          <NuxtLink
            :to="option.path"
            class="btn mb-2 flex flex-nowrap items-center justify-start"
            :class="{ 'justify-center px-2': !isSidebarExpanded }"
            :tabindex="index"
            active-class="text-accent"
          >
            <Icon
              :name="option.icon ?? 'material-symbols:article-outline'"
              size="2rem"
              class="mr-2"
              :class="{ 'mr-0': !isSidebarExpanded }"
            />
            <span
              class="xl:text-md inline-block text-left font-mono text-sm text-inherit transition duration-500"
              :class="{
                'invisible absolute h-0 w-0 opacity-0': !isSidebarExpanded,
              }"
            >
              {{ $t(option.title) }}
            </span>
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <div
      v-if="user"
      class="bg-base-200 hover:bg-neutral absolute bottom-0 left-0 w-full p-2 px-4 transition duration-200"
    >
      <NuxtLink
        to="/account"
        class="flex cursor-pointer items-center gap-3"
        :class="{ 'justify-center': !isSidebarExpanded }"
      >
        <ParticlesAccountUserIcon :user="user" />
        <p
          class="transition duration-500"
          :class="{
            'invisible absolute h-0 w-0 opacity-0': !isSidebarExpanded,
          }"
        >
          <span
            class="md:text-md lg:text-md block font-mono text-sm font-medium capitalize leading-4"
          >
            {{ user.name }} {{ user.surname }}
          </span>
          <span class="text-accent block font-mono text-[0.7rem] underline">
            {{ $t('sidebar.visitAccount') }}
          </span>
        </p>
      </NuxtLink>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { TUser, ISidebarOption } from '@/utils/types'

interface ISidebarProps {
  label?: string
  user: TUser
  options: Array<ISidebarOption>
}

withDefaults(defineProps<ISidebarProps>(), {
  label: '',
  user: null,
  options: () => [],
})

const isSidebarExpanded = ref(false)
</script>
