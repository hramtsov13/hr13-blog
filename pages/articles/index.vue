<template>
  <div class="pt-4 font-mono md:pt-6">
    <h1
      class="text-md mb-4 text-center font-mono sm:text-xl md:mb-10 md:text-2xl"
    >
      {{ $t('allArticles.title') }}
    </h1>
    <div class="grid grid-cols-12 gap-4">
      <ParticlesArticlesArticleCard
        v-for="article in articles?.data"
        :key="article.id"
        :title="article.attributes.title"
        :description="article.attributes.description"
        :img="`http://localhost:1337${article.attributes.cover?.data.attributes.url}`"
        class="col-span-full mb-4 sm:col-span-6 md:col-span-4"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { IContentResponse } from '@/utils/types'

const { find } = useStrapi4()
const articles = ref<IContentResponse | null>(null)

articles.value = await find<IContentResponse>('articles', { populate: 'cover' })

definePageMeta({
  layout: 'main-layout',
})
</script>
