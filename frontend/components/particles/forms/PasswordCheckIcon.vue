<template>
  <div
    class="mr-2 flex items-center justify-center rounded-md p-1 transition duration-200 ease-out"
    :class="isActive ? 'bg-green-700 text-white' : 'bg-red-600 text-field'"
  >
    <Icon
      :name="isActive ? 'ic:sharp-check' : 'mdi:window-close'"
      size="1rem"
    />
  </div>
</template>

<script setup lang="ts">
interface IPasswordRequirementsProps {
  isActive: boolean
}

withDefaults(defineProps<IPasswordRequirementsProps>(), {
  isActive: false,
})
</script>
