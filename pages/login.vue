<template>
  <div class="w-4/5 mx-auto md:w-1/2 text-center my-12">
    <div v-show="error !== ''" class="p-3 border">
      <p>{{ error }}</p>
    </div>
    <h1 class="font-bold text-2xl md:text-4xl mt-5">Login</h1>
    <form @submit.prevent="onSubmit">
      <div>
        <input
          v-model="email"
          class="p-3 my-5 border w-full"
          type="email"
          placeholder="email"
          autocomplete="email"
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
          :disabled="isLoginDisabled"
          :class="[
            'border px-4 py-2 rounded-md border-gray',
            { 'bg-gray-500 cursor-not-allowed': isLoginDisabled },
          ]"
          type="submit"
        >
          Login
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
const { login } = useStrapiAuth()
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')

const isLoginDisabled = computed(
  () => email.value === '' || password.value === ''
)

const onSubmit = async () => {
  try {
    const loggeIndUser = await login({
      identifier: email.value,
      password: password.value,
    })

    if (loggeIndUser !== null) {
      error.value = ''
      router.push('/')
    }
  } catch (e: any) {
    error.value = e.error.message
  }
}
</script>
