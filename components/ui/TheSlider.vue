<template>
  <div>
    <slot name="controls" :swiper="swiperRef" :slides-length="options.length" />

    <Swiper
      :modules="[SwiperAutoplay]"
      :slides-per-view="slidesPerView"
      :autoplay="autoplay"
      :space-between="20"
      wrapper-tag="div"
      data-observer="true"
      @swiper="onSwiper"
    >
      <SwiperSlide v-for="(slide, index) in options" :key="index">
        <slot name="content" :slide="slide" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
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
const breakpoints = useBreakpoints(breakpointsTailwind)

const slidesPerView = computed(() => {
  if (breakpoints.between('sm', 'lg').value) return 2
  else if (breakpoints.greaterOrEqual('lg').value) return 3

  return 1
})

const onSwiper = (swiper: Swiper) => {
  swiperRef.value = swiper
}
</script>

<style>
.swiper {
  height: 100%;
}
.swiper-slide {
  height: auto !important;
}

.swiper-wrapper {
  height: 100% !important;
}
</style>
