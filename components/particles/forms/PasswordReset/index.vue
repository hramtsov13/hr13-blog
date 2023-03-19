<template>
  <UiTheCard class="max-w-xl p-4">
    <form>
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

const emits = defineEmits(['on-success'])

const isPasswordValid = ref(false)
const error = ref('')
const { t } = useI18n()
const { resetPassword } = useStrapiAuth()

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: {
    password: 'required|min:8',
    passwordConfirmation: 'required|min:8',
  },
})

const passwordForm = reactive({
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

const onPasswordChangeSubmit = handleSubmit(
  async ({ password, passwordConfirmation }, { resetForm }) => {
    try {
      // await resetPassword({ code: '123', password, passwordConfirmation })

      resetForm()

      emits('on-success')
    } catch (e: any) {
      error.value = e.error.message
    }
  }
)
</script>
