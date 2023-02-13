<template>
  <article class="pb-10 font-mono md:pb-20">
    <div class="h-30vh mb-10 overflow-hidden rounded-md shadow-xl">
      <img
        :src="`${config.strapi.url}${article.attributes.cover?.data.attributes.url}`"
        :alt="article.attributes.title"
        class="h-full w-full object-cover"
      />
    </div>
    <section
      class="bg-base-300 container mx-auto max-w-3xl rounded-xl px-2.5 py-1.5 shadow-xl md:px-6 md:py-4"
    >
      <section class="mb-10">
        <h1 class="md:leading-auto mb-6 text-2xl leading-6 md:text-4xl">
          {{ article.attributes.title }}
        </h1>
        <p class="md:leading-auto text-lg leading-6 md:text-xl">
          {{ article.attributes.description }}
        </p>
      </section>

      <section>
        <p class="text-md md:leading-auto leading-5 md:text-lg">
          {{ article.attributes.content }}
        </p>
      </section>
    </section>
  </article>
</template>

<script setup lang="ts">
import { IContentSingleResponse } from '@/utils/types'
const route = useRoute()
const searchableArticleId = route.params.articleId as string

const { findOne } = useStrapi4()
const config = useRuntimeConfig()

const { data: article } = await findOne<IContentSingleResponse>(
  'articles',
  searchableArticleId,
  {
    populate: 'cover',
  }
)

definePageMeta({
  layout: 'main-layout',
})
</script>
