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

const props = withDefaults(defineProps<TheToggleProps>(), {
  modelValue: false,
  value: '',
})

const emit = defineEmits(['update:modelValue', 'change'])

const innerValue = ref(props.modelValue)

const onChange = (event: InputEvent) => {
  emit('update:modelValue', (event.target as HTMLInputElement).checked)
  emit('change', (event.target as HTMLInputElement).checked)
}
</script>
