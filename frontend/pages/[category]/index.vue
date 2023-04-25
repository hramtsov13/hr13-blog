<template>
  <Head>
    <Title>
      {{
        $t('articleCategory.meta.title', {
          separator: '|',
          category: currentCategory.toUpperCase(),
        })
      }}
    </Title>
  </Head>

  <!-- <div
    v-if="!specificCategoryArticles || !specificCategoryArticles.length"
    class="flex h-full items-center justify-center text-center font-mono text-2xl"
  >
    <div>
      <p
        v-html="
          $t('articleCategory.emptyCategory.message1', {
            category: currentCategory,
          })
        "
      ></p>
      <p>{{ $t('articleCategory.emptyCategory.message2') }}</p>
      <NuxtLink class="mt-6 block" to="/">
        <UiTheButton>
          {{ $t('articleCategory.emptyCategory.backButton') }}
        </UiTheButton>
      </NuxtLink>
    </div>
  </div> -->

  <div class="grid grid-cols-12 gap-4 pb-4">
    <ParticlesArticlesCard
      v-for="article in specificCategoryArticles"
      :key="article.id"
      :article="article"
      class="col-span-full sm:col-span-6 lg:col-span-4 xl:col-span-3"
    />
  </div>
</template>

<script setup lang="ts">
import { IArticleInstanceAttributes } from '@/utils/types'

const { find } = useStrapi()
const route = useRoute()

const currentCategory = route.params.category as string

const query = {
  category: {
    $eq: currentCategory,
  },
}

const { data: specificCategoryArticles } =
  await find<IArticleInstanceAttributes>('articles', {
    populate: 'cover',
    filters: query,
  })

definePageMeta({
  layout: 'main-layout',
})
</script>
