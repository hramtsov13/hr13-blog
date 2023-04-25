<template>
  <div class="alert alert-info shadow-lg">
    <div>
      <Icon
        name="ic:baseline-delete-forever"
        size="1.2rem"
        class="text-red-500"
      />
      <span>12 unread messages. Tap to see.</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface TheNotificationProps {
  options: Array<string>
  modelValue: string
}

withDefaults(defineProps<TheNotificationProps>(), {
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
