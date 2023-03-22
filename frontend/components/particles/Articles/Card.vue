<template>
  <div
    class="card card-bordered bg-base-200 hover:scale-101 transform-gpu cursor-pointer overflow-hidden shadow-md transition duration-100"
  >
    <div class="h-50 w-full">
      <img
        class="h-full w-full object-cover"
        :src="`${config.strapi.url}${article?.attributes.cover?.data.attributes.url}`"
        :alt="article?.attributes.title"
      />
    </div>
    <div class="card-body p-4">
      <div class="min-h-16 mb-4">
        <h2 class="card-title text-sm leading-6 md:text-lg">
          {{ article?.attributes.title }}
        </h2>
      </div>

      <p class="mb-2 text-sm">
        {{ article?.attributes.description }}
      </p>
      <div class="card-actions justify-end">
        <NuxtLink :to="articleLink">
          <UiTheButton plain>
            {{ $t('articlesCard.readMore') }}
          </UiTheButton>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IArticleInstance } from '@/utils/types'

interface IArticleCardProps {
  article: IArticleInstance | null
}

const props = withDefaults(defineProps<IArticleCardProps>(), {
  article: null,
})

const config = useRuntimeConfig()

const articleLink = computed(() => {
  if (props.article) {
    return `/articles/${props.article.attributes.category}/${props.article.id}`
  }

  return '/'
})
</script>
