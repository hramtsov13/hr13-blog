<template>
  <div class="avatar online placeholder">
    <div class="bg-neutral-focus text-neutral-content w-14 rounded-full">
      <span class="text-xl uppercase">{{ userInitials }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TUser } from '@/utils/types'

interface IAccountUserIconProps {
  user: TUser
}

const props = withDefaults(defineProps<IAccountUserIconProps>(), {
  user: null,
})

const userInitials = computed(() => {
  if (props.user)
    return `${props.user.name.slice(0, 1)}${props.user.surname.slice(0, 1)}`

  return '--'
})
</script>
