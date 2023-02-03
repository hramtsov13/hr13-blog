<template>
  <div v-if="modelValue" :class="`the-modal`">
    <div
      class="the-modal__overlay"
      @click="$emit('update:modelValue', false), $emit('close', $event)"
    />
    <div class="the-modal__wrapper shadow-primary" :style="{ width: width }">
      <UiTheButton
        v-if="showClose"
        icon
        class="the-modal__close-button"
        @click="$emit('update:modelValue', false), $emit('close', $event)"
      >
        <i>&#10006;</i>
      </UiTheButton>
      <div v-if="title || showClose" :class="`the-modal__title`">
        {{ title }}
      </div>
      <slot />
      {{ modelValue }}
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
  title: 'DEFAULT TITLE',
})
</script>

<style lang="scss" scoped>
.the-modal {
  $this: &;

  @apply fixed inset-0 h-full w-full flex justify-center items-center z-50;

  &__overlay {
    @apply fixed inset-0 opacity-50 bg-black;
  }

  &__wrapper {
    @apply fixed p-6 break-all shadow-lg box-border rounded-lg text-black bg-white;
  }

  &__title {
    @apply mb-4 text-black text-2xl;
  }

  &__close-button {
    @apply absolute right-2 top-2;
  }
}
</style>
