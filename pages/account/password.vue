<template>
  <div class="grid grid-cols-2 items-start gap-6 font-mono">
    <div class="bg-base-300 rounded-lg p-4 shadow-xl">
      <h2>Password</h2>
      <form>
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
  </div>
</template>

<script setup lang="ts">
import { useField, useForm, useIsFormValid } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import { TUser } from '@/utils/types'

const user = useStrapiUser<TUser>()
const { t } = useI18n()
const { register } = useStrapiAuth()

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: {
    username: 'required',
    name: 'required|alpha',
    surname: 'required|alpha',
    email: 'required|email',
    password: 'required|min:8',
    oldPassword: 'required|min:8',
    newPassword: 'required|min:8',
  },
})

const accountForm = reactive({
  username: useField('username', '', {
    label: t('form.username'),
    initialValue: user.value?.username,
  }),
  name: useField('name', '', {
    label: t('form.name'),
    initialValue: user.value?.name,
  }),
  surname: useField('surname', '', {
    label: t('form.lastName'),
    initialValue: user.value?.surname,
  }),
  email: useField('email', '', {
    label: t('form.email'),
    initialValue: user.value?.email,
  }),
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
})

const isFormValid = useIsFormValid()
const error = ref('')

const userInitials = computed(() => {
  if (user.value)
    return `${user.value?.name.slice(0, 1)}${user.value?.surname.slice(0, 1)}`

  return '--'
})

definePageMeta({
  layout: 'main-layout',
  middleware: 'authenticated',
})
</script>
