<template>
  <div class="container mx-auto py-4">
    <div class="flex justify-end">
      <UiTheButton class="mr-2.5" @click="onLoginClick">
        {{ $t('service.login') }}
      </UiTheButton>
      <UiTheButton outlined @click="onRegisterClick">
        {{ $t('service.register') }}
      </UiTheButton>
      <UiTheButton @click="toggleDark()"> Switch Dark Mode </UiTheButton>
      <UiTheSelect :options="options" />
    </div>
  </div>
</template>

<script setup>
import { useDark, useToggle } from '@vueuse/core'
const options = ref(['en', 'ru', 'de'])

const emit = defineEmits(['onLoginClick', 'onRegisterClick'])

const isDark = useDark({
  attribute: 'data-theme',
  valueDark: 'dracula',
  valueLight: 'valentine',
})
const toggleDark = useToggle(isDark)

const onLoginClick = () => emit('onLoginClick')
const onRegisterClick = () => emit('onRegisterClick')
</script>
