<template>
  <UiTheModal
    :model-value="modelValue"
    :error="error"
    @update:model-value="$emit('update:model-value', $event)"
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

      <div class="my-6 flex justify-end">
        <UiTheButton
          class="w-full"
          outlined
          type="submit"
          :disabled="!isFormValid"
          :loading="isSubmitting"
        >
          {{ t('service.login') }}
        </UiTheButton>
      </div>
    </form>

    <p class="mb-1 text-center text-sm">
      <span>{{ $t('form.registerQuestion') }}</span>

      <UiTheButton class="ml-2 h-auto" plain @click="onRegisterClick">
        {{ t('service.register') }}
      </UiTheButton>
    </p>

    <div class="flex justify-center">
      <NuxtLink to="/forgot-password">
        <UiTheButton class="h-auto" plain>
          {{ $t('form.passForgot') }}
        </UiTheButton>
      </NuxtLink>
    </div>
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
const emits = defineEmits(['update:model-value', 'on-register-click'])

const { t } = useI18n()
const { login } = useStrapiAuth()
const route = useRoute()

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: {
    email: 'required|email',
    password: 'required|min:8',
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

const isFormValid = ref(useIsFormValid())
const error = ref('')

const closeModal = () => emits('update:model-value', false)
const onRegisterClick = () => {
  closeModal()
  emits('on-register-click')
}

const onSubmit = handleSubmit(async ({ email, password }, { resetForm }) => {
  try {
    const loggedIndUser = await login({
      identifier: email,
      password,
    })

    if (loggedIndUser !== null) {
      error.value = ''
      resetForm()
      closeModal()
    }
  } catch (e: any) {
    error.value = e.error.message
    loginForm.password.value = ''
  }
})

watch(
  () => route.path,
  (newRoute) => {
    if (newRoute) closeModal()
  }
)
</script>
