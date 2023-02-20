<template>
  <div class="grid grid-cols-12 items-start gap-6 font-mono">
    <div class="bg-base-300 col-span-3 rounded-lg p-4 shadow-xl">
      <div>
        <div class="flex items-center">
          <div class="avatar online placeholder mr-4">
            <div
              class="bg-neutral-focus text-neutral-content w-16 rounded-full"
            >
              <span class="text-xl">{{ userInitials }}</span>
            </div>
          </div>
          <div>
            <p>{{ user?.name }}</p>
            <p>{{ user?.surname }}</p>
          </div>
        </div>

        <ul class="mt-6">
          <li class="mb-2">
            <NuxtLink active-class="text-accent" to="/account">
              <UiTheButton class="w-full text-inherit"> My info </UiTheButton>
            </NuxtLink>
          </li>
          <li class="mb-2">
            <NuxtLink active-class="text-accent" to="/account/password">
              <UiTheButton class="w-full"> Password </UiTheButton>
            </NuxtLink>
          </li>
          <li class="mb-2">
            <UiTheButton class="w-full" disabled>
              <NuxtLink>Users</NuxtLink>
            </UiTheButton>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-span-9 grid grid-cols-12">
      <div class="bg-base-300 col-span-6 rounded-lg p-4 shadow-xl">
        <h2 class="mb-4 text-xl">My info</h2>
        <form>
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
              :disabled="!isFormValid"
              :loading="isSubmitting"
            >
              Update Info
            </UiTheButton>
          </div>
        </form>
      </div>
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
