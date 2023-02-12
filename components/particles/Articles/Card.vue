<template>
  <div
    class="card card-bordered bg-base-200 hover:scale-101 transform-gpu cursor-pointer overflow-hidden shadow-md transition duration-100"
  >
    <div class="h-50 w-full">
      <img
        class="h-full w-full object-cover"
        :src="`${config.strapi.url}${img}`"
        :alt="title"
      />
    </div>
    <div class="card-body p-4">
      <div class="min-h-16 mb-4">
        <h2 class="card-title text-sm leading-6 md:text-lg">
          {{ title }}
        </h2>
      </div>

      <p class="mb-2 text-sm">
        {{ description }}
      </p>
      <div class="card-actions justify-end">
        <UiTheButton plain @click="onReadMoreClick">
          {{ $t('articlesCard.readMore') }}
        </UiTheButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface IArticleCardProps {
  title: string
  description?: string
  img?: string
}

withDefaults(defineProps<IArticleCardProps>(), {
  title: '',
  description: '',
  content: '',
  img: 'http://localhost:1337/uploads/preview_0a34ae646c.png',
})

const emits = defineEmits(['on-read-more-click'])

const config = useRuntimeConfig()

const onReadMoreClick = () => emits('on-read-more-click')
</script>
