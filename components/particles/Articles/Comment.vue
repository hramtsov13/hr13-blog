<template>
  <div>
    <div class="mb-5 flex items-start justify-between">
      <div class="flex items-center">
        <ParticlesAccountUserIcon class="mr-4" :user="comment?.author" />
        <p>{{ comment?.author?.name }} {{ comment?.author?.surname }}</p>
      </div>
      <UiTheButton class="h-6 w-6" icon>
        <Icon name="mdi:window-close" size="1rem" />
      </UiTheButton>
    </div>

    <p class="pl-6 text-sm">
      {{ comment?.content }}
    </p>

    <div v-if="comment && comment.createdAt" class="flex justify-end text-xs">
      <span class="block">{{ $d(comment.createdAt, 'long') }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IComment } from '@/utils/types'

interface IArticleComment {
  comment: IComment | null
}

withDefaults(defineProps<IArticleComment>(), {
  comment: null,
})
</script>
