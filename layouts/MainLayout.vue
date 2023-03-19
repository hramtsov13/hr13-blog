<template>
  <div class="container-fluid h-full overflow-hidden">
    <ParticlesMainLayoutHeader
      @on-login-click="onLoginClick"
      @on-register-click="onRegisterClick"
    />

    <template v-if="isLoginModalVisible">
      <ParticlesMainLayoutModalLogin
        v-model="isLoginModalVisible"
        :title="$t('service.login')"
        @on-register-click="isRegisterModalVisible = !isRegisterModalVisible"
      />
    </template>
    <template v-if="isRegisterModalVisible">
      <ParticlesMainLayoutModalRegister
        v-model="isRegisterModalVisible"
        :title="$t('service.register')"
        @on-login-click="isLoginModalVisible = !isLoginModalVisible"
      />
    </template>

    <div class="pt-18 flex h-screen">
      <ParticlesMainLayoutSideBar :user="user" :options="SIDEBAR_OPTIONS" />

      <div class="container mx-auto overflow-y-auto p-4">
        <div
          v-if="isAccountPage"
          class="grid grid-cols-12 items-start gap-6 font-mono"
        >
          <ParticlesAccountMenu
            class="col-span-full sm:col-span-5 md:col-span-4 lg:col-span-3 xl:col-span-2"
            :user="user"
          />
          <div
            class="col-span-full sm:col-span-7 md:col-span-8 lg:col-span-5 xl:col-span-4"
          >
            <slot
              @on-login-click="onLoginClick"
              @on-register-click="onRegisterClick"
            />
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
const user = useStrapiUser<TUser>()

const isLoginModalVisible = ref(false)
const isRegisterModalVisible = ref(false)
const isAccountPage = computed(() => route.path.includes('/account'))

const onLoginClick = () => (isLoginModalVisible.value = true)
const onRegisterClick = () => (isRegisterModalVisible.value = true)
</script>
