<template>
  <h2 class="mt-4">
    {{ $t('form.requirements.title') }}
  </h2>

  <div class="mt-4 flex">
    <ParticlesFormsPasswordCheckIcon :is-active="enoughChars" />
    <span>{{ $t('form.requirements.enoughChars') }}</span>
  </div>

  <div class="mt-3 flex">
    <ParticlesFormsPasswordCheckIcon :is-active="enoughCapitalLetters" />
    <span>{{ $t('form.requirements.enoughCapitalLetters') }}</span>
  </div>

  <div class="mt-3 flex">
    <ParticlesFormsPasswordCheckIcon :is-active="passwordsMatch" />
    <span>{{ $t('form.requirements.passwordMatch') }}</span>
  </div>
</template>

<script setup lang="ts">
import { MINIMUM_PASSWORD_LENGTH } from '@/utils/constants'
import { CAPITAL_LETTERS_REGEX } from '@/utils/helpers/regex'

interface IPasswordRequirementsProps {
  password: string
  passwordAgain: string
  isValid: boolean
}

const emit = defineEmits(['update:isValid'])

const props = withDefaults(defineProps<IPasswordRequirementsProps>(), {
  password: '',
  passwordAgain: '',
  isValid: false,
})

const enoughChars = computed(
  () => props.password.length >= MINIMUM_PASSWORD_LENGTH
)
const enoughCapitalLetters = computed(() =>
  Boolean((props.password.match(CAPITAL_LETTERS_REGEX) || []).length)
)
const passwordsMatch = computed(() =>
  Boolean(props.password && props.password === props.passwordAgain)
)

watchEffect(() => {
  if (enoughChars.value && enoughCapitalLetters.value && passwordsMatch.value)
    emit('update:isValid', true)
  else emit('update:isValid', false)
})
</script>
