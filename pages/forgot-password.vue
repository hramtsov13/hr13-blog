<template>
  <div class="bg-base-300 col-span-6 rounded-lg p-4 shadow-xl">
    <h2 class="mb-4 text-xl">{{ $t('account.passwordPage.title') }}</h2>
    <ParticlesFormsChangePassword />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'main-layout',
})
</script>
