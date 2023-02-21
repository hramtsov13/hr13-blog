<template>
  <div class="bg-base-300 col-span-6 rounded-lg p-4 shadow-xl">
    <h2 class="mb-4 text-xl">Password</h2>
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
        name="new-password"
        type="password"
        required
      />

      <div class="mt-2 flex justify-end">
        <UiTheButton
          outlined
          type="submit"
          :disabled="!isFormValid"
          :loading="isSubmitting"
        >
          Change password
        </UiTheButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useField, useForm, useIsFormValid } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import { TUser } from '@/utils/types'

const user = useStrapiUser<TUser>()
const { t } = useI18n()
const check = useStrapiAuth()
console.log('check: ', check)

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: {
    oldPassword: 'required|min:8',
    newPassword: 'required|min:8',
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

definePageMeta({
  layout: 'main-layout',
  middleware: 'authenticated',
})
</script>
