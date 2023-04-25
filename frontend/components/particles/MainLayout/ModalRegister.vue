<template>
  <UiTheModal
    :model-value="modelValue"
    :error="error"
    @update:model-value="closeModal"
  >
    <form @submit.prevent="onSubmit">
      <UiTheInput
        v-model="registerForm.username.value"
        :label="registerForm.username.label"
        name="sign-up-username"
        autocomplete="given-name"
        :placeholder="$t('form.name')"
        required
        :error-message="registerForm.username.errorMessage"
      />
      <UiTheInput
        v-model="registerForm.name.value"
        :label="registerForm.name.label"
        :placeholder="$t('form.name')"
        :error-message="registerForm.name.errorMessage"
        name="sign-up-name"
        autocomplete="given-name"
        required
      />
      <UiTheInput
        v-model="registerForm.surname.value"
        :label="registerForm.surname.label"
        :placeholder="$t('form.lastName')"
        :error-message="registerForm.surname.errorMessage"
        name="sign-up-last-name"
        autocomplete="family-name"
        required
      />
      <UiTheInput
        v-model="registerForm.email.value"
        :label="registerForm.email.label"
        :error-message="registerForm.email.errorMessage"
        name="sign-up-email"
        type="email"
        placeholder="e@mail.com"
        autocomplete="email"
        required
      />
      <UiTheInput
        v-model="registerForm.password.value"
        :label="registerForm.password.label"
        :error-message="registerForm.password.errorMessage"
        name="sign-up-password"
        type="password"
        placeholder="8 symbols"
        autocomplete="new-password"
        required
      />
      <div class="my-6 flex justify-end">
        <UiTheButton
          class="w-full"
          outlined
          type="submit"
          :disabled="!isFormValid"
          :loading="isSubmitting"
        >
          {{ $t('service.register') }}
        </UiTheButton>
      </div>
    </form>

    <p class="text-center text-sm">
      <span>{{ $t('form.loginQuestion') }}</span>

      <UiTheButton class="ml-2 h-auto" plain @click="onLoginClick">
        {{ t('service.login') }}
      </UiTheButton>
    </p>
  </UiTheModal>
</template>

<script lang="ts" setup>
import { useField, useForm, useIsFormValid } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import { useNotification } from '@kyvg/vue3-notification'

interface IModalRegister {
  modelValue: boolean
}

withDefaults(defineProps<IModalRegister>(), {
  modelValue: true,
})
const emits = defineEmits(['update:model-value', 'on-login-click'])

const { t } = useI18n()
const { register } = useStrapiAuth()
const { notify } = useNotification()

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: {
    username: 'required',
    name: 'required|alpha',
    surname: 'required|alpha',
    email: 'required|email',
    password: 'required|min:8',
  },
})

const registerForm = reactive({
  username: useField('username', '', {
    label: t('form.username'),
    initialValue: '',
  }),
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

const isFormValid = ref(useIsFormValid())
const error = ref('')

const closeModal = () => emits('update:model-value', false)
const onLoginClick = () => {
  emits('on-login-click')
  closeModal()
}

const onSubmit = handleSubmit(
  async ({ email, password, username, name, surname }, { resetForm }) => {
    try {
      const newUser = await register({
        email,
        password,
        username,
        name,
        surname,
      })

      if (newUser !== null) {
        error.value = ''
        resetForm()
        notify({
          text: 'We have sent you an e-mail',
          type: 'success',
          duration: 3000,
          id: Date.now(),
          closeOnClick: true,
        })
        closeModal()
      }
    } catch (e: any) {
      error.value = e.error.message
      registerForm.password.value = ''
      notify({
        text: 'Something went wrong, try again',
        type: 'error',
        duration: 3000,
        id: Date.now(),
        closeOnClick: true,
        data: {
          text: e.error.message,
        },
      })
    }
  }
)
</script>
