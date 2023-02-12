<!-- eslint-disable tailwindcss/migration-from-tailwind-2 -->
<template>
  <div class="border-grey-200 bg-base-300 mb-10 w-full rounded-xl p-4">
    <UiTheSlider :options="options">
      <template #controls="{ swiper, slidesLength }">
        <div class="mb-6 flex items-center justify-between">
          <h2 class="font-mono text-2xl uppercase">
            {{ title }}
          </h2>

          <div>
            <UiTheButton
              :disabled="slidesLength < 4 || swiper?.isBeginning"
              class="text-accent mr-4"
              @click="swiper?.slidePrev()"
            >
              <Icon name="material-symbols:arrow-back-ios-new-rounded" />
            </UiTheButton>
            <UiTheButton
              class="text-accent"
              :disabled="slidesLength < 4 || swiper?.isEnd"
              @click="swiper?.slideNext()"
            >
              <Icon
                class="rotate-180 transform"
                name="material-symbols:arrow-back-ios-new-rounded"
              />
            </UiTheButton>
          </div>
        </div>
      </template>
      <template #content="{ slide }">
        <ParticlesArticlesCard
          :title="slide.attributes.title"
          :description="slide.attributes.description"
          :img="slide.attributes.cover?.data.attributes.url"
          class="h-full"
          @on-read-more-click="onReadMoreClick(slide)"
        />
      </template>
    </UiTheSlider>
  </div>
</template>

<script setup lang="ts">
import { IContentInstance } from '@/utils/types'

interface ArticleSliderProps {
  options: Array<any>
  title: string
}

withDefaults(defineProps<ArticleSliderProps>(), {
  options: () => [],
  title: '',
})

const onReadMoreClick = (slide: IContentInstance) => {
  console.log('slide: ', slide)
}
</script>
