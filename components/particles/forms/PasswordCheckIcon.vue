<template>
  <div
    class="mr-2 flex items-center justify-center rounded-md px-1 transition duration-200 ease-out"
    :class="isActive ? 'bg-green-700 text-white' : 'bg-red-600 text-field'"
    size="2rem"
  >
    <Icon :name="isActive ? 'ic:sharp-check' : 'system-uicons:cross'" />
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
