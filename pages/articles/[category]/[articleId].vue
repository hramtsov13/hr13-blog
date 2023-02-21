<template>
  <article class="pb-10 font-mono md:pb-20">
    <div class="h-30vh mb-10 overflow-hidden rounded-md shadow-xl">
      <img
        :src="`${config.strapi.url}${article.attributes.cover?.data.attributes.url}`"
        :alt="article.attributes.title"
        class="h-full w-full object-cover"
      />
    </div>
    <div
      class="bg-base-300 container mx-auto max-w-3xl overflow-hidden rounded-xl"
    >
      <section class="bg-accent text-base-100 mb-10 p-4">
        <h1 class="md:leading-auto mb-6 text-2xl leading-6 md:text-4xl">
          {{ article.attributes.title }}
        </h1>
        <p class="md:leading-auto text-lg leading-6 md:text-xl">
          {{ article.attributes.description }}
        </p>
      </section>

      <section
        class="text-md md:leading-auto strapi-html px-2.5 py-1.5 leading-5 shadow-xl md:px-6 md:py-4 md:text-lg"
        v-html="article.attributes.content"
      ></section>
    </div>
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

<style lang="scss">
.strapi-html {
  p {
    @apply mb-5;

    &:last-child {
      @apply mb-0;
    }
  }

  ul {
    @apply mx-4 list-disc mb-4;

    li {
      @apply mb-2;

      &:last-child {
        @apply mb-0;
      }
    }
  }

  pre {
    @apply p-2 bg-base-100 rounded-xl overflow-x-auto;

    code {
      @apply text-secondary;
    }
  }

  code {
    @apply text-accent bg-base-100 rounded-md px-2 py-1 text-sm;
  }
}
</style>
