<template>
  <div class="h-screen container-fluid">
    <Head>
      <Title> Blog | Main Page </Title>
    </Head>

    <UiTheNavigation
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

    <h1 class="text-center font-mono text-4xl">{{ $t('service.title') }}</h1>
    <div class="grid grid-cols-12 min-h-screen">
      <aside class="border-r border-gray-300 col-span-3 container mx-auto p-4">
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
        </ul>
      </aside>
      <div class="container mx-auto p-4 col-span-9">
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
</script>
