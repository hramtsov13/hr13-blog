<template>
  <div>
    <the-page-header title="404 page">
      <template #description>
        Page for <code>404</code> errors. Test it by trying to go to
        non-existing URL
      </template>
    </the-page-header>
    <the-button class="mr-4">
      <NuxtLink to="/"> Go Back Button </NuxtLink>
    </the-button>
  </div>
</template>
