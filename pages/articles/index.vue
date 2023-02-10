<template>
  <div class="pt-4 font-mono md:pt-6">
    <h1 class="text-md mb-4 font-mono sm:text-xl md:mb-10 md:text-4xl">
      {{ $t('allArticles.title') }}.
    </h1>

    <ParticlesArticlesSlider :options="frontendArticles" title="Frontend" />

    <ParticlesArticlesSlider :options="backendArticles" title="Backend" />

    <ParticlesArticlesSlider :options="otherArticles" title="Other" />
  </div>
</template>

<script setup lang="ts">
import { IContentResponse } from '@/utils/types'

const { find } = useStrapi4()

const { data: articles } = await useAsyncData('articles', () =>
  find<IContentResponse>('articles', { populate: 'cover' })
)

const frontendArticles = computed(() =>
  articles.value?.data.filter(
    (article) => article.attributes.category === 'frontend'
  )
)

const otherArticles = computed(() =>
  articles.value?.data.filter(
    (article) => article.attributes.category === 'other'
  )
)

const backendArticles = computed(() =>
  articles.value?.data.filter(
    (article) => article.attributes.category === 'backend'
  )
)

definePageMeta({
  layout: 'main-layout',
})
</script>
