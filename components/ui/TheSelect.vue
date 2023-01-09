<template>
  <select v-model="$i18n.locale">
    <option v-for="option in options" :key="option" :value="option">
      {{ option }}
    </option>
  </select>
</template>

<script setup lang="ts">
interface TheSelectProps {
  options: Array<string>
}

withDefaults(defineProps<TheSelectProps>(), {
  options: () => [],
})
</script>
