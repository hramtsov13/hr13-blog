<template>
  <div>
    <div class="mb-8 flex items-center">
      <ParticlesAccountUserIcon class="mr-4" :user="comment?.author" />
      <p>{{ comment?.author?.name }} {{ comment?.author?.surname }}</p>
    </div>
    <p class="pl-6 text-sm">
      {{ comment?.content }}
    </p>
    <div class="flex justify-end text-xs">
      <span class="block">{{ $d(comment?.createdAt) }}</span>
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
