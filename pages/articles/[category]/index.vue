<template>
  <div
    v-if="!specificCategoryArticles.length"
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
      <NuxtLink class="mt-6 block" to="/articles">
        <UiTheButton>
          {{ $t('articleCategory.emptyCategory.backButton') }}
        </UiTheButton>
      </NuxtLink>
    </div>
  </div>

  <div v-else class="grid grid-cols-12 gap-4">
    <ParticlesArticlesCard
      v-for="article in specificCategoryArticles"
      :key="article.id"
      :article="article"
      class="col-span-full sm:col-span-6 lg:col-span-4 xl:col-span-3"
    />
  </div>
</template>

<script setup lang="ts">
import { IContentResponse } from '@/utils/types'

const { find } = useStrapi4()
const route = useRoute()

const currentCategory = route.params.category

const query = {
  category: {
    $eq: currentCategory,
  },
}

const { data: specificCategoryArticles } = await find<IContentResponse>(
  'articles',
  {
    filters: query,
    populate: 'cover',
  }
)

definePageMeta({
  layout: 'main-layout',
})
</script>
