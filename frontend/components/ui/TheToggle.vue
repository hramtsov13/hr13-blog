<template>
  <input
    :checked="modelValue"
    type="checkbox"
    class="toggle"
    @change="onChange"
  />
</template>

<script setup lang="ts">
interface TheToggleProps {
  modelValue: boolean
  value?: string
}

withDefaults(defineProps<TheToggleProps>(), {
  modelValue: false,
  value: '',
})

const emit = defineEmits(['update:modelValue', 'change'])

const onChange = (event: InputEvent) => {
  emit('update:modelValue', (event.target as HTMLInputElement).checked)
  emit('change', (event.target as HTMLInputElement).checked)
}
</script>
