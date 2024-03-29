<template>
  <UiTheCard class="p-4">
    <form>
      <div class="mb-4 flex items-center justify-between gap-2.5">
        <h2 class="text-xl">{{ $t('account.passwordPage.title') }}</h2>

        <NuxtLink to="/forgot-password">
          <UiTheButton class="!m-0 h-auto !p-0 !text-xs" plain>
            {{ $t('form.passForgot') }}
          </UiTheButton>
        </NuxtLink>
      </div>

      <UiTheInput
        v-model="passwordForm.currentPassword.value"
        :label="passwordForm.currentPassword.label"
        :placeholder="$t('form.oldPassword')"
        :error-message="passwordForm.currentPassword.errorMessage"
        name="old-password"
        type="password"
        required
      />
      <UiTheInput
        v-model="passwordForm.password.value"
        :label="passwordForm.password.label"
        :placeholder="$t('form.newPassword')"
        :error-message="passwordForm.password.errorMessage"
        name="new-password"
        type="password"
        required
      />
      <UiTheInput
        v-model="passwordForm.passwordConfirmation.value"
        :label="passwordForm.passwordConfirmation.label"
        :placeholder="$t('form.confirmPassword')"
        :error-message="passwordForm.passwordConfirmation.errorMessage"
        name="confirm-password"
        type="password"
        required
      />
    </form>

    <ParticlesFormsPasswordRequirements
      v-model:isValid="isPasswordValid"
      :password="passwordForm.password.value"
      :password-again="passwordForm.passwordConfirmation.value"
    />

    <div class="mt-2 flex justify-end">
      <UiTheButton
        outlined
        type="submit"
        :disabled="!isFormValid || !isPasswordValid"
        :loading="isSubmitting"
        @click="onPasswordChangeSubmit"
      >
        {{ $t('form.buttons.update') }}
      </UiTheButton>
    </div>
  </UiTheCard>
</template>

<script setup lang="ts">
import { useField, useForm, useIsFormValid } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import { useNotification } from '@kyvg/vue3-notification'

const isPasswordValid = ref(false)
const { t } = useI18n()
const config = useRuntimeConfig()
const token = useStrapiToken()
const { notify } = useNotification()

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: {
    currentPassword: 'required|min:8',
    password: 'required|min:8',
    passwordConfirmation: 'required|min:8',
  },
})

const passwordForm = reactive({
  currentPassword: useField('currentPassword', '', {
    label: t('form.oldPassword'),
    initialValue: '',
  }),
  password: useField('password', '', {
    label: t('form.newPassword'),
    initialValue: '',
  }),
  passwordConfirmation: useField('passwordConfirmation', '', {
    label: t('form.confirmPassword'),
    initialValue: '',
  }),
})

const isFormValid = useIsFormValid()

const onPasswordChangeSubmit = handleSubmit(async (formData, { resetForm }) => {
  try {
    await $fetch(`${config.strapi.url}/api/auth/change-password`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token.value}`,
      },
      body: formData,
    })

    notify({
      text: 'Password has been successfully updated',
      type: 'success',
      duration: 3000,
      id: Date.now(),
    })

    resetForm()
    return
  } catch (e: any) {
    notify({
      text: 'Something went wrong, try again later',
      type: 'error',
      duration: 3000,
      id: Date.now(),
    })
  }
})
</script>
