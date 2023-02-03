<template>
  <UiTheModal
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <form @submit.prevent="onSubmit">
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
        <UiTheButton :disabled="!isFormValid.value"> Sign up </UiTheButton>
      </div>
    </form>
  </UiTheModal>
</template>

<script lang="ts" setup>
import { useField, useForm, useIsFormValid } from 'vee-validate'
import { useI18n } from 'vue-i18n'

interface IModalLogin {
  modelValue: boolean
}

withDefaults(defineProps<IModalLogin>(), {
  modelValue: true,
})

const emit = defineEmits(['update:modelValue', 'submitForm'])

const { register } = useStrapiAuth()
const router = useRouter()
const { t } = useI18n()

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
    label: t('form.username'),
    initialValue: ' ',
  }),
  name: useField('name', '', {
    label: t('form.name'),
    initialValue: '',
  }),
  surname: useField('surname', '', {
    label: t('form.lastName'),
    initialValue: '',
  }),
  password: useField('password', '', {
    label: t('form.password'),
    initialValue: '',
  }),
  email: useField('email', '', {
    label: t('form.email'),
    initialValue: '',
  }),
})

console.log('form: ', form)

const onSubmit = handleSubmit(async (values) => {
  emit('submitForm', {
    ...values,
  })
})

// const onSubmit1 = async () => {
//   try {
//     const newUser = await register({
//       email: email.value,
//       password: password.value,
//       username: username.value,
//       name: name.value,
//       surname: surname.value,
//     })

//     if (newUser !== null) {
//       error.value = ''
//       router.push('/')
//     }
//   } catch (e: any) {
//     error.value = e.error.message
//   }
// }
</script>
