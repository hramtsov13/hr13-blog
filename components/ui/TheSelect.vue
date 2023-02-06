<template>
  <select v-model="$i18n.locale" class="select select-primary max-w-xs">
    <option v-for="option in options" :key="option" :value="option">
      {{ option }}
    </option>
  </select>
</template>

<script setup lang="ts">
interface TheSelectProps {
  options: Array<string>
  modelValue: string | null
}

withDefaults(defineProps<TheSelectProps>(), {
  options: () => [],
  modelValue: null,
})
</script>
