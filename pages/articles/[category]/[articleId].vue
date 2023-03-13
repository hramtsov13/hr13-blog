<template>
  <Head>
    <Title>
      {{
        $t('articlePage.meta.title', {
          separator: '|',
          title: pageMetaTitle,
        })
      }}
    </Title>
  </Head>

  <article class="pb-10 font-mono md:pb-20">
    <div class="h-30vh mb-10 overflow-hidden rounded-md shadow-xl">
      <img
        :src="`${config.strapi.url}${article.attributes.cover?.data.attributes.url}`"
        :alt="article.attributes.title"
        class="h-full w-full object-cover"
      />
    </div>
    <div
      class="bg-base-300 container mx-auto mb-4 max-w-3xl overflow-hidden rounded-xl p-4"
    >
      <section class="mb-10">
        <h1 class="md:leading-auto mb-4 text-2xl leading-6 md:text-4xl">
          {{ article.attributes.title }}
        </h1>
        <p class="md:leading-auto text-lg leading-6 md:text-xl">
          {{ article.attributes.description }}
        </p>
      </section>

      <section
        class="text-md md:leading-auto strapi-html px-2.5 py-1.5 leading-5 md:px-6 md:py-4 md:text-lg"
        v-html="article.attributes.content"
      />

      <section class="mb-6 flex flex-col items-end p-2 text-sm">
        <p>
          <span>{{ $t('articlePage.author') }}: </span>
          <span>
            {{ article.attributes.createdBy?.data.attributes.firstname }}
            {{ article.attributes.createdBy?.data.attributes.lastname }}
          </span>
        </p>
        <p>
          <span>{{ $t('articlePage.published') }}: </span>
          <span>{{ $d(new Date('2023-04-10T16:10:12.844Z')) }}</span>
        </p>
      </section>
    </div>

    <div
      class="bg-base-300 container mx-auto max-w-3xl overflow-hidden rounded-xl"
    >
      <section class="md:px-6 md:py-4 md:text-lg">
        <h2 class="mb-4">{{ $t('articlePage.comments.title') }}</h2>

        <template v-if="comments && comments.length">
          <div v-for="(comment, index) in comments" :key="comment.id">
            <ParticlesArticlesComment class="mb-4" :comment="comment" />

            <div v-if="index !== comments.length - 1" class="divider"></div>
          </div>
        </template>
        <template v-else>
          <p class="py-8 text-center text-xl">
            {{ $t('articlePage.comments.empty') }}
          </p>
        </template>

        <div class="mt-10">
          <textarea
            v-model="textarea"
            rows="5"
            class="bg-base-200 mb-4 block w-full p-4 text-sm"
          />
          <UiTheButton @click="sendNewComment">{{
            $t('articlePage.comments.leaveComment')
          }}</UiTheButton>
        </div>
      </section>
    </div>
  </article>
</template>

<script setup lang="ts">
import { IArticleInstanceAttributes, IComment } from '@/utils/types'
const route = useRoute()
const searchableArticleId = route.params.articleId as string

const { findOne } = useStrapi()
const config = useRuntimeConfig()
const token = useStrapiToken()

const textarea = ref('')

const { data: article } = await findOne<IArticleInstanceAttributes>(
  'articles',
  searchableArticleId,
  {
    populate: '*',
  }
)

const pageMetaTitle = computed(() =>
  article ? article.attributes.title : 'test'
)

const { data: comments } = await useAsyncData(() =>
  $fetch<IComment[]>(
    `${config.strapi.url}/api/articles/${searchableArticleId}/comments`,
    {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token.value}`,
      },
    }
  )
)

// TODO: add validation

const sendNewComment = async () => {
  await $fetch(
    `${config.strapi.url}/api/articles/${searchableArticleId}/comments`,
    {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token.value}`,
      },
      body: { content: textarea.value },
    }
  )
}

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
