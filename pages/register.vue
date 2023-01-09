<template>
  <div class="w-4/5 mx-auto md:w-1/2 text-center my-12">
    <div v-show="error !== ''" class="p-3 border">
      <p>{{ error }}</p>
    </div>
    <h1 class="font-bold text-2xl md:text-4xl mt-5">Register</h1>
    <form @submit.prevent="onSubmit">
      {{ isFormValid }}
      <div>
        <label for="">
          {{ form.username.label }}
        </label>
        <input
          v-model="form.username.value.value"
          class="p-3 my-5 border w-full"
          type="text"
          placeholder="username"
        />
        {{ form.username.errorMessage }}
      </div>
      <div>
        <label for="">
          {{ form.name.label }}
        </label>
        <input
          v-model="form.name.value.value"
          class="p-3 my-5 border w-full"
          type="text"
          placeholder="name"
        />
      </div>
      <div>
        <label for="">
          {{ form.surname.label }}
        </label>
        <input
          v-model="form.surname.value.value"
          class="p-3 my-5 border w-full"
          type="text"
          placeholder="surname"
        />
      </div>
      <div>
        <label for="">
          {{ form.email.label }}
        </label>
        <input
          v-model="form.email.value.value"
          class="p-3 my-5 border w-full"
          type="email"
          placeholder="email"
          autocomplete="email"
        />
      </div>
      <div>
        <label for="">
          {{ form.password.label }}
        </label>
        <input
          v-model="form.password.value.value"
          class="p-3 my-5 border w-full"
          type="password"
          placeholder="password"
        />
      </div>
      <div>
        <button
          :disabled="!isFormValid"
          :class="[
            'border px-4 py-2 rounded-md border-gray',
            { 'bg-gray-500 cursor-not-allowed': !isFormValid },
          ]"
          type="submit"
        >
          Sign up
        </button>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useField, useForm, useIsFormValid } from 'vee-validate'
import { useI18n } from 'vue-i18n'

const emit = defineEmits(['submitForm'])

const { register } = useStrapiAuth()
const router = useRouter()
const { t } = useI18n()

const email = ref('')
const password = ref('')
const username = ref('')
const name = ref('')
const surname = ref('')
const error = ref('')
const isFormValid = computed(() => useIsFormValid())

const { handleSubmit, meta } = useForm({
  validationSchema: {
    username: 'required',
    name: 'required',
    surname: 'required',
    password: 'required',
    email: 'required|email',
  },
})

const form = reactive({
  username: useField('username', '', {
    label: 'Username',
    initialValue: '',
  }),
  name: useField('name', '', {
    label: 'name',
    initialValue: '',
  }),
  surname: useField('surname', '', {
    label: 'surname',
    initialValue: '',
  }),
  password: useField('password', '', {
    label: 'password',
    initialValue: '',
  }),
  email: useField('email', '', {
    label: 'email',
    initialValue: '',
  }),
})

const onSubmit = handleSubmit(async (values) => {
  console.log('🚀 ~ file: register.vue:104 ~ onSubmit ~ values', values)
  emit('submitForm', {
    ...values,
  })
})

const isLoginDisabled = computed(
  () => email.value === '' || password.value === '' || username.value === ''
)

const onSubmit1 = async () => {
  try {
    const newUser = await register({
      email: email.value,
      password: password.value,
      username: username.value,
      name: name.value,
      surname: surname.value,
    })

    if (newUser !== null) {
      error.value = ''
      router.push('/')
    }
  } catch (e: any) {
    error.value = e.error.message
  }
}

definePageMeta({
  layout: 'empty',
})
</script>
