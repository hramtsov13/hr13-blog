<template>
  <div class="h-80vh flex items-center justify-between font-mono">
    <ParticlesFormsPasswordResetSendEmailLink
      v-if="!isSuccessVisible"
      @on-send-email-success="showSuccessNotification"
    />

    <UiTheCard v-else class="w-auto p-2.5 md:p-6">
      <Icon
        class="text-accent mb-2 md:mb-4"
        name="material-symbols:mark-email-unread-outline-sharp"
        size="2rem"
      />
      <p class="mb-0 text-xl md:text-2xl">E-mail sent</p>
      <p class="text-sm">Check your e-mail and open the link to continue</p>
    </UiTheCard>
  </div>
</template>

<script setup lang="ts">
const isSuccessVisible = ref(false)

const showSuccessNotification = () =>
  (isSuccessVisible.value = !isSuccessVisible.value)

definePageMeta({
  layout: 'main-layout',
})
</script>
