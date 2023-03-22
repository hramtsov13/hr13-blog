<template>
  <div class="dropdown dropdown-end font-mono">
    <label tabindex="0" class="btn m-1">
      <span v-if="label.length">{{ label }}</span>
      <slot v-else name="label" />
    </label>
    <ul
      tabindex="0"
      class="dropdown-content menu bg-base-300 rounded-box p-4 shadow"
    >
      <slot name="content" />
    </ul>
  </div>
</template>

<script setup lang="ts">
interface ITheDropdownProps {
  label?: string
}

withDefaults(defineProps<ITheDropdownProps>(), {
  label: '',
})
</script>
