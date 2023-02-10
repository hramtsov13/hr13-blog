<template>
  <div
    class="card card-bordered bg-base-200 hover:scale-101 transform-gpu cursor-pointer overflow-hidden shadow-md transition duration-100"
  >
    <div class="h-50 w-full">
      <img class="h-full w-full object-cover" :src="img" :alt="title" />
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
        <UiTheButton plain>Read more...</UiTheButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface IArticleCardProps {
  title: string
  description?: string
  content?: string
  img?: string
}

withDefaults(defineProps<IArticleCardProps>(), {
  title: '',
  description: '',
  content: '',
  img: 'http://localhost:1337/uploads/preview_0a34ae646c.png',
})
</script>
