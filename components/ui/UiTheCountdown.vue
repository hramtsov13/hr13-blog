<template>
  <span class="countdown">
    <span :style="`--value: ${timer}`"></span>
  </span>
</template>

<script setup lang="ts">
interface TheCountdownProps {
  countdown: number
  startTime?: Date | null
  endTime?: Date | null
}

const props = withDefaults(defineProps<TheCountdownProps>(), {
  countdown: 100,
  startTime: null,
  endTime: null,
})

const emits = defineEmits(['on-interval-end'])

const SECOND_IN_MS = 1000
const timer = ref(props.countdown)
let timeNow = new Date().getTime()
const countDownToTime = props.endTime ?? timeNow + timer.value * SECOND_IN_MS

const interval = setInterval(() => {
  if (countDownToTime > timeNow) {
    timeNow = new Date().getTime()
    timer.value--
  } else {
    clearInterval(interval)
    emits('on-interval-end')
  }
}, SECOND_IN_MS)

onBeforeRouteLeave(() => {
  timer.value = 0
})
</script>
