<template>
  <div class="container mx-auto py-4">
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
</template>

<script setup>
import { useDark, useToggle } from '@vueuse/core'
const emit = defineEmits(['onLoginClick', 'onRegisterClick', 'onLogoutClick'])

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
</script>
