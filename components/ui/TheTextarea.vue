<template>
  <div class="form-control w-full font-mono">
    <label class="label" :for="name">
      <span v-if="label.length" class="label-text">
        {{ label }}
        <sup v-if="required" class="text-red-500">*</sup>
      </span>
    </label>

    <textarea
      :id="name"
      class="textarea textarea-secondary textarea-bordered w-full"
      :class="[
        { 'textarea-error': errorMessage },
        { 'text-neutral-100': disabled },
      ]"
      :value="modelValue"
      :name="name"
      :disabled="disabled"
      :rows="rows"
      :autocomplete="autocomplete"
      :placeholder="placeholder"
      :readonly="readonly"
      v-bind="$attrs"
      @change="onChange"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
    />

    <span
      class="min-h-5 inline-block text-sm text-red-500 opacity-0 transition duration-200"
      :class="{ 'opacity-100': errorMessage }"
    >
      {{ errorMessage }}
    </span>
  </div>
</template>

<script setup lang="ts">
interface TheTextareaProps {
  modelValue: string
  name: string
  label?: string
  placeholder?: string
  errorMessage?: string
  autocomplete?: string
  required?: boolean
  disabled?: boolean
  readonly?: boolean
  maxLength?: number
  rows?: number
}

const props = withDefaults(defineProps<TheTextareaProps>(), {
  label: '',
  modelValue: '',
  placeholder: '',
  errorMessage: '',
  name: '',
  autocomplete: 'off',
  required: false,
  disabled: false,
  readonly: false,
  maxLength: 0,
  rows: 4,
})

const emits = defineEmits(['update:modelValue', 'change', 'clear', 'input'])

const focused = ref(false)
// const modelValue = props.modelValue.trim()

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

const onClear = () => {
  emits('update:modelValue', '')
  emits('clear')
}

const onFocus = () => {
  focused.value = true
}

const onBlur = () => {
  focused.value = false
}
</script>
