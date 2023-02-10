<template>
  <div class="the-modal !z-300 font-mono">
    <div
      class="the-modal__overlay bg-base-100"
      @click="$emit('update:modelValue', false), $emit('close', false)"
    />
    <div class="the-modal__wrapper modal-box bg-base-300">
      <UiTheButton
        v-if="showClose"
        class="the-modal__close-button text-accent"
        icon
        plain
        @click="$emit('update:modelValue', false), $emit('close', false)"
      >
        <Icon name="ion:ios-close-circle-outline" size="2rem" />
      </UiTheButton>
      <div v-if="title || showClose" class="the-modal__title">
        <h3>{{ title }}</h3>
        <p
          class="mt-4 h-0 text-center text-sm text-red-500 opacity-0 transition duration-300"
          :class="{ 'min-h-5 opacity-100': error.length }"
        >
          {{ error }}
        </p>
      </div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface ITheModalProps {
  modelValue: boolean
  header?: string
  showClose?: boolean
  width?: string
  title?: string
  overlay?: boolean
  error?: string
}

defineEmits(['update:modelValue', 'close'])

withDefaults(defineProps<ITheModalProps>(), {
  modelValue: true,
  showClose: true,
  overlay: true,
  header: 'Header',
  width: '400px',
  title: 'Popup',
  error: '',
})
</script>

<style lang="scss" scoped>
.the-modal {
  $this: &;

  @apply fixed inset-0 h-full w-full flex justify-center items-center z-50;

  &__overlay {
    @apply fixed inset-0 opacity-80;
  }

  &__wrapper {
    @apply fixed p-6 break-all box-border;
  }

  &__title {
    @apply mb-4 text-2xl;
  }

  &__close-button {
    @apply absolute right-2 top-2;
  }
}
</style>
