<template>
  <UiTheModal
    :model-value="modelValue"
    @update:model-value="$emit('update:model-value', $event)"
  >
    <form @submit.prevent="onSubmit">
      <UiTheInput
        v-model="registerForm.name.value"
        :label="registerForm.name.label"
        name="sign-up-name"
        autocomplete="given-name"
        :error-message="registerForm.name.errorMessage"
      />
      <UiTheInput
        v-model="registerForm.surname.value"
        :label="registerForm.surname.label"
        name="sign-up-last-name"
        autocomplete="family-name"
        :error-message="registerForm.surname.errorMessage"
      />
      <UiTheInput
        v-model="registerForm.email.value"
        :label="registerForm.email.label"
        :error-message="registerForm.email.errorMessage"
        name="sign-up-email"
        type="email"
        placeholder="e@mail.com"
        autocomplete="email"
      />
      <UiTheInput
        v-model="registerForm.password.value"
        :label="registerForm.password.label"
        :error-message="registerForm.password.errorMessage"
        name="sign-up-password"
        type="password"
        placeholder="8 symbols"
        autocomplete="new-password"
      />
      <div class="mt-4">
        <button type="submit">submit</button>
        <button class="mx-4" type="submit" @click="onReset">reset</button>
        <UiTheButton outlined type="submit"> Sign up </UiTheButton>
      </div>
    </form>
  </UiTheModal>
</template>

<script lang="ts" setup>
import { useField, useForm, useIsFormValid } from 'vee-validate'
import { useI18n } from 'vue-i18n'

interface IModalRegister {
  modelValue: boolean
}

withDefaults(defineProps<IModalRegister>(), {
  modelValue: true,
})
defineEmits(['update:model-value'])

const { t } = useI18n()
const { register } = useStrapiAuth()

const error = ref('')
const isFormValid = computed(() => useIsFormValid())

const { handleSubmit, meta, resetForm } = useForm({
  validationSchema: {
    name: 'required',
    surname: 'required',
    email: 'required|email',
    password: 'required',
  },
})

const registerForm = reactive({
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

const onReset = () => resetForm()

const onSubmit = handleSubmit((values, { resetForm }) => {
  console.log(values)
  resetForm()
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
