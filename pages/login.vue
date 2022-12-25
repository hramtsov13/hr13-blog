<template>
  <div class="w-4/5 mx-auto md:w-1/2 text-center my-12">
    <div v-show="error !== ''" class="p-3 border">
      <p>{{ error }}</p>
    </div>
    <h1 class="font-bold text-2xl md:text-4xl mt-5">Login</h1>
    <form @submit.prevent="onSubmit">
      <div>
        <input
          v-model="identifier"
          class="p-3 my-5 border w-full"
          type="email"
          placeholder="email"
        />
      </div>
      <div>
        <input
          v-model="password"
          class="p-3 my-5 border w-full"
          type="password"
          placeholder="password"
        />
      </div>
      <div>
        <button
          :disabled="identifier === '' || password === ''"
          class="button--green"
          type="submit"
        >
          Login
        </button>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const { login, register } = useStrapiAuth()
const router = useRouter()

const identifier = ref('')
const password = ref('')
const error = ref('')

const onSubmit = async () => {
  try {
    await login({
      identifier: identifier.value,
      password: password.value,
    })
    router.push('/authenticated-page')
  } catch (e) {
    error.value = e.message
  }
}
</script>
<style></style>
