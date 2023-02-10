<template>
  <div>
    <slot name="controls" :swiper="swiperRef" :slides-length="options.length" />

    <Swiper
      :modules="[SwiperAutoplay]"
      :slides-per-view="3"
      :autoplay="autoplay"
      :space-between="20"
      wrapper-tag="div"
      @swiper="onSwiper"
    >
      <SwiperSlide v-for="(slide, index) in options" :key="index">
        <slot name="content" :slide="slide" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import { AutoplayOptions } from 'swiper/types'
import type { Swiper } from 'swiper'

interface TheSliderProps {
  autoplay?: AutoplayOptions | boolean
  options: Array<any>
}

withDefaults(defineProps<TheSliderProps>(), {
  autoplay: false,
  options: () => [],
})

const swiperRef = ref<Swiper | null>(null)

const onSwiper = (swiper: Swiper) => {
  swiperRef.value = swiper
}
</script>
