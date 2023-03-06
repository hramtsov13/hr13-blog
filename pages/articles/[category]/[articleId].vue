<template>
  <Head>
    <Title> Blog | {{ article?.data.attributes.title }} </Title>
  </Head>

  <article class="pb-10 font-mono md:pb-20">
    <div class="h-30vh mb-10 overflow-hidden rounded-md shadow-xl">
      <img
        :src="`${config.strapi.url}${article?.data.attributes.cover?.data.attributes.url}`"
        :alt="article?.data.attributes.title"
        class="h-full w-full object-cover"
      />
    </div>
    <div
      class="bg-base-300 container mx-auto mb-4 max-w-3xl overflow-hidden rounded-xl p-4"
    >
      <section class="mb-10">
        <h1 class="md:leading-auto mb-4 text-2xl leading-6 md:text-4xl">
          {{ article?.data.attributes.title }}
        </h1>
        <p class="md:leading-auto text-lg leading-6 md:text-xl">
          {{ article?.data.attributes.description }}
        </p>
      </section>

      <section
        class="text-md md:leading-auto strapi-html px-2.5 py-1.5 leading-5 md:px-6 md:py-4 md:text-lg"
        v-html="article?.data.attributes.content"
      />

      <section class="mb-6 flex flex-col items-end p-2 text-sm">
        <p>
          <span>Author: </span>
          <span>
            {{ article?.data.attributes.createdBy?.data.attributes.firstname }}
            {{ article?.data.attributes.createdBy?.data.attributes.lastname }}
          </span>
        </p>
        <p>
          <span>Published: </span>
          <!-- <span>{{ $d(article?.data.attributes.publishedAt) }}</span> -->
          <span>{{ $d(new Date('2023-04-10T16:10:12.844Z')) }}</span>
        </p>
      </section>
    </div>

    <div
      class="bg-base-300 container mx-auto max-w-3xl overflow-hidden rounded-xl"
    >
      <section class="md:px-6 md:py-4 md:text-lg">
        <h2 class="mb-4">Comments</h2>
        <div class="mb-4">
          <div class="mb-2 flex items-center">
            <ParticlesAccountUserIcon class="mr-4" :user="user" />
            <p>{{ user?.name }} {{ user?.surname }}</p>
          </div>
          <p class="pl-6 text-sm">
            {{ commentText }}
          </p>
          <div class="flex justify-end text-xs">
            <span class="block">{{
              $d(new Date('2023-02-09T16:10:12.844Z'))
            }}</span>
          </div>
        </div>

        <div class="divider"></div>

        <div class="mb-4">
          <div class="mb-2 flex items-center">
            <ParticlesAccountUserIcon class="mr-4" :user="user" />
            <p>{{ user?.name }} {{ user?.surname }}</p>
          </div>
          <p class="pl-6 text-sm">
            {{ commentText }}
          </p>
          <div class="flex justify-end text-xs">
            <span class="block">{{
              $d(new Date('2023-04-10T16:10:12.844Z'))
            }}</span>
          </div>
        </div>

        <div class="divider"></div>

        <div class="mt-10">
          <textarea
            v-model="textarea"
            rows="5"
            class="bg-base-200 mb-4 block w-full p-4 text-sm"
          />
          <UiTheButton @click="sendRequest">Leave a comment</UiTheButton>
          <UiTheButton @click="sendPostRequest">POST</UiTheButton>
        </div>
      </section>
    </div>
  </article>
</template>

<script setup lang="ts">
import { IArticleInstanceAttributes, TUser } from '@/utils/types'
const route = useRoute()
const searchableArticleId = route.params.articleId as string

const { findOne } = useStrapi()
const config = useRuntimeConfig()
const user = useStrapiUser<TUser>()
const token = useStrapiToken()

const commentText =
  'Docker also makes it easier to manage your application dependencies and reduces the risk of conflicts between your application and the host environment. In summary, Kubernetes helps you manage and automate the deployment and scaling of your applications, while Docker helps you package and distribute your applications in containers.'
const textarea = ref(
  'Docker also makes it easier to manage your application dependencies and reduces the risk of conflicts between your application and the host environment. In summary, Kubernetes helps you manage and automate the deployment and scaling of your applications, while Docker helps you package and distribute your applications in containers.'
)

const { data: article } = await useLazyAsyncData(() =>
  findOne<IArticleInstanceAttributes>('article', searchableArticleId, {
    populate: '*',
  })
)

const sendRequest = async () => {
  await useAsyncData(() =>
    $fetch(
      `${config.strapi.url}/api/articles/${searchableArticleId}/comments`,
      {
        method: 'GET',
        headers: {
          authorization: `Bearer ${token.value}`,
        },
      }
    )
  )
}

const sendPostRequest = async () => {
  await useAsyncData(() =>
    $fetch(
      `${config.strapi.url}/api/articles/${searchableArticleId}/comments`,
      {
        method: 'POST',
        headers: {
          authorization: `Bearer ${token.value}`,
        },
        body: { content: textarea.value },
      }
    )
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
