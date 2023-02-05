<template>
  <UiTheModal
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <form @submit.prevent="onSubmit">
      <UiTheInput
        v-model="loginForm.email.value"
        :label="loginForm.email.label"
        name="login-email"
        autocomplete="email"
        type="email"
        :error-message="loginForm.email.errorMessage"
      />
      <UiTheInput
        v-model="loginForm.password.value"
        :label="loginForm.password.label"
        name="login-password"
        type="password"
        :error-message="loginForm.password.errorMessage"
      />

      <div class="mt-4">
        <UiTheButton outlined type="submit">
          {{ t('service.login') }}
        </UiTheButton>
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
defineEmits(['update:modelValue'])

const { t } = useI18n()
const { login } = useStrapiAuth()

const isFormValid = computed(() => useIsFormValid())

const { handleSubmit } = useForm({
  validationSchema: {
    email: 'required|email',
    password: 'required',
  },
})

const loginForm = reactive({
  password: useField('password', '', {
    label: t('form.password'),
    initialValue: '',
  }),
  email: useField('email', '', {
    label: t('form.email'),
    initialValue: '',
  }),
})

const onSubmit = handleSubmit((values, { resetForm }) => {
  console.log(values)
  resetForm()
})

// const onSubmit = async () => {
//   try {
//     const loggeIndUser = await login({
//       identifier: email.value,
//       password: password.value,
//     })

//     if (loggeIndUser !== null) {
//       error.value = ''
//       router.push('/')
//     }
//   } catch (e: any) {
//     error.value = e.error.message
//   }
// }
</script>
