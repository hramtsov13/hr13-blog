<template>
  <div class="container-fluid h-full overflow-hidden">
    <Head>
      <Title> Blog | Main Page </Title>
    </Head>

    <ParticlesMainLayoutTheNavigation
      @on-login-click="onLoginClick"
      @on-register-click="onRegisterClick"
      @on-burger-click="onBurgerClick"
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
      <ParticlesCommonSideBar
        v-model:is-sidebar-expanded="isSidebarExpanded"
        :user="user"
        :options="SIDEBAR_OPTIONS"
      />

      <div class="container mx-auto overflow-y-auto p-4">
        <slot />
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

const user = useStrapiUser<TUser>()

const isLoginModalVisible = ref(false)
const isRegisterModalVisible = ref(false)
const isSidebarExpanded = ref(false)

const onLoginClick = () => (isLoginModalVisible.value = true)
const onRegisterClick = () => (isRegisterModalVisible.value = true)
const onBurgerClick = () => (isSidebarExpanded.value = !isSidebarExpanded.value)
</script>
