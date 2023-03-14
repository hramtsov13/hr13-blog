<template>
  <div>
    <div class="mb-5 flex items-start justify-between">
      <div class="flex items-center">
        <ParticlesAccountUserIcon class="mr-4" :user="comment?.author" />
        <p class="capitalize">
          {{ comment?.author?.name }} {{ comment?.author?.surname }}
        </p>
      </div>

      <UiTheButton
        v-if="isCommentAuthorEqualsUser"
        class="h-7 w-7"
        icon
        @click="onDelete"
      >
        <Icon
          name="ic:baseline-delete-forever"
          size="1.2rem"
          class="text-red-500"
        />
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
import { IComment, TUser } from '@/utils/types'

interface IArticleComment {
  comment: IComment | null
  user?: Partial<TUser>
}

const props = withDefaults(defineProps<IArticleComment>(), {
  comment: null,
  user: null,
})

const emit = defineEmits(['onDelete'])

const isCommentAuthorEqualsUser = computed(
  () => props.user?.id === props.comment?.author?.id
)

const onDelete = () => {
  emit('onDelete', props.comment)
}
</script>
