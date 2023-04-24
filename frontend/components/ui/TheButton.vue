<template>
  <button
    :disabled="disabled || loading"
    :class="[
      'btn !h-auto !min-h-0 whitespace-nowrap px-2 py-2.5 font-mono md:px-2 md:py-4 ',
      {
        'btn-link text-accent border-none bg-transparent p-0 hover:transform-none hover:border-none hover:bg-transparent hover:duration-0':
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
