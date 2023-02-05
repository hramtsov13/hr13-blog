<template>
  <div class="form-control w-full font-mono">
    <label class="label" :for="name">
      <span v-if="label.length" class="label-text">
        {{ label }}
      </span>
    </label>
    <input
      :id="name"
      class="input input-bordered w-full"
      :class="{ 'input-error': errorMessage }"
      :type="type"
      :name="name"
      :value="modelValue1"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      @input="onInput"
      @change="onChange"
    />
    <span class="text-red-500 text-sm transition duration-200 min-h-5">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { resolveUnref } from '@vueuse/core'

interface ITheInput {
  modelValue: string
  name: string
  type: string
  label?: string
  placeholder?: string
  errorMessage?: string
  autocomplete?: string
}

const props = withDefaults(defineProps<ITheInput>(), {
  label: '',
  modelValue: '',
  placeholder: '',
  errorMessage: '',
  name: '',
  type: 'text',
  autocomplete: 'off',
})

const { modelValue, errorMessage, label } = toRefs(props)

const modelValue1 = resolveUnref(modelValue)
console.log('modelValue1: ', modelValue1)

const emits = defineEmits(['update:modelValue', 'input', 'change'])

const onInput = (event: Event) => {
  if (event) {
    const target = event.target as HTMLInputElement
    emits('update:modelValue', target.value)
    emits('input', target.value)
  }
}

const onChange = (event: Event) => {
  if (event) {
    const target = event.target as HTMLInputElement
    emits('change', target.value)
  }
}
</script>
