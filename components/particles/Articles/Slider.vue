<template>
  <div class="border-grey-200 bg-base-300 mb-10 w-full rounded-xl p-4">
    <UiTheSlider :options="options">
      <template #controls="{ swiper, slidesLength }">
        <div class="mb-6 flex items-center justify-between">
          <h2 class="font-mono text-2xl uppercase">
            {{ title }} {{ slidesLength }}
          </h2>

          <div>
            <UiTheButton
              :disabled="slidesLength < 4"
              class="text-accent mr-4"
              @click="swiper?.slidePrev()"
            >
              <Icon name="material-symbols:arrow-back-ios-new-rounded" />
            </UiTheButton>
            <UiTheButton
              class="text-accent"
              :disabled="slidesLength < 4"
              @click="swiper?.slideNext()"
            >
              <Icon
                class="rotate-180"
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
          :img="`${config.strapi.url}${slide.attributes.cover?.data.attributes.url}`"
          class="col-span-full mb-4 sm:col-span-6 md:col-span-4"
        />
      </template>
    </UiTheSlider>
  </div>
</template>

<script setup lang="ts">
interface ArticleSliderProps {
  options: Array<any>
  title: string
}

withDefaults(defineProps<ArticleSliderProps>(), {
  options: () => [],
  title: '',
})

const config = useRuntimeConfig()
</script>
