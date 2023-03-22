<template>
  <UiTheSelect v-model="$i18n.locale" :options="options" />
</template>

<script setup lang="ts">
const options = ref(['en', 'ru', 'de'])
</script>
