<template>
  <UiTheModal
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
  >
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
  </UiTheModal>
</template>

<script lang="ts" setup>
interface IModalLogin {
  modelValue: boolean
}

defineEmits(['update:modelValue'])

withDefaults(defineProps<IModalLogin>(), {
  modelValue: true,
})

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
