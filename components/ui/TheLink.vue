<template>
  <button class="text-xl font-mono text-black hover-underline-animation">
    <slot />
  </button>
</template>

<style scoped>
.hover-underline-animation {
  @apply relative;
}

.hover-underline-animation::after {
  transform: scaleX(0);
  @apply absolute content-[''] bg-sky-500 left-0 bottom-0.5 h-1.5 origin-bottom-right w-full transition transition-transform duration-200 -z-1;
}

.hover-underline-animation:hover::after {
  @apply scale-x-100 origin-bottom-left;
}
</style>
