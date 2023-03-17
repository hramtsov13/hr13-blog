<template>
  <div class="h-80vh flex items-center justify-between font-mono">
    <LazyParticlesFormsPasswordReset
      v-if="!isSuccessVisible"
      @on-success="showSuccessNotification"
    />

    <UiTheCard v-else class="max-w-sm p-2.5 md:p-6">
      <Icon
        class="text-accent mb-2 md:mb-4"
        name="clarity:success-standard-line"
        size="2rem"
      />
      <p class="text-xl capitalize md:text-2xl">
        {{ $t('service.success') }}
      </p>
      <p class="mb-4 text-sm">{{ $t('resetPasswordPage.passChanged') }}</p>

      <span class="text-sm">
        <span class="capitalize">{{ $t('service.in') + ' ' }}</span>
        <UiTheCountdown
          :countdown="countdownTime"
          @on-interval-end="router.push('/')"
        />
        <span> {{ ' ' + $t('service.redirectMsg') }} </span>

        <UiTheButton plain class="h-auto">
          <NuxtLink to="/"> {{ $t('service.mainPage') }} </NuxtLink>
        </UiTheButton>
      </span>
    </UiTheCard>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const isSuccessVisible = ref(false)
const countdownTime = 10

const showSuccessNotification = () =>
  (isSuccessVisible.value = !isSuccessVisible.value)

definePageMeta({
  layout: 'main-layout',
})
</script>
