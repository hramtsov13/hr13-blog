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
      <div class="mt-8 flex justify-end">
        <UiTheButton outlined type="submit" :loading="isSubmitting">
          {{ $t('service.register') }}
        </UiTheButton>
      </div>
    </form>
  </UiTheModal>
</template>

<script lang="ts" setup>
import { useField, useForm, useIsFormValid } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import UiTheInput from '@/components/ui/TheInput.vue'

interface IModalRegister {
  modelValue: boolean
}

withDefaults(defineProps<IModalRegister>(), {
  modelValue: true,
})
defineEmits(['update:model-value'])

const { t } = useI18n()
const { register } = useStrapiAuth()

const { handleSubmit, isSubmitting } = useForm({
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
  email: useField('email', '', {
    label: t('form.email'),
    initialValue: '',
  }),
  password: useField('password', '', {
    label: t('form.password'),
    initialValue: '',
  }),
})

const sleep = (): Promise<void> =>
  new Promise((resolve) =>
    setTimeout(async () => {
      resolve()
    }, 2000)
  )

const onSubmit = handleSubmit(async (values, { resetForm }) => {
  await sleep()
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
