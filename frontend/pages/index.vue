<template>
  <Head>
    <Title>
      {{
        $t('articleCategory.meta.title', {
          separator: '|',
          category: 'Articles Digest',
        })
      }}
    </Title>
  </Head>

  <div class="py-4 font-mono md:pt-6">
    <h1 class="text-md mb-4 font-mono sm:text-xl md:mb-10 md:text-4xl">
      {{ $t('allArticles.title') }}.
    </h1>

    <ParticlesArticlesSlider
      :options="frontendArticles"
      :title="$t('service.frontend')"
    />

    <ParticlesArticlesSlider
      :options="backendArticles"
      :title="$t('service.backend')"
    />

    <ParticlesArticlesSlider
      :options="otherArticles"
      :title="$t('service.other')"
    />
  </div>
</template>

<script setup lang="ts">
import { IArticleInstanceAttributes } from '@/utils/types'
import { useNotification } from '@kyvg/vue3-notification'

const { find } = useStrapi()
const { notify } = useNotification()

const { data: articles } = await useAsyncData('articles', () =>
  find<IArticleInstanceAttributes>('articles', {
    populate: 'cover',
  })
)

if (articles.value === null) {
  notify({
    text: 'Something went wrong, try later',
    type: 'error',
    duration: 7000,
    id: Date.now(),
    closeOnClick: true,
  })
}

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
