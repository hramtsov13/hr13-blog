<template>
  <div class="font-mono h-full items-center flex overflow-hidden">
    <h1 class="text-center text-8xl whitespace-nowrap img-ticker">
      Welcome To The BlogApp
    </h1>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'empty',
})
</script>

<style>
@keyframes ticker-kf {
  0% {
    transform: translate3d(0, 0, 0);
  }

  100% {
    transform: translate3d(-108rem, 0, 0);
  }
}

.img-ticker {
  animation: ticker-kf 18s linear infinite;
}
</style>
