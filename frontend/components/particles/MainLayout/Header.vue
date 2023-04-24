<template>
  <header
    class="bg-base-300 z-100 h-18 md:px-1.5rem lg:px-2rem 4xl:px-3rem fixed left-0 top-0 mx-auto w-full px-4 py-2 shadow-md"
  >
    <div class="flex h-full items-center justify-between gap-5">
      <NuxtLink class="flex cursor-pointer items-center" to="/">
        <img class="h-6.5 sm:h-8" src="@/assets/logo/logo.svg" alt="" />
      </NuxtLink>

      <div class="md:hidden">
        <UiTheButton
          class="rounded-md !p-1.5"
          plain
          @click="isMobileMenuOpened = !isMobileMenuOpened"
        >
          <Icon
            class="text-accent"
            :name="
              isMobileMenuOpened
                ? 'mdi:window-close'
                : 'quill:hamburger-sidebar'
            "
            size="2rem"
          />
        </UiTheButton>
      </div>

      <div class="hidden items-center justify-end md:flex">
        <template v-if="!user">
          <UiTheButton class="text-accent mr-2.5" plain @click="onLoginClick">
            {{ $t('service.login') }}
          </UiTheButton>

          <UiTheButton
            class="text-accent mx-2"
            outlined
            @click="onRegisterClick"
          >
            {{ $t('service.register') }}
          </UiTheButton>
        </template>
        <UiTheButton
          v-else
          class="text-accent !h-3rem mx-2 !p-2"
          icon
          @click="logout"
        >
          <Icon name="ion:log-out-outline" size="1.5rem" />
        </UiTheButton>

        <UiTheDropdown>
          <template #label>
            <Icon
              class="text-accent"
              name="ion:settings-outline"
              size="1.5rem"
            />
          </template>

          <template #content>
            <div class="min-w-52">
              <div class="mb-4 flex items-center justify-between">
                <p>{{ $t('service.darkMode') }}</p>
                <UiTheToggle @change="toggleDark()" />
              </div>
              <div class="flex items-center justify-between gap-x-2">
                <Icon name="ion:language-outline" size="1.5rem" />
                <ParticlesCommonLanguageSelect />
              </div>
            </div>
          </template>
        </UiTheDropdown>
      </div>
    </div>

    <div
      class="from-base-200 via-base-200 to-base-100 top-100% invisible absolute left-0 h-[calc(100vh-50px)] w-full translate-x-full overflow-y-auto bg-gradient-to-br p-4 opacity-0 transition duration-150"
      :class="{ '!visible !translate-x-0 !opacity-100': isMobileMenuOpened }"
    >
      <div class="mx-auto max-w-lg">
        <UiTheCard
          v-if="user"
          class="flex items-center justify-between gap-5 p-2 shadow-sm"
        >
          <NuxtLink
            to="/account"
            class="flex cursor-pointer items-center gap-3"
            @click="isMobileMenuOpened = !isMobileMenuOpened"
          >
            <ParticlesAccountUserIcon :user="user" />
            <p class="transition duration-500">
              <span class="block font-mono font-medium capitalize leading-4">
                {{ user?.name }} {{ user?.surname }}
              </span>
            </p>
          </NuxtLink>

          <UiTheButton
            class="text-accent !h-3rem mx-2 !p-2"
            plain
            @click="logout"
          >
            <Icon name="ion:log-out-outline" size="1.5rem" />
          </UiTheButton>
        </UiTheCard>
        <div v-else class="mb-2">
          <UiTheButton class="text-accent mr-2.5" plain @click="onLoginClick">
            {{ $t('service.login') }}
          </UiTheButton>

          <UiTheButton
            class="text-accent mx-2"
            outlined
            @click="onRegisterClick"
          >
            {{ $t('service.register') }}
          </UiTheButton>
        </div>

        <ul class="mb-4">
          <li v-for="(option, index) in options" :key="option.title">
            <NuxtLink
              :to="option.path"
              class="btn mb-2 flex flex-nowrap items-center justify-start"
              :tabindex="index"
              active-class="text-accent"
              @click="isMobileMenuOpened = !isMobileMenuOpened"
            >
              <Icon
                :name="option.icon ?? 'material-symbols:article-outline'"
                size="2rem"
                class="mr-2"
              />
              <span
                class="inline-block font-mono text-inherit transition duration-500"
              >
                {{ $t(option.title) }}
              </span>
            </NuxtLink>
          </li>
        </ul>

        <UiTheCard class="p-4">
          <div class="mb-4 flex items-center justify-between">
            <p>{{ $t('service.darkMode') }}</p>
            <UiTheToggle @change="toggleDark()" />
          </div>
          <div class="flex items-center justify-between gap-x-2">
            <Icon name="ion:language-outline" size="1.5rem" />
            <ParticlesCommonLanguageSelect />
          </div>
        </UiTheCard>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { ISidebarOption, TUser } from '@/utils/types'
import { useDark, useToggle } from '@vueuse/core'
interface IHeaderProps {
  options: Array<ISidebarOption>
  user: TUser
}

withDefaults(defineProps<IHeaderProps>(), {
  options: () => [],
  user: null,
})
const emit = defineEmits(['onLoginClick', 'onRegisterClick', 'onLogoutClick'])

const isDark = useDark({
  selector: 'body',
  attribute: 'data-theme',
  valueDark: 'dracula',
  valueLight: 'light',
})
const toggleDark = useToggle(isDark)
const user = useStrapiUser()
const { logout } = useStrapiAuth()
const isMobileMenuOpened = ref(false)

const onLoginClick = () => {
  emit('onLoginClick')
  isMobileMenuOpened.value = !isMobileMenuOpened.value
}
const onRegisterClick = () => {
  emit('onRegisterClick')
  isMobileMenuOpened.value = !isMobileMenuOpened.value
}
</script>
