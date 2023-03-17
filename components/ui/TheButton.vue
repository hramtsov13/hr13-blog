<template>
  <button
    :disabled="disabled || loading"
    :class="[
      'btn font-mono !min-h-0 !h-auto py-2.5 px-2 md:py-4 md:px-2',
      {
        'btn-link text-accent p-0 border-none bg-transparent hover:bg-transparent hover:border-none hover:duration-0 hover:transform-none':
          plain || false,
      },
      { 'btn-circle': icon || false },
      { 'btn-outlined': outlined || false },
      { loading: loading || false },
      { 'btn-disabled': disabled || false },
    ]"
    @click="$emit('click', $event)"
  >
    <span class="hover-underline-animation">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
interface ITheButtonProps {
  disabled?: boolean
  loading?: boolean
  icon?: boolean
  outlined?: boolean
  plain?: boolean
}

defineEmits(['click'])

withDefaults(defineProps<ITheButtonProps>(), {
  disabled: false,
  loading: false,
  icon: false,
  outlined: false,
  plain: false,
})
</script>

<style lang="scss" scoped>
// .hover-underline-animation {
//   @apply relative;

//   &::after {
//     transform: scaleX(0);
//     @apply absolute content-[''] bg-sky-500 left-0 bottom-0.5 h-1.5 origin-bottom-right w-full transition transition-transform duration-200 -z-1;
//   }

//   &:hover::after {
//     transform: scaleX(1);
//     @apply origin-bottom-left;
//   }
// }
</style>
