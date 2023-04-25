<template>
  <div class="container-fluid h-full overflow-hidden">
    <ParticlesMainLayoutHeader
      :options="SIDEBAR_OPTIONS"
      :user="user"
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

      <div class="w-full overflow-y-auto p-4">
        <div class="h-full md:container md:mx-auto">
          <div
            v-if="isAccountPage"
            class="grid grid-cols-12 items-start gap-6 font-mono"
          >
            <ParticlesAccountMenu
              class="col-span-full sm:col-span-5 md:col-span-5 lg:col-span-4 xl:col-span-3"
              :user="user"
            />
            <div
              class="col-span-full sm:col-span-7 md:col-span-7 lg:col-span-6 xl:col-span-4"
            >
              <slot
                @on-login-click="onLoginClick"
                @on-register-click="onRegisterClick"
              />
            </div>
          </div>
          <slot v-else />

          <notifications position="top right" max="5">
            <template #body="props">
              <div
                :class="[
                  'alert alert-info my-2 flex-col items-start justify-start gap-0 text-left shadow-md',
                  { 'alert-error': props.item.type === 'error' },
                  { 'alert-warning': props.item.type === 'warn' },
                  { 'alert-success': props.item.type === 'success' },
                ]"
              >
                <p class="text-sm font-bold capitalize">
                  <span v-if="props.item.title">
                    {{ props.item.title }}
                  </span>
                  <span v-else-if="!props.item.title && props.item.type">{{
                    props.item.type
                  }}</span>
                  <span v-else> Info </span>
                </p>

                <div v-if="props.item.text">
                  <Icon
                    :name="
                      props.item.type === 'error'
                        ? 'ion:ios-close-circle-outline'
                        : props.item.type === 'warn'
                        ? 'uiw:warning-o'
                        : props.item.type === 'success'
                        ? 'clarity:success-standard-line'
                        : 'material-symbols:info-outline'
                    "
                    size="1.4rem"
                  />
                  <div>
                    <p class="text-sm leading-4">
                      {{ props.item.text }}
                    </p>
                    <div v-if="props.item.data">
                      <p
                        v-for="(item, index) in props.item.data"
                        :key="index"
                        class="text-xs"
                      >
                        {{ item }}
                      </p>
                    </div>
                  </div>
                </div>
                <p v-else>Something went wrong</p>
              </div>
            </template>
          </notifications>
        </div>
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
