<template>
  <select
    :value="modelValue"
    class="select select-accent max-w-xs"
    @change="onSelect"
  >
    <option v-for="option in options" :key="option" :value="option">
      {{ option }}
    </option>
  </select>
</template>

<script setup lang="ts">
interface TheSelectProps {
  options: Array<string>
  modelValue: string
}

withDefaults(defineProps<TheSelectProps>(), {
  options: () => [],
  modelValue: '',
})

const emit = defineEmits(['update:model-value'])

const onSelect = (event: Event) => {
  if (event) {
    const target = event.target as HTMLSelectElement
    emit('update:model-value', target.value)
  }
}
</script>
