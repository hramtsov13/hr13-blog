<template>
  <div class="container mx-auto py-4">
    <div class="flex justify-end">
      <UiTheButton class="mr-2.5" @click="onLoginClick">
        {{ $t('service.login') }}
      </UiTheButton>
      <UiTheButton @click="onRegisterClick">
        {{ $t('service.register') }}
      </UiTheButton>
      <UiTheSelect :options="options" />
    </div>
  </div>
</template>

<script setup>
const options = ref(['en', 'ru', 'de'])

const emit = defineEmits(['onLoginClick', 'onRegisterClick'])

const onLoginClick = () => emit('onLoginClick')
const onRegisterClick = () => emit('onRegisterClick')
</script>
