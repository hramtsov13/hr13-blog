<template>
  <div class="container mx-auto py-4">
    <div class="flex justify-end items-center">
      <UiTheButton class="mr-2.5" plain @click="onLoginClick">
        {{ $t('service.login') }}
      </UiTheButton>

      <UiTheButton class="mx-2" outlined @click="onRegisterClick">
        {{ $t('service.register') }}
      </UiTheButton>

      <UiTheDropdown>
        <template #label> Settings </template>

        <template #content>
          <div class="min-w-52">
            <div class="flex justify-between items-center mb-4">
              <p>{{ $t('service.darkMode') }}</p>
              <UiTheToggle @change="toggleDark()" />
            </div>
            <div class="flex justify-between items-center gap-x-2">
              <p>{{ $t('service.language') }}</p>
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
const emit = defineEmits(['onLoginClick', 'onRegisterClick'])

const isDark = useDark({
  attribute: 'data-theme',
  valueDark: 'dracula',
  valueLight: 'valentine',
})
const toggleDark = useToggle(isDark)
const themeMode = computed(() => toggleDark())

const onLoginClick = () => emit('onLoginClick')
const onRegisterClick = () => emit('onRegisterClick')
</script>
