<template>
  <Head>
    <Title> Blog | Main Page </Title>
  </Head>

  <div class="flex h-full items-center justify-center font-mono">
    <main>
      <h1 class="mb-10 whitespace-nowrap text-center text-4xl">
        {{ $t('service.title') }}
      </h1>

      <article>
        <div class="text-center">
          <p>{{ $t('main.message1') }}</p>
          <p>{{ $t('main.message2') }}</p>
        </div>
      </article>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'main-layout',
})
</script>
