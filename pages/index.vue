<template>
  <div class="font-mono">
    <main>
      <h2 class="text-center text-4xl whitespace-nowrap mb-10">
        Here will be the most important article
      </h2>
      <article>
        <h3 class="text-3xl mb-6">Article title</h3>
        <section class="mb-4 text-lg">
          <h4 class="text-2xl mb-1">Section title 1</h4>
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
          <h4 class="text-2xl mb-1">Section title 2</h4>
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
