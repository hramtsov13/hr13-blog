<template>
  <div class="the-modal font-mono">
    <div
      class="the-modal__overlay bg-base-100"
      @click="$emit('update:modelValue', false), $emit('close', false)"
    />
    <div class="the-modal__wrapper modal-box bg-base-300">
      <UiTheButton
        v-if="showClose"
        icon
        class="the-modal__close-button"
        @click="$emit('update:modelValue', false), $emit('close', false)"
      >
        <span class="text-2xl">&#10006;</span>
      </UiTheButton>
      <div v-if="title || showClose" :class="`the-modal__title`">
        {{ title }}
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
}

defineEmits(['update:modelValue', 'close'])

withDefaults(defineProps<ITheModalProps>(), {
  modelValue: true,
  showClose: true,
  overlay: true,
  header: 'Header',
  width: '400px',
  title: 'Popup',
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
