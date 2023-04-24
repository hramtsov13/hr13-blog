<template>
  <div>
    <Head>
      <Title> Store </Title>
    </Head>
    <the-page-header title="Store page">
      <template #description>
        Demo of the <code>Pinia</code> store module
      </template>
    </the-page-header>

    <h2 class="mb-5 text-[1.6rem] font-bold">Counter</h2>
    <div class="mb-10 rounded-xl border border-gray-300 bg-gray-100 px-10 py-5">
      <div class="mb-4">{{ counterValue }}</div>
      <the-button class="mr-4" @click="counterStore.increaseCounter(2)">
        Increment
      </the-button>
      <the-button class="mr-4" @click="counterStore.decreaseCounter(2)">
        Decrement
      </the-button>
      <the-button class="mr-4" @click="counterStore.clearCounter()">
        Clear
      </the-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useCounterStore from '~/store/counter'

const counterStore = useCounterStore()

const counterValue = computed(() => counterStore.getCounterValue)
</script>
