<template>
  <div class="container-fluid h-screen">
    <Head>
      <Title> Blog | Main Page </Title>
    </Head>

    <ParticlesMainLayoutTheNavigation
      @on-login-click="onLoginClick"
      @on-register-click="onRegisterClick"
      @on-logout-click="onLogoutClick"
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

    <h1 class="text-center font-mono text-4xl">{{ $t('service.title') }}</h1>
    <div class="grid min-h-screen grid-cols-12">
      <aside class="container col-span-3 mx-auto border-r border-gray-300 p-4">
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
        </ul>
      </aside>
      <div class="container col-span-9 mx-auto p-4">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const ParticlesMainLayoutModalLogin = defineAsyncComponent(
  () => import('@/components/particles/MainLayout/ModalLogin.vue')
)
const ParticlesMainLayoutModalRegister = defineAsyncComponent(
  () => import('@/components/particles/MainLayout/ModalRegister.vue')
)

const isLoginModalVisible = ref(false)
const isRegisterModalVisible = ref(false)

const onLoginClick = () => (isLoginModalVisible.value = true)
const onRegisterClick = () => (isRegisterModalVisible.value = true)
const onLogoutClick = () => console.log('LOGOUT CLICKED')
</script>
