<template>
  Here will be articles on <b>{{ $route.params.category }}</b> topic
</template>

<script setup lang="ts">
// import { IContentResponse } from '@/utils/types'

// const { find } = useStrapi4()
// const articles = ref<IContentResponse | null>(null)

definePageMeta({
  layout: 'main-layout',
})
</script>
