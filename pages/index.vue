<template>
  <div class="font-mono">
    <main>
      <h2 class="mb-10 whitespace-nowrap text-center text-4xl">
        Here will be the most important article
      </h2>
      <article>
        <h3 class="mb-6 text-3xl">Article title</h3>
        <section class="mb-4 text-lg">
          <h4 class="mb-1 text-2xl">Section title 1</h4>
          <p class="mb-2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod
            mollitia doloremque non atque placeat aut unde eius esse? Illo
            molestiae sit, similique sunt magnam voluptatibus eveniet delectus
            et quis quidem.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod
            mollitia doloremque non atque placeat aut unde eius esse? Illo
            molestiae sit, similique sunt magnam voluptatibus eveniet delectus
            et quis quidem.
          </p>
        </section>
        <section>
          <h4 class="mb-1 text-2xl">Section title 2</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod
            mollitia doloremque non atque placeat aut unde eius esse? Illo
            molestiae sit, similique sunt magnam voluptatibus eveniet delectus
            et quis quidem.
          </p>
        </section>
      </article>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'main-layout',
})
</script>
