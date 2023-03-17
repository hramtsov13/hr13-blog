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

const timer = ref(props.countdown)

const startTimer = () => {
  const timeNow = new Date().getTime()
  const countDownToTime = props.endTime ?? timeNow + timer.value * 1000

  if (countDownToTime > timeNow) timer.value--
}

setInterval(() => {
  if (timer.value > 0) startTimer()
  else emits('on-interval-end')
}, 1000)

onBeforeRouteLeave(() => {
  timer.value = 0
})
</script>
