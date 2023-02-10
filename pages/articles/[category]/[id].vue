<template>
  <div>category {{ route.params }}</div>
</template>

<script setup lang="ts">
const route = useRoute()

definePageMeta({
  layout: 'main-layout',
})
</script>
