<template>
  <UiTheCard class="max-w-lg p-4">
    <form @submit="onPasswordChangeSubmit">
      <h2 class="text-md mb-2 font-mono md:mb-4 md:text-lg">
        {{ $t('form.passReset.emailTitle') }}
      </h2>

      <UiTheInput
        v-model="passwordResetFormSendEmail.email.value"
        :label="passwordResetFormSendEmail.email.label"
        name="password-reset-send-email"
        autocomplete="email"
        type="email"
        required
        :error-message="passwordResetFormSendEmail.email.errorMessage"
      />

      <div class="mt-2 flex justify-end">
        <UiTheButton
          outlined
          type="submit"
          :disabled="!isFormValid"
          :loading="isSubmitting"
        >
          {{ $t('form.buttons.send') }}
        </UiTheButton>
      </div>
    </form>
  </UiTheCard>
</template>

<script setup lang="ts">
import { useField, useForm, useIsFormValid } from 'vee-validate'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { forgotPassword } = useStrapiAuth()

const emits = defineEmits(['on-send-email-success'])

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: {
    email: 'required|email',
  },
})

const passwordResetFormSendEmail = reactive({
  email: useField('email', '', {
    label: t('form.email'),
    initialValue: '',
  }),
})

const isFormValid = useIsFormValid()

const onPasswordChangeSubmit = handleSubmit(
  async ({ email }, { resetForm }) => {
    try {
      // TODO: SEND E-MAIL

      // await forgotPassword({ email })
      resetForm()

      emits('on-send-email-success')
    } catch (e: any) {
      throw new Error(e)
    }
  }
)
</script>
