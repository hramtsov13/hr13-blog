<template>
  <div class="container-fluid h-full overflow-hidden">
    <Head>
      <Title> Blog | Main Page </Title>
    </Head>

    <ParticlesMainLayoutHeader
      @on-login-click="onLoginClick"
      @on-register-click="onRegisterClick"
    />

    <template v-if="isLoginModalVisible">
      <ParticlesMainLayoutModalLogin
        v-model="isLoginModalVisible"
        :title="$t('service.login')"
      />
    </template>
    <template v-if="isRegisterModalVisible">
      <ParticlesMainLayoutModalRegister
        v-model="isRegisterModalVisible"
        :title="$t('service.register')"
      />
    </template>

    <div class="pt-18 flex h-screen">
      <ParticlesMainLayoutSideBar :user="user" :options="SIDEBAR_OPTIONS" />

      <div class="container mx-auto overflow-y-auto p-4">
        <div
          v-if="isAccountPage"
          class="grid grid-cols-12 items-start gap-6 font-mono"
        >
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
                    <UiTheButton class="w-full text-inherit">
                      My info
                    </UiTheButton>
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
            <slot />
          </div>
        </div>
        <slot v-else />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TUser } from '@/utils/types'
import { SIDEBAR_OPTIONS } from '@/utils/constants'

const ParticlesMainLayoutModalLogin = defineAsyncComponent(
  () => import('@/components/particles/MainLayout/ModalLogin.vue')
)
const ParticlesMainLayoutModalRegister = defineAsyncComponent(
  () => import('@/components/particles/MainLayout/ModalRegister.vue')
)

const route = useRoute()
console.log('route: ', route)
const user = useStrapiUser<TUser>()

const isLoginModalVisible = ref(false)
const isRegisterModalVisible = ref(false)

const userInitials = computed(() => {
  if (user.value)
    return `${user.value?.name.slice(0, 1)}${user.value?.surname.slice(0, 1)}`

  return '--'
})
const isAccountPage = computed(() => route.path.includes('/account'))

const onLoginClick = () => (isLoginModalVisible.value = true)
const onRegisterClick = () => (isRegisterModalVisible.value = true)
</script>
