<template>
  <div>
    <form @submit.prevent="onPasswordChangeSubmit">
      <UiTheInput
        v-model="passwordForm.oldPassword.value"
        :label="passwordForm.oldPassword.label"
        :placeholder="$t('form.oldPassword')"
        :error-message="passwordForm.oldPassword.errorMessage"
        name="old-password"
        type="password"
        required
      />
      <UiTheInput
        v-model="passwordForm.newPassword.value"
        :label="passwordForm.newPassword.label"
        :placeholder="$t('form.newPassword')"
        :error-message="passwordForm.newPassword.errorMessage"
        name="new-password"
        type="password"
        required
      />
      <UiTheInput
        v-model="passwordForm.confirmPassword.value"
        :label="passwordForm.confirmPassword.label"
        :placeholder="$t('form.confirmPassword')"
        :error-message="passwordForm.confirmPassword.errorMessage"
        name="confirm-password"
        type="password"
        required
      />
    </form>

    <ParticlesFormsPasswordRequirements
      v-model:isValid="isPasswordValid"
      :password="passwordForm.newPassword.value"
      :password-again="passwordForm.confirmPassword.value"
    />

    <div class="mt-2 flex justify-end">
      <UiTheButton
        outlined
        type="submit"
        :disabled="!isFormValid || !isPasswordValid"
        :loading="isSubmitting"
      >
        {{ $t('form.buttons.update') }}
      </UiTheButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useField, useForm, useIsFormValid } from 'vee-validate'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const isPasswordValid = ref(false)

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: {
    oldPassword: 'required|min:8',
    newPassword: 'required|min:8',
    confirmPassword: 'required|min:8',
  },
})

const passwordForm = reactive({
  oldPassword: useField('oldPassword', '', {
    label: t('form.oldPassword'),
    initialValue: '',
  }),
  newPassword: useField('newPassword', '', {
    label: t('form.newPassword'),
    initialValue: '',
  }),
  confirmPassword: useField('confirmPassword', '', {
    label: t('form.confirmPassword'),
    initialValue: '',
  }),
})

const isFormValid = useIsFormValid()
const error = ref('')

const onPasswordChangeSubmit = handleSubmit(async (formData, { resetForm }) => {
  console.log('formData: ', formData)
  try {
    // await register({
    //   email,
    //   password,
    //   username,
    //   name,
    //   surname,
    // })
  } catch (e: any) {
    error.value = e.error.message
  }
})
</script>
