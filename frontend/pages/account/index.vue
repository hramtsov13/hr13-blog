<template>
  <UiTheCard class="col-span-full p-4">
    <h2 class="mb-4 text-xl">{{ $t('account.myAccountPage.title') }}</h2>

    <form @submit.prevent="onUserDataUpdateSubmit">
      <UiTheInput
        v-model="accountForm.username.value"
        :label="accountForm.username.label"
        name="account-username"
        :placeholder="$t('form.username')"
        disabled
        :error-message="accountForm.username.errorMessage"
      />

      <UiTheInput
        v-model="accountForm.name.value"
        :label="accountForm.name.label"
        name="account-name"
        autocomplete="given-name"
        :placeholder="$t('form.name')"
        required
        :error-message="accountForm.name.errorMessage"
      />
      <UiTheInput
        v-model="accountForm.surname.value"
        :label="accountForm.surname.label"
        name="account-surname"
        autocomplete="family-name"
        :placeholder="$t('form.lastName')"
        required
        :error-message="accountForm.surname.errorMessage"
      />
      <UiTheInput
        v-model="accountForm.email.value"
        :label="accountForm.email.label"
        name="account-email"
        autocomplete="email"
        :placeholder="$t('form.email')"
        required
        :error-message="accountForm.email.errorMessage"
      />

      <div class="mt-2 flex justify-end">
        <UiTheButton
          outlined
          type="submit"
          :disabled="!isFormValid || !meta.dirty"
          :loading="isSubmitting"
        >
          {{ $t('form.buttons.save') }}
        </UiTheButton>
      </div>
    </form>
  </UiTheCard>
</template>

<script setup lang="ts">
import { useField, useForm, useIsFormValid } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import { TUser } from '@/utils/types'

const user = useStrapiUser<TUser>()
const config = useRuntimeConfig()
const token = useStrapiToken()

const { t } = useI18n()

const { handleSubmit, isSubmitting, meta } = useForm({
  validationSchema: {
    name: 'required|alpha',
    surname: 'required|alpha',
    email: 'required|email',
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

const isFormValid = useIsFormValid()
const error = ref('')

const onUserDataUpdateSubmit = handleSubmit(async (formData) => {
  try {
    // Custom route defined in strapi to update user data (don't mixt it up with userS/me)

    await useAsyncData(() =>
      $fetch(`${config.strapi.url}/api/user/me`, {
        method: 'PUT',
        headers: {
          authorization: `Bearer ${token.value}`,
        },
        body: formData,
      })
    )

    user.value = useStrapiUser<TUser>().value
  } catch (e: any) {
    error.value = e.error.message
  }
})

definePageMeta({
  layout: 'main-layout',
  middleware: 'authenticated',
})
</script>
