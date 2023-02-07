<template>
  <div class="container-fluid min-h-screen">
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

    <div class="pt-18 flex h-full">
      <ParticlesCommonSideBar
        v-model:is-sidebar-expanded="isSidebarExpanded"
        :user="user"
        :options="sidebarOptions"
      />
      <div class="">
        <h1 class="text-center font-mono text-4xl">
          {{ $t('service.title') }}
        </h1>
        <div class="container mx-auto p-4">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TUser } from '~~/utils/types'

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

const sidebarOptions = [
  {
    title: 'All',
    path: 'articles',
    icon: 'majesticons:article-search-line',
  },
  {
    title: 'Frontend',
    path: 'articles/frontend',
    icon: 'icon-park-solid:bring-to-front',
  },
  {
    title: 'Backend',
    path: 'articles/backend',
    icon: 'pixelarticons:flip-to-back',
  },
  {
    title: 'Mobile',
    path: 'articles/mobile',
    icon: 'cil:screen-smartphone',
  },
]

const onLoginClick = () => (isLoginModalVisible.value = true)
const onRegisterClick = () => (isRegisterModalVisible.value = true)
const onBurgerClick = () => (isSidebarExpanded.value = !isSidebarExpanded.value)
</script>
