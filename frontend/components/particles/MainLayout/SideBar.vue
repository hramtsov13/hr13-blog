<template>
  <aside
    class="max-w-75 sm:max-w-75 bg-base-300 relative w-full pb-10 shadow-xl transition-all duration-200"
    :class="{ '!max-w-20': !isSidebarExpanded }"
  >
    <nav class="h-full overflow-y-scroll px-2 py-4 sm:px-4 sm:py-8">
      <div
        class="flex justify-end"
        :class="{ '!justify-center': !isSidebarExpanded }"
      >
        <UiTheButton
          v-if="!isSidebarExpanded"
          @click="isSidebarExpanded = !isSidebarExpanded"
        >
          <Icon
            class="text-accent"
            name="quill:hamburger-sidebar"
            size="1.5rem"
          />
        </UiTheButton>
        <UiTheButton v-else @click="isSidebarExpanded = !isSidebarExpanded">
          <Icon
            class="text-accent swap-on"
            name="mdi:window-close"
            size="1.5rem"
          />
        </UiTheButton>
      </div>
      <ul class="mt-6">
        <li v-for="(option, index) in options" :key="option.title">
          <NuxtLink
            :to="option.path"
            class="btn mb-2 flex flex-nowrap items-center justify-start"
            :class="{ 'px-2 justify-center': !isSidebarExpanded }"
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
              class="inline-block font-mono text-inherit transition duration-500"
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
  </aside>
</template>

<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { TUser } from '@/utils/types'

interface ISidebarProps {
  label?: string
  user: TUser
  options: Array<ISidebarOption>
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
})

const breakpoints = useBreakpoints(breakpointsTailwind)

// TODO: add sidebar sizes
const size = computed(() => {
  // if (breakpoints.between('sm', 'lg').value) return 2
  // else if (breakpoints.greaterOrEqual('lg').value) return 3
  // return 1
})

const isSidebarExpanded = ref(false)
</script>
