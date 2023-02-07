<template>
  <header class="bg-base-300 z-100 fixed top-0 left-0 w-full shadow-md">
    <div class="container mx-auto px-4 py-2">
      <div class="flex items-center justify-between">
        <UiTheButton @click="onBurgerClick">
          <Icon name="pajamas:overview" size="1.5rem" />
        </UiTheButton>

        <div class="flex items-center justify-end">
          <template v-if="!user">
            <UiTheButton class="mr-2.5" plain @click="onLoginClick">
              {{ $t('service.login') }}
            </UiTheButton>

            <UiTheButton class="mx-2" outlined @click="onRegisterClick">
              {{ $t('service.register') }}
            </UiTheButton>
          </template>
          <UiTheButton v-else class="mx-2" icon @click="logout">
            <Icon name="ion:log-out-outline" size="1.5rem" />
          </UiTheButton>

          <UiTheDropdown>
            <template #label>
              <Icon name="ion:settings-outline" size="1.5rem" />
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
    </div>
  </header>
</template>

<script setup>
import { useDark, useToggle } from '@vueuse/core'
const emit = defineEmits([
  'onLoginClick',
  'onRegisterClick',
  'onLogoutClick',
  'onBurgerClick',
])

const isDark = useDark({
  attribute: 'data-theme',
  valueDark: 'dracula',
  valueLight: 'valentine',
})
const toggleDark = useToggle(isDark)
const user = useStrapiUser()
const { logout } = useStrapiAuth()

const onLoginClick = () => emit('onLoginClick')
const onRegisterClick = () => emit('onRegisterClick')
const onBurgerClick = () => emit('onBurgerClick')
</script>
