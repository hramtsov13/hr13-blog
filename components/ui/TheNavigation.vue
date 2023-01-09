<template>
  <div class="container mx-auto py-4">
    <div class="flex justify-end">
      <UiTheLink class="mr-2.5" @click="$router.push('/login')">
        {{ $t('service.login') }}
      </UiTheLink>
      <UiTheLink @click="$router.push('/register')">
        {{ $t('service.register') }}
      </UiTheLink>
      <UiTheSelect :options="options" />
    </div>
  </div>
</template>

<script setup>
const options = ref(['en', 'ru', 'de'])
</script>
