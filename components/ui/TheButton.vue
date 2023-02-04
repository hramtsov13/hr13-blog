<template>
  <button
    :disabled="disabled || loading"
    :class="[
      'the-button inline-block',
      { 'the-button--icon': icon || false },
      { 'the-button--outlined': outlined || false },
      { 'the-button--loading': loading || false },
    ]"
    @click="$emit('click', $event)"
  >
    <span class="hover-underline-animation"> <slot /></span>
  </button>
</template>

<script setup lang="ts">
interface ITheButtonProps {
  disabled?: boolean
  loading?: boolean
  icon?: boolean
  outlined?: boolean
}

defineEmits(['click'])

withDefaults(defineProps<ITheButtonProps>(), {
  disabled: false,
  loading: false,
  icon: false,
  outlined: false,
})
</script>

<style lang="scss" scoped>
.hover-underline-animation {
  @apply relative;

  &::after {
    transform: scaleX(0);
    @apply absolute content-[''] bg-sky-500 left-0 bottom-0.5 h-1.5 origin-bottom-right w-full transition transition-transform duration-200 -z-1;
  }

  &:hover::after {
    transform: scaleX(1);
    @apply origin-bottom-left;
  }
}
.the-button {
  @apply text-xl font-mono text-black;

  &:disabled {
    @apply cursor-not-allowed bg-dark-50 border-dark-100;

    &:hover {
      @apply bg-inherit;
    }
  }

  &--outlined {
    @apply border-2 px-4 py-2 rounded-lg transition duration-150 border-sky-600 bg-sky-400 text-white;

    &:hover {
      @apply bg-sky-300;
    }
  }

  &--icon {
    @apply rounded-full flex p-2;

    i {
      color: #000;
    }
  }

  &--loading {
    &:after {
      @apply w-3 absolute left-0 bottom-0 rounded-md;
      width: 100%;
      transform-origin: left;
      content: '';
      height: 1px;
      animation: loading 1.5s ease-in-out infinite;
      background-color: #ccc;
    }
  }
}

@keyframes loading {
  0% {
    transform: translateX(0) scaleX(0);
  }
  70% {
    transform: translateX(0) scaleX(1);
  }
  100% {
    transform: translateX(100%) scaleX(0);
  }
}
</style>
